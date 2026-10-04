"""Science extraction regressions, no source writes or Office automation."""
import importlib.util
from pathlib import Path
from types import SimpleNamespace
import unittest
from unittest.mock import patch
from xml.etree import ElementTree as ET

spec=importlib.util.spec_from_file_location('science',Path(__file__).resolve().parents[1]/'scripts/import-shanghai-science-papers.py')
m=importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)


class ScienceTests(unittest.TestCase):
    def test_source_superscript_and_subscript(self):
        xml=ET.fromstring('<w:body xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:r><w:t>H</w:t></w:r><w:r><w:rPr><w:vertAlign w:val="subscript"/></w:rPr><w:t>2</w:t></w:r><w:r><w:t>O m</w:t></w:r><w:r><w:rPr><w:vertAlign w:val="superscript"/></w:rPr><w:t>3</w:t></w:r></w:p></w:body>')
        with patch.object(m,'Document',return_value=SimpleNamespace(element=SimpleNamespace(body=xml))):
            self.assertEqual(m.docx_text('unused'),'H₂O m³')

    def test_equation_sibling_cannot_disappear(self):
        xml=ET.fromstring('<w:body xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"><w:p><w:r><w:t>化学反应</w:t></w:r><m:oMath><m:r><m:t>H2O</m:t></m:r></m:oMath></w:p></w:body>')
        with patch.object(m,'Document',return_value=SimpleNamespace(element=SimpleNamespace(body=xml))):
            self.assertIn('[[image]]',m.docx_text('unused'))

    def test_inline_original_choices_and_answer(self):
        text='一、选择题\n1.属于纯净物的是（ ）\nA.雨水 B.蔗糖水 C.矿泉水 D.蒸馏水\n【答案】D\n【解析】蒸馏水是纯净物。\n2.如图实验\n【答案】A'
        qs,skips=m.parse(text,'chemistry',2023)
        self.assertEqual(len(qs),1)
        self.assertEqual(qs[0]['answer'],'D')
        self.assertEqual(qs[0]['options'],['雨水','蔗糖水','矿泉水','蒸馏水'])
        self.assertEqual(qs[0]['explanation'],'蒸馏水是纯净物。')
        self.assertTrue(skips)

    def test_reject_missing_exponent_and_answer(self):
        for stem,answer in [('物体体积为1×10﹣3米3','9.8N'),('求功率','见解析')]:
            qs,_=m.parse('一、选择题\n1.'+stem+'\n【答案】'+answer,'physics',2019,binary=True)
            self.assertEqual(qs,[])

    def test_composite_question_stays_one(self):
        qs,_=m.parse('一、选择题\n1.水的性质：(1)颜色是什么？(2)是否有气味？\n【答案】(1)无色；(2)无味。','chemistry',2024)
        self.assertEqual(len(qs),1)
        self.assertIn('(2)',qs[0]['stem'])
        self.assertEqual(qs[0]['type'],'written')

    def test_duplicate_numbers_rejected(self):
        with self.assertRaises(ValueError):m.blocks('1.甲\n1.乙')


if __name__=='__main__':unittest.main()
