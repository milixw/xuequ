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

## 五、配域名和 HTTPS（可选）

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

## 六、注意事项

- **内容都标着"待审核"**：还没有数学老师审核过，对外开放前要处理
- **做题进度存在浏览器本地**：换设备、换浏览器、清理数据都会丢；要跨设备保存得另做账号和后端
- **没有访问统计**：需要的话可以在服务器上看 `server.log`，或者接入统计服务
- **更新内容后**：页面和内容文件的缓存是 5 分钟（`no-cache` / `max-age=300`），学生刷新即可拿到新内容；KaTeX 相关文件按一年缓存，因为文件名不变但内容也不会变
