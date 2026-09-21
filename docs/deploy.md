# 部署到云服务器

这是纯静态站点（HTML + JS + 内容文件），不需要数据库，也不需要后端接口。做题进度存在每个人自己的浏览器里。

## 一、打包（在本机）

```bash
./scripts/build.sh
```

- 会先跑一遍校验，不通过就中止（确要跳过：`./scripts/build.sh --skip-tests`）
- 产物：`dist/xuequ-<日期>-<提交号>.tar.gz`，约 400 KB
- 只包含运行需要的文件：`index.html`、`src/`、`vendor/`、`content/`、`serve.js`、`run.sh`、`VERSION`
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
