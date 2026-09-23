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
      case 'real': {
        let v;
        try { v = realValue(s); } catch (e) { return { ok: false, error: e.message + '。可以填 2√3、−√5、3+√2 这样的式子' }; }
        return { ok: realEqual(v, realValue(blank.answer)) };
      }
      case 'angle': {
        const v = parseAngle(s);
        if (!v) return { ok: false, error: '请按 36°15′ 这样的格式填写，分、秒要小于 60' };
        return { ok: v.eq(parseAngle(blank.answer)) };
      }
      case 'text': {
        const answers = Array.isArray(blank.answer) ? blank.answer : [blank.answer];
        return { ok: answers.some(a => normalize(a) === s) };
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
      case 'real': return `$${blank.tex || texReal(parseReal(blank.answer))}$`;
      case 'angle': return normalize(blank.answer).replace(/'/g, '′').replace(/"/g, '″');
      case 'text': return Array.isArray(blank.answer) ? blank.answer[0] : blank.answer;
    }
    return String(blank.answer);
  }

  const Answer = {
    Frac, normalize, parseNumber, parseNumberList, parseExpr, evaluate, equivalent,
    isSimplified, parseAngle, parseReal, evalReal, realValue, realEqual, texReal,
    checkBlank, checkQuestion, answerText,
  };
  if (typeof module !== 'undefined') module.exports = Answer;
  else root.Answer = Answer;
})(this);
