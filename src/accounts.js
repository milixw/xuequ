'use strict';

// 账号模块：自由注册（无密码）+ 按账号保存考试历史。
// 设计文档：docs/superpowers/specs/2026-09-22-account-redesign-design.md

(function (root) {
  const KEY = 'xq.account.v1';
  const HISTORY_KEY_PREFIX = 'xq.history.v1.';
  const GRADE_KEY_PREFIX = 'xq.grade.v1.';
  const GRADE_KEY_ANON = 'xq.grade.v1';
  const NAME_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*$/;
  const NAME_MIN = 1;
  const NAME_MAX = 20;

  function readCurrent() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      return obj && typeof obj.name === 'string' ? obj.name : null;
    } catch {
      return null;
    }
  }

  function writeCurrent(name) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ name }));
      return true;
    } catch {
      return false;
    }
  }

  function removeCurrent() {
    try { localStorage.removeItem(KEY); } catch {}
  }

  function historyKey(username) {
    return HISTORY_KEY_PREFIX + username;
  }

  // 没登录时返回 null，调用方改用匿名键
  function gradeName(username) {
    return typeof username === 'string' && username ? GRADE_KEY_PREFIX + username : null;
  }

  function readGrade(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      return obj && typeof obj.grade === 'string' ? obj.grade : null;
    } catch {
      return null;
    }
  }

  function readHistory(username) {
    try {
      const raw = localStorage.getItem(historyKey(username));
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }

  function writeHistory(username, list) {
    try {
      localStorage.setItem(historyKey(username), JSON.stringify(list));
      return true;
    } catch {
      return false;
    }
  }

  function removeHistory(username) {
    try { localStorage.removeItem(historyKey(username)); } catch {}
  }

  function formatCheck(name) {
    if (typeof name !== 'string') return { ok: false, error: '请输入账号' };
    const trimmed = name.trim();
    if (trimmed.length < NAME_MIN) return { ok: false, error: '请输入账号' };
    if (trimmed.length > NAME_MAX) {
      return { ok: false, error: `账号长度 1–${NAME_MAX} 个字符` };
    }
    if (!NAME_PATTERN.test(trimmed)) {
      return { ok: false, error: '账号只能是字母、下划线、数字，不能是纯数字或含其他字符' };
    }
    return { ok: true };
  }

  // 宽松校验：只屏蔽控制字符和空白，允许任意字符（含中文、emoji 等）
  function looseCheck(name) {
    if (typeof name !== 'string') return { ok: false, error: '请输入账号' };
    if (name.length < 1) return { ok: false, error: '请输入账号' };
    if (name.length > NAME_MAX) return { ok: false, error: `账号长度不能超过 ${NAME_MAX}` };
    if (/[\x00-\x1F\x7F\s]/.test(name)) {
      return { ok: false, error: '账号不能包含空格或控制符号' };
    }
    return { ok: true };
  }

  function makeId() {
    return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  }

  const Accounts = {
    KEY,
    HISTORY_KEY_PREFIX,
    NAME_PATTERN,
    NAME_MIN,
    NAME_MAX,

    formatCheck,
    looseCheck,

    current() {
      return readCurrent();
    },

    signIn(name, opts) {
      if (typeof name !== 'string') {
        return { ok: false, error: '请输入账号' };
      }
      const trimmed = name.trim();
      const validator = opts && opts.strict ? formatCheck : looseCheck;
      const check = validator(trimmed);
      if (!check.ok) return check;
      if (!writeCurrent(trimmed)) {
        return { ok: false, error: '存储不可用' };
      }
      return { ok: true };
    },

    signOut() {
      removeCurrent();
    },

    history: {
      list(username) {
        if (typeof username !== 'string' || !username) return [];
        const arr = readHistory(username);
        arr.sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0));
        return arr;
      },

      append(username, record) {
        if (typeof username !== 'string' || !username) return;
        if (!record || typeof record !== 'object') return;
        const list = readHistory(username);
        // 深拷贝避免和源 record 共享引用
        const cloned = JSON.parse(JSON.stringify(record));
        const item = Object.assign({}, cloned, { id: cloned.id || makeId() });
        list.push(item);
        writeHistory(username, list);
      },

      clear(username) {
        if (typeof username !== 'string' || !username) return;
        removeHistory(username);
      },

      get(username, recordId) {
        if (typeof username !== 'string' || !recordId) return null;
        return readHistory(username).find(r => r.id === recordId) || null;
      },
    },

    // 学期偏好：登录后存 localStorage['xq.grade.v1.<账号>']，未登录存 'xq.grade.v1'
    // 未登录也要能切换，所以没账号时用匿名键；登录后自己还没选过，就沿用匿名时选的那个
    grade: {
      DEFAULT: 'g6s1',
      get(username) {
        const own = gradeName(username) ? readGrade(gradeName(username)) : null;
        return own || readGrade(GRADE_KEY_ANON) || Accounts.grade.DEFAULT;
      },
      set(username, grade) {
        if (typeof grade !== 'string' || !grade) return;
        try { localStorage.setItem(gradeName(username) || GRADE_KEY_ANON, JSON.stringify({ grade })); } catch {}
      },
    },
  };

  if (typeof module !== 'undefined') module.exports = Accounts;
  else root.Accounts = Accounts;
})(this);
