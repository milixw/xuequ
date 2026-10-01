"""解析导入回归：python tests/import-english-bank.test.py（需 pdfplumber）。"""
from pathlib import Path
import runpy
import unittest

parser = runpy.run_path(str(Path(__file__).resolve().parents[1] / 'scripts' / 'import-english-bank.py'))


class ExplanationTests(unittest.TestCase):
    def test_separate_questions_and_empty(self):
        text = '第1题 答案\nB\n解析\n理由一。\n第2题 答案\nA\n解析\n无\n第3题 答案\nD\n解析\n理由三。'
        self.assertEqual(parser['explanations_from'](text), {1: '理由一。', 3: '理由三。'})

    def test_nested_reading_subquestions(self):
        text = '第12题 1. 答案：A\n解析：第一小题。\n2. 答案：C\n解析：第二小题。\n3. 答案：B\n解析：无\n第13题 答案\nD\n解析\n下一原题。'
        result = parser['explanations_from'](text)
        self.assertEqual(result[12], '第 1 小题：\n第一小题。\n\n第 2 小题：\n第二小题。')
        self.assertEqual(result[13], '下一原题。')

    def test_multiline_answer_marker_and_page_continuation(self):
        text = '49\n答案\nA\n解析\n第一行\n\n续页理由。\n50 答案\nB\n解析\n最后一题。'
        self.assertEqual(parser['explanations_from'](text), {49: '第一行\n\n续页理由。', 50: '最后一题。'})


if __name__ == '__main__':
    unittest.main()
