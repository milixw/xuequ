"""Apply source-bound Shanghai English supplements without replacing published questions.
Usage: python scripts/complete-shanghai-english.py <original-root>
"""
import hashlib
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'content/english/past-papers'

def apply(source_root):
    path = DEST / 'catalog.js'
    source = path.read_text(encoding='utf8')
    catalog = json.loads(source.split('const catalog = ', 1)[1].split(';\n', 1)[0])
    records = json.loads((DEST / 'completion-transcripts.json').read_text(encoding='utf8'))
    # Validate the complete batch before writing anything.
    seen = set()
    for entry in records['papers']:
        for origin in entry['sources']:
            relative = Path(origin['file'])
            if relative.is_absolute() or '..' in relative.parts:
                raise ValueError('Unsafe source path')
            if hashlib.sha256((source_root / relative).read_bytes()).hexdigest() != origin['sha256']:
                raise ValueError('Changed original: ' + origin['file'])
        for q in entry['questions']:
            if q['id'] in seen or q['review']['status'] != 'pending':
                raise ValueError('Invalid question: ' + q['id'])
            seen.add(q['id'])
            for field in ['stemImages', 'passageImages', 'answerImages']:
                for fig in q.get(field, []):
                    image = (ROOT / fig['src']).resolve()
                    if not image.is_relative_to(DEST.resolve()) or not image.is_file():
                        raise ValueError('Missing or unsafe figure')
                    if hashlib.sha256(image.read_bytes()).hexdigest() != fig['sha256']:
                        raise ValueError('Changed figure: ' + fig['src'])
    added = 0
    for entry in records['papers']:
        paper = next(p for p in catalog['papers'] if p['year'] == entry['year'])
        existing = {q['id']: q for q in paper['questions']}
        for item in entry['questions']:
            q = dict(item)
            q['completionSource'] = {'checkedAt': records['checkedAt'], 'sourceSha256': entry['sources'][0]['sha256']}
            if q['id'] in existing:
                if existing[q['id']].get('completionSource') and existing[q['id']] != q:
                    raise ValueError('Published supplement was edited: ' + q['id'])
                continue
            paper['questions'].append(q); added += 1
        paper['questions'].sort(key=lambda q: (0 if q.get('part') == 'listening' else 1, q['originalNo']))
        paper['supplementSources'] = entry['sources']
        paper['coverage'] = entry['coverage']
        paper['note'] = entry['note']
        paper['completeness'] = entry['completeness']
        paper['skipped'] = entry['coverage']['gaps']
    output = '// Original text and source-checked supplements; keep published IDs.\n(function (root) {\n  const catalog = '
    output += json.dumps(catalog, ensure_ascii=False, indent=2)
    output += ';\n  if (typeof module !== "undefined" && module.exports) module.exports = catalog;\n  else root.EnglishPastPapers = catalog;\n})(typeof globalThis !== "undefined" ? globalThis : this);\n'
    if output != source: path.write_text(output, encoding='utf8')
    print('Added questions:', added)

if __name__ == '__main__':
    if len(sys.argv) != 2: raise SystemExit(__doc__)
    apply(Path(sys.argv[1]))
