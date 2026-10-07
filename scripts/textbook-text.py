#!/usr/bin/env python3
"""按课本页码导出某一节（或某几页）的课本文字，给出题时确定知识范围用。

只导出需要的页，免得把整章、整本课本塞进 AI 的上下文。

用法：
  python3 scripts/textbook-text.py g8s1 22.1            # 按 docs/textbooks 目录表里的页码，导出 22.1 一节
  python3 scripts/textbook-text.py g8s1 109 116         # 导出课本第 109～116 页
  python3 scripts/textbook-text.py g8s1 22.1 > /tmp/x.txt

PDF 路径和“课本页码 = 文件页码 − N”取自 docs/textbooks/math-sh2024-<册ID>.md 开头的说明。
依赖 pypdf。课本原件在 refs/，不入库。
"""
import re
import sys
from pathlib import Path

import pypdf

ROOT = Path(__file__).resolve().parent.parent
JUNK = {'N', 'mweY²QúrHy>', '书书书'}


def volume_info(vol):
    doc = ROOT / 'docs' / 'textbooks' / f'math-sh2024-{vol}.md'
    text = doc.read_text(encoding='utf-8')
    head = '\n'.join(text.split('\n')[:12])
    pdf = re.search(r'`(refs/[^`]+\.pdf)`', head)
    off = re.search(r'课本页码 = 文件页码 − (\d+)', head)
    if not pdf or not off:
        sys.exit(f'{doc} 开头找不到 PDF 路径或页码换算')
    # 目录表的行：| 22.1 | 直角三角形 | 109 | ... |
    rows = re.findall(r'^\| *([^|]*?) *\| *([^|]*?) *\| *(\d+) *\|', text, re.M)
    return ROOT / pdf.group(1), int(off.group(1)), rows


def section_pages(rows, no):
    for i, (num, _, page) in enumerate(rows):
        if num == no:
            end = int(rows[i + 1][2]) - 1 if i + 1 < len(rows) else int(page) + 15
            return int(page), max(end, int(page))
    sys.exit(f'目录表里没有小节 {no}')


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    vol, a = sys.argv[1], sys.argv[2]
    pdf, off, rows = volume_info(vol)
    if len(sys.argv) > 3:
        start, end = int(a), int(sys.argv[3])
    elif '.' in a:
        start, end = section_pages(rows, a)
    else:
        start = end = int(a)
    reader = pypdf.PdfReader(str(pdf))
    for book in range(start, end + 1):
        i = book + off - 1
        if not 0 <= i < len(reader.pages):
            break
        lines = [l for l in (reader.pages[i].extract_text() or '').split('\n') if l.strip() not in JUNK]
        print(f'=== 课本第 {book} 页（文件第 {i + 1} 页）')
        print('\n'.join(lines))


if __name__ == '__main__':
    main()
