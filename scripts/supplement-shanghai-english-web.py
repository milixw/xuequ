"""Apply the reviewed public-source transcript batch without replacing published items.

Usage: python scripts/supplement-shanghai-english-web.py <source-root> [--check]
The source root contains the downloaded HTML and original image snapshots named
in web-completion-transcripts.json. These snapshots are not runtime dependencies.
"""
import copy
import hashlib
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'content/english/past-papers'


def digest(data):
    return hashlib.sha256(data).hexdigest()


def validate(records, source_root):
    seen = set()
    for paper in records['papers']:
        encoded = json.dumps(paper['questions'], ensure_ascii=False, separators=(',', ':')).encode()
        if digest(encoded) != paper['questionsSha256']:
            raise ValueError('Transcript checksum mismatch: ' + str(paper['year']))
        for source in paper['sources']:
            relative = Path(source['file'])
            if relative.is_absolute() or '..' in relative.parts:
                raise ValueError('Unsafe source path')
            if not source['url'].startswith('https://'):
                raise ValueError('Unsafe source URL')
            if digest((source_root / relative).read_bytes()) != source['sha256']:
                raise ValueError('Changed source: ' + source['file'])
        images = {item['src']: item for item in paper['images']}
        for item in images.values():
            path = (ROOT / item['src']).resolve()
            if not path.is_relative_to(DEST.resolve()) or not path.is_file():
                raise ValueError('Missing or unsafe image')
            if digest(path.read_bytes()) != item['sha256']:
                raise ValueError('Changed image: ' + item['src'])
            if digest((source_root / item['originalFile']).read_bytes()) != item['originalSha256']:
                raise ValueError('Changed original image: ' + item['originalFile'])
        for q in paper['questions']:
            expected = f"sh{paper['year']}-q{q['originalNo']:02}"
            if q['id'] != expected or q['id'] in seen or q['review']['status'] != 'pending':
                raise ValueError('Invalid question: ' + q['id'])
            seen.add(q['id'])
            if q['type'] == 'choice':
                expected_count = 2 if q.get('optionLabels') == 'TF' else 4
                if len(q['options']) != expected_count or not all(q['options']):
                    raise ValueError('Incomplete options: ' + q['id'])
                allowed = 'TF' if expected_count == 2 else 'ABCD'
                if q['answer'] not in allowed:
                    raise ValueError('Invalid answer: ' + q['id'])
            for field in ['stemImages', 'passageImages', 'answerImages']:
                for item in q.get(field, []):
                    if item['src'] not in images:
                        raise ValueError('Image without provenance: ' + q['id'])


def merge(catalog, records):
    result = copy.deepcopy(catalog)
    added = 0
    for entry in records['papers']:
        paper = next((p for p in result['papers'] if p['year'] == entry['year']), None)
        if paper is None:
            paper = {key: copy.deepcopy(entry[key]) for key in
                     ['year', 'title', 'version', 'review', 'coverage', 'completeness', 'note']}
            paper['questions'] = []
            paper['source'] = dict(root='web', name='公开试卷整理资料（非官方发布）',
                                   file=entry['sources'][0]['file'], sha256=entry['sources'][0]['sha256'])
            paper['skipped'] = copy.deepcopy(entry['coverage']['gaps'])
            paper['webSources'] = copy.deepcopy(entry['sources'])
            result['papers'].append(paper)
        by_id = {q['id']: q for q in paper['questions']}
        for item in entry['questions']:
            q = copy.deepcopy(item)
            q['webSource'] = dict(checkedAt=records['checkedAt'],
                                  sourceSha256=entry['sources'][0]['sha256'],
                                  numberMapping=entry['numberMapping'])
            if q['id'] in by_id:
                if by_id[q['id']] != q:
                    raise ValueError('Refusing to overwrite published question: ' + q['id'])
                continue
            paper['questions'].append(q)
            by_id[q['id']] = q
            added += 1
        paper['questions'].sort(key=lambda q: (q.get('part') != 'listening', q['originalNo']))
    result['papers'].sort(key=lambda p: p['year'], reverse=True)
    present = {p['year'] for p in result['papers']}
    result['missingYears'] = [y for y in result.get('missingYears', []) if y not in present]
    return result, added


def main(source_root, check=False):
    records = json.loads((DEST / 'web-completion-transcripts.json').read_text(encoding='utf8'))
    validate(records, source_root)
    path = DEST / 'catalog.js'
    original = path.read_text(encoding='utf8')
    catalog = json.loads(original.split('const catalog = ', 1)[1].split(';\n', 1)[0])
    result, added = merge(catalog, records)
    if check:
        if result != catalog:
            raise ValueError('Catalog has unapplied transcripts')
    elif result != catalog:
        prefix, rest = original.split('const catalog = ', 1)
        suffix = rest.split(';\n', 1)[1]
        output = prefix + 'const catalog = ' + json.dumps(result, ensure_ascii=False, indent=2) + ';\n' + suffix
        temporary = path.with_suffix('.js.tmp')
        temporary.write_text(output, encoding='utf8')
        temporary.replace(path)
    print('Added questions:', added)


if __name__ == '__main__':
    if len(sys.argv) not in (2, 3) or len(sys.argv) == 3 and sys.argv[2] != '--check':
        raise SystemExit(__doc__)
    main(Path(sys.argv[1]), len(sys.argv) == 3)
