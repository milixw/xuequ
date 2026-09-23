'use strict';

const { test, assert } = require('./harness');

// DOM stub
function makeEl(tag) {
  const el = {
    tagName: (tag || 'div').toUpperCase(),
    children: [],
    classList: { _set: new Set(), add(c) { this._set.add(c); }, remove(c) { this._set.delete(c); }, toggle(c, on) { if (on) this._set.add(c); else this._set.delete(c); }, contains(c) { return this._set.has(c); } },
    attrs: {},
    textContent: '',
    innerHTML: '',
    style: {},
    parentNode: null,
    appendChild(child) { this.children.push(child); child.parentNode = this; return child; },
    insertBefore(child, ref) { const i = this.children.indexOf(ref); if (i < 0) this.appendChild(child); else { this.children.splice(i, 0, child); child.parentNode = this; } return child; },
    removeChild(child) { const i = this.children.indexOf(child); if (i >= 0) { this.children.splice(i, 1); child.parentNode = null; } return child; },
    addEventListener() {},
    removeEventListener() {},
    querySelector() { return null; },
    querySelectorAll() { return []; },
    setAttribute(k, v) { this.attrs[k] = v; },
    getAttribute(k) { return this.attrs[k]; },
    focus() {},
    dispatchEvent() {},
    click() {},
  };
  return el;
}

global.document = {
  createElement: makeEl,
  body: makeEl('body'),
  addEventListener() {},
  removeEventListener() {},
};
global.window = global;
// 注意：不要在这里覆盖 global.localStorage，会污染 accounts.test.js 的 mock
// AccountUI 测试在每个用例里都先 signOut/signIn，自带隔离
global.Event = function (type) { return { type }; };

const Accounts = require('../src/accounts.js');
// account-ui.js 内部以全局 Accounts 引用，测试里把它挂到 global 上
global.Accounts = Accounts;
const AccountUI = require('../src/account-ui.js');
AccountUI.bindUI({ escapeHtml: s => String(s) });

test('AccountUI.mount: 未登录时挂账号区', () => {
  Accounts.signOut();
  const header = makeEl('header');
  AccountUI.mount(header);
  assert(header.children.length > 0, '应在 header 内 append 账号区');
});

test('AccountUI.mount: 已登录时挂账号区（不抛错）', () => {
  Accounts.signIn('xiaoming');
  const header = makeEl('header');
  AccountUI.mount(header);
  assert(header.children.length > 0);
});

test('AccountUI.ensureLoggedIn 已登录直接回调', () => {
  Accounts.signIn('xiaoming');
  let called = false;
  AccountUI.ensureLoggedIn(() => { called = true; });
  assert(called, '已登录应直接回调');
});

test('AccountUI.ensureLoggedIn 未登录唤出模态框（不直接回调）', () => {
  Accounts.signOut();
  let called = false;
  AccountUI.ensureLoggedIn(() => { called = true; });
  assert(!called, '未登录不应直接回调（应在登录成功后回调）');
});

test('AccountUI.isLoggedIn 反映当前账号', () => {
  Accounts.signOut();
  assert(!AccountUI.isLoggedIn());
  Accounts.signIn('alice');
  assert(AccountUI.isLoggedIn());
});