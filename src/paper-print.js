/* 真题打印：保留原题，隐藏作答控件；打印期间展开关联材料。 */
(function (root) {
  'use strict';
  let opened = [];
  function prepare() {
    for (const detail of root.document.querySelectorAll('.past-paper-sheet .subject-papers-context')) {
      if (!detail.open) { opened.push(detail); detail.open = true; }
    }
  }
  function restore() {
    opened.forEach(detail => { detail.open = false; }); opened = [];
  }
  function mount(main) {
    main.className = (main.className ? main.className + ' ' : '') + 'past-paper-sheet';
    const actions = root.document.createElement('div'); actions.className = 'past-paper-print-actions';
    const button = root.document.createElement('button'); button.type = 'button'; button.textContent = '打印试题';
    button.addEventListener('click', () => root.print()); actions.appendChild(button); main.appendChild(actions);
  }
  if (typeof root.addEventListener === 'function') {
    root.addEventListener('beforeprint', prepare);
    root.addEventListener('afterprint', restore);
  }
  const api = { mount, prepare, restore };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.PaperPrint = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
