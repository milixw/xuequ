'use strict';

const { test, assert } = require('./harness');
const { createGate, scopeFromArgs, listVolumes, COOKIE, TTL, LIMIT } = require('../scripts/private-gate.js');

function setup() {
  let t = 1791849600000; // 2026-10-13，别的测试会替换全局 Date，这里不用它
  const clock = { now: () => t, add: ms => { t += ms; } };
  const gate = createGate({ pass: 'open-sesame', secret: 's'.repeat(40), now: clock.now });
  const unlock = (pass, extra = {}) => gate.handle({
    method: 'POST', path: '/unlock', ip: extra.ip || '1.1.1.1', body: JSON.stringify({ pass }),
    headers: { 'x-forwarded-proto': extra.proto || 'https' },
  });
  const check = cookie => gate.handle({ method: 'GET', path: '/check', ip: '1.1.1.1', body: '', headers: cookie ? { cookie } : {} });
  const tokenOf = r => /xq_private=([^;]+)/.exec(r.headers['Set-Cookie'])[1];
  return { gate, clock, unlock, check, tokenOf };
}

test('口令服务：口令对发 30 天凭证，凭证能通过校验', () => {
  const { unlock, check, tokenOf } = setup();
  const r = unlock('open-sesame');
  assert(r.status === 204, '口令对应返回 204');
  const c = r.headers['Set-Cookie'];
  for (const attr of ['HttpOnly', 'Secure', 'SameSite=Strict', 'Path=/xuequ/', `Max-Age=${TTL}`]) assert(c.includes(attr), `cookie 缺少 ${attr}`);
  assert(TTL === 30 * 24 * 3600);
  assert(check(`other=1; ${COOKIE}=${tokenOf(r)}`).status === 204, '有效凭证应放行');
  assert(check().status === 401, '没有凭证应拒绝');
});

test('口令服务：口令错、非 https、请求体坏都拒绝', () => {
  const { unlock } = setup();
  assert(unlock('wrong').status === 403);
  assert(unlock('').status === 403);
  assert(unlock(123).status === 403);
  assert(unlock('open-sesame', { proto: 'http' }).status === 403, '非 https 不发凭证');
  assert(!unlock('open-sesame', { proto: 'http', ip: '2.2.2.2' }).headers['Set-Cookie']);
});

test('口令服务：凭证过期、被篡改、改口令后都失效', () => {
  const { gate, clock, unlock, check, tokenOf } = setup();
  const token = tokenOf(unlock('open-sesame'));
  const [exp, sig] = token.split('.');
  assert(check(`${COOKIE}=${Number(exp) + 999}.${sig}`).status === 401, '改了到期时间应失效');
  assert(check(`${COOKIE}=${exp}.${sig.replace(/./, c => (c === 'a' ? 'b' : 'a'))}`).status === 401, '改了签名应失效');
  assert(check(`${COOKIE}=garbage`).status === 401);
  clock.add((TTL - 60) * 1000);
  assert(check(`${COOKIE}=${token}`).status === 204, '30 天内有效');
  clock.add(120 * 1000);
  assert(check(`${COOKIE}=${token}`).status === 401, '30 天后失效');
  const other = createGate({ pass: 'new-pass', secret: 's'.repeat(40), now: clock.now });
  assert(!other.verifyToken(gate.makeToken()), '改口令后旧凭证失效');
});

test('口令服务：同一 IP 每分钟最多尝试 5 次', () => {
  const { clock, unlock } = setup();
  for (let i = 0; i < LIMIT; i++) assert(unlock('wrong').status === 403);
  assert(unlock('open-sesame').status === 429, '超过次数连正确口令也要等');
  assert(unlock('open-sesame', { ip: '9.9.9.9' }).status === 204, '别的 IP 不受影响');
  clock.add(61 * 1000);
  assert(unlock('open-sesame').status === 204, '一分钟后恢复');
});

test('口令服务：status 接口、未知路径、缺配置', () => {
  const { gate, unlock, tokenOf } = setup();
  const status = cookie => JSON.parse(gate.handle({ method: 'GET', path: '/xuequ/api/private/status', ip: '1', body: '', headers: { cookie } }).body);
  assert(status('').unlocked === false);
  assert(status(`${COOKIE}=${tokenOf(unlock('open-sesame'))}`).unlocked === true);
  assert(gate.handle({ method: 'GET', path: '/unlock', ip: '1', body: '', headers: {} }).status === 404, 'unlock 只接受 POST');
  assert(gate.handle({ method: 'GET', path: '/x', ip: '1', body: '', headers: {} }).headers['Cache-Control'] === 'no-store');
  assert.throws(() => createGate({ pass: '', secret: 'x' }), '缺口令应报错');
});

test('口令服务：分享链接打开后发凭证并跳到课本资料页', () => {
  const { gate, check, tokenOf } = setup();
  const link = gate.shareLink('https://example.com/xuequ');
  const m = /^https:\/\/example\.com\/xuequ\/api\/private\/open\/([A-Za-z0-9_-]{24})$/.exec(link);
  assert(m, '分享链接格式不对：' + link);
  assert(gate.shareLink('https://example.com/xuequ/') === link, '结尾斜杠可有可无');
  const open = (code, proto = 'https') => gate.handle({
    method: 'GET', path: '/xuequ/api/private/open/' + code, ip: '1.1.1.1', body: '', headers: { 'x-forwarded-proto': proto },
  });
  const r = open(m[1]);
  assert(r.status === 302 && r.headers.Location === '/xuequ/#/textbook', '应跳到课本资料页');
  assert(r.headers['Set-Cookie'].includes('HttpOnly'));
  assert(check(`${COOKIE}=${tokenOf(r)}`).status === 204, '分享链接发的凭证应放行');
  for (const bad of [open('x' + m[1].slice(1)), open(''), open(m[1], 'http')]) {
    assert(bad.status === 302 && !bad.headers['Set-Cookie'], '码错或非 https 只跳转、不发凭证');
  }
  const other = createGate({ pass: 'new-pass', secret: 's'.repeat(40) });
  assert(other.shareLink('https://example.com/xuequ/') !== link, '改口令后分享链接作废');
});

// 限定范围的分享链接：只能看勾选的册
function scoped() {
  const s = setup();
  const req = (path, headers = {}) => s.gate.handle({ method: 'GET', path, ip: '1.1.1.1', body: '', headers });
  const open = (code, cookie = '') => req('/xuequ/api/private/open/' + code, { 'x-forwarded-proto': 'https', cookie });
  const codeOf = link => link.split('/open/')[1];
  const file = (uri, token) => req('/check', { cookie: `${COOKIE}=${token}`, 'x-original-uri': uri }).status;
  const status = token => JSON.parse(req('/status', { cookie: `${COOKIE}=${token}` }).body);
  return { ...s, req, open, codeOf, file, status };
}

test('口令服务：不限范围的分享码和旧凭证保持原样', () => {
  const { gate, file, tokenOf, unlock, codeOf } = scoped();
  const old = require('crypto').createHmac('sha256', 's'.repeat(40) + '\nopen-sesame').update(COOKIE + ':share').digest('base64url').slice(0, 24);
  assert(codeOf(gate.shareLink('https://e.com/xuequ/')) === old, '已发出去的分享码不能变');
  const token = tokenOf(unlock('open-sesame'));
  assert(/^\d+\.[0-9a-f]{64}$/.test(token), '口令解锁仍是全部资料的旧格式凭证');
  assert(file('/xuequ/private/english/g7s1/audio/a.m4a', token) === 204);
  assert(file(undefined, token) === 204, 'nginx 没传原始路径时，全部资料的凭证照旧放行');
});

test('口令服务：限定范围的分享链接只放行勾选的册', () => {
  const { gate, open, codeOf, file, status, tokenOf } = scoped();
  const link = gate.shareLink('https://e.com/xuequ/', ['english:g6s2', 'english:g6s1', 'english:g6s1']);
  assert(codeOf(link).startsWith('english:g6s1+english:g6s2.'), '范围排序去重后写在码里：' + link);
  const r = open(codeOf(link));
  assert(r.status === 302 && r.headers['Set-Cookie'], '码对应发凭证');
  const t = tokenOf(r);
  assert(file('/xuequ/private/manifest.js', t) === 204, 'manifest 都能看');
  assert(file('/xuequ/private/english/g6s1/U1.js', t) === 204);
  assert(file('/xuequ/private/english/g6s2/pages/p001.jpg?x=1', t) === 204);
  for (const bad of [
    '/xuequ/private/english/g7s1/U1.js', '/xuequ/private/english/rj-g6s1/U1.js',
    '/xuequ/private/english/g6s1/../g7s1/U1.js', '/xuequ/private/english/g6s1/%2e%2e/g7s1/U1.js',
    '/xuequ/private//english/g7s1/U1.js', '/xuequ/private/english/g6s1', '/xuequ/private/other.js',
    '/xuequ/private/english/g6s1/', '/xuequ/x/english/g6s1/U1.js', undefined,
  ]) assert(file(bad, t) === 401, '不该放行：' + bad);
  const st = status(t);
  assert(st.unlocked === true && st.scope.join() === 'english:g6s1,english:g6s2', 'status 返回范围');
  assert(status(tokenOf(open(codeOf(gate.shareLink('https://e.com/xuequ/'))))).scope === null, '全部资料的 scope 是 null');
});

test('口令服务：限定范围的码和凭证不能篡改', () => {
  const { gate, clock, open, codeOf, file, tokenOf } = scoped();
  const code = codeOf(gate.shareLink('https://e.com/xuequ/', ['english:g6s1']));
  const sig = code.split('.')[1];
  for (const bad of ['english:g7s1.' + sig, 'english:g6s1+english:g7s1.' + sig, sig, 'english:g6s1.', code + 'x']) {
    assert(!open(bad).headers['Set-Cookie'], '改过的码不该发凭证：' + bad);
  }
  assert(open(encodeURIComponent(code)).headers['Set-Cookie'], '链接被转义过也认');
  const t = tokenOf(open(code));
  const [exp, , tsig] = t.split('.');
  assert(file('/xuequ/private/english/g7s1/U1.js', `${exp}.english:g7s1.${tsig}`) === 401, '改范围的凭证失效');
  assert(file('/xuequ/private/english/g7s1/U1.js', `${exp}.${tsig}`) === 401, '去掉范围不能变成全部资料');
  clock.add((TTL + 1) * 1000);
  assert(file('/xuequ/private/english/g6s1/U1.js', t) === 401, '限定范围的凭证也是 30 天');
  const other = createGate({ pass: 'new-pass', secret: 's'.repeat(40) });
  assert(other.shareLink('https://e.com/xuequ/', ['english:g6s1']) !== gate.shareLink('https://e.com/xuequ/', ['english:g6s1']), '改口令后作废');
  assert.throws(() => gate.shareLink('https://e.com/xuequ/', ['bad item']), '范围格式不对应报错');
  assert.throws(() => gate.shareLink('https://e.com/xuequ/', []), '空范围应报错');
});

test('口令服务：先后打开几个链接范围合并，有全部资料就是全部', () => {
  const { gate, open, codeOf, status, tokenOf } = scoped();
  const link = list => codeOf(gate.shareLink('https://e.com/xuequ/', list));
  const t1 = tokenOf(open(link(['english:g6s1'])));
  const t2 = tokenOf(open(link(['english:rj-g4s1']), `${COOKIE}=${t1}`));
  assert(status(t2).scope.join() === 'english:g6s1,english:rj-g4s1', '范围应合并');
  const full = tokenOf(open(codeOf(gate.shareLink('https://e.com/xuequ/')), `${COOKIE}=${t2}`));
  assert(status(full).scope === null, '再开全部资料的链接变成全部');
  assert(status(tokenOf(open(link(['english:g6s1']), `${COOKIE}=${full}`))).scope === null, '已有全部资料不会被缩小');
});

test('口令服务：命令行的范围写法与册清单', () => {
  assert(scopeFromArgs([]) === null, '不写范围是全部资料');
  assert(scopeFromArgs(['english:g6s2,g6s1', 'english:rj-g4s1']).join() === 'english:g6s1,english:g6s2,english:rj-g4s1');
  for (const bad of [['g6s1'], ['english:G6S1'], ['english:g6s1,a b']]) assert.throws(() => scopeFromArgs(bad), '应报错：' + bad);
  const fs = require('fs');
  const os = require('os');
  const path = require('path');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'xq-gate-'));
  fs.writeFileSync(path.join(dir, 'manifest.js'), "'use strict';\nPrivate.manifest({ english: { g6s1: { title: '六年级上册' }, 'rj-g4s1': { title: '四年级上册' } } });\n");
  assert(listVolumes(dir).map(x => x.id).join() === 'english:g6s1,english:rj-g4s1');
  fs.rmSync(dir, { recursive: true });
});
