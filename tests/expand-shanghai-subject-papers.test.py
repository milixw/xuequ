"""Pure extraction/merge regression checks; no Office automation or external writes."""
import importlib.util
from pathlib import Path
from types import SimpleNamespace
import tempfile
import unittest
from unittest.mock import patch
from xml.etree import ElementTree as ET

spec = importlib.util.spec_from_file_location('expand', Path(__file__).resolve().parents[1] / 'scripts/expand-shanghai-subject-papers.py')
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)


class ExpansionTests(unittest.TestCase):
    def test_xml_equation_outside_run_cannot_disappear(self):
        xml = ET.fromstring('<w:body xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"><w:p><w:r><w:t>计算</w:t></w:r><m:oMath><m:r><m:t>x</m:t></m:r></m:oMath></w:p></w:body>')
        with patch.object(m, 'Document', return_value=SimpleNamespace(element=SimpleNamespace(body=xml))):
            self.assertEqual(m.docx_text('unused'), '计算[[image]]')

    def test_xml_superscripts_and_annotations(self):
        xml = ET.fromstring('<w:body xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:r><w:t>x</w:t></w:r><w:r><w:rPr><w:vertAlign w:val="superscript"/></w:rPr><w:t>2</w:t></w:r><w:r><w:rPr><w:em w:val="underDot"/></w:rPr><w:t>词</w:t></w:r></w:p></w:body>')
        with patch.object(m, 'Document', return_value=SimpleNamespace(element=SimpleNamespace(body=xml))):
            self.assertEqual(m.docx_text('unused'), 'x²[[dot]]词[[/dot]]')

    def test_merge_keeps_original_ids_and_manual_corrections(self):
        old = dict(id='sh-math-2013', source={'sha256': 'aaa'}, questions=[{'id': 'q1', 'answer': '人工修正'}])
        papers = [old]
        self.assertTrue(m.append_questions(papers, dict(id=old['id'], source=old['source'], questions=[{'id': 'q1', 'answer': '自动答案'}, {'id': 'q2', 'answer': '新题'}])))
        self.assertEqual(old['questions'], [{'id': 'q1', 'answer': '人工修正'}, {'id': 'q2', 'answer': '新题'}])
        self.assertFalse(m.append_questions(papers, dict(id=old['id'], source={'sha256': 'changed'}, questions=[])))

    def test_discovery_deduplicates_content_and_excludes_other_regions(self):
        with tempfile.TemporaryDirectory(dir=m.ROOT / 'tmp/pdfs') as directory:
            root = Path(directory)
            self.assertTrue(root.resolve().is_relative_to(m.ROOT.resolve()))
            for name, data in [('2013上海数学.pdf', b'a'), ('2014上海语文.doc', b'b'), ('2013上海数学副本.pdf', b'a'), ('2013江苏数学.pdf', b'c')]:
                (root / name).write_bytes(data)
            sources = m.discover([('download', root)])
            self.assertEqual(len(sources), 2)
            self.assertEqual(sum(len(s['paths']) for s in sources), 3)

    def test_groups_keep_article_and_small_questions_together(self):
        text = '一、文言文\n（一）默写\n1.甲\n2.乙\n（二）阅读下文\n全文\n3.小问甲\n4.小问乙\n四、写作\n5.作文'
        groups = m.chinese_groups(text, 2013)
        self.assertEqual(len(groups), 2)
        self.assertIn('全文\n3.小问甲\n4.小问乙', groups[1])
        with self.assertRaises(ValueError): m.numbered('1.甲\n1.乙')


if __name__ == '__main__': unittest.main()
