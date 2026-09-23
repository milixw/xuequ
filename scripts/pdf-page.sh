#!/bin/bash
# 把 PDF 的某几页渲染成 PNG，用来核对教材原文（refs/ 下的电子课本不入库，只在本地看）
# 用法：scripts/pdf-page.sh <pdf 路径> <页码或范围> [输出目录]
#   scripts/pdf-page.sh refs/xxx.pdf 23            → 第 23 页
#   scripts/pdf-page.sh refs/xxx.pdf 20-24 /tmp/a  → 第 20～24 页，输出到 /tmp/a
# 页码是 PDF 的文件页码（从 1 数起），不是课本印的页码。
# 依赖：python3 + pypdf（拆页）、qlmanage（macOS 自带，负责渲染）
set -e

PDF="$1"
RANGE="$2"
OUT="${3:-${TMPDIR:-/tmp}/pdf-page}"

if [ -z "${PDF}" ] || [ -z "${RANGE}" ]; then
  sed -n '2,7p' "$0" | sed 's/^# \{0,1\}//'
  exit 1
fi
[ -f "${PDF}" ] || { echo "找不到文件：${PDF}"; exit 1; }
command -v qlmanage >/dev/null || { echo "缺少 qlmanage（只有 macOS 自带）"; exit 1; }
python3 -c "import pypdf" 2>/dev/null || { echo "缺少 pypdf，先装：pip3 install pypdf"; exit 1; }

mkdir -p "${OUT}"

# 拆出单页 PDF，文件名形如 p23.pdf
PAGES=$(python3 - "${PDF}" "${RANGE}" "${OUT}" <<'PY'
import sys
from pypdf import PdfReader, PdfWriter

pdf, rng, out = sys.argv[1], sys.argv[2], sys.argv[3]
first, _, last = rng.partition('-')
first = int(first)
last = int(last) if last else first

reader = PdfReader(pdf)
total = len(reader.pages)
if not 1 <= first <= last <= total:
    sys.exit(f'页码超出范围：这个 PDF 共 {total} 页')

for n in range(first, last + 1):
    writer = PdfWriter()
    writer.add_page(reader.pages[n - 1])
    writer.write(f'{out}/p{n:02d}.pdf')
    print(f'p{n:02d}')
PY
)

for P in ${PAGES}; do
  rm -f "${OUT}/${P}.png"
  qlmanage -t -s 2400 -o "${OUT}" "${OUT}/${P}.pdf" >/dev/null 2>&1
  mv -f "${OUT}/${P}.pdf.png" "${OUT}/${P}.png"
  rm -f "${OUT}/${P}.pdf"
  echo "${OUT}/${P}.png"
done
