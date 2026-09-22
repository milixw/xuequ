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
  };

  if (typeof module !== 'undefined') module.exports = Content;
  else root.Content = Content;
})(this);
