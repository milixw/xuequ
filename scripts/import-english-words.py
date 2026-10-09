#!/usr/bin/env python3
"""从课本 PDF 的 “Words and expressions in each unit” 导出英语单元词表，生成 content/english/words/sh2022-<册ID>.js。

用法：
  python3 scripts/import-english-words.py g6s1 --units 1        # 只导入 Unit 1
  python3 scripts/import-english-words.py g6s1 --units 1 2 3
  python3 scripts/import-english-words.py g6s1 --units 1 --dry  # 只打印，不写文件

PDF 路径、页码换算、词表起止页取自 docs/textbooks/english-sh2022-<册ID>.md（目录表中编号 WE、WA 两行）。
按字体识别各字段：词头 MyriadPro（Semibold 为粗体 = 课标基本词汇，生成 basic），音标 Phonetic 字体，
词性斜体，中文释义 FZSS 字体，“p. 12” 为首次出现页码，“(...)” 为注释（如 pl. lives、= laboratory）。
新词条 core 默认取 basic（非粗体只认读，维护者 2026-10-08 确定）；复导时按词头保留已有的 ex、forms、core 和人工改过的 zh（manual: true），只更新课本字段，并检查来源 SHA-256。
依赖 pypdf。课本原件在 refs/，不入库。
"""
import argparse
import hashlib
import json
import re
import sys
from pathlib import Path

import pypdf

ROOT = Path(__file__).resolve().parent.parent
VOCAB_HTML = ROOT / 'content' / 'english' / 'shanghai-exam-vocabulary.html'
PHONETIC = str.maketrans({'I': 'ɪ', '9': 'ˈ', "'": 'ˈ', '0': 'ˌ', 'R': 'ə', 'B': 'ɒ', 'V': 'ʌ', 'O': 'ɔ',
                          'S': 'ʃ', 'Z': 'ʒ', 'P': 'θ', 'N': 'ŋ', 'G': 'ɡ', 'W': 'ʊ', 'F': 'ɜ', 'A': 'ɑ', 'C': 'æ', ':': 'ː'})
PAGE_REF = re.compile(r'^p\.\s*(\d+)$')
UNIT = re.compile(r'^Unit\s+(\d+)$')
TITLE = re.compile(r'^\| *U(\d+) *\| *Unit \d+ ([^|]+?) *\| *(\d+) *\|', re.M)


def textbook(vol):
    doc = ROOT / 'docs' / 'textbooks' / f'english-sh2022-{vol}.md'
    text = doc.read_text(encoding='utf-8')
    pdf = re.search(r'`(refs/[^`]+\.pdf)`', text)
    off = re.search(r'课本页码 = 文件页码 − (\d+)', text)
    we = re.search(r'^\| *WE *\|[^|]*\| *(\d+) *\|', text, re.M)
    wa = re.search(r'^\| *WA *\|[^|]*\| *(\d+) *\|', text, re.M)
    if not (pdf and off and we and wa):
        sys.exit(f'{doc} 缺 PDF 路径、页码换算或 WE/WA 两行')
    titles = {int(n): t.strip() for n, t, _ in TITLE.findall(text)}
    return ROOT / pdf.group(1), int(off.group(1)), int(we.group(1)), int(wa.group(1)) - 1, titles


def clean_zh(s):
    s = s.replace(' ', '').replace('\n', '')
    s = re.sub(r'\s*([；，、。！？（）…])\s*', r'\1', s)
    s = re.sub(r'(?<=[\u3000-\u9fff\uff00-\uffef])\s+(?=[\u3000-\u9fff\uff00-\uffef])', '', s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s


def segments(reader, first, last, off):
    for book in range(first, last + 1):
        out = []

        def visit(text, cm, tm, font, size):
            if text.strip():
                out.append(((font or {}).get('/BaseFont', ''), text))
        reader.pages[book + off - 1].extract_text(visitor_text=visit)
        yield from out


def parse(reader, first, last, off):
    units = {}
    unit = None
    cur = None

    def finish():
        nonlocal cur
        if cur and unit is not None:
            senses = [(p.strip(), clean_zh(z)) for p, z in cur['senses'] if clean_zh(z) or p.strip()]
            pos = ' & '.join(dict.fromkeys(p for p, _ in senses if p)) or ''
            if len(senses) > 1:
                zh = '；'.join(f'{p} {z}'.strip() for p, z in senses)
            else:
                zh = senses[0][1] if senses else ''
            note = re.sub(r'\s+', ' ', cur['note'].replace('\n', '')).strip()
            note = re.sub(r'informa tion', 'information', note)
            note = re.sub(r'\(\s+', '(', re.sub(r'\s+\)', ')', note)).replace(' .', '.')
            word = {
                'w': re.sub(r'\s+', ' ', cur['w'].replace('\n', '')).strip(),
                'ipa': ('/' + cur['ipa'].strip().strip('/').translate(PHONETIC) + '/') if cur['ipa'].strip() else '',
                'pos': pos, 'zh': zh, 'page': cur['page'], 'basic': cur['basic'],
            }
            if note:
                word['note'] = note
            units[unit].append(word)
        cur = None

    for font, text in segments(reader, first, last, off):
        t = text.strip()
        if 'MyriadPro-Bold' in font and UNIT.match(t):
            finish()
            unit = int(UNIT.match(t).group(1))
            units[unit] = []
            continue
        if unit is None:
            continue
        m = PAGE_REF.match(t.replace('\n', ''))
        if m and 'TimesNewRomanPSMT' in font:
            if cur:
                cur['page'] = int(m.group(1))
                finish()
            continue
        if cur is None:
            # 等待新词条：只有 MyriadPro 文字能开始一条，页码、脚注等都跳过
            if 'MyriadPro' in font:
                cur = {'w': text, 'basic': 'Semibold' in font or 'Bold' in font, 'ipa': '', 'senses': [['', '']],
                       'note': '', 'inNote': False, 'started': False}
            continue
        if cur['inNote']:
            # 换行处常把一个词断开（laborat|ory），换行结尾的片段直接相连，其余片段之间补空格
            cur['note'] += ('' if cur['note'].endswith(('\n', ' ')) else ' ') + text
            if ')' in text:
                cur['inNote'] = False
            continue
        if 'MyriadPro' in font and t.startswith('('):
            cur['note'] += (' ' if cur['note'] else '') + text
            cur['inNote'] = ')' not in t
            cur['started'] = True
            continue
        if 'MyriadPro' in font and not cur['started']:
            cur['w'] += text
            continue
        cur['started'] = True
        if 'Phonetic' in font:
            cur['ipa'] += text
        elif 'Italic' in font or (t == '&' and cur['senses'][-1][0] and not cur['senses'][-1][1]):
            if cur['senses'][-1][1].strip():
                cur['senses'].append(['', ''])
            cur['senses'][-1][0] += text.replace('\n', '')
        else:
            cur['senses'][-1][1] += text
    finish()
    for words in units.values():
        for w in words:
            w['pos'] = re.sub(r'\s+', ' ', w['pos']).replace(' .', '.').strip()
    return units


def exam_words():
    """上海中考词汇表里的词头（小写），用来生成 exam 标记；词表写法如 although / though、a lot of (lots of)。"""
    html = VOCAB_HTML.read_text(encoding='utf-8')
    start = html.index('>', html.index('<script id="data"')) + 1
    data = json.loads(html[start:html.index('</script>', start)])
    keys = set()
    for item in data['words'] + data['phrases']:
        for part in re.split(r'/|\(|\)', item['en']):
            k = key(part.replace('…', ' ').replace('...', ' '))
            if k:
                keys.add(k)
    return keys


def key(w):
    return re.sub(r'\s+', ' ', w.replace('’', "'")).strip(' .').lower()


def read_existing(path):
    if not path.exists():
        return None
    text = path.read_text(encoding='utf-8')
    body = text[text.index('Words.volume(') + len('Words.volume('):text.rindex(');')]
    return json.loads(body)


def write(path, data, vol):
    header = ("'use strict';\n\n"
              f"// 英语 {vol} 单元词表：词头、音标、词性、释义、页码、basic（课本粗体 = 课标基本词汇）由\n"
              "// scripts/import-english-words.py 从课本词汇表导出；ex 例句与 forms 为 AI 原创，待英语教师审核。\n"
              "// 复导只更新课本字段，保留 ex、forms、core 和 manual: true 的释义。整个括号内保持 JSON 格式，导入脚本按 JSON 读写。\n")
    path.write_text(header + 'Words.volume(' + json.dumps(data, ensure_ascii=False, indent=2) + ');\n', encoding='utf-8')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('vol')
    ap.add_argument('--units', type=int, nargs='+', required=True)
    ap.add_argument('--dry', action='store_true')
    args = ap.parse_args()
    pdf, off, first, last, titles = textbook(args.vol)
    sha = hashlib.sha256(pdf.read_bytes()).hexdigest()
    units = parse(pypdf.PdfReader(str(pdf)), first, last, off)
    exam = exam_words()
    out = ROOT / 'content' / 'english' / 'words' / f'sh2022-{args.vol}.js'
    old = read_existing(out)
    if old and old.get('source', {}).get('sha256') not in (None, sha):
        sys.exit('课本 PDF 的 SHA-256 与已导入的不同，拒绝静默替换；确认换了课本后先手动删除 source.sha256')
    data = old or {'id': f'english/sh2022/{args.vol}', 'review': {'status': 'pending'}, 'units': []}
    data['source'] = {'kind': 'textbook-glossary', 'file': str(pdf.relative_to(ROOT)), 'pages': f'{first}–{last}', 'sha256': sha}
    for no in args.units:
        if no not in units:
            sys.exit(f'词表里没有 Unit {no}')
        prev = next((u for u in data['units'] if u['no'] == no), None)
        kept = {key(w['w']): w for w in (prev or {}).get('words', [])}
        # 同一册词头不重复（记忆进度按词头共用）：前面单元已有的词跳过，新义手动并进原词条的释义
        others = {key(w['w']): u['no'] for u in data['units'] if u['no'] < no for w in u['words']}
        words = []
        for w in units[no]:
            if key(w['w']) in others:
                print(f'跳过 {w["w"]}（{w["pos"]} {w["zh"]}）：Unit {others[key(w["w"])]} 已有，新义请手动并进那条释义')
                continue
            old_w = kept.get(key(w['w']), {})
            merged = {**w, 'core': old_w.get('core', w['basic']), 'exam': key(w['w']) in exam}
            if old_w.get('manual'):
                merged['zh'] = old_w['zh']
                merged['manual'] = True
            for field in ('forms', 'ex'):
                if field in old_w:
                    merged[field] = old_w[field]
            merged.setdefault('ex', [])
            words.append(merged)
        unit = {'no': no, 'title': titles.get(no, f'Unit {no}'), 'words': words}
        if prev:
            data['units'][data['units'].index(prev)] = unit
        else:
            data['units'].append(unit)
            data['units'].sort(key=lambda u: u['no'])
        print(f'Unit {no}：{len(words)} 条，粗体 {sum(w["basic"] for w in words)}，中考词 {sum(w["exam"] for w in words)}，'
              f'缺例句 {sum(not w["ex"] for w in words)}')
    if args.dry:
        print(json.dumps(data['units'], ensure_ascii=False, indent=1))
    else:
        write(out, data, args.vol)
        print('已写入', out.relative_to(ROOT))


if __name__ == '__main__':
    main()
