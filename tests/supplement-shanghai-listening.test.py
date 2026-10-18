"""Run separately: python tests/supplement-shanghai-listening.test.py."""
import copy
import importlib.util
import json
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('listening', Path(__file__).parents[1] / 'scripts/supplement-shanghai-listening.py')
listening = importlib.util.module_from_spec(spec)
spec.loader.exec_module(listening)


class ListeningTests(unittest.TestCase):
    def setUp(self):
        self.records = json.loads((listening.DEST / 'listening-supplements.json').read_text(encoding='utf8'))
        self.audio = json.loads((listening.DEST / 'listening-audio.json').read_text(encoding='utf8'))
        self.catalog = dict(papers=[dict(year=y, questions=[dict(id=f'human-{y}', originalNo=99, stem='人工订正')], coverage=dict(gaps=['原资料缺图']), note='人工备注') for y in range(2013, 2027)])

    def test_append_preserves_old_objects_and_is_idempotent(self):
        before = copy.deepcopy(self.catalog)
        result = listening.merge(self.catalog, self.records, self.audio)
        self.assertEqual(before, self.catalog)
        self.assertEqual(sum(len(p['questions']) for p in result['papers']), 94)
        self.assertEqual(result, listening.merge(result, self.records, self.audio))
        for paper in result['papers']:
            self.assertEqual(paper['note'], '人工备注')
            self.assertIn(dict(id=f"human-{paper['year']}", originalNo=99, stem='人工订正'), paper['questions'])

    def test_conflict_rejects_whole_merge_without_mutation(self):
        result = listening.merge(self.catalog, self.records, self.audio)
        result['papers'][0]['questions'][0]['stem'] = '后续人工订正'
        before = copy.deepcopy(result)
        with self.assertRaisesRegex(ValueError, 'Refusing to overwrite'):
            listening.merge(result, self.records, self.audio)
        self.assertEqual(before, result)

    def test_changed_transcript_is_rejected_before_source_access(self):
        records = copy.deepcopy(self.records)
        records['papers'][0]['questions'][0]['answer'] = '篡改'
        with self.assertRaisesRegex(ValueError, 'Changed transcript'):
            listening.validate(records, self.audio, Path('unused'))

    def test_source_path_cannot_escape_snapshot_directory(self):
        with self.assertRaisesRegex(ValueError, 'Unsafe path'):
            listening.checked_path(Path('tmp'), '../outside')


if __name__ == '__main__':
    unittest.main()
