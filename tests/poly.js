'use strict';

// 给 verify 用的整式运算（第 10 章起）：把整式展开成“单项式 → 系数”的表，独立做加减、数乘、代入求值
// 内容文件里通过全局 Poly 使用，只在测试里跑，浏览器不加载：
//   Poly.of('3x^2y-2(xy-1)')   解析并展开（字母是单个小写字母，支持括号、数乘、整数次幂）
//   p.add(q) p.sub(q) p.mul(q) p.scale(k)   运算
//   p.at({ x: F(2) })          代入求值（全部字母都代入时得到 Frac）
//   p.deg() p.size() p.coef('x^2y') p.degIn('x')   次数、项数、某一项的系数、某个字母的最高指数
//   String(p)                  转成判分器认识的式子，可直接作为 expr 空的 verify 返回值
const A = require('../src/answer.js');
const { Frac } = A;

// 单项式的键：字母按字母表排序，形如 'x2y1'；常数项的键是 ''
function keyOf(pw) {
  return Object.keys(pw).filter(v => pw[v]).sort().map(v => v + pw[v]).join('');
}
function powersOf(key) {
  const pw = {};
  for (const [, v, e] of key.matchAll(/([a-z])(\d+)/g)) pw[v] = Number(e);
  return pw;
}

class Poly {
  constructor(terms = new Map()) {
    this.terms = new Map([...terms].filter(([, c]) => !c.isZero()));
  }
  static num(c) { return new Poly(new Map([['', Frac.of(c)]])); }
  static of(src) { return fromNode(A.parseExpr(String(src))); }

  add(q) {
    const t = new Map(this.terms);
    for (const [k, c] of Poly.lift(q).terms) t.set(k, (t.get(k) || new Frac(0n)).add(c));
    return new Poly(t);
  }
  sub(q) { return this.add(Poly.lift(q).scale(-1)); }
  scale(k) { return new Poly(new Map([...this.terms].map(([m, c]) => [m, c.mul(Frac.of(k))]))); }
  mul(q) {
    let r = new Poly();
    for (const [k1, c1] of this.terms) {
      for (const [k2, c2] of Poly.lift(q).terms) {
        const pw = powersOf(k1);
        for (const [v, e] of Object.entries(powersOf(k2))) pw[v] = (pw[v] || 0) + e;
        r = r.add(new Poly(new Map([[keyOf(pw), c1.mul(c2)]])));
      }
    }
    return r;
  }
  pow(n) {
    let r = Poly.num(1);
    for (let i = 0; i < n; i++) r = r.mul(this);
    return r;
  }
  static lift(q) { return q instanceof Poly ? q : typeof q === 'string' ? Poly.of(q) : Poly.num(q); }

  // 代入：没给值的字母保留，全部代入时返回 Frac
  at(env) {
    let r = new Poly();
    for (const [k, c] of this.terms) {
      let coef = c;
      const rest = {};
      for (const [v, e] of Object.entries(powersOf(k))) {
        if (v in env) coef = coef.mul(Frac.of(env[v]).pow(e));
        else rest[v] = e;
      }
      r = r.add(new Poly(new Map([[keyOf(rest), coef]])));
    }
    const vars = [...r.terms.keys()].filter(Boolean);
    return vars.length ? r : r.coef('');
  }

  size() { return this.terms.size; }
  isZero() { return this.terms.size === 0; }
  eq(q) { return this.sub(q).isZero(); }
  degOf(key) { return Object.values(powersOf(key)).reduce((a, b) => a + b, 0); }
  deg() { return Math.max(...[...this.terms.keys()].map(k => this.degOf(k))); }
  degIn(v) { return Math.max(0, ...[...this.terms.keys()].map(k => powersOf(k)[v] || 0)); }
  coef(mono) {
    const key = mono === '' || mono === 1 ? '' : keyOf(monoPowers(mono));
    return this.terms.get(key) || new Frac(0n);
  }
  toString() {
    if (!this.terms.size) return '0';
    return [...this.terms].map(([k, c], i) => {
      const letters = Object.entries(powersOf(k)).map(([v, e]) => (e === 1 ? v : `${v}^${e}`)).join('*');
      const abs = c.n < 0n ? c.neg() : c;
      const sign = c.n < 0n ? '-' : i ? '+' : '';
      const num = `(${abs.n}/${abs.d})`;
      return sign + (letters ? `${num}*${letters}` : num);
    }).join('');
  }
}

// 'x^2y'、'ab^3' 这样的单项式写法 → 指数表
function monoPowers(s) {
  const pw = {};
  for (const [, v, e] of String(s).replace(/\s|\*/g, '').matchAll(/([a-z])(?:\^(\d+))?/g)) pw[v] = (pw[v] || 0) + Number(e || 1);
  return pw;
}

function fromNode(n) {
  switch (n.t) {
    case 'num': return Poly.num(n.v);
    case 'var': return new Poly(new Map([[n.v + '1', new Frac(1n)]]));
    case 'paren': return fromNode(n.a);
    case 'neg': return fromNode(n.a).scale(-1);
    case 'add': return fromNode(n.a).add(fromNode(n.b));
    case 'sub': return fromNode(n.a).sub(fromNode(n.b));
    case 'mul': return fromNode(n.a).mul(fromNode(n.b));
    case 'div': {
      const d = fromNode(n.b);
      if (d.size() > 1 || [...d.terms.keys()][0] !== '') throw new Error('Poly 只能除以数');
      return fromNode(n.a).scale(new Frac(1n).div(d.coef('')));
    }
    case 'pow':
      if (n.k < 0) throw new Error('Poly 不支持负指数');
      return fromNode(n.a).pow(n.k);
  }
  throw new Error('Poly 不认识的节点 ' + n.t);
}

module.exports = Poly;
