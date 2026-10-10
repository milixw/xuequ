"""Apply checked Chinese text transcripts; IDs stay unchanged.

Usage: python scripts/apply-shanghai-chinese-text.py <download-root>
Re-running refuses changed original sources or later manual edits.
"""
import hashlib
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'content/past-papers/shanghai.js'
MANIFEST = ROOT / 'content/past-papers/chinese-text-transcripts.json'


def apply(download):
    text = DEST.read_text(encoding='utf-8')
    catalog = json.loads(text.split('const catalog = ', 1)[1].split(';\n', 1)[0])
    transcript = json.loads(MANIFEST.read_text(encoding='utf-8'))
    papers = {p['id']: p for p in catalog['papers']}
    changed, seen = 0, set()
    for entry in transcript['questions']:
        qid = entry['id']
        if qid in seen:
            raise ValueError('重复转录ID：' + qid)
        seen.add(qid)
        paper = papers[qid.rsplit('-q', 1)[0]]
        if paper['subject'] != 'chinese':
            raise ValueError('转录清单仅限语文：' + qid)
        q = next(q for q in paper['questions'] if q['id'] == qid)
        source = download / paper['source']['file']
        if not source.exists():
            source = download / Path(paper['source']['file']).name
        digest = hashlib.sha256(source.read_bytes()).hexdigest()
        if digest != paper['source']['sha256'] or digest != entry['sourceSha256']:
            raise ValueError('原资料变化：' + qid)
        if not entry['stem'].strip() or not entry['answer'].strip() or entry['review']['status'] != 'pending':
            raise ValueError('转录内容或审核状态无效：' + qid)
        for image in entry['figures']:
            if not (ROOT / image['src']).is_file():
                raise ValueError('保留配图缺失：' + qid)
        if q.get('textSource'):
            if q['stem'] != entry['stem'] or q['answer'] != entry['answer']:
                raise ValueError('已转录题有后续人工修改，拒绝覆盖：' + qid)
            continue
        q['sourceImages'] = {'stem': q.pop('stemImages', []), 'answer': q.pop('answerImages', [])}
        q['stem'], q['answer'], q['explanation'] = entry['stem'], entry['answer'], None
        q['explanationNote'] = '已将原资料文字与标注转录，参考答案保留原资料解释；表格按行列或节点阅读，必要局部配图保留。待语文教师审核。'
        if paper['year'] == 2016 and q['originalNo'] == 8:
            q['explanationNote'] += '原整理资料将第10题误印为第9题，文字保留原误号，按第8—10题组及答案第10题核对。'
        q['category'] = '作文' if q['category'] == '作文' else '阅读与综合运用（文字）'
        if entry['figures']:
            q['stemImages'] = entry['figures']
        q['review'] = {'status': 'pending'}
        q['textSource'] = {'sourceSha256': digest, 'recordSha256': hashlib.sha256(json.dumps(entry, ensure_ascii=False, sort_keys=True).encode('utf-8')).hexdigest(), 'checkedAt': entry['checked'], 'kind': 'source-checked-transcription'}
        changed += 1
    for paper in papers.values():
        if paper['subject'] != 'chinese' or paper['year'] == 2026:
            continue
        paper['note'] = '已覆盖当前本地整理资料全部题号；题干、选项和原资料参考答案以文字展示，必要局部配图混合展示，保留原题ID及资料编号，主观题人工核对，待教师审核。'
        if paper.get('imageSupplement'):
            paper['imageSupplement']['imageQuestions'] = sum(bool(q.get('stemImages')) for q in paper['questions'])
    result = '// Generated from checked Shanghai source papers.\n(function(root) {\n  const catalog = ' + json.dumps(catalog, ensure_ascii=False, indent=2) + ';\n  if (typeof module !== "undefined" && module.exports) module.exports = catalog;\n  else root.ShanghaiSubjectPapers = catalog;\n})(typeof globalThis !== "undefined" ? globalThis : this);\n'
    DEST.write_text(result, encoding='utf-8')
    print(f'语文文字转录 {changed} 组；原ID不变，其他学科不变。')


if __name__ == '__main__':
    apply(Path(sys.argv[1]))
