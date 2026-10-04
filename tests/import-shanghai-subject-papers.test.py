"""Regression checks for text extraction; run with bundled Python/pypdf."""
import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('importer', Path(__file__).resolve().parents[1] / 'scripts/import-shanghai-subject-papers.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class ImportTests(unittest.TestCase):
    def test_boundary_and_numbers(self):
        stems, answers = module.split_source('1．（3分）原题\n2024年上海市中考试卷数学参考答案\n1．（3分）【答案】A【解析】原解析【点评】点评')
        self.assertEqual(module.blocks(stems)[1], '原题')
        self.assertEqual(module.answer_parts(module.blocks(answers)[1]), ('A', '原解析'))
        with self.assertRaises(ValueError): module.split_source('只有题目，没有答案分界')
        with self.assertRaises(ValueError): module.blocks('1．（3分）甲\n1．（3分）乙')

    def test_annotations(self):
        self.assertEqual(module.mark('绝境中的绝', '绝', 'dot'), '[[dot]]绝[[/dot]]境中的绝')
        with self.assertRaises(ValueError): module.mark('甲', '不存在')

    def test_flattened_math_is_not_presented_as_analysis(self):
        for text in ('a5÷a2=a3', 'y=6x', '∠ABC', '√2', '(1)平方差公式'):
            self.assertIsNone(module.safe_math_analysis(text))
        self.assertEqual(module.safe_math_analysis('利用平方差公式计算即可。'), '利用平方差公式计算即可。')

    def test_footer_not_visible_source(self):
        self.assertEqual(module.clean('原题\ufe01\n数学试题第1页（共5页）\n\n后文'), '原题\n\n后文')


if __name__ == '__main__': unittest.main()
