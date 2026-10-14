# 部署到云服务器

这是纯静态站点（HTML + JS + 内容文件），不需要数据库，也不需要后端接口。做题进度存在每个人自己的浏览器里。

## 一、打包（在本机）

```bash
./scripts/build.sh
```

- 会先跑一遍校验，不通过就中止（确要跳过：`./scripts/build.sh --skip-tests`）
- 产物：`dist/xuequ-<日期>-<提交号>.tar.gz`，约 400 KB
- 只包含运行需要的文件：`index.html`、`src/`、`vendor/`、`content/`、`serve.js`、`run.sh`、`private-gate.js`（私有资料口令服务，见第八节）、`VERSION`
- 不包含：测试、文档、教材照片、开发脚本
- `VERSION` 里记录了构建时间、提交号和已上线的小节清单，上线后可以核对

## 二、上传并启动（在服务器）

> 服务器上已经有 nginx（比如前面挂着别的服务），跳到「五、服务器上已有 nginx」——静态站直接交给 nginx，不用起这里的 node 进程。

```bash
scp dist/xuequ-20260920-0859-068d3a9.tar.gz user@服务器:~/
ssh user@服务器
tar -xzf xuequ-20260920-0859-068d3a9.tar.gz
cd xuequ-20260920-0859-068d3a9
./run.sh start
```

默认监听 `0.0.0.0:8080`。常用命令：

```bash
./run.sh start      # 后台启动
./run.sh status     # 查看状态和访问地址
./run.sh restart    # 重启
./run.sh stop       # 停止
./run.sh logs       # 实时看访问日志
PORT=9000 ./run.sh start          # 换端口
HOST=127.0.0.1 ./run.sh start     # 只监听本机（前面套 nginx 时用）
```

服务器上有 node 就用 `serve.js`（零依赖，带缓存头和访问日志）；没有 node 会自动退回 `python3 -m http.server`，能用但没有缓存头，建议装 node。

**记得在云服务商控制台的安全组／防火墙放行端口**，否则外网访问不了。

## 三、更新版本

```bash
# 本机
./scripts/build.sh
scp dist/新包.tar.gz user@服务器:~/

# 服务器
cd 旧目录 && ./run.sh stop && cd ~
tar -xzf 新包.tar.gz && cd 新目录 && ./run.sh start
```

每个版本解压到独立目录，出问题时回退只要停掉新的、启动旧的。确认没问题后再删旧目录。

## 四、开机自启（可选，推荐）

用 `./run.sh start` 启动的进程，服务器重启后不会自动恢复。要常驻就配 systemd：

```bash
sudo tee /etc/systemd/system/xuequ.service > /dev/null <<'EOF'
[Unit]
Description=xuequ static site
After=network.target

[Service]
Type=simple
User=你的用户名
WorkingDirectory=/home/你的用户名/xuequ-current
Environment=PORT=8080
Environment=HOST=0.0.0.0
ExecStart=/home/你的用户名/xuequ-current/run.sh foreground
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now xuequ
sudo systemctl status xuequ
```

配合软链接管理版本，切换和回退都只改链接：

```bash
ln -sfn ~/xuequ-20260920-0859-068d3a9 ~/xuequ-current
sudo systemctl restart xuequ
```

注意：用 systemd 时不要再用 `./run.sh start`，两者会抢端口。

## 五、服务器上已有 nginx（挂在子路径下）

服务器上已经跑着 nginx（比如前面挂着别的站点），**就走这一节，不要再用 `run.sh` 起 node 进程**：本项目是纯静态站，交给 nginx 直接提供就行，不用开端口、不用改安全组，也不受域名备案进度影响——现有站点从哪个地址访问，它就从同一个地址的子路径（比如 `/xue/`）访问。

先看清现有配置挂在哪个 server 块：

```bash
nginx -T 2>/dev/null | grep -nE "server_name|listen|location|proxy_pass" | head -40
```

### 目录：用软链管版本

```bash
sudo mkdir -p /srv/web
sudo tar -xzf ~/xuequ-20260920-0859-068d3a9.tar.gz -C /srv/
sudo ln -sfn /srv/xuequ-20260920-0859-068d3a9 /srv/web/xue
```

`/srv/web/xue` 这条软链就是对外的入口，升级和回退都只改它。

### nginx 配置

加进 **现有站点的那个 server 块**，不要新建 server 块，也不要动它的 `location /`：

```nginx
location = /xue  { return 301 /xue/; }          # 少打尾斜杠不会白屏
location = /xue/ { root /srv/web; index index.html; }

location /xue/ {
    root /srv/web;                               # /xue/xxx → /srv/web/xue/xxx
    add_header X-Content-Type-Options nosniff always;
    add_header Cache-Control "public, max-age=300, must-revalidate" always;
}

location ^~ /xue/vendor/ {                       # KaTeX 文件名不变、内容也不变
    root /srv/web;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
}

location ~ ^/xue/.*\.html$ {                     # 页面不缓存，改了刷新就生效
    root /srv/web;
    add_header Cache-Control "no-cache" always;
}
```

后三段是把 `scripts/serve.js` 里的缓存策略搬到 nginx 上。`^~` 和正则的先后顺序是有意的：`^~` 命中后 nginx 不再查正则，所以 vendor 走一年缓存、html 走 no-cache、其余走 5 分钟。

```bash
sudo nginx -t && sudo systemctl reload nginx     # reload 不会断开现有连接
```

然后访问 `http://<现有站点的地址>/xue/`。

### 为什么子路径不用配前缀

页面里的资源引用全是相对路径（`src/app.css`、`content/catalog.js`），路由是纯 hash（`src/app.js` 里读 `location.hash`），小节文件按 `content/<小节 ID>.js` 相对加载（`src/content.js`），函数轨道那页的返回链接是 `../../../index.html`。没有一处写死根路径，所以挂在任何前缀下都能用，不需要像别的项目那样配一个 `BASE_PATH`。

### 备选：反代 serve.js

不想在 nginx 里重写缓存规则，也可以让 `serve.js` 继续干它的活：

```nginx
location /xue/ { proxy_pass http://127.0.0.1:8080/; }   # 末尾这个 / 会剥掉前缀
```

配合 `HOST=127.0.0.1 ./run.sh start`（不对外监听，安全组不用动）。好处是 MIME、缓存头、安全头都沿用 `serve.js` 里已经测过的那套；代价是多一个常驻 node 进程和一份 systemd 单元。**纯静态站优先选上面的 nginx 方案**，少一个进程就少一处会挂的地方。

### 升级和回退

```bash
# 本机
./scripts/build.sh
scp dist/新包.tar.gz user@服务器:~/

# 服务器
sudo tar -xzf ~/新包.tar.gz -C /srv/
sudo ln -sfn /srv/xuequ-新版本 /srv/web/xue
```

软链一改立刻生效，nginx 都不用 reload，现有站点不受影响。回退就是把软链指回旧目录，确认新版没问题后再删旧目录。

### 注意

- **nginx 的 worker 用户要能读到解压目录**：`sudo -u www-data test -r /srv/web/xue/index.html && echo ok`（CentOS 系那个用户叫 `nginx`）
- **不要改动现有站点原来的 `location` 配置**，只在同一个 server 块里追加上面几段

## 六、配域名和 HTTPS（可选）

手机浏览器访问 HTTP 站点会提示"不安全"，如果要给学生用，建议配上域名和证书。做法是让服务只监听本机，前面用 nginx 转发：

```nginx
server {
    listen 80;
    server_name 你的域名;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

然后：

```bash
HOST=127.0.0.1 ./run.sh restart     # 或改 systemd 里的 Environment=HOST=127.0.0.1
sudo certbot --nginx -d 你的域名     # 自动申请证书并改成 HTTPS
```

也可以完全不用 node：直接让 nginx 的 `root` 指向解压目录，静态文件由 nginx 提供。这时 `serve.js` 和 `run.sh` 都用不到。

### 从子路径切到子域名

按第五节挂在 `/xue/` 下的，等域名备案下来可以换成独立子域名：把那几段 `location` 挪进新的 server 块，去掉 `/xue/` 前缀、`root` 从 `/srv/web` 改成 `/srv/web/xue`，再签证书：

```bash
sudo certbot --nginx -d xue.你的域名 -d 其他.你的域名    # 同一台机器上的多个域名可以一条命令一起签
```

备案之前子路径那套照样能用，不是白配的过渡。

## 七、注意事项

- **内容都标着"待审核"**：还没有数学老师审核过，对外开放前要处理
- **做题进度存在浏览器本地**：换设备、换浏览器、清理数据都会丢；要跨设备保存得另做账号和后端
- **没有访问统计**：需要的话可以在服务器上看 `server.log`，或者接入统计服务
- **和别的服务共用一台机器**：按第五节走 nginx 静态方案时本项目没有常驻进程；用 `serve.js` 时约占几十 MB 内存，1 核 1G 的机器也够用
- **更新内容后**：页面和内容文件的缓存是 5 分钟（`no-cache` / `max-age=300`），学生刷新即可拿到新内容；KaTeX 相关文件按一年缓存，因为文件名不变但内容也不会变

## 八、私有课本资料（口令解锁，只支持 HTTPS）

课本原文和录音放在 GitHub 私有仓库 `xuequ-private`（本机克隆在 `private/`），不在公开包里。线上由 nginx 提供文件，口令服务 `private-gate.js` 只负责核对口令和凭证。设计见 `docs/superpowers/specs/2026-10-13-private-textbook.md`。

**下面按这样的布局写**：站点挂在 `https://<域名>/xuequ/`，公开部分发布到 `/srv/xuequ/releases/<版本>/`，软链 `/srv/xuequ/web/xuequ` 指向在线版本；nginx 配置是 `/etc/nginx/snippets/xuequ.conf`，只被 443 server 引用（HTTP 不挂）。上面第五节的 `/xue/` 是旧的通用写法。

**私有资料的发布由 `private/scripts/setup-server.sh` 完成**：把下面 1～3 步全部做完并检查（可重复运行），口令从发布环境读，不写进本仓库。下面是它具体做了什么，手工部署或排查时参考。

**维护者的线上发布**（发布命令、服务器操作记录、线上验证）写在私有仓库的 `DEPLOY.md`（本机在 `private/` 里），不放进开源仓库；没有 `private/` 的协作者不需要发布。

HTTP 站点不配：页面查不到口令服务，就不显示“🔑 课本资料”入口；凭证 cookie 带 `Secure`，HTTP 下浏览器也不会发送。

### 1. 口令服务（systemd）

服务器 nginx 已带 `auth_request` 模块、已装 node（`/usr/local/bin/node`），口令服务程序随公开包发布，在 `/srv/xuequ/web/xuequ/private-gate.js`。

```bash
sudo tee /etc/xuequ-gate.env > /dev/null <<EOF
PRIVATE_PASS=这里写口令
PRIVATE_SECRET=$(openssl rand -hex 32)
PORT=6477
HOST=127.0.0.1
PRIVATE_COOKIE_PATH=/xuequ/
EOF
sudo chmod 600 /etc/xuequ-gate.env

sudo tee /etc/systemd/system/xuequ-gate.service > /dev/null <<'EOF'
[Unit]
Description=xuequ private textbook gate
After=network.target

[Service]
Type=simple
User=nobody
EnvironmentFile=/etc/xuequ-gate.env
ExecStart=/usr/local/bin/node /srv/xuequ/web/xuequ/private-gate.js
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF
sudo systemctl daemon-reload && sudo systemctl enable --now xuequ-gate
sudo journalctl -u xuequ-gate -n 20
```

看到“口令服务已启动”就行。

- 发布新版本后，`private-gate.js` 改过时要 `sudo systemctl restart xuequ-gate`（软链已指向新版本）
- **改口令**：改 `/etc/xuequ-gate.env` 里的 `PRIVATE_PASS` 再重启，所有人的旧凭证立刻失效，要重新输入
- 凭证有效期 30 天；同一 IP 每分钟最多试 5 次口令

### 2. 私有文件

`setup-server.sh` 用 rsync **增量同步**到 `/srv/xuequ/private/`（服务器要装 rsync）：只同步 `manifest.js` 和 `english/`，按大小和修改时间只传新增和变了的课本图片、录音，删掉本地已没有的；先传资料再传 `manifest.js`，页面不会读到缺文件的状态。课本图片、录音越来越多也只传改动部分。

没有 rsync 的服务器可以手工整包部署：在私有仓库里打包（`./scripts/pack.sh`），上传后解压：

```bash
sudo mkdir -p /srv/xuequ/private
sudo tar --no-same-owner -xzf ~/xuequ-private-<日期>.tar.gz -C /srv/xuequ/private --strip-components=1
sudo chmod -R a+rX /srv/xuequ/private
```

**不要放进 `/srv/xuequ/web/` 下面**，那里没有口令保护；公开部分的发布也不会碰 `/srv/xuequ/private/`。

### 3. nginx 配置

追加到 `/etc/nginx/snippets/xuequ.conf` 的末尾，放在 `location ^~ /xuequ/ { … }` **外面**（同为 `^~` 前缀，nginx 取最长的那个，所以这几段优先于 `/xuequ/`）：

```nginx
location ^~ /xuequ/api/private/ {
    proxy_pass http://127.0.0.1:6477;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Real-IP $remote_addr;
}

location = /xuequ/api/private-auth {
    internal;
    proxy_pass http://127.0.0.1:6477/check;
    proxy_pass_request_body off;
    proxy_set_header Content-Length "";
}

location ^~ /xuequ/private/ {
    auth_request /xuequ/api/private-auth;
    alias /srv/xuequ/private/;
    add_header X-Content-Type-Options nosniff always;
    add_header Cache-Control "private, max-age=300" always;
}
```

第一段是解锁和状态接口，第二段只给第三段的 `auth_request` 用，第三段是私有文件：凭证有效才放行。

```bash
sudo nginx -t && sudo systemctl reload nginx
curl -s https://<域名>/xuequ/api/private/status
curl -s -o /dev/null -w '%{http_code}\n' https://<域名>/xuequ/private/manifest.js
```

前一条应输出 `{"unlocked":false}`，后一条应输出 `401`。
