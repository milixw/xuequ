'use strict';

// 内容注册表：教材目录（catalog）+ 按需加载的小节内容。
// 小节文件用 <script> 加载，直接打开 index.html（file://）时也能用。

(function (root) {
  const sections = {};
  const loading = {};
  const exams = {};
  const examLoading = {};

  const Content = {
    catalog: null,   // 由 content/catalog.js 赋值
    sections,
    exams,

    // 小节文件里调用：Content.section({ id, title, intro, questions, ... })
    section(def) {
      sections[def.id] = def;
    },

    exam(def) {
      exams[def.id] = def;
    },

    // 小节 ID 形如 math/sh2024/g6s1/1.1，对应文件 content/math/sh2024/g6s1/1.1.js
    path(id) {
      return `content/${id}.js`;
    },

    load(id) {
      if (sections[id]) return Promise.resolve(sections[id]);
      if (!loading[id]) {
        loading[id] = new Promise((resolve, reject) => {
          const el = document.createElement('script');
          el.src = Content.path(id);
          el.onload = () => (sections[id] ? resolve(sections[id]) : reject(new Error('内容文件没有注册小节 ' + id)));
          el.onerror = () => {
            delete loading[id];
            reject(new Error('内容加载失败：' + id));
          };
          document.head.appendChild(el);
        });
      }
      return loading[id];
    },

    examPath(id) {
      return `content/exams/${id}.js`;
    },

    loadExam(id) {
      if (exams[id]) return Promise.resolve(exams[id]);
      if (!examLoading[id]) {
        examLoading[id] = new Promise((resolve, reject) => {
          const el = document.createElement('script');
          el.src = Content.examPath(id);
          el.onload = () => (exams[id] ? resolve(exams[id]) : reject(new Error('内容文件没有注册真题卷 ' + id)));
          el.onerror = () => {
            delete examLoading[id];
            reject(new Error('真题卷加载失败：' + id));
          };
          document.head.appendChild(el);
        });
      }
      return examLoading[id];
    },

    // 所有册，附带完整 ID 和所属学科、教材
    volumes() {
      const list = [];
      for (const subject of Content.catalog.subjects) {
        for (const edition of subject.editions) {
          for (const volume of edition.volumes) {
            list.push({ id: `${subject.id}/${edition.id}/${volume.id}`, subject, edition, volume });
          }
        }
      }
      return list;
    },

    volume(id) {
      return Content.volumes().find(v => v.id === id) || null;
    },

    // 目录里实际有的学期，按册 ID 去重（不同学科可能共用同一册）
    semesters() {
      const list = [];
      for (const v of Content.volumes()) {
        if (!list.some(s => s.id === v.volume.id)) list.push({ id: v.volume.id, name: v.volume.name });
      }
      return list;
    },

    // 按 ID 取学期；存的学期已经不在目录里（比如删了某一册）就退回第一个，避免页面空白
    semester(id) {
      const list = Content.semesters();
      return list.find(s => s.id === id) || list[0] || null;
    },

    // 所有小节的目录信息
    sectionMetas() {
      const list = [];
      for (const v of Content.volumes()) {
        for (const chapter of v.volume.chapters) {
          for (const section of chapter.sections) {
            list.push({ ...v, id: `${v.id}/${section.no}`, volumeId: v.id, chapter, section });
          }
        }
      }
      return list;
    },

    sectionMeta(id) {
      return Content.sectionMetas().find(s => s.id === id) || null;
    },

    examMetas() {
      const list = [];
      for (const v of Content.volumes()) {
        for (const exam of v.volume.exams || []) {
          list.push({ ...v, id: `${v.id}/${exam.id}`, volumeId: v.id, exam });
        }
      }
      return list;
    },

    examMeta(id) {
      return Content.examMetas().find(e => e.id === id) || null;
    },

    // ---------- 学科、入口、游戏（首页和学科页用） ----------
    subjects() {
      return Content.catalog.subjects;
    },

    subject(id) {
      return Content.catalog.subjects.find(s => s.id === id) || null;
    },

    // 学期 ID 排成可比较的数：g6s1 → 12、g6s2 → 13；认不出的返回 null
    semesterRank(id) {
      const m = /^g(\d+)s([12])$/.exec(id || '');
      return m ? Number(m[1]) * 2 + Number(m[2]) - 1 : null;
    },

    // 学期 ID 里的年级：g9s1 → 9
    grade(semesterId) {
      const rank = Content.semesterRank(semesterId);
      return rank === null ? null : Math.floor(rank / 2);
    },

    // from 不晚于当前学期（或没写 from）才显示；当前学期认不出时全部显示
    shownFrom(entry, semesterId) {
      const now = Content.semesterRank(semesterId);
      const from = Content.semesterRank(entry.from);
      return now === null || from === null || from <= now;
    },

    // 学科页的入口：按学期过滤，中考类在九年级以前标 folded（收进“中考专区”）
    resources(subjectId, semesterId) {
      const subject = Content.subject(subjectId);
      const grade = Content.grade(semesterId);
      return ((subject && subject.resources) || [])
        .filter(r => Content.shownFrom(r, semesterId))
        .map(r => ({ ...r, folded: r.stage === 'zhongkao' && grade !== null && grade < 9 }));
    },

    // 趣味玩法：shown 是当前学期能用的，all 是全部；subjectId 只取某一学科的
    games(semesterId, subjectId) {
      const all = (Content.catalog.games || []).filter(g => !subjectId || g.subject === subjectId);
      return { all, shown: all.filter(g => Content.shownFrom(g, semesterId)) };
    },
  };

  if (typeof module !== 'undefined') module.exports = Content;
  else root.Content = Content;
})(this);
