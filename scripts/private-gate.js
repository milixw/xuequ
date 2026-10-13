'use strict';

// 私有课本资料的口令服务：核对口令、发 30 天登录凭证、给 nginx auth_request 回答“能不能放行”。
// 只用 Node 标准库。不传文件，录音和课文由 nginx 直接提供。
// 设计文档：docs/superpowers/specs/2026-10-13-private-textbook.md
//
// 用法（只监听本机，前面由 nginx 转发）：
//   PRIVATE_PASS=这里写口令 PRIVATE_SECRET=随机长串 node private-gate.js
//   可选：PORT（默认 6477）、HOST（默认 127.0.0.1）、PRIVATE_COOKIE_PATH（默认 /xuequ/）
//
// 接口（nginx 把 /xuequ/api/private/ 转发过来，路径按结尾匹配）：
//   POST …/unlock  {"pass":"…"}  对 → 204 + cookie；错 → 403；太频繁 → 429；不是 https → 403
//   GET  …/check                 凭证有效 → 204，否则 401（nginx auth_request 用）
//   GET  …/status                {"unlocked":true|false}

const crypto = require('crypto');

const COOKIE = 'xq_private';
const TTL = 30 * 24 * 3600; // 30 天，秒
const LIMIT = 5;            // 同一 IP 每分钟最多尝试几次
const WINDOW = 60 * 1000;

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

  function makeToken() {
    const exp = Math.floor(now() / 1000) + TTL;
    return exp + '.' + sign(exp);
  }

  function verifyToken(token) {
    const m = /^(\d{1,12})\.([0-9a-f]{64})$/.exec(token || '');
    if (!m) return false;
    if (Number(m[1]) <= now() / 1000) return false;
    return same(m[2], sign(m[1]));
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

  const reply = (status, body, headers = {}) => ({
    status,
    headers: { 'Cache-Control': 'no-store', ...(body ? { 'Content-Type': 'application/json; charset=utf-8' } : {}), ...headers },
    body: body ? JSON.stringify(body) : '',
  });

  // req: { method, path, headers（小写键）, ip, body（字符串） }
  function handle(req) {
    const unlocked = () => verifyToken(readCookie(req.headers.cookie));
    if (req.path.endsWith('/check') && req.method === 'GET') return reply(unlocked() ? 204 : 401);
    if (req.path.endsWith('/status') && req.method === 'GET') return reply(200, { unlocked: unlocked() });
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
      const cookie = `${COOKIE}=${makeToken()}; Path=${cookiePath}; Max-Age=${TTL}; HttpOnly; Secure; SameSite=Strict`;
      return reply(204, null, { 'Set-Cookie': cookie });
    }
    return reply(404, { error: 'none' });
  }

  return { handle, makeToken, verifyToken };
}

function serve() {
  const http = require('http');
  const PORT = Number(process.env.PORT) || 6477;
  const HOST = process.env.HOST || '127.0.0.1';
  let gate;
  try {
    gate = createGate({
      pass: process.env.PRIVATE_PASS,
      secret: process.env.PRIVATE_SECRET,
      cookiePath: process.env.PRIVATE_COOKIE_PATH || '/xuequ/',
    });
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
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
      // 日志不记口令和 cookie
      if (!req.url.endsWith('/check')) console.log(`${new Date().toISOString()} ${req.method} ${req.url} ${r.status}`);
    });
  });
  server.listen(PORT, HOST, () => console.log(`口令服务已启动：http://${HOST}:${PORT}`));
  for (const sig of ['SIGTERM', 'SIGINT']) process.on(sig, () => server.close(() => process.exit(0)));
}

if (require.main === module) serve();
else module.exports = { createGate, COOKIE, TTL, LIMIT };
