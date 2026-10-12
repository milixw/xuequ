'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { test, assert } = require('./harness');

test('现代文14类题型练习匹配真实上海原题及问法，支持按篇名搜索', () => {
  const html = fs.readFileSync(path.join(__dirname, '../content/chinese/上海中考现代文阅读应考手册.html'), 'utf8');
  const nodes = new Map();
  const getNode = id => {
    if (!nodes.has(id)) nodes.set(id, { innerHTML:'', addEventListener() {} });
    return nodes.get(id);
  };
  const context = { document:{getElementById:getNode,querySelectorAll:()=>[]},clearTimeout(){},setTimeout(){return 1;} };
  vm.createContext(context);
  vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1] + ';globalThis.types=TYPE;globalThis.practice=TYPE_PRACTICE;globalThis.rhetoricExams=RHETORIC_EXAMS;', context);
  assert(context.types.length === 14 && context.practice.length === 14);
  assert(context.types.slice(8).every(t => t.review.status === 'pending'));
  const catalog = require('../content/past-papers/shanghai.js');
  assert(context.rhetoricExams.length===6);
  assert(context.rhetoricExams.reduce((n,r)=>n+r.examples.length,0)===8);
  for (const row of context.rhetoricExams) {
    assert(row.review.status==='pending');
    for (const [year,id,label,probe] of row.examples) {
      const paper=catalog.papers.find(p=>p.subject==='chinese' && p.year===year);
      assert(paper.questions.some(q=>q.id===id && q.stem.includes(probe)),label+'必须对应真实原题');
      assert(getNode('termBox').innerHTML.includes('../../index.html#/shanghai-papers/chinese/'+year+'/'+id));
    }
  }
  vm.runInContext("renderTerm('放飞');",context);
  assert(getNode('termBox').innerHTML.includes('rhetoric-exam-table'));
  for (const rows of context.practice) {
    assert(rows.length > 0);
    for (const [year,id,label,probe] of rows) {
      const paper = catalog.papers.find(p => p.subject==='chinese' && p.year===year);
      const q = paper.questions.find(q => q.id===id);
      assert(q && q.stem.includes(probe), label + '必须对应真实原题问法');
      assert(getNode('typeBox').innerHTML.includes('../../index.html#/shanghai-papers/chinese/'+year+'/'+id));
    }
  }
  vm.runInContext("renderType('无人机');", context);
  assert(getNode('typeBox').innerHTML.includes('sh-chinese-2017-q05'));
});
test('阅读手册历年专项可离线渲染、搜索，原题链接有效且原创讲解待审核', () => {
  const catalog = require('../content/past-papers/shanghai.js');
  const years = new Set(catalog.papers.filter(p => p.subject === 'chinese').map(p => p.year));
  for (const kind of ['古诗文', '现代文']) {
    const html = fs.readFileSync(path.join(__dirname, '../content/chinese/上海中考' + kind + '阅读应考手册.html'), 'utf8');
    const nodes = new Map();
    const getNode = id => {
      if (!nodes.has(id)) nodes.set(id, { innerHTML: '', addEventListener(event, cb) { this[event] = cb; } });
      return nodes.get(id);
    };
    const context = { document: { getElementById: getNode, querySelectorAll: () => [] }, clearTimeout() {}, setTimeout(cb) { cb(); return 1; } };
    vm.createContext(context);
    const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
    vm.runInContext(script + ';globalThis.entries=EXTRA;globalThis.years=YEAR;', context);
    assert(context.entries.length >= 11);
    assert(context.entries.every(r => r.review.status === 'pending' && r.method && r.wrong && r.better && r.practice));
    const tracked = kind === '现代文'
      ? [2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026]
      : [2013,2014,2015,2016,2017,2018,2019,2020,2023,2024,2025,2026];
    for (const year of tracked) {
      assert(context.years.some(r => r[0] === year), kind + '漏了已分析年份' + year);
    }
    if (kind !== '现代文') {
      assert(!context.years.some(r => r[0] === 2021 || r[0] === 2022), '古诗文手册未补 2021、2022，不应造年份记录');
    } else {
      const y2021 = context.years.filter(r => r[0] === 2021);
      const y2022 = context.years.filter(r => r[0] === 2022);
      assert(y2021.length === 2 && y2022.length === 2, '2021、2022 应各有实用类与文学类两条');
      assert(y2021.concat(y2022).every(r => String(r[7]).includes('网络抓取整理版')), '2021、2022 条目须标明非官方来源');
    }
    const all = getNode('extraBox').innerHTML;
    for (const match of all.matchAll(/href="\.\.\/\.\.\/index.html#\/shanghai-papers\/chinese\/(\d+)"/g)) {
      assert(years.has(Number(match[1])), '专项链接到不存在的试卷');
    }
    assert(all.includes('原创示范') && all.includes('待审核'));
    getNode('q').input({ target: { value: kind === '古诗文' ? '炼字' : '图表' } });
    assert(getNode('extraBox').innerHTML.includes(kind === '古诗文' ? '炼字' : '图表'));
    assert(getNode('extraBox').innerHTML !== all, '专项必须随搜索筛选');
    getNode('q').input({ target: { value: '不存在的专项xyz' } });
    assert(getNode('extraBox').innerHTML.includes('没有匹配'));
    assert(!html.includes('fetch(') && html.includes('data-p="p6"') && html.includes('id="p6"'));
    assert(!html.includes('4 分题＝2 点') && !html.includes('固定立意方向'));
  }
});
test('61篇古诗文逐段译文完整，译文独立默认折叠并安全转义', () => {
  const root = path.join(__dirname, '..');
  const html = fs.readFileSync(path.join(root, 'content/chinese/上海中考古诗文·虚实词联动注释版.html'), 'utf8');
  const translations = require('../content/chinese/classical-translations.js');
  const context = {};
  vm.runInNewContext(html.slice(html.indexOf('const D = ['), html.indexOf('const XU ='))+';globalThis.poems=D;', context);
  assert(context.poems.length===61 && Object.keys(translations).length===61);
  for(const poem of context.poems) {
    const entry = translations[poem[1]];
    assert(entry.review.status==='pending');
    assert(entry.paragraphs.length===poem[5].split('|').length, poem[1]+'漏译原文段落');
    assert(entry.paragraphs.every(p=>typeof p==='string' && p.trim().length>=8));
  }
  const renderingContext={ChinesePoemTranslations:translations,esc:s=>s.replace(/</g,'&lt;')};
  vm.createContext(renderingContext);
  vm.runInContext(html.slice(html.indexOf('function translationHTML('), html.indexOf('function renderText(')), renderingContext);
  const result=renderingContext.translationHTML('出师表');
  assert(result.startsWith('<details class="po-translation">') && !/<details[^>]*\bopen\b/.test(result));
  assert(result.includes('待语文教师审核') && result.includes('不知道再说什么'));
  renderingContext.ChinesePoemTranslations={'测试':{paragraphs:['<img src=x>']}};
  assert(renderingContext.translationHTML('测试').includes('&lt;img') && !renderingContext.translationHTML('测试').includes('<img'));
  assert(html.includes('src="classical-translations.js"'));
});
test('语文实词资料完整保留内容并隐藏 PDF 入口及页码信息', () => {
  const root = path.join(__dirname, '..');
  const html = fs.readFileSync(path.join(root, 'content/chinese/classical-words.html'), 'utf8');
  const entries = Array.from(html.matchAll(/<article class="sheet" id="word-(\d+)"><pre>([\s\S]*?)<\/pre><\/article>/g));
  assert(entries.length === 180, '必须展示 180 张词条卡片');
  entries.forEach((entry, i) => {
    assert(Number(entry[1]) === i + 1, '卡片编号必须连续');
    assert(entry[2].startsWith(`${i + 1}．`), '原文编号必须与卡片编号一致');
  });
  assert(html.includes('180') && html.includes('虚词资料待补充'));
  assert(html.includes('得到') && !html.includes('\uFFFD'), '文字提取不应产生替代字符');
  assert(html.includes('document.createTextNode(part)') && html.includes('mark.textContent=term'));
  assert(!html.includes('fetch('));
  assert(!html.includes('href="classical-words.pdf"'));
  assert(!/第\s*\d+\s*(?:\/\s*\d+\s*)?页/.test(html));
  assert(!html.includes('来源：') && !html.includes('页相关内容'));
  const pdf = fs.readFileSync(path.join(root, 'content/chinese/classical-words.pdf'));
  assert(pdf.subarray(0, 5).toString() === '%PDF-');
  new vm.Script(html.match(/<script>([\s\S]*?)<\/script>/)[1]);
});
