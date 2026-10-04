"""Crops and answer boundaries tested without producing source documents."""
import importlib.util
from pathlib import Path
from types import SimpleNamespace
import unittest

spec=importlib.util.spec_from_file_location('images',Path(__file__).resolve().parents[1]/'scripts/supplement-shanghai-question-images.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)


def page(lines):
    return SimpleNamespace(extract_text_lines=lambda: [dict(text=t,top=y) for y,t in lines])


class ImageTests(unittest.TestCase):
    def test_decimals_and_formula_prefix(self):
        ps=[page([(100,'1.题一'),(200,'−−−2.题二')]),page([(70,'2025年上海市中考试卷 参考答案'),(100,'1.答案一'),(110,'0.5A'),(120,'1.2A'),(200,'2.答案二')])]
        s,a,b=m.locate(ps)
        self.assertEqual([q['no'] for q in s],[1,2]);self.assertEqual([q['no'] for q in a],[1,2])
        self.assertEqual(b,(1,70))

    def test_ambiguous_or_missing_numbers_rejected(self):
        for ps in [[page([(100,'1.题一')])],
                   [page([(100,'1.题一'),(200,'3.题三')]),page([(70,'2023年上海市中考试卷 参考答案'),(100,'1.答案')])]]:
            with self.assertRaises(ValueError):m.locate(ps)

    def test_answer_letter_only_explicit_single_choice(self):
        self.assertEqual(m.choice_answer('【答案】B\n【解析】原解析'),'B')
        for text in ['【答案】BC\n','故选A。','【答案】B或C\n']:self.assertIsNone(m.choice_answer(text))

    def test_cross_page_crops_trim_blank_and_stop_before_answer(self):
        chars=lambda top,bottom:[dict(top=top,bottom=bottom,non_stroking_color=(0,0,0),object_type='char')]
        ps=[SimpleNamespace(width=600,height=840,chars=chars(300,320),images=[],objects={}),
            SimpleNamespace(width=600,height=840,chars=chars(50,65),images=[],objects={})]
        crops=m.regions(ps,dict(page=0,top=295),(1,75))
        self.assertEqual(len(crops),2)
        self.assertEqual(crops[0][1][3],328)
        self.assertLessEqual(crops[1][1][3],75)
        ps[1].chars=[]
        self.assertEqual(len(m.regions(ps,dict(page=0,top=295),(1,75))),1)


if __name__=='__main__':unittest.main()
