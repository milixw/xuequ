'use strict';

// 私有课本资料的口令服务：核对口令或分享链接、发 30 天登录凭证、给 nginx auth_request 回答“能不能放行”。
// 只用 Node 标准库。不传文件，录音和课文由 nginx 直接提供。
// 设计文档：docs/superpowers/specs/2026-10-13-private-textbook.md
//
// 用法（只监听本机，前面由 nginx 转发）：
//   PRIVATE_PASS=这里写口令 PRIVATE_SECRET=随机长串 node private-gate.js
//   可选：PORT（默认 6477）、HOST（默认 127.0.0.1）、PRIVATE_COOKIE_PATH（默认 /xuequ/）
// 生成分享链接（同样的环境变量，参数是站点首页地址，后面可跟可看的册；不跟就是全部资料）：
//   node private-gate.js share https://<域名>/xuequ/
//   node private-gate.js share https://<域名>/xuequ/ english:g6s1,g6s2 english:rj-g4s1
// 列出能填的册（读 PRIVATE_DIR 下的 manifest.js，默认 /srv/xuequ/private）：
//   node private-gate.js list
//
// 接口（nginx 把 /xuequ/api/private/ 转发过来，路径按结尾匹配）：
//   POST …/unlock  {"pass":"…"}  对 → 204 + cookie；错 → 403；太频繁 → 429；不是 https → 403
//   GET  …/check                 凭证有效且请求的文件在凭证范围内 → 204，否则 401（nginx auth_request 用，
//                                 原请求路径由 nginx 放在 X-Original-URI 头里）
//   GET  …/status                {"unlocked":true|false, "scope":["english:g6s1",…]|null}，scope 为 null 是全部资料
//   GET  …/open/<分享码>          分享链接：码对 → 302 到课本资料页（范围只有 exams: 时到模拟考试页）+ cookie；
//                                 码错或不是 https → 302 到课本资料页但不发凭证
//                                 分享码由 PRIVATE_SECRET 和口令算出，改口令后旧链接作废
//
// 范围：分享码可以限定只看某几册（“学科:册ID”，对应私有文件 <学科>/<册ID>/…）；
//   模拟考试的卷集同样写成 exams:<卷集ID>（对应 exams/<卷集ID>/…，设计见 docs/superpowers/specs/2026-10-17-mock-exam.md）。
//   不限范围的码（2026-10-15 发出去的那个）和口令解锁都是全部资料。
//   限定范围的码形如 english:g6s1+english:g6s2.<签名>，范围在签名里，改了就作废；
//   凭证也带范围，先后打开几个链接时范围合并。manifest.js 只要凭证有效就放行，页面按 status 的范围只显示能看的册。

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const COOKIE = 'xq_private';
const TTL = 30 * 24 * 3600; // 30 天，秒
const LIMIT = 5;            // 同一 IP 每分钟最多尝试几次
const WINDOW = 60 * 1000;
const ITEM = /^[a-z]+:[a-z0-9-]+$/; // 范围里的一项：学科:册ID

// 范围：null 是全部资料；否则是排好序、去重的 ["english:g6s1", …]
function normScope(items) {
  return [...new Set(items)].sort();
}
// 'english:g6s1+english:g6s2' → 数组；格式不对返回 undefined
function parseScope(text) {
  const items = String(text).split('+');
  return items.every(x => ITEM.test(x)) ? normScope(items) : undefined;
}

// now 可注入，方便测试过期和限流
function createGate({ pass, secret, cookiePath = '/xuequ/', now = Date.now }) {
  if (!pass || !secret) throw new Error('缺少 PRIVATE_PASS 或 PRIVATE_SECRET');
  // 签名密钥里含口令：改口令后旧凭证全部失效
  const key = secret + '\n' + pass;
  const sign = exp => crypto.createHmac('sha256', key).update(COOKIE + ':' + exp).digest('hex');
  const same = (a, b) => {
    const x = Buffer.from(String(a));
    const y = Buffer.from(String(b));
    return x.length === y.length && crypto.timingSafeEqual(x, y);
  };

  // 凭证：全部资料是 <到期>.<签名>（和最早的格式一样，已发的凭证照旧有效）；限定范围是 <到期>.<范围>.<签名>
  function makeToken(scope = null) {
    const exp = Math.floor(now() / 1000) + TTL;
    if (!scope) return exp + '.' + sign(exp);
    const text = scope.join('+');
    return exp + '.' + text + '.' + sign(exp + ':' + text);
  }

  // 有效返回 { scope }，否则 null
  function readToken(token) {
    const m = /^(\d{1,12})\.(?:([a-z0-9:+-]{1,2000})\.)?([0-9a-f]{64})$/.exec(token || '');
    if (!m || Number(m[1]) <= now() / 1000) return null;
    if (!m[2]) return same(m[3], sign(m[1])) ? { scope: null } : null;
    const scope = parseScope(m[2]);
    return scope && same(m[3], sign(m[1] + ':' + m[2])) ? { scope } : null;
  }
  const verifyToken = token => !!readToken(token);

  // 分享码：签名 144 位，猜不中，不必限流。不限范围的码沿用最早的算法，已发的链接照旧有效
  const shareSig = scope => crypto.createHmac('sha256', key)
    .update(COOKIE + ':share' + (scope ? ':' + scope.join('+') : '')).digest('base64url').slice(0, 24);
  const shareCode = (scope = null) => (scope ? scope.join('+') + '.' : '') + shareSig(scope);
  function shareLink(base, scope = null) {
    if (scope && !(scope.length && scope.every(x => ITEM.test(x)))) throw new Error('范围格式不对');
    return base.replace(/\/?$/, '/') + 'api/private/open/' + shareCode(scope && normScope(scope));
  }
  // 分享码 → { scope }，不对返回 null
  function readShareCode(code) {
    const i = code.lastIndexOf('.');
    if (i < 0) return same(code, shareSig(null)) ? { scope: null } : null;
    const scope = parseScope(code.slice(0, i));
    return scope && scope.join('+') === code.slice(0, i) && same(code.slice(i + 1), shareSig(scope)) ? { scope } : null;
  }
  // 两个范围合并，有一个是全部就是全部
  const unionScope = (a, b) => (a && b ? normScope([...a, ...b]) : null);

  // 限定范围的凭证能不能看这个文件：manifest.js 都能看，其余只认 <学科>/<册ID>/… 且在范围里。
  // 用的是 nginx 的原始请求路径（没解码、没规范化），带 ..、//、% 这类的一律不放行
  function inScope(scope, uri) {
    if (!scope) return true;
    const base = cookiePath + 'private/';
    const p = String(uri || '').split('?')[0];
    if (!p.startsWith(base)) return false;
    const rest = p.slice(base.length);
    if (rest === 'manifest.js') return true;
    const m = /^([a-z]+)\/([a-z0-9-]+)\/[A-Za-z0-9_-][A-Za-z0-9._\/-]*$/.exec(rest);
    if (!m || rest.includes('..') || rest.includes('//')) return false;
    return scope.includes(m[1] + ':' + m[2]);
  }

  function readCookie(header) {
    for (const part of String(header || '').split(';')) {
      const i = part.indexOf('=');
      if (i > 0 && part.slice(0, i).trim() === COOKIE) return part.slice(i + 1).trim();
    }
    return '';
  }

  const attempts = new Map(); // ip → 最近一分钟内的尝试时间
  function tooMany(ip) {
    const t = now();
    const list = (attempts.get(ip) || []).filter(x => t - x < WINDOW);
    list.push(t);
    attempts.set(ip, list);
    if (attempts.size > 10000) {
      for (const [k, v] of attempts) if (!v.some(x => t - x < WINDOW)) attempts.delete(k);
    }
    return list.length > LIMIT;
  }

  const cookieHeader = scope => `${COOKIE}=${makeToken(scope)}; Path=${cookiePath}; Max-Age=${TTL}; HttpOnly; Secure; SameSite=Strict`;
  const reply = (status, body, headers = {}) => ({
    status,
    headers: { 'Cache-Control': 'no-store', ...(body ? { 'Content-Type': 'application/json; charset=utf-8' } : {}), ...headers },
    body: body ? JSON.stringify(body) : '',
  });

  // req: { method, path, headers（小写键）, ip, body（字符串） }
  function handle(req) {
    const held = () => readToken(readCookie(req.headers.cookie));
    if (req.path.endsWith('/check') && req.method === 'GET') {
      const tok = held();
      return reply(tok && inScope(tok.scope, req.headers['x-original-uri']) ? 204 : 401);
    }
    if (req.path.endsWith('/status') && req.method === 'GET') {
      const tok = held();
      return reply(200, tok ? { unlocked: true, scope: tok.scope } : { unlocked: false });
    }
    const open = /\/open\/([^/]*)$/.exec(req.path);
    if (open && req.method === 'GET') {
      let code = open[1];
      try { code = decodeURIComponent(code); } catch { code = ''; }
      const got = req.headers['x-forwarded-proto'] === 'https' ? readShareCode(code) : null;
      let cookie = {};
      if (got) {
        const tok = held();
        cookie = { 'Set-Cookie': cookieHeader(tok ? unionScope(tok.scope, got.scope) : got.scope) };
      }
      // 范围里只有模拟考试的卷集时直接进模拟考试，其余进课本资料
      const onlyExams = got && got.scope && got.scope.every(x => x.startsWith('exams:'));
      return reply(302, null, { Location: cookiePath + (onlyExams ? '#/mock' : '#/textbook'), ...cookie });
    }
    if (req.path.endsWith('/unlock') && req.method === 'POST') {
      if (req.headers['x-forwarded-proto'] !== 'https') return reply(403, { error: 'https' });
      if (tooMany(req.ip)) return reply(429, { error: 'busy' });
      let given = '';
      try {
        given = JSON.parse(req.body || '{}').pass;
      } catch {
        return reply(400, { error: 'bad' });
      }
      if (typeof given !== 'string' || !same(given, pass)) return reply(403, { error: 'pass' });
      return reply(204, null, { 'Set-Cookie': cookieHeader() });
    }
    return reply(404, { error: 'none' });
  }

  return { handle, makeToken, verifyToken, readToken, shareLink };
}

// 私有资料里有哪些册：读 manifest.js（Private.manifest({ english: { g6s1: {…} } })）→ [{ id: 'english:g6s1', vol }]
function listVolumes(dir) {
  let m = null;
  require('vm').runInNewContext(fs.readFileSync(path.join(dir, 'manifest.js'), 'utf8'), { Private: { manifest(x) { m = x; } } });
  const out = [];
  for (const [subject, vols] of Object.entries(m || {})) for (const [id, vol] of Object.entries(vols)) out.push({ id: subject + ':' + id, vol });
  return out;
}

// 命令行的范围参数：english:g6s1,g6s2 english:rj-g4s1 → ['english:g6s1', 'english:g6s2', 'english:rj-g4s1']
// 同一个参数里逗号后面不写学科就沿用前一项的
function scopeFromArgs(args) {
  const items = [];
  for (const arg of args) {
    let subject = '';
    for (const part of arg.split(',').filter(Boolean)) {
      const item = part.includes(':') ? part : subject && subject + ':' + part;
      if (!ITEM.test(item || '')) throw new Error(`范围写法不对：${part}（应写成 english:g6s1,g6s2）`);
      subject = item.split(':')[0];
      items.push(item);
    }
  }
  return items.length ? normScope(items) : null;
}

function gateFromEnv() {
  try {
    return createGate({
      pass: process.env.PRIVATE_PASS,
      secret: process.env.PRIVATE_SECRET,
      cookiePath: process.env.PRIVATE_COOKIE_PATH || '/xuequ/',
    });
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

function serve() {
  const http = require('http');
  const PORT = Number(process.env.PORT) || 6477;
  const HOST = process.env.HOST || '127.0.0.1';
  const gate = gateFromEnv();
  if (process.env.PRIVATE_SECRET.length < 32) console.warn('提醒：PRIVATE_SECRET 建议至少 32 个字符');

  const server = http.createServer((req, res) => {
    const chunks = [];
    let size = 0;
    req.on('data', c => {
      size += c.length;
      if (size > 1024) req.destroy(); // 只收口令这么点数据
      else chunks.push(c);
    });
    req.on('end', () => {
      const r = gate.handle({
        method: req.method,
        path: req.url.split('?')[0],
        headers: req.headers,
        ip: req.headers['x-real-ip'] || req.socket.remoteAddress,
        body: Buffer.concat(chunks).toString('utf8'),
      });
      res.writeHead(r.status, { ...r.headers, 'Content-Length': Buffer.byteLength(r.body) });
      res.end(r.body);
      // 日志不记口令、cookie 和分享码
      const url = req.url.replace(/\/open\/[^/?]*/, '/open/***');
      if (!req.url.endsWith('/check')) console.log(`${new Date().toISOString()} ${req.method} ${url} ${r.status}`);
    });
  });
  server.listen(PORT, HOST, () => console.log(`口令服务已启动：http://${HOST}:${PORT}`));
  for (const sig of ['SIGTERM', 'SIGINT']) process.on(sig, () => server.close(() => process.exit(0)));
}

const PRIVATE_DIR = process.env.PRIVATE_DIR || '/srv/xuequ/private';

function shareCommand(base, args) {
  if (!/^https:\/\//.test(base || '')) {
    console.error('用法：node private-gate.js share https://<域名>/xuequ/ [english:g6s1,g6s2 …]（不写范围就是全部资料）');
    process.exit(1);
  }
  let scope;
  try {
    scope = scopeFromArgs(args);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
  if (scope) {
    // 册 ID 写错了生成出来的链接什么都看不到，能读到 manifest 就先核对
    let known = null;
    try {
      known = listVolumes(PRIVATE_DIR).map(x => x.id);
    } catch {
      console.warn(`提醒：读不到 ${PRIVATE_DIR}/manifest.js，没有核对册 ID（可用 PRIVATE_DIR 指定）`);
    }
    const bad = known ? scope.filter(x => !known.includes(x)) : [];
    if (bad.length) {
      console.error(`没有这些册：${bad.join(' ')}；用 node private-gate.js list 查看能填的册`);
      process.exit(1);
    }
    console.error(`范围：${scope.join(' ')}`);
  } else console.error('范围：全部资料');
  console.log(gateFromEnv().shareLink(base, scope));
}

function listCommand() {
  try {
    for (const { id, vol } of listVolumes(PRIVATE_DIR)) console.log(`${id.padEnd(20)} ${vol.edition ? vol.edition + ' ' : ''}${vol.title || ''}`);
  } catch (e) {
    console.error(`读不到 ${PRIVATE_DIR}/manifest.js（可用 PRIVATE_DIR 指定）：${e.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  if (process.argv[2] === 'share') shareCommand(process.argv[3], process.argv.slice(4));
  else if (process.argv[2] === 'list') listCommand();
  else serve();
}
else module.exports = { createGate, scopeFromArgs, listVolumes, COOKIE, TTL, LIMIT };
