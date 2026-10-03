"""Read the main text stream of a Word 97-2003 .doc; no Office automation."""
import struct
from pathlib import Path


def word_text(path):
    data = Path(path).read_bytes()
    if data[:8] != bytes.fromhex('d0cf11e0a1b11ae1'):
        raise ValueError('Not a compound Word document')
    size = 1 << struct.unpack_from('<H', data, 30)[0]
    sector = lambda sid: data[(sid + 1) * size:(sid + 2) * size]
    difat = list(struct.unpack_from('<109I', data, 76))
    next_id, count = struct.unpack_from('<II', data, 68)
    for _ in range(count):
        values = struct.unpack('<' + 'I' * (size // 4), sector(next_id))
        difat.extend(values[:-1]); next_id = values[-1]
    fat = []
    for sid in difat:
        if sid < 0xfffffffa:
            fat.extend(struct.unpack('<' + 'I' * (size // 4), sector(sid)))

    def chain(first, table, reader):
        result, seen = [], set()
        while first < 0xfffffffa:
            if first in seen or first >= len(table):
                raise ValueError('Invalid sector chain')
            seen.add(first); result.append(reader(first)); first = table[first]
        return b''.join(result)

    directory = chain(struct.unpack_from('<I', data, 48)[0], fat, sector)
    streams = {}
    for offset in range(0, len(directory), 128):
        entry = directory[offset:offset + 128]
        length = struct.unpack_from('<H', entry, 64)[0]
        name = entry[:max(0, length - 2)].decode('utf-16le', errors='replace')
        streams[name] = (struct.unpack_from('<I', entry, 116)[0],
                         struct.unpack_from('<Q', entry, 120)[0])
    root_start, root_size = streams['Root Entry']
    mini_stream = chain(root_start, fat, sector)[:root_size]
    mini_fat_bytes = chain(struct.unpack_from('<I', data, 60)[0], fat, sector)
    mini_fat = list(struct.unpack('<' + 'I' * (len(mini_fat_bytes) // 4), mini_fat_bytes))

    def stream(name):
        first, length = streams[name]
        if length < 4096:
            return chain(first, mini_fat, lambda sid: mini_stream[sid * 64:(sid + 1) * 64])[:length]
        return chain(first, fat, sector)[:length]

    word = stream('WordDocument')
    table = stream('1Table' if struct.unpack_from('<H', word, 10)[0] & 0x200 else '0Table')
    start, length = struct.unpack_from('<II', word, 0x1a2)
    clx = table[start:start + length]
    pos = 0
    while pos < len(clx) and clx[pos] == 1:
        pos += 3 + struct.unpack_from('<H', clx, pos + 1)[0]
    if pos >= len(clx) or clx[pos] != 2:
        raise ValueError('Missing Word piece table')
    length = struct.unpack_from('<I', clx, pos + 1)[0]
    pieces = clx[pos + 5:pos + 5 + length]
    count = (length - 4) // 12
    positions = struct.unpack_from('<' + 'I' * (count + 1), pieces)
    limit = struct.unpack_from('<I', word, 76)[0]
    result = []
    for i in range(count):
        if positions[i] >= limit: break
        chars = min(positions[i + 1], limit) - positions[i]
        fc = struct.unpack_from('<I', pieces, 4 * (count + 1) + i * 8 + 2)[0]
        compressed = bool(fc & 0x40000000)
        offset = fc & 0x3fffffff
        if compressed: offset //= 2
        segment = word[offset:offset + chars * (1 if compressed else 2)]
        result.append(segment.decode('cp1252' if compressed else 'utf-16le', errors='replace'))
    return ''.join(result).replace('\r', '\n').replace('\x07', '\n').replace('\x0b', '\n')


if __name__ == '__main__':
    import sys
    print(word_text(sys.argv[1]))
