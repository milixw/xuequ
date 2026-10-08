'use strict';

// 判分用的纯函数：精确分数、数值、代数式等价、角度。浏览器和 node 通用，不依赖 DOM。

(function (root) {

  // ---------- 输入规范化 ----------
  // 全角转半角，各种负号、乘号、除号、撇号统一成 ASCII
  function normalize(s) {
    return String(s)
      .replace(/[！-～]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))
      .replace(/[−‒–—﹣]/g, '-')
      .replace(/[×·•∙]/g, '*')
      .replace(/÷/g, '/')
      .replace(/[′’‘]/g, "'")
      .replace(/[″”“]/g, '"')
      .replace(/²/g, '^2')
      .replace(/³/g, '^3')
      .replace(/、/g, ',')
      .replace(/[∶︰]/g, ':')
      .replace(/　/g, ' ')
      .trim();
  }

  // ---------- 分数 ----------
  function gcd(a, b) {
    if (a < 0n) a = -a;
    if (b < 0n) b = -b;
    while (b) [a, b] = [b, a % b];
    return a;
  }

  class Frac {
    constructor(n, d = 1n) {
      n = BigInt(n);
      d = BigInt(d);
      if (d === 0n) throw new Error('分母不能为 0');
      if (d < 0n) { n = -n; d = -d; }
      const g = gcd(n, d) || 1n;
      this.n = n / g;
      this.d = d / g;
    }

    // 接受 Frac、整数、有限小数、数字字符串（'-3/4'、'0.75'、'1又1/2'）
    static of(x) {
      if (x instanceof Frac) return x;
      if (typeof x === 'bigint') return new Frac(x);
      if (typeof x === 'number') {
        if (Number.isInteger(x)) return new Frac(BigInt(x));
        const f = parseNumber(String(x));
        if (f) return f;
      }
      if (typeof x === 'string') {
        const f = parseNumber(x);
        if (f) return f;
      }
      throw new Error('无法转成分数：' + x);
    }

    add(o) { o = Frac.of(o); return new Frac(this.n * o.d + o.n * this.d, this.d * o.d); }
    sub(o) { o = Frac.of(o); return new Frac(this.n * o.d - o.n * this.d, this.d * o.d); }
    mul(o) { o = Frac.of(o); return new Frac(this.n * o.n, this.d * o.d); }
    div(o) {
      o = Frac.of(o);
      if (o.n === 0n) throw new Error('除数不能为 0');
      return new Frac(this.n * o.d, this.d * o.n);
    }
    pow(k) {
      if (k < 0) return new Frac(1n).div(this.pow(-k));
      const e = BigInt(k);
      return new Frac(this.n ** e, this.d ** e);
    }
    neg() { return new Frac(-this.n, this.d); }
    abs() { return new Frac(this.n < 0n ? -this.n : this.n, this.d); }
    cmp(o) {
      o = Frac.of(o);
      const x = this.n * o.d - o.n * this.d;
      return x > 0n ? 1 : x < 0n ? -1 : 0;
    }
    eq(o) { return this.cmp(o) === 0; }
    isZero() { return this.n === 0n; }
    toString() { return this.d === 1n ? String(this.n) : `${this.n}/${this.d}`; }
    toTeX() {
      if (this.d === 1n) return String(this.n);
      const sign = this.n < 0n ? '-' : '';
      return `${sign}\\frac{${this.n < 0n ? -this.n : this.n}}{${this.d}}`;
    }
  }

  // ---------- 数值 ----------
  // 整数、有限小数、分数、带分数（1又1/2），可带正负号；无法识别时返回 null
  function parseNumber(s) {
    s = normalize(s).replace(/\s+/g, '');
    let m;
    const sign = f => (m[1] === '-' ? f.neg() : f);
    if ((m = s.match(/^([+-]?)(\d+)又(\d+)\/(\d+)$/))) {
      if (m[4] === '0' || /^0+$/.test(m[4])) return null;
      return sign(new Frac(BigInt(m[2]) * BigInt(m[4]) + BigInt(m[3]), BigInt(m[4])));
    }
    if ((m = s.match(/^([+-]?)(\d+)\/(\d+)$/))) {
      if (/^0+$/.test(m[3])) return null;
      return sign(new Frac(BigInt(m[2]), BigInt(m[3])));
    }
    if ((m = s.match(/^([+-]?)(\d+)(?:\.(\d+))?$/))) {
      const dec = m[3] || '';
      return sign(new Frac(BigInt(m[2] + dec), 10n ** BigInt(dec.length)));
    }
    return null;
  }

  // 多个数，用逗号、分号或“或”分隔
  function parseNumberList(s) {
    const parts = normalize(s).split(/[,;，；或]/).map(p => p.trim()).filter(Boolean);
    if (!parts.length) return null;
    const nums = parts.map(parseNumber);
    return nums.includes(null) ? null : nums;
  }

  // ---------- 代数式 ----------
  // 支持：数、单字母变量、+ - * / ^（整数指数）、括号、省略乘号（2a、3(a+b)、ab）
  function tokenize(s) {
    const tokens = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (c === ' ') { i++; continue; }
      if (/[0-9.]/.test(c)) {
        let j = i;
        while (j < s.length && /[0-9.]/.test(s[j])) j++;
        const text = s.slice(i, j);
        const f = parseNumber(text);
        if (!f) throw new Error(`“${text}”不是有效的数`);
        tokens.push({ t: 'num', v: f });
        i = j;
      } else if (/[a-zA-Z]/.test(c)) {
        tokens.push({ t: 'var', v: c });
        i++;
      } else if ('+-*/^()'.includes(c)) {
        tokens.push({ t: c });
        i++;
      } else {
        throw new Error(`不认识的符号“${c}”`);
      }
    }
    return tokens;
  }

  function parseExpr(input) {
    const tokens = tokenize(normalize(input));
    let pos = 0;
    const peek = () => tokens[pos];
    const take = t => {
      const tok = tokens[pos];
      if (!tok || (t && tok.t !== t)) throw new Error(t ? `缺少“${t}”` : '式子不完整');
      pos++;
      return tok;
    };

    function expr() {
      let node = term();
      while (peek() && (peek().t === '+' || peek().t === '-')) {
        const op = take().t;
        node = { t: op === '+' ? 'add' : 'sub', a: node, b: term() };
      }
      return node;
    }
    function term() {
      let node = unary();
      for (;;) {
        const tok = peek();
        if (tok && (tok.t === '*' || tok.t === '/')) {
          take();
          node = { t: tok.t === '*' ? 'mul' : 'div', a: node, b: unary() };
        } else if (tok && (tok.t === 'var' || tok.t === '(')) {
          node = { t: 'mul', a: node, b: power() };  // 省略乘号
        } else {
          return node;
        }
      }
    }
    function unary() {
      const tok = peek();
      if (tok && (tok.t === '+' || tok.t === '-')) {
        take();
        const a = unary();
        return tok.t === '-' ? { t: 'neg', a } : a;
      }
      return power();
    }
    function power() {
      const base = atom();
      if (peek() && peek().t === '^') {
        take();
        let negative = false;
        if (peek() && peek().t === '-') { take(); negative = true; }
        const e = take('num').v;
        if (e.d !== 1n) throw new Error('指数必须是整数');
        return { t: 'pow', a: base, k: Number(e.n) * (negative ? -1 : 1) };
      }
      return base;
    }
    function atom() {
      const tok = take();
      if (tok.t === 'num') return { t: 'num', v: tok.v };
      if (tok.t === 'var') return { t: 'var', v: tok.v };
      if (tok.t === '(') {
        const node = expr();
        take(')');
        return { t: 'paren', a: node };
      }
      throw new Error('式子不完整');
    }

    if (!tokens.length) throw new Error('式子是空的');
    const node = expr();
    if (pos < tokens.length) throw new Error(`多余的“${tokens[pos].t === 'num' ? tokens[pos].v : tokens[pos].t}”`);
    return node;
  }

  function evaluate(node, env) {
    switch (node.t) {
      case 'num': return node.v;
      case 'var':
        if (!(node.v in env)) throw new Error('未知字母 ' + node.v);
        return env[node.v];
      case 'paren': return evaluate(node.a, env);
      case 'neg': return evaluate(node.a, env).neg();
      case 'add': return evaluate(node.a, env).add(evaluate(node.b, env));
      case 'sub': return evaluate(node.a, env).sub(evaluate(node.b, env));
      case 'mul': return evaluate(node.a, env).mul(evaluate(node.b, env));
      case 'div': return evaluate(node.a, env).div(evaluate(node.b, env));
      case 'pow': return evaluate(node.a, env).pow(node.k);
    }
    throw new Error('未知节点 ' + node.t);
  }

  function variables(node, set = new Set()) {
    if (node.t === 'var') set.add(node.v);
    if (node.a) variables(node.a, set);
    if (node.b) variables(node.b, set);
    return set;
  }

  // 固定种子的随机数，保证判分结果可复现
  function rng(seed) {
    return () => {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      return seed / 2147483648;
    };
  }

  // 在多组随机有理数取值下比较，全部相等就认为两个式子等价
  function equivalent(a, b) {
    const names = [...new Set([...variables(a), ...variables(b)])];
    const rand = rng(20260919);
    let checked = 0;
    for (let attempt = 0; attempt < 60 && checked < 8; attempt++) {
      const env = {};
      for (const v of names) {
        const n = Math.floor(rand() * 19) - 9;
        const d = Math.floor(rand() * 4) + 1;
        env[v] = new Frac(BigInt(n || 7), BigInt(d));
      }
      let x, y;
      try {
        x = evaluate(a, env);
        y = evaluate(b, env);
      } catch (e) {
        continue;  // 除以 0 之类，换一组取值
      }
      if (!x.eq(y)) return false;
      checked++;
    }
    return checked > 0;
  }

  // “已化简”：没有括号，同类项已经合并（每一项的字母部分互不相同），也没有 0 系数的项
  function isSimplified(node) {
    const terms = [];
    (function flatten(n) {
      if (n.t === 'add' || n.t === 'sub') {
        flatten(n.a);
        flatten(n.b);
      } else {
        terms.push(n);
      }
    })(node);

    const keys = new Set();
    for (const term of terms) {
      const powers = {};
      let coef = new Frac(1n);
      let ok = true;
      (function walk(n, exp) {
        switch (n.t) {
          case 'num': coef = exp > 0 ? coef.mul(n.v) : coef.div(n.v); break;
          case 'var': powers[n.v] = (powers[n.v] || 0) + exp; break;
          case 'neg': coef = coef.neg(); walk(n.a, exp); break;
          case 'mul': walk(n.a, exp); walk(n.b, exp); break;
          case 'div': walk(n.a, exp); walk(n.b, -exp); break;
          case 'pow':
            if (n.a.t === 'var') powers[n.a.v] = (powers[n.a.v] || 0) + n.k * exp;
            else if (n.a.t === 'num') coef = coef.mul(n.a.v.pow(n.k * exp));
            else ok = false;
            break;
          default: ok = false;  // 括号、项里再嵌套加减
        }
      })(term, 1);
      if (!ok || (coef.isZero() && terms.length > 1)) return false;
      const key = Object.keys(powers).filter(v => powers[v] !== 0).sort().map(v => v + powers[v]).join('');
      if (keys.has(key)) return false;
      keys.add(key);
    }
    return true;
  }

  // ---------- 实数（带根号、圆周率） ----------
  // 第 19 章起，答案常常是 2√3、3+√2、∛(-8) 这样的无理数，用不了精确分数。
  // 这里把输入解析成语法树，再分别用于数值比较（判分）和 TeX 显示（对答案）。
  // 根号只管住紧跟着的一个数、括号、π 或另一个根号：√2×3 里的 3 不在根号下。
  function parseReal(s) {
    const src = normalize(s)
      .replace(/\s+/g, '')
      .replace(/cbrt/gi, '∛')
      .replace(/sqrt/gi, '√')
      .replace(/pi/gi, 'π')
      .replace(/根号/g, '√');
    let i = 0;
    const peek = () => src[i];
    const eat = c => (src[i] === c ? (i++, true) : false);

    function number() {
      const m = /^\d+(?:\.\d+)?/.exec(src.slice(i));
      if (!m) return null;
      i += m[0].length;
      return Number(m[0]);
    }
    function expr() {
      let node = term();
      while (peek() === '+' || peek() === '-') {
        const op = src[i++];
        node = { t: op === '+' ? 'add' : 'sub', a: node, b: term() };
      }
      return node;
    }
    function term() {
      let node = unary();
      for (;;) {
        if (eat('*')) node = { t: 'mul', a: node, b: unary() };
        else if (eat('/')) node = { t: 'div', a: node, b: unary() };
        else if (peek() && '√∛π('.includes(peek())) node = { t: 'mul', a: node, b: unary() };  // 省略乘号：2√3
        else return node;
      }
    }
    function unary() {
      if (eat('+')) return unary();
      if (eat('-')) return { t: 'neg', a: unary() };
      return power();
    }
    function power() {
      const base = atom();
      if (eat('^')) {
        const neg = eat('-');
        const k = number();
        if (k == null || !Number.isInteger(k)) throw new Error('指数要填整数');
        return { t: 'pow', a: base, k: neg ? -k : k };
      }
      return base;
    }
    function atom() {
      if (eat('√')) return { t: 'sqrt', a: radicand() };
      if (eat('∛')) return { t: 'cbrt', a: radicand() };
      if (eat('π')) return { t: 'pi' };
      if (eat('(')) {
        const node = expr();
        if (!eat(')')) throw new Error('括号没有配对');
        return { t: 'paren', a: node };
      }
      const v = number();
      if (v == null) throw new Error(i < src.length ? `看不懂“${src.slice(i)}”` : '式子不完整');
      return { t: 'num', v };
    }
    function radicand() {
      if (eat('-')) return { t: 'neg', a: radicand() };
      return atom();
    }

    if (!src) throw new Error('式子是空的');
    const node = expr();
    if (i < src.length) throw new Error(`多余的“${src.slice(i)}”`);
    return node;
  }

  function evalReal(node) {
    switch (node.t) {
      case 'num': return node.v;
      case 'pi': return Math.PI;
      case 'paren': return evalReal(node.a);
      case 'neg': return -evalReal(node.a);
      case 'add': return evalReal(node.a) + evalReal(node.b);
      case 'sub': return evalReal(node.a) - evalReal(node.b);
      case 'mul': return evalReal(node.a) * evalReal(node.b);
      case 'div': {
        const d = evalReal(node.b);
        if (d === 0) throw new Error('除数不能为 0');
        return evalReal(node.a) / d;
      }
      case 'pow': return Math.pow(evalReal(node.a), node.k);
      case 'sqrt': {
        const v = evalReal(node.a);
        if (v < 0) throw new Error('负数没有平方根');
        return Math.sqrt(v);
      }
      case 'cbrt': return Math.cbrt(evalReal(node.a));
    }
    throw new Error('未知节点 ' + node.t);
  }

  function realValue(s) {
    return evalReal(parseReal(s));
  }

  // 双精度算出来的根式会有 1e-16 量级的误差，容差取相对 1e-12：
  // √8 与 2√2 判相等，而填 1.414 这样的近似值仍然判错
  function realEqual(x, y) {
    return Math.abs(x - y) <= 1e-12 * Math.max(1, Math.abs(x), Math.abs(y));
  }

  // ---------- 最简二次根式（第 20 章） ----------
  // 数值对了还要看写法：根号里是不含平方因数的正整数，分母里没有根号，
  // 根式之间已经相乘、同一个根号的项已经合并、整个分数已经约分
  function squareFree(n) {
    for (let k = 2; k * k <= n; k++) if (n % (k * k) === 0) return false;
    return true;
  }

  function isSimplestReal(node) {
    const strip = n => (n.t === 'paren' ? strip(n.a) : n);
    const isSum = n => ['add', 'sub'].includes(strip(n).t);
    // 一项 = 有理系数 × 至多一个根号（或 π）；写法不合要求返回 null
    function term(n) {
      switch (n.t) {
        case 'num': return { coef: Frac.of(n.v), key: '' };
        case 'paren': return isSum(n.a) ? null : term(n.a);
        case 'neg': { const t = term(n.a); return t && { coef: t.coef.neg(), key: t.key }; }
        case 'pi': return { coef: Frac.of(1), key: 'π' };
        case 'sqrt': {
          const r = strip(n.a);
          if (r.t !== 'num' || !Number.isInteger(r.v) || r.v < 2 || !squareFree(r.v)) return null;
          return { coef: Frac.of(1), key: '√' + r.v };
        }
        case 'cbrt': {
          const r = strip(n.a);
          return r.t === 'num' && Number.isInteger(r.v) ? { coef: Frac.of(1), key: '∛' + r.v } : null;
        }
        case 'pow': return n.a.t === 'num' ? { coef: Frac.of(n.a.v).pow(n.k), key: '' } : null;
        case 'mul': {
          const a = term(n.a), b = term(n.b);
          if (!a || !b || (a.key && b.key)) return null;
          return { coef: a.coef.mul(b.coef), key: a.key || b.key };
        }
        case 'div': {
          const a = term(n.a), b = term(n.b);
          if (!a || !b || b.key || b.coef.isZero()) return null;
          return { coef: a.coef.div(b.coef), key: a.key };
        }
      }
      return null;
    }
    // 把加减拆成一项一项；(2+√3)/2 这样整体除以整数的，分子要和分母约分到底
    function terms(n, out) {
      n = strip(n);
      if (n.t === 'neg') return terms(n.a, out);
      if (n.t === 'add' || n.t === 'sub') return terms(n.a, out) && terms(n.b, out);  // 只看写法，项的正负不影响
      if (n.t === 'div' && isSum(n.a.t === 'neg' ? n.a.a : n.a)) {
        const d = term(n.b);
        if (!d || d.key || d.coef.d !== 1n || d.coef.isZero()) return false;
        const inner = [];
        if (!terms(n.a, inner) || !inner.every(t => t.coef.d === 1n)) return false;
        if (inner.reduce((g, t) => gcd(g, t.coef.n), d.coef.n) !== 1n) return false;
        out.push(...inner.map(t => ({ coef: t.coef.div(d.coef), key: t.key })));
        return true;
      }
      const t = term(n);
      if (!t) return false;
      out.push(t);
      return true;
    }
    const list = [];
    if (!terms(node, list)) return false;
    if (list.length > 1 && list.some(t => t.coef.isZero())) return false;
    return new Set(list.map(t => t.key)).size === list.length;
  }

  const SIMPLEST_HINT = '结果正确，但还要化成最简形式：根号里不留能开得尽的因数，分母里不留根号，同一个根号的项要合并';

  function texReal(node) {
    const wrap = n => (['add', 'sub', 'neg'].includes(n.t) ? `(${texReal(n)})` : texReal(n));
    const bare = n => texReal(n.t === 'paren' ? n.a : n);  // 根号里、分数线上下不用再套括号
    switch (node.t) {
      case 'num': return String(node.v);
      case 'pi': return '\\pi';
      case 'paren': return `(${texReal(node.a)})`;
      case 'neg': return `-${wrap(node.a)}`;
      case 'add': return `${texReal(node.a)}+${texReal(node.b)}`;
      case 'sub': return `${texReal(node.a)}-${wrap(node.b)}`;
      case 'mul': {
        const b = texReal(node.b);
        return texReal(node.a) + (/^[\\(]/.test(b) ? '' : '\\times ') + b;  // 2√3 不写乘号，2×3 写
      }
      case 'div': return `\\frac{${bare(node.a)}}{${bare(node.b)}}`;
      case 'pow': return `${['num', 'pi', 'paren'].includes(node.a.t) ? texReal(node.a) : `(${texReal(node.a)})`}^{${node.k}}`;
      case 'sqrt': return `\\sqrt{${bare(node.a)}}`;
      case 'cbrt': return `\\sqrt[3]{${bare(node.a)}}`;
    }
    return '';
  }

  // ---------- 角度 ----------
  // 36°15′30″、36°15′、36°、36.25°、36.25；返回以“秒”为单位的分数
  function parseAngle(s) {
    s = normalize(s).replace(/\s+/g, '').replace(/度/g, '°').replace(/分/g, "'").replace(/秒/g, '"');
    const m = s.match(/^(\d+(?:\.\d+)?)°?(?:(\d+)')?(?:(\d+)")?$/);
    if (!m || (!s.includes('°') && (m[2] || m[3]))) return null;
    const min = Number(m[2] || 0);
    const sec = Number(m[3] || 0);
    if (min >= 60 || sec >= 60) return null;
    return parseNumber(m[1]).mul(3600).add(min * 60 + sec);
  }

  // ---------- 因式分解 ----------
  // 把式子拆成“因式”的列表：乘积、乘方、负号、数字系数都展开；遇到加减（整个是一个和）就作为一个因式。
  // 不含字母的部分算常数，不进列表。式子里有除以字母的地方，返回 null（不是整式的积）。
  function factorList(node, out = []) {
    switch (node.t) {
      case 'paren': return factorList(node.a, out);
      case 'neg': return factorList(node.a, out);
      case 'mul': return factorList(node.a, out) && factorList(node.b, out);
      case 'num': return out;
      case 'var': out.push(node); return out;
      case 'pow': {
        if (node.k < 0) return null;
        const inner = factorList(node.a, []);
        if (!inner) return null;
        for (let i = 0; i < node.k; i++) out.push(...inner);
        return out;
      }
      case 'div': return variables(node.b).size ? null : factorList(node.a, out);
      default:  // add、sub：一个和，本身是一个因式；不含字母的和是常数
        if (variables(node).size) out.push(node);
        return out;
    }
  }

  // 两个因式只差一个正负号（f = ±g）
  function sameUpToSign(f, g) {
    const names = [...new Set([...variables(f), ...variables(g)])];
    const rand = rng(20261005);
    let sign = 0;
    let checked = 0;
    for (let attempt = 0; attempt < 60 && checked < 8; attempt++) {
      const env = {};
      for (const v of names) env[v] = new Frac(BigInt(Math.floor(rand() * 19) - 9 || 7), BigInt(Math.floor(rand() * 4) + 1));
      let x;
      let y;
      try { x = evaluate(f, env); y = evaluate(g, env); } catch (e) { continue; }
      if (x.isZero() && y.isZero()) continue;
      const s = x.eq(y) ? 1 : x.eq(y.neg()) ? -1 : 0;
      if (!s || (sign && s !== sign)) return false;
      sign = s;
      checked++;
    }
    return checked > 0;
  }

  // 因式分解的答案：与标准答案相等，写成积的形式，而且非常数因式和标准答案一一对应（只允许差正负号）
  function checkFactor(node, answer) {
    if (!equivalent(node, answer)) return { ok: false };
    let top = node;
    while (top.t === 'paren' || top.t === 'neg') top = top.a;
    if (top.t === 'add' || top.t === 'sub') return { ok: false, error: '结果正确，但还没有写成几个整式的积' };
    const got = factorList(node);
    const want = factorList(answer);
    if (!got) return { ok: false, error: '请写成几个整式的积' };
    const left = [...got];
    for (const w of want) {
      const i = left.findIndex(g => sameUpToSign(g, w));
      if (i < 0) return { ok: false, error: '结果正确，但还没有分解彻底' };
      left.splice(i, 1);
    }
    if (left.length) return { ok: false, error: '结果正确，但还没有分解彻底' };
    return { ok: true };
  }

  // 最简分式：拆成“分子/分母”（不是除法时分母是 1）
  function splitFraction(node) {
    let n = node;
    while (n.t === 'paren' || n.t === 'neg') n = n.a;
    if (n.t !== 'div') return [node, { t: 'num', v: new Frac(1n) }];
    let top = n.a;
    while (top.t === 'neg') top = top.a;
    return [top, n.b];
  }

  // 与标准答案相等，并且分子、分母分别和标准答案只差正负号（所以已经约分到最简）
  function checkLowest(node, answer) {
    if (!equivalent(node, answer)) return { ok: false };
    const [n, d] = splitFraction(node);
    const [an, ad] = splitFraction(answer);
    if (sameUpToSign(n, an) && sameUpToSign(d, ad)) return { ok: true };
    return { ok: false, error: '结果正确，但还不是最简分式' };
  }

  // ---------- 不等式的解集 ----------
  // 解集写成 x>2、x≤-3/2、-3<x≤5、5≥x>-3、2<x（数在左边也行）、x=2，没有解写“无解”
  // 结果 { none } 或 { lo, loInc, hi, hiInc }，lo、hi 为 null 表示没有这一侧的界
  function parseSolutionSet(s, letter = 'x') {
    s = normalize(s).replace(/≥/g, '>=').replace(/≤/g, '<=').replace(/=>/g, '>=').replace(/=</g, '<=').replace(/\s+/g, '');
    if (/^(无解|空集)$/.test(s)) return { none: true };
    const parts = s.split(/(<=|>=|<|>|=)/);
    const value = t => {
      if (!t) throw new Error('不等号旁边缺了数');
      const v = parseNumber(t);
      if (v) return v;
      const node = parseExpr(t);
      if (variables(node).size) throw new Error(`“${t}”应该是一个数`);
      return evaluate(node, {});
    };
    const terms = parts.filter((_, i) => i % 2 === 0);
    const ops = parts.filter((_, i) => i % 2 === 1);
    if (ops.length < 1 || ops.length > 2) throw new Error('请写成 x>2、−1<x≤3 这样的形式');
    const at = terms.findIndex(t => t === letter);
    if (at < 0) {
      const other = terms.find(t => /^[a-zA-Z]$/.test(t));
      throw new Error(other ? `未知数是 ${letter}，不是 ${other}` : `解集里要写出未知数 ${letter}`);
    }
    if (terms.filter(t => t === letter).length > 1) throw new Error('请写成 x>2、−1<x≤3 这样的形式');
    const set = { lo: null, loInc: false, hi: null, hiInc: false };
    // 把“数 op x”或“x op 数”记到上下界里
    const bound = (op, v, letterOnLeft) => {
      if (op === '=') { set.lo = set.hi = v; set.loInc = set.hiInc = true; return; }
      const greater = op[0] === '>' ? letterOnLeft : !letterOnLeft;  // x 大于这个数
      const inc = op.length === 2;
      if (greater) {
        if (set.lo) throw new Error('请写成 x>2、−1<x≤3 这样的形式');
        set.lo = v; set.loInc = inc;
      } else {
        if (set.hi) throw new Error('请写成 x>2、−1<x≤3 这样的形式');
        set.hi = v; set.hiInc = inc;
      }
    };
    if (ops.length === 1) {
      bound(ops[0], value(terms[at === 0 ? 1 : 0]), at === 0);
    } else {
      if (at !== 1 || ops.includes('=')) throw new Error('连写时把 x 写在中间，比如 −1<x≤3');
      if ((ops[0][0] === '<') !== (ops[1][0] === '<')) throw new Error('连写的两个不等号方向要一致');
      bound(ops[0], value(terms[0]), false);
      bound(ops[1], value(terms[2]), true);
      const c = set.lo.cmp(set.hi);
      if (c > 0 || (c === 0 && !(set.loInc && set.hiInc))) throw new Error('这样连写不成立，没有解要填“无解”');
    }
    return set;
  }

  function sameSolutionSet(a, b) {
    if (a.none || b.none) return !!a.none && !!b.none;
    const side = (x, xi, y, yi) => (x === null ? y === null : y !== null && x.eq(y) && xi === yi);
    return side(a.lo, a.loInc, b.lo, b.loInc) && side(a.hi, a.hiInc, b.hi, b.hiInc);
  }

  function solutionSetTeX(set, letter = 'x') {
    if (set.none) return '无解';
    const op = inc => (inc ? '\\leq ' : '<');
    if (set.lo && set.hi && set.lo.eq(set.hi)) return `$${letter}=${set.lo.toTeX()}$`;
    if (set.lo && set.hi) return `$${set.lo.toTeX()}${op(set.loInc)}${letter}${op(set.hiInc)}${set.hi.toTeX()}$`;
    if (set.lo) return `$${letter}${set.loInc ? '\\geq ' : '>'}${set.lo.toTeX()}$`;
    return `$${letter}${op(set.hiInc)}${set.hi.toTeX()}$`;
  }

  // ---------- 英语 ----------
  // 英语拼写与整句：不分大小写、空格合一、弯撇号转直撇号、忽略结尾句末标点；连字符和空格不互换
  function normalizeEn(s) {
    return normalize(s).toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/\s+([,.!?;:])/g, '$1')
      .replace(/[.!?]+$/, '')
      .trim();
  }

  // 第一处不同的位置（按规范化后的文字），相同返回 -1；拼写反馈用来标出错在哪一位
  function firstDiff(input, answer) {
    const a = normalizeEn(input);
    const b = normalizeEn(answer);
    if (a === b) return -1;
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    return i;
  }

  // ---------- 判分 ----------
  // 返回 { ok, error? }：error 表示输入看不懂，提示学生改写，不算答错
  function checkBlank(blank, input) {
    const s = normalize(input == null ? '' : input);
    if (!s) return { ok: false, error: '还没有填写' };
    switch (blank.kind) {
      case 'num': {
        const v = parseNumber(s);
        if (!v) return { ok: false, error: '请填一个数，比如 −3、2/5、0.75' };
        return { ok: v.eq(Frac.of(blank.answer)) };
      }
      case 'nums': {
        const vs = parseNumberList(s);
        if (!vs) return { ok: false, error: '请填数，多个数之间用逗号隔开' };
        const want = blank.answer.map(x => Frac.of(x));
        const got = vs.filter((v, i) => vs.findIndex(w => w.eq(v)) === i);
        return { ok: got.length === want.length && want.every(w => got.some(g => g.eq(w))) };
      }
      case 'expr': {
        let node;
        try { node = parseExpr(s); } catch (e) { return { ok: false, error: '式子看不懂：' + e.message }; }
        if (!equivalent(node, parseExpr(blank.answer))) return { ok: false };
        if (blank.simplified && !isSimplified(node)) return { ok: false, error: '结果正确，但还可以再化简' };
        return { ok: true };
      }
      case 'frac': {
        let node;
        try { node = parseExpr(s); } catch (e) { return { ok: false, error: '式子看不懂：' + e.message }; }
        return checkLowest(node, parseExpr(blank.answer));
      }
      case 'factor': {
        let node;
        try { node = parseExpr(s); } catch (e) { return { ok: false, error: '式子看不懂：' + e.message }; }
        return checkFactor(node, parseExpr(blank.answer));
      }
      case 'real': {
        let v;
        try { v = realValue(s); } catch (e) { return { ok: false, error: e.message + '。可以填 2√3、−√5、3+√2 这样的式子' }; }
        if (!realEqual(v, realValue(blank.answer))) return { ok: false };
        if (blank.simplest && !isSimplestReal(parseReal(s))) return { ok: false, error: SIMPLEST_HINT };
        return { ok: true };
      }
      case 'reals': {
        const parts = s.split(',').map(t => t.trim()).filter(Boolean);
        if (!parts.length) return { ok: false, error: '请填数，多个答案之间用逗号隔开' };
        let vs;
        try { vs = parts.map(realValue); } catch (e) { return { ok: false, error: e.message + '。可以填 2√3、−√5 这样的式子' }; }
        const want = blank.answer.map(realValue);
        const got = vs.filter((v, i) => vs.findIndex(w => realEqual(w, v)) === i);
        if (!(got.length === want.length && want.every(w => got.some(g => realEqual(g, w))))) return { ok: false };
        if (blank.simplest && !parts.every(p => isSimplestReal(parseReal(p)))) return { ok: false, error: SIMPLEST_HINT };
        return { ok: true };
      }
      case 'angle': {
        const v = parseAngle(s);
        if (!v) return { ok: false, error: '请按 36°15′ 这样的格式填写，分、秒要小于 60' };
        return { ok: v.eq(parseAngle(blank.answer)) };
      }
      case 'ratio': {
        // 比：a:b 或 a:b:c，要求和标准答案（最简整数比）逐项相同；成比例但没化简时提示
        const parts = s.split(':').map(t => parseNumber(t.trim()));
        const want = String(blank.answer).split(':').map(t => Frac.of(t.trim()));
        if (parts.length < 2 || parts.includes(null)) return { ok: false, error: '请按 3:4 这样的格式填写，用冒号隔开' };
        if (parts.length !== want.length) return { ok: false };
        if (parts.every((p, i) => p.eq(want[i]))) return { ok: true };
        const k = want[0].isZero() ? null : parts[0].div(want[0]);
        if (k && !k.isZero() && parts.every((p, i) => p.eq(want[i].mul(k)))) return { ok: false, error: '比是对的，但要化成最简整数比' };
        return { ok: false };
      }
      case 'text': {
        const answers = Array.isArray(blank.answer) ? blank.answer : [blank.answer];
        return { ok: answers.some(a => normalize(a) === s) };
      }
      case 'en': {
        const answers = Array.isArray(blank.answer) ? blank.answer : [blank.answer];
        return { ok: answers.some(a => normalizeEn(a) === normalizeEn(s)) };
      }
      case 'ineq': {
        let got;
        try { got = parseSolutionSet(s, blank.var || 'x'); } catch (e) { return { ok: false, error: e.message + '；没有解就填“无解”' }; }
        return { ok: sameSolutionSet(got, parseSolutionSet(blank.answer, blank.var || 'x')) };
      }
    }
    throw new Error('未知填空类型 ' + blank.kind);
  }

  // response：choice 为选项下标；multi 为下标数组；fill 为每个空的输入字符串数组
  // 返回 { ok, blanks?: [{ok, error}] }
  function checkQuestion(q, response) {
    if (q.type === 'choice') return { ok: response === q.answer };
    if (q.type === 'multi') {
      const got = [...new Set(response || [])].sort();
      const want = [...q.answer].sort();
      return { ok: got.length === want.length && got.every((v, i) => v === want[i]) };
    }
    if (q.type === 'fill') {
      const blanks = q.blanks.map((b, i) => checkBlank(b, (response || [])[i]));
      return { ok: blanks.every(b => b.ok), blanks };
    }
    throw new Error('未知题型 ' + q.type);
  }

  // 标准答案的展示文本，数学部分用 $...$ 包起来，交给 KaTeX 渲染
  function answerText(blank) {
    switch (blank.kind) {
      case 'num': return `$${Frac.of(blank.answer).toTeX()}$`;
      case 'nums': return blank.answer.map(x => `$${Frac.of(x).toTeX()}$`).join('，');
      case 'expr': return `$${normalize(blank.answer).replace(/\*/g, '\\cdot ')}$`;
      case 'factor': return `$${normalize(blank.answer).replace(/\*/g, '\\cdot ')}$`;
      case 'frac': return `$${normalize(blank.answer).replace(/\*/g, '\\cdot ')}$`;
      case 'real': return `$${blank.tex || texReal(parseReal(blank.answer))}$`;
      case 'reals': return blank.answer.map(a => `$${texReal(parseReal(a))}$`).join('，');
      case 'angle': return normalize(blank.answer).replace(/'/g, '′').replace(/"/g, '″');
      case 'ratio': return `$${normalize(blank.answer)}$`;
      case 'text': return Array.isArray(blank.answer) ? blank.answer[0] : blank.answer;
      case 'en': return Array.isArray(blank.answer) ? blank.answer[0] : blank.answer;
      case 'ineq': return solutionSetTeX(parseSolutionSet(blank.answer, blank.var || 'x'), blank.var || 'x');
    }
    return String(blank.answer);
  }

  const Answer = {
    Frac, normalize, parseNumber, parseNumberList, parseExpr, evaluate, equivalent,
    isSimplified, parseAngle, parseReal, evalReal, realValue, realEqual, texReal, isSimplestReal,
    checkBlank, checkQuestion, answerText, parseSolutionSet, sameSolutionSet, normalizeEn, firstDiff,
  };
  if (typeof module !== 'undefined') module.exports = Answer;
  else root.Answer = Answer;
})(this);
