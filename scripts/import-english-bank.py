#!/usr/bin/env python3
"""从新东方错题 PDF 导出英语题库；需要 pdfplumber。

用法：python scripts/import-english-bank.py <PDF 目录>
只导出题目文本和参考答案，不复制含学生信息的原 PDF 或页眉。
"""

from __future__ import annotations

import argparse
from collections import Counter
import hashlib
import json
import logging
from pathlib import Path
import re
import unicodedata

import pdfplumber

logging.getLogger("pdfminer").setLevel(logging.CRITICAL)

QUESTION = re.compile(r"(?m)^(?:第\s*)?(\d{1,3})(?:\s*题)?\s*\[\s*([^\]\n]{1,20})\s*\]\s*")
ANSWER = re.compile(r"(?m)^(?:第\s*)?(\d{1,3})(?:\s*题)?(?:\s+\d+[.．])?\s*答案[:：]?[ \t]*")
PAGE_FOOTER = re.compile(r"^第\s*\d+\s*页\s*共\s*\d+\s*页$")
TYPES = {
    "单选题": "choice",
    "完形填空": "cloze",
    "复合题": "reading",
    "填空题": "fill",
    "补全题": "completion",
    "主观题": "written",
}


def cleaned_page(page):
    lines = (page.extract_text() or "").splitlines()
    kept = []
    for index, line in enumerate(lines):
        value = line.strip()
        if PAGE_FOOTER.match(value):
            continue
        if (
            "新东方智慧学习机" in value
            or "学号" in value
            or re.search(r"SH\d{6,}", value)
            or (index < 5 and "英语错题" in value)
        ):
            continue
        if index < 4 and (value in {"第", "页"} or value.isdigit()):
            continue
        kept.append(line)
    return "\n".join(kept).strip()


def fingerprint(text):
    normalized = unicodedata.normalize("NFKC", text).lower()
    normalized = re.sub(r"\s+", "", normalized)
    return hashlib.sha256(normalized.encode("utf-8")).hexdigest()[:16]


def answers_from(text):
    markers = list(ANSWER.finditer(text))
    answers = {}
    for index, marker in enumerate(markers):
        end = markers[index + 1].start() if index + 1 < len(markers) else len(text)
        answer = text[marker.end():end].split("解析", 1)[0].strip()
        answer = re.sub(r"\s+", " ", answer)
        if answer and len(answer) <= 150:
            answers[int(marker.group(1))] = answer
    return answers


def extract(source_dir):
    records = {}
    seen_files = set()
    stats = Counter()
    pdfs = sorted(source_dir.glob("*.pdf"))
    if not pdfs:
        raise ValueError(f"目录中没有 PDF：{source_dir}")
    for path in pdfs:
        file_hash = hashlib.sha256(path.read_bytes()).hexdigest()
        if file_hash in seen_files:
            stats["duplicate_files"] += 1
            continue
        seen_files.add(file_hash)
        with pdfplumber.open(path) as pdf:
            pages = [cleaned_page(page) for page in pdf.pages]
        offsets = []
        cursor = 0
        for page in pages:
            offsets.append(cursor)
            cursor += len(page) + 1
        text = "\n".join(pages)
        answer_marker = ANSWER.search(text)
        answer_start = answer_marker.start() if answer_marker else len(text)
        answer_map = answers_from(text[answer_start:])
        markers = list(QUESTION.finditer(text[:answer_start]))
        stats["question_blocks"] += len(markers)
        for index, marker in enumerate(markers):
            end = markers[index + 1].start() if index + 1 < len(markers) else answer_start
            body = text[marker.end():end].replace("\x00", "–")
            body = re.sub(r"\n{3,}", "\n\n", body).strip()
            if len(body) < 12:
                stats["too_short"] += 1
                continue
            raw_type = re.sub(r"\s+", "", marker.group(2))
            kind = TYPES.get(raw_type, "other")
            if kind == "other":
                stats["unknown_types"] += 1
            page_no = max(i + 1 for i, offset in enumerate(offsets) if offset <= marker.start())
            key = fingerprint(body)
            source = {"file": path.name, "number": int(marker.group(1)), "page": page_no}
            answer = answer_map.get(source["number"])
            if key in records:
                records[key]["sources"].append(source)
                if not records[key]["answer"] and answer:
                    records[key]["answer"] = answer
                stats["duplicate_questions"] += 1
                continue
            records[key] = {
                "id": f"xdf-{key}",
                "type": kind,
                "text": body,
                "answer": answer,
                "sources": [source],
                "review": "pending",
            }
    questions = list(records.values())
    payload = json.dumps(questions, ensure_ascii=False)
    if re.search(r"学号|SH\d{6,}|智慧学习机|英语错题", payload):
        raise ValueError("导出结果中仍含源 PDF 页眉或学生信息，请先修正清理规则")
    return questions, stats


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("source_dir", type=Path)
    parser.add_argument(
        "--output",
        type=Path,
        default=Path(__file__).resolve().parents[1] / "content" / "english" / "question-bank.js",
    )
    args = parser.parse_args()
    questions, stats = extract(args.source_dir)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    content = (
        "'use strict';\n"
        "// 由 scripts/import-english-bank.py 从错题 PDF 提取；文本和答案待人工核对。\n"
        "(function (root) {\n"
        "  const questions = "
        + json.dumps(questions, ensure_ascii=False, indent=2)
        + ";\n"
        "  if (typeof module !== 'undefined') module.exports = questions;\n"
        "  else root.EnglishBankQuestions = questions;\n"
        "})(this);\n"
    )
    args.output.write_text(content, encoding="utf-8")
    print(f"已导出 {len(questions)} 道，题型 {dict(Counter(q['type'] for q in questions))}")
    print(f"重复文件 {stats['duplicate_files']}，重复题块 {stats['duplicate_questions']}")
    print(args.output)


if __name__ == "__main__":
    main()
