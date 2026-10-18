"""Prepare smaller listening files without changing timing or published questions.

python scripts/compress-shanghai-listening.py <ffmpeg.exe> <backup-directory>
Stages outputs and a manifest in backup-directory; does not delete or replace originals.
Add --apply to install a previously prepared batch, after playback checks.
"""
import hashlib
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'content/english/past-papers'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def run(ffmpeg, *args):
    result = subprocess.run([str(ffmpeg), '-hide_banner', '-nostdin', *map(str, args)], capture_output=True, encoding='utf8', errors='replace')
    if result.returncode:
        raise ValueError(result.stderr[-3000:])
    return result


def duration(ffmpeg, path):
    result = subprocess.run([str(ffmpeg), '-hide_banner', '-i', str(path)], capture_output=True, encoding='utf8', errors='replace')
    match = re.search(r'Duration: (\d+):(\d+):([\d.]+)', result.stderr)
    if not match:
        raise ValueError('No duration: ' + str(path))
    return int(match[1]) * 3600 + int(match[2]) * 60 + float(match[3])


def main(ffmpeg, backup):
    backup = backup.resolve()
    if backup.is_relative_to(ROOT) or ROOT.is_relative_to(backup):
        raise ValueError('Use a separate backup directory outside the repository')
    manifest = json.loads((DEST / 'listening-audio.json').read_text(encoding='utf8'))
    entries = [(dict(item), False) for item in manifest['files']]
    for year, name in [(2025, 'listening.mp4'), (2026, 'listening.mp3')]:
        path = DEST / str(year) / name
        if path.exists():
            entries.append((dict(year=year, src=path.relative_to(ROOT).as_posix(), bytes=path.stat().st_size, sha256=sha(path)), True))
    output = []
    for item, legacy in entries:
        original = (ROOT / item['src']).resolve()
        if not original.is_relative_to(DEST) or sha(original) != item['sha256'] or original.stat().st_size != item['bytes']:
            raise ValueError('Changed or unsafe original: ' + item['src'])
        saved = backup / str(item['year']) / original.name
        saved.parent.mkdir(parents=True, exist_ok=True)
        if saved.exists() and sha(saved) != item['sha256']:
            raise ValueError('Backup conflict: ' + str(saved))
        if not saved.exists():
            shutil.copyfile(original, saved)
        if sha(saved) != item['sha256']:
            raise ValueError('Backup verification failed')
        seconds = duration(ffmpeg, original)
        # Already low-rate annual AAC should not suffer another lossy encode.
        copy_audio = not legacy and item['bytes'] * 8 / seconds <= 45000
        name = 'listening-legacy.m4a' if legacy else 'listening.m4a'
        staged = backup / 'compressed' / str(item['year']) / name
        staged.parent.mkdir(parents=True, exist_ok=True)
        codec = ['-c:a', 'copy'] if copy_audio else ['-c:a', 'aac', '-b:a', '40k', '-ac', '1', '-ar', '24000']
        run(ffmpeg, '-y', '-i', original, '-map', '0:a:0', '-vn', '-map_metadata', '-1', *codec, '-movflags', '+faststart', staged)
        actual = duration(ffmpeg, staged)
        if abs(actual - seconds) > 0.15 or staged.stat().st_size >= item['bytes']:
            raise ValueError('No size benefit or duration changed: ' + item['src'])
        run(ffmpeg, '-v', 'error', '-xerror', '-i', staged, '-map', '0:a:0', '-f', 'null', '-')
        new = dict(item)
        new.update(src=f"content/english/past-papers/{item['year']}/{name}", bytes=staged.stat().st_size,
                   sha256=sha(staged), durationSeconds=actual,
                   compression=dict(date='2026-10-18', method='remux' if copy_audio else 'aac-lc-40k-mono-24khz',
                                    originalName=original.name, originalBytes=item['bytes'], originalSha256=item['sha256'], originalDurationSeconds=seconds))
        if not copy_audio:
            new['codec'] = 'mp4a.40.2'
        output.append(dict(originalSrc=item['src'], staged=str(staged), backup=str(saved), legacy=legacy, audio=new))
        print(item['year'], name, item['bytes'], '->', new['bytes'], flush=True)
    (backup / 'compression-records.json').write_text(json.dumps(dict(files=output), ensure_ascii=False, indent=2) + '\n', encoding='utf8')


def install(backup):
    backup = backup.resolve()
    records = json.loads((backup / 'compression-records.json').read_text(encoding='utf8'))['files']
    for record in records:
        new = record['audio']
        original, target = (ROOT / record['originalSrc']).resolve(), (ROOT / new['src']).resolve()
        saved, staged = Path(record['backup']).resolve(), Path(record['staged']).resolve()
        if not all(p.is_relative_to(DEST) for p in [original, target]) or not all(p.is_relative_to(backup) for p in [saved, staged]):
            raise ValueError('Unsafe compression record path')
        if sha(saved) != new['compression']['originalSha256'] or sha(staged) != new['sha256'] or staged.stat().st_size != new['bytes']:
            raise ValueError('Changed backup or compressed file')
        if original.exists() and sha(original) != new['compression']['originalSha256']:
            raise ValueError('Original changed after preparation')
        if target.exists() and sha(target) != new['sha256']:
            raise ValueError('Refusing to replace another compressed version')
    for record in records:
        target = ROOT / record['audio']['src']
        if not target.exists():
            shutil.copyfile(record['staged'], target)
        if sha(target) != record['audio']['sha256']:
            raise ValueError('Installed file checksum failed')
    path = DEST / 'catalog.js'
    prefix, body = path.read_text(encoding='utf8').split('const catalog = ', 1)
    raw, suffix = body.split(';\n', 1)
    catalog = json.loads(raw)
    by_old = {record['originalSrc']: record for record in records}
    for paper in catalog['papers']:
        if paper.get('audio') in by_old:
            record = by_old[paper['audio']]
            paper['audio'] = record['audio']['src']
            paper['audioCompression'] = record['audio']
    temporary = path.with_suffix('.js.tmp')
    temporary.write_text(prefix + 'const catalog = ' + json.dumps(catalog, ensure_ascii=False, indent=2) + ';\n' + suffix, encoding='utf8')
    temporary.replace(path)
    manifest_path = DEST / 'listening-audio.json'
    manifest = json.loads(manifest_path.read_text(encoding='utf8'))
    manifest['files'] = [record['audio'] for record in records if not record['legacy']]
    manifest['legacyFiles'] = [record['audio'] for record in records if record['legacy']]
    manifest['note'] = '公开合集音频，播放版已压缩；低码率原音轨仅重封装。原版已备份，未逐题试听核对版本。'
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
    # Remove only exact originals with verified backups and installed replacements.
    for record in records:
        original = (ROOT / record['originalSrc']).resolve()
        if original.exists():
            original.unlink()
    old_bytes = sum(record['audio']['compression']['originalBytes'] for record in records)
    new_bytes = sum(record['audio']['bytes'] for record in records)
    print('Installed', len(records), 'files:', old_bytes, '->', new_bytes)


if __name__ == '__main__':
    if '--apply' in sys.argv:
        install(Path(sys.argv[2]))
    else:
        main(Path(sys.argv[1]), Path(sys.argv[2]))
