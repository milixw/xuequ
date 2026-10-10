"""Standalone text-import regression: requires pypdf and python-docx."""
import importlib.util
import copy
import json
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('importer', Path(__file__).parents[1] / 'scripts/import-english-past-papers.py')
importer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(importer)


class ImportTests(unittest.TestCase):
    def test_completion_listening_does_not_take_same_numbered_grammar_answer(self):
        paper = {'questions': [dict(id='sh2019-listening-q21', originalNo=21, type='fill', answer=None,
                                   completionSource={'sourceSha256': 'checked-original'}),
                               dict(id='sh2019-q21', originalNo=21, type='fill', answer=None)]}
        self.assertEqual(importer.fill_missing(paper, {21: 'E'}), 1)
        self.assertIsNone(paper['questions'][0]['answer'])
        self.assertEqual(paper['questions'][1]['answer'], 'E')

    def test_answer_table_image_markers_only(self):
        answers, _ = importer.answer_map('37. C\n英语试卷答案要点\n37.[[image]] B\n59.[[image]] politely', 2017)
        self.assertEqual(answers[37], 'B')
        self.assertEqual(answers[59], 'politely')
        self.assertEqual(importer.answer_map('37. B', 2017)[0], {})

    def test_answer_supplement_preserves_published_content_and_is_idempotent(self):
        questions = [dict(id='fixed', originalNo=37, type='choice', answer=None, stem='Original', options=['a', 'b', 'c', 'd'], review={'status': 'pending'}, explanation=None),
                     dict(id='corrected', originalNo=38, type='choice', answer='A', stem='Human correction')]
        before = copy.deepcopy(questions)
        paper = {'questions': questions}
        provenance = {'kind': 'public-supplement', 'review': {'status': 'pending'}}
        self.assertEqual(importer.fill_missing(paper, {37: 'B', 38: 'D', 39: 'C'}, provenance), 1)
        self.assertEqual(len(questions), 2)
        self.assertEqual(questions[1], before[1])
        self.assertEqual({k: v for k, v in questions[0].items() if k not in ('answer', 'answerSource')},
                         {k: v for k, v in before[0].items() if k != 'answer'})
        self.assertEqual(importer.fill_missing(paper, {37: 'D'}, provenance), 0)
        self.assertEqual(questions[0]['answer'], 'B')

    def test_supplement_answer_types_and_source_membership(self):
        paper = {'questions': [dict(originalNo=1, type='choice', answer=None), dict(originalNo=2, type='fill', answer=None)]}
        self.assertEqual(importer.fill_missing(paper, {1: 'stamps', 2: '123'}), 0)
        supplement = json.loads((importer.DEST / 'answer-supplements.json').read_text(encoding='utf-8'))['2018']
        self.assertEqual(len(supplement['answers']), 35)
        self.assertEqual(supplement['answerSource']['review']['status'], 'pending')

    def test_word_bullet_numbers_and_supplied_answer(self):
        text = ('II. Choose the best answer\n27•They had ___ good time.\n'
                'A．a B．an C．the D．/\n【解答】答案：A\n故选：A．\n'
                'III. Complete the following passage\n')
        questions, _ = importer.parse(text, 2016)
        self.assertEqual(len(questions), 1)
        self.assertEqual(questions[0]['originalNo'], 27)
        self.assertEqual(questions[0]['answer'], 'A')
        self.assertNotIn('答案', questions[0]['stem'])
        self.assertEqual(questions[0]['options'], ['a', 'an', 'the', '/'])

    def test_image_dependency_and_lost_underline_not_invented(self):
        for stem in ['Which underlined part is different?', 'Look at [[image]].']:
            text = f'II. Choose the best answer\n26. {stem}\nA. a B. b C. c D. d\nIII. Complete'
            questions, skipped = importer.parse(text, 2018)
            self.assertEqual(questions, [])
            self.assertTrue(skipped)

    def test_source_underline_preserved_and_missing_answer_null(self):
        text = ('II. Choose the best answer\n26. Which underlined part is different?\n'
                'A. [[u]]a[[/u]] B. b C. c D. d\nIII. Complete')
        questions, _ = importer.parse(text, 2018)
        self.assertEqual(questions[0]['options'][0], '[[u]]a[[/u]]')
        self.assertIsNone(questions[0]['answer'])

    def test_interleaved_commentary_not_treated_as_reading(self):
        text = ('B.Choose the best answer and complete the passage\n'
                '【分析】Source commentary, not the passage.\n75. A. a B. b C. c D. d\nC.Fill')
        questions, skipped = importer.parse(text, 2016)
        self.assertEqual(questions, [])
        self.assertTrue(skipped)

    def test_source_font_punctuation_and_footer_only(self):
        self.assertEqual(importer.clean("won\U001001b3t\n初中学业考试(2018)英语试卷第6页(共10页)"), "won't")
        self.assertEqual(importer.clean('Diferent in pronunciation.'), 'Diferent in pronunciation.')


if __name__ == '__main__':
    unittest.main()
