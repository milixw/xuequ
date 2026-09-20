'use strict';

// 静态文件服务器，只用 Node 标准库，不需要安装任何依赖。
// 用法：node serve.js          （默认 0.0.0.0:8080）
//      PORT=9000 node serve.js
//      HOST=127.0.0.1 node serve.js   （只监听本机，前面套 nginx 时用）

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = Number(process.env.PORT) || 8080;
const HOST = process.env.HOST || '0.0.0.0';
const ROOT = path.resolve(__dirname);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

// KaTeX 的字体和脚本长期不变，可以长缓存；页面和内容文件每次都要核对新旧
function cacheControl(pathname) {
  if (pathname.startsWith('/vendor/')) return 'public, max-age=31536000, immutable';
  if (pathname === '/' || pathname.endsWith('.html')) return 'no-cache';
  return 'public, max-age=300, must-revalidate';
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, { 'Content-Length': Buffer.byteLength(body), ...headers });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const started = Date.now();
  const done = status => {
    const ms = Date.now() - started;
    console.log(`${new Date().toISOString()} ${req.method} ${req.url} ${status} ${ms}ms`);
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    send(res, 405, '只支持 GET', { 'Content-Type': MIME['.txt'], Allow: 'GET, HEAD' });
    return done(405);
  }

  let pathname;
  try {
    pathname = decodeURIComponent(url.parse(req.url).pathname);
  } catch {
    send(res, 400, '地址无法解析', { 'Content-Type': MIME['.txt'] });
    return done(400);
  }

  const filePath = path.join(ROOT, pathname === '/' ? 'index.html' : pathname);
  // 防目录穿越：解析后必须仍在 ROOT 之内
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    send(res, 403, '禁止访问', { 'Content-Type': MIME['.txt'] });
    return done(403);
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      send(res, 404, '页面不存在', { 'Content-Type': MIME['.txt'] });
      return done(404);
    }

    const etag = `"${stat.size}-${stat.mtimeMs}"`;
    const headers = {
      'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': cacheControl(pathname),
      'Last-Modified': stat.mtime.toUTCString(),
      ETag: etag,
      'X-Content-Type-Options': 'nosniff',
    };

    if (req.headers['if-none-match'] === etag) {
      res.writeHead(304, headers);
      res.end();
      return done(304);
    }

    headers['Content-Length'] = stat.size;
    res.writeHead(200, headers);
    if (req.method === 'HEAD') {
      res.end();
      return done(200);
    }

    const stream = fs.createReadStream(filePath);
    stream.on('error', () => res.destroy());
    stream.pipe(res);
    res.on('finish', () => done(200));
  });
});

server.listen(PORT, HOST, () => {
  console.log(`静态服务器已启动：http://${HOST}:${PORT}  （目录 ${ROOT}）`);
});

// systemd 停止服务时会发 SIGTERM，等已有请求处理完再退出
for (const sig of ['SIGTERM', 'SIGINT']) {
  process.on(sig, () => {
    console.log(`收到 ${sig}，正在关闭`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 5000).unref();
  });
}
