"""Append listening originals and attach annual audio; never replace published questions.

python scripts/supplement-shanghai-listening.py <source-snapshot-directory> [--check]
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


def checked_path(base, relative):
    path = (base / relative).resolve()
    if not path.is_relative_to(base.resolve()):
        raise ValueError('Unsafe path: ' + relative)
    return path


def validate(records, audio, sources):
    for entry in records['papers']:
        if digest(json.dumps(entry['questions'], ensure_ascii=False, separators=(',', ':')).encode()) != entry['questionsSha256']:
            raise ValueError('Changed transcript')
        for source in entry['sources']:
            if not source['url'].startswith('https://') or digest(checked_path(sources, source['file']).read_bytes()) != source['sha256']:
                raise ValueError('Changed source')
        for image in entry['images']:
            if digest(checked_path(ROOT, image['src']).read_bytes()) != image['sha256'] or digest(checked_path(sources, image['originalFile']).read_bytes()) != image['originalSha256']:
                raise ValueError('Changed image')
        expected = 30 if entry['year'] == 2013 else 25
        if [q['originalNo'] for q in entry['questions']] != list(range(1, expected + 1)):
            raise ValueError('Incomplete numbering')
        for q in entry['questions']:
            if q['id'] != f"sh{entry['year']}-q{q['originalNo']:02}" or q['review']['status'] != 'pending' or q['part'] != 'listening':
                raise ValueError('Invalid question')
    if [a['year'] for a in audio['files']] != list(range(2013, 2027)):
        raise ValueError('Incomplete audio years')
    for item in audio['files']:
        data = checked_path(ROOT, item['src']).read_bytes()
        if len(data) != item['bytes'] or digest(data) != item['sha256'] or data[4:8] != b'ftyp':
            raise ValueError('Changed audio')


def merge(catalog, records, audio):
    result = copy.deepcopy(catalog)
    for entry in records['papers']:
        paper = next(p for p in result['papers'] if p['year'] == entry['year'])
        existing = {q['id']: q for q in paper['questions']}
        for item in entry['questions']:
            q = copy.deepcopy(item)
            q['listeningSource'] = dict(checkedAt=records['checkedAt'], sourceSha256=entry['sources'][0]['sha256'])
            if q['id'] in existing:
                if existing[q['id']] != q:
                    raise ValueError('Refusing to overwrite: ' + q['id'])
            else:
                paper['questions'].append(q)
        paper['questions'].sort(key=lambda q: (q.get('part') != 'listening', q['originalNo']))
        paper['listeningSources'] = entry['sources']
        paper['coverage']['listeningExpected'] = len(entry['questions'])
        paper['coverage']['listeningIncluded'] = len(entry['questions'])
        paper['completeness'] = f"笔试69项、听力{len(entry['questions'])}项已收录，附本年录音"
        paper['coverage']['gaps'] = ['公开整理版听力题及参考答案待教师审核，录音逐题版本对应待核对。']
    for item in audio['files']:
        paper = next(p for p in result['papers'] if p['year'] == item['year'])
        if paper.get('audio') and paper['audio'] != item['src']:
            paper.setdefault('previousAudio', paper['audio'])
        paper['audio'] = item['src']
        paper['audioSource'] = item
        paper['coverage']['gaps'] = [g.replace('本地没有对应原听力录音', '已附公开合集本年录音，逐题版本对应待核对').replace('未取得对应原听力录音，听力题暂供文字核对', '已附公开合集本年录音，逐题版本对应待核对').replace('原选项、原录音与其余听力题干待补全', '原选项与其余听力题干待补全；已附本年录音，逐题版本对应待核对') for g in paper['coverage']['gaps']]
        if item['year'] in (2021, 2022, 2023):
            paper['completeness'] = '笔试64项、听力20项已收录，附本年录音'
        paper['skipped'] = copy.deepcopy(paper['coverage']['gaps'])
    return result


def main():
    records = json.loads((DEST / 'listening-supplements.json').read_text(encoding='utf8'))
    audio = json.loads((DEST / 'listening-audio.json').read_text(encoding='utf8'))
    validate(records, audio, Path(sys.argv[1]))
    path = DEST / 'catalog.js'
    original = path.read_text(encoding='utf8')
    prefix, body = original.split('const catalog = ', 1)
    raw, suffix = body.split(';\n', 1)
    catalog = json.loads(raw)
    result = merge(catalog, records, audio)
    if '--check' in sys.argv:
        if result != catalog:
            raise ValueError('Unapplied listening supplement')
    elif result != catalog:
        temporary = path.with_suffix('.js.tmp')
        temporary.write_text(prefix + 'const catalog = ' + json.dumps(result, ensure_ascii=False, indent=2) + ';\n' + suffix, encoding='utf8')
        temporary.replace(path)
    print('Listening supplements checked:', sum(len(p['questions']) for p in records['papers']))


if __name__ == '__main__':
    main()
