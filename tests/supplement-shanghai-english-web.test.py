"""Standalone regression: python tests/supplement-shanghai-english-web.test.py."""
import copy
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('web_supplement', Path(__file__).parents[1] / 'scripts/supplement-shanghai-english-web.py')
web = importlib.util.module_from_spec(spec)
spec.loader.exec_module(web)


class WebSupplementTests(unittest.TestCase):
    def setUp(self):
        self.records = json.loads((web.DEST / 'web-completion-transcripts.json').read_text(encoding='utf8'))
        self.old = dict(year=2020, note='Human note', questions=[dict(id='published', stem='Human correction', answer='A')])
        self.catalog = dict(papers=[copy.deepcopy(self.old)], missingYears=[2021, 2022, 2023, 2024])

    def test_merge_is_idempotent_and_preserves_published_objects(self):
        result, count = web.merge(self.catalog, self.records)
        self.assertEqual(count, 257)
        self.assertEqual(next(p for p in result['papers'] if p['year'] == 2020), self.old)
        self.assertEqual(self.catalog['papers'], [self.old])
        again, count = web.merge(result, self.records)
        self.assertEqual(count, 0)
        self.assertEqual(again, result)
        self.assertEqual(result['missingYears'], [])

    def test_changed_question_refuses_batch_without_modifying_input(self):
        result, _ = web.merge(self.catalog, self.records)
        result['papers'][0]['questions'][0]['stem'] = 'Human correction after import'
        before = copy.deepcopy(result)
        with self.assertRaisesRegex(ValueError, 'Refusing to overwrite'):
            web.merge(result, self.records)
        self.assertEqual(result, before)

    def test_changed_transcript_or_original_source_is_rejected(self):
        records = copy.deepcopy(self.records)
        records['papers'][0]['questions'][0]['answer'] = 'changed'
        with self.assertRaisesRegex(ValueError, 'Transcript checksum'):
            web.validate(records, Path('unused'))
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source = self.records['papers'][0]['sources'][0]
            (root / source['file']).write_text('Wrong source', encoding='utf8')
            with self.assertRaisesRegex(ValueError, 'Changed source'):
                web.validate(self.records, root)

    def test_source_paths_cannot_escape_snapshot_directory(self):
        records = copy.deepcopy(self.records)
        records['papers'][0]['sources'][0]['file'] = '../outside.html'
        with self.assertRaisesRegex(ValueError, 'Unsafe source path'):
            web.validate(records, Path('unused'))


if __name__ == '__main__':
    unittest.main()
