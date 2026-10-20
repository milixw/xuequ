# 新练习模式 / 新页面清单

加一种新的练习模式（比如错题本、章末综合练习、某学科专用的练习页）或新页面时，按下面逐项做完再提交。

1. **设计文档**：较大的功能先写 `docs/superpowers/specs/<日期>-<名称>.md`，写清页面流程、数据从哪来、存什么、怎么测
2. **代码位置**：页面逻辑放 `src/<模式>.js`；纯逻辑（判分、统计、状态机）放不依赖 DOM 的部分并 `module.exports`，方便测试；样式写进 `src/app.css`，用本模式专属的类名前缀
3. **加载方式**：脚本在 `index.html` 里用 `<script>` 加载；大体积数据不进 `index.html`，在 `src/app.js` 的 `DATA_SCRIPTS` 里登记按需加载；不用 `fetch`
4. **路由和存储**：新 hash 路由、新的 `xq.` 存储键登记到 `docs/storage-and-routes.md`（测试会检查存储键）；按账号保存的学习数据走 `LearningStore`，不要自己拼账号键
5. **测试**：新建 `tests/<模式>.test.js` 并在 `tests/run.js` 里 `require`，在 `tests/AGENTS.md` 的列表里加一行
6. **约定文档**：在 `src/AGENTS.md` 的文件列表加一行；这个模式有自己的目录或内容格式时，建目录级 `AGENTS.md` + `CLAUDE.md`；根 `AGENTS.md` 的任务路由表加一行
7. **入口**：属于某个学科的，在 `content/catalog.js` 那个学科的 `resources` 里加一条（选 `group`，中考类加 `stage: 'zhongkao'`，有年级范围加 `from`），学科页自动出现，不改 `src/app.js`；要先登录、要解锁这类特殊行为才加 `special` 并在 `app.js` 的学科页接上。首页只放“今天”和学科卡片，新模式一般不直接上首页。在手机宽度（320px）下截图确认
8. `node tests/run.js` 全绿后提交
