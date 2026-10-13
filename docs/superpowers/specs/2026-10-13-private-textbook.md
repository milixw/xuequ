# 私有课本资料：口令解锁的课文原文与录音

状态：设计稿，待维护者审核。

## 背景与目标

英语单元阅读已经能用设备语音或在线读音朗读原创短文，但学生更需要听**课本课文的真人录音**、对照**课文原文**。课本 PDF 和配套录音（`refs/沪教版五四制初中英语/<册>/音频/`）受版权保护，本项目是开源的，不能收录。

做法：课本资料放进单独的 **GitHub 私有仓库**，部署到服务器上一个不公开的目录；页面上有一个“🔑 课本资料”按钮，输入口令后才能看到和下载。开源仓库里只有“有私有资料就显示、没有就不显示”的接口代码，不含任何课本内容和口令。

不在范围内：数学课本、账号体系改造、离线缓存录音。

## 总体结构

```
开源仓库 ai/game/                     私有仓库 xuequ-private（克隆到 ai/game/private/，被 .gitignore 忽略）
  index.html  加载 private-ui.js        manifest.js                 有哪些册、单元、栏目
  src/private-ui.js  入口按钮、解锁、页面   english/<册ID>/U<n>.js       某单元的课文原文与录音清单
  scripts/private-gate.js  口令服务        english/<册ID>/audio/*.m4a   压缩后的录音
                                        scripts/  从 refs/ 生成上面这些文件的脚本
```

线上：

```
nginx  /xuequ/            → /srv/xuequ/web/xuequ/   公开静态文件（现状不变，mymili 的 pnpm deploy:xuequ 发布）
       /xuequ/private/    → /srv/xuequ/private/      先问口令服务，凭证有效才放行（auth_request）
       /xuequ/api/private/ → 127.0.0.1:6477            口令服务：解锁、校验、状态
```

录音和课文由 nginx 直接提供：nginx 支持 Range 请求，iPhone Safari 播放、拖动进度条都靠它；口令服务只回答“这个请求能不能放行”，不传文件。

## 口令与登录凭证

- 口令只存在服务器环境变量 `PRIVATE_PASS` 里，不写进任何仓库。另有 `PRIVATE_SECRET`（随机长串）用来给凭证签名
- `POST /xuequ/api/private/unlock`，请求体 `{ "pass": "…" }`：
  - 口令对 → 返回 204，并设 cookie `xq_private=<到期时间>.<签名>`；签名 = HMAC-SHA256(`PRIVATE_SECRET` + 口令, 到期时间)。属性：`HttpOnly; Secure; SameSite=Strict; Path=/xuequ/; Max-Age=2592000`（30 天）
  - 口令错 → 403；同一 IP 每分钟最多 5 次，超过返回 429（防暴力猜）
  - 只接受 HTTPS：nginx 转发时带 `X-Forwarded-Proto`，不是 `https` 一律拒绝
- `GET /xuequ/api/private/check`：nginx `auth_request` 用，凭证签名对且没过期返回 204，否则 401
- `GET /xuequ/api/private/status`：返回 `{ "unlocked": true|false }`，页面用来决定显示“🔑 课本资料”还是直接进入
- **改口令即作废所有人的凭证**（签名里含口令）；比对用 `crypto.timingSafeEqual`
- 只用 Node 标准库，零依赖；systemd 单元和 nginx 配置写进 `docs/deploy.md`

## 页面

- 入口：首页“复习资料”区加一个“🔑 课本资料”小格
  - 本机直接打开（`file://` 或本地服务器）且 `private/manifest.js` 存在：直接可用，不问口令
  - 线上：先查 `status`；没解锁时点小格弹出口令框（输入框 + “解锁”按钮，错了提示“口令不对”，太频繁提示“稍后再试”），解锁后进入
  - 线上没部署口令服务（`status` 返回 404）：不显示这个小格
- 解锁后用 `<script>` 加载 `private/manifest.js` 和各单元文件（同源请求自动带 cookie）；不用 `fetch` 读本地文件，`file://` 也能用。`fetch` 只用于调口令服务的三个接口
- 新路由 `#/textbook/<册ID>/<单元号>`：本单元课本栏目列表，每个栏目一个录音播放器（可调 0.75 / 1 / 1.25 倍速），有原文的栏目下面显示原文，可“显示 / 隐藏原文”
- 英语单元的小节页（`.1`、`.3`）顶部，在已解锁时多一行“🎧 听课本录音”，链到上面的路由；没解锁时什么都不显示
- 不新增 localStorage 键（解锁状态在 HttpOnly cookie 里，页面读不到也不需要读）

## 私有仓库的数据格式

`manifest.js`：

```js
Private.manifest({
  english: {
    g6s1: { title: '六年级上册', units: [{ no: 1, title: 'School life', file: 'english/g6s1/U1.js' }] },
  },
});
```

`english/g6s1/U1.js`：

```js
Private.unit('english/g6s1/1', {
  sections: [
    { name: 'Reading', page: 16, audio: 'english/g6s1/audio/08-U1-reading.m4a', text: ['…', '…'] },
    { name: 'Words and expressions', audio: 'english/g6s1/audio/10-U1-words.m4a' },
  ],
});
```

- 录音：从 `refs/` 的 mp3 转成 AAC 单声道 32kbps（实测 100 秒 2.4MB → 413KB，一册约 20MB）。文件名不用中文和空格
- 原文：用 `scripts/textbook-text.py` 按页导出后人工整理成段落；先做 Reading，其余栏目只放录音
- 栏目和录音的对应：按录音文件名里的 `Unit n <栏目名>` 自动配，配不上的列出来人工处理

## 开源仓库的防泄露措施

- `.gitignore` 加 `private/`
- 新测试：git 跟踪的文件里不能有 `private/` 下的路径；开源代码里不能出现 `PRIVATE_PASS` 的取值或任何 cookie 签名密钥
- 公开打包 `scripts/build.sh` 不变（只打 `index.html`、`src/`、`vendor/`、`content/`），不会带上 `private/`；私有仓库自带打包脚本，产物上传到 `/srv/xuequ/private/`
- 约定文档里只写接口和格式，不写口令、不贴课文

## 版权说明

闭源加口令能把范围限制在自己人，但不等于获得授权；口令只发给自己的孩子和学生，不要公开传播。课本 PDF 不进私有仓库，只留在维护者本机 `refs/`。

## 实施步骤（每步完成后停下来审核）

1. 开源仓库：`scripts/private-gate.js` + 测试（口令对错、签名、过期、限流、非 HTTPS 拒绝）；`docs/deploy.md` 加 nginx 与 systemd 配置
2. 开源仓库：`src/private-ui.js`（入口、口令框、`#/textbook/...` 页面、小节页链接）+ `.gitignore` + 防泄露测试；登记路由到 `docs/storage-and-routes.md`
3. 私有仓库：建库、压缩录音和生成清单的脚本；**先只做六上**（录音 + Reading 原文），审核通过后再补其他册
4. 部署：服务器上配口令服务和 nginx，真机（iPhone、安卓）验证解锁、播放、拖动进度、30 天免登录

## 待确认

- 入口位置放首页“复习资料”区可以吗
- 原文先只做 Reading，其他栏目只有录音，可以吗
- 口令服务端口和 `/srv/xuequ/private/` 路径按服务器实际情况定

## 后续：按册切换与看课本听录音（2026-10-13 维护者确认）

- 目录：`#/textbook` 跳到首页右上角所选学期那一册，册页顶部切换册；选哪一册写在网址里，不新增存储键
- 整页课本：生成脚本把整本 PDF 逐页转成 JPEG（宽约 1240、质量 55，一册 162 页约 37MB），放 `english/<册ID>/pages/p<文件页码三位>.jpg`；manifest 每册加 `short`（如“六上”）和 `book: { dir, offset, count }`，每个单元加 `pages: [[起, 止], …]`（课本页码），附录取单元以外的页
- 单元页默认“看课本听录音”：本单元的页竖排、滑到附近才加载，栏目指向范围外的页（总词表）附在后面；底部固定播放栏（栏目按钮、播放器、倍速），点栏目滚到那一页并播放；原来的录音和原文列表保留在 `…/list`
- 录音和页面不做逐句同步（一个栏目常跨两三页，要人工标时间点），学生边听边往下滑
