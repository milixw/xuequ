'use strict';

const { test, assert } = require('./harness');
const { createGate, COOKIE, TTL, LIMIT } = require('../scripts/private-gate.js');

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
