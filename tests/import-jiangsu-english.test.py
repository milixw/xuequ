import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('jiangsu', Path(__file__).resolve().parents[1] / 'scripts/import-jiangsu-english.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class ImportTests(unittest.TestCase):
    def test_inline_answer_and_interleaved_commentary(self):
        text = '''一、单项选择
1. Choose a word.
A. oneB. twoC. threeD. four
【答案】B
【解析】原资料解析。
2. Choose another word.
A. red B. blue C. green D. white
2.C　这是原解析，不应出现在题干或选项里。
'''
        questions, _ = module.parse(text, 'js-test-2020')
        self.assertEqual([q['answer'] for q in questions], ['B', 'C'])
        self.assertEqual(questions[0]['options'], ['one', 'two', 'three', 'four'])
        self.assertEqual(questions[1]['options'][-1], 'white')
        self.assertIn('原解析', questions[1]['explanation'])

    def test_full_cloze_group_and_original_keys(self):
        text = '''Ⅱ. 完形填空
Read this complete passage carefully. The students had ___16___ plans for their school and ___17___ hopes for the future.
16. A. one B. two C. three D. four
17. A. old B. new C. good D. bad
【答案】16. A    17. C
【解析】
【16题详解】第一题原解析。
【17题详解】第二题原解析。
三、词汇运用
18. Other task.
'''
        questions, _ = module.parse(text, 'js-test-2020')
        self.assertEqual(len(questions), 2)
        self.assertEqual(questions[0]['passage'], questions[1]['passage'])
        self.assertEqual([q['answer'] for q in questions], ['A', 'C'])
        self.assertIn('第二题原解析', questions[1]['explanation'])

    def test_reading_passages_remain_separate(self):
        text = '''三、阅读理解
A
This is the first original article. It has enough complete text to understand the question.
31. What is it?
A. one B. two C. three D. four
【答案】B
【解析】第一篇解析。
B
This is the second original article. It has enough complete text to understand the question.
32. What is it?
A. one B. two C. three D. four
【答案】C
【解析】第二篇解析。
'''
        questions, _ = module.parse(text, 'js-test-2020')
        self.assertEqual(len(questions), 2)
        self.assertNotEqual(questions[0]['passage'], questions[1]['passage'])
        self.assertNotIn('解析', questions[1]['passage'])

    def test_image_missing_underline_and_duplicate_numbers_are_skipped(self):
        text = '''三、阅读理解
A
[[image]] This article depends on a missing diagram that is part of the original source.
31. What is it?
A. one B. two C. three D. four
'''
        self.assertEqual(module.parse(text, 'js-test-2020')[0], [])
        repeated = '''一、单项选择
1. First question.
A. one B. two C. three D. four
1. Second question.
A. one B. two C. three D. four
'''
        self.assertEqual(module.parse(repeated, 'js-test-2020')[0], [])
        underline = repeated.split('1. Second')[0].replace('First question.', 'What does the underlined word mean?')
        self.assertEqual(module.parse(underline, 'js-test-2020')[0], [])

    def test_article_commentary_never_leaks_into_last_option(self):
        text = '''一、单项选择
1. First question.
A. one B. two C. three D. four
【文章大意】这段不能放入选项。
1.A 根据原文选A。
'''
        questions, _ = module.parse(text, 'js-test-2020')
        self.assertEqual(questions[0]['options'][-1], 'four')
        self.assertEqual(questions[0]['answer'], 'A')

    def test_reimport_preserves_edits_ids_and_review_and_rejects_changed_source(self):
        previous = dict(id='js-test-2020', source={'sha256': 'original'},
                        review={'status': 'pending'}, questions=[{'id': 'q1', 'originalNo': 1, 'stem': '人工订正'}])
        incoming = dict(id='js-test-2020', source={'sha256': 'original'}, review={'status': 'pending'},
                        questions=[{'id': 'q1', 'originalNo': 1, 'stem': '提取结果'}, {'id': 'q2', 'originalNo': 2}])
        merged = module.preserve_published(incoming, previous)
        self.assertEqual(merged['questions'][0]['stem'], '人工订正')
        self.assertEqual([q['id'] for q in merged['questions']], ['q1', 'q2'])
        with self.assertRaises(ValueError):
            module.preserve_published(dict(incoming, source={'sha256': 'different'}), previous)

    def test_original_answer_tables_and_explicit_conclusions(self):
        text = '''一、单项选择
1. Choose a word.
A. one B. two C. three D. four
【解答】原资料讲解。故选：B．
2. Choose another word.
A. old B. new C. red D. blue
【解答】原资料讲解。故选：D．
参考答案
16—20 B A C D A 21—25 C B D B A
26.D 27.B 28.A 29.A 30.B
40,B 细节判断题，原题解析。
'''
        answers, explanations, conflicts = module.supplied_keys(text)
        self.assertEqual(answers[1], 'B')
        self.assertEqual(answers[2], 'D')
        self.assertEqual(answers[16], 'B')
        self.assertEqual(answers[25], 'A')
        self.assertEqual(answers[29], 'A')
        self.assertEqual(answers[40], 'B')
        self.assertIn('原题解析', explanations[40])
        self.assertEqual(conflicts, set())

    def test_conflicting_keys_not_guessed_and_incomplete_ranges_not_expanded(self):
        answers, _, conflicts = module.supplied_keys('1.A 2.B 3.C\n1.B 2.B 3.C\n16—20 A B C\n')
        self.assertNotIn(1, answers)
        self.assertIn(1, conflicts)
        self.assertNotIn(16, answers)


if __name__ == '__main__':
    unittest.main()
