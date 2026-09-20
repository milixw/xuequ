#!/bin/bash
# 在服务器上运行学趣闯关（静态站点）
# 用法：./run.sh start|stop|restart|status|logs|foreground
# 端口：默认 8080，可用 PORT=9000 ./run.sh start 指定
# 只监听本机（前面套 nginx）：HOST=127.0.0.1 ./run.sh start
cd "$(dirname "$0")" || exit 1

PORT="${PORT:-8080}"
HOST="${HOST:-0.0.0.0}"
PID_FILE=".server.pid"
LOG_FILE="server.log"

running() {
  [ -f "${PID_FILE}" ] && kill -0 "$(cat "${PID_FILE}")" 2>/dev/null
}

runner() {
  # 优先用 node（有缓存头、日志、优雅退出）；没有 node 就退回 python3
  if command -v node >/dev/null 2>&1; then
    echo "node"
  elif command -v python3 >/dev/null 2>&1; then
    echo "python3"
  else
    echo ""
  fi
}

urls() {
  echo "  本机：      http://127.0.0.1:${PORT}"
  local ip
  ip=$(hostname -I 2>/dev/null | awk '{print $1}')
  [ -n "${ip}" ] && echo "  内网地址：  http://${ip}:${PORT}"
  echo "  公网访问：  http://<服务器公网IP>:${PORT}　（公网 IP 见云服务商控制台；需放行 ${PORT} 端口）"
}

start() {
  if running; then
    echo "已经在运行（PID $(cat "${PID_FILE}")）"
    urls
    exit 0
  fi
  rm -f "${PID_FILE}"

  local r
  r=$(runner)
  if [ -z "${r}" ]; then
    echo "服务器上没有找到 node，也没有 python3，无法启动。"
    echo "安装其中之一即可，例如：sudo apt install -y nodejs"
    exit 1
  fi

  if [ "${r}" = "node" ]; then
    PORT="${PORT}" HOST="${HOST}" nohup node serve.js >> "${LOG_FILE}" 2>&1 &
  else
    echo "没有找到 node，改用 python3（没有缓存头，建议装 node）" | tee -a "${LOG_FILE}"
    nohup python3 -m http.server "${PORT}" --bind "${HOST}" >> "${LOG_FILE}" 2>&1 &
  fi
  echo $! > "${PID_FILE}"

  sleep 1
  if ! running; then
    echo "启动失败，日志最后几行："
    tail -n 20 "${LOG_FILE}"
    rm -f "${PID_FILE}"
    exit 1
  fi

  echo "已启动（${r}，PID $(cat "${PID_FILE}")，端口 ${PORT}）"
  urls
  echo "  日志：      tail -f $(pwd)/${LOG_FILE}"
}

stop() {
  if ! running; then
    echo "没有在运行"
    rm -f "${PID_FILE}"
    exit 0
  fi
  local pid
  pid=$(cat "${PID_FILE}")
  kill "${pid}"
  for _ in 1 2 3 4 5; do
    running || break
    sleep 1
  done
  if running; then
    echo "普通停止无效，强制结束"
    kill -9 "${pid}" 2>/dev/null
  fi
  rm -f "${PID_FILE}"
  echo "已停止（PID ${pid}）"
}

case "${1:-start}" in
  start) start ;;
  stop) stop ;;
  restart) stop; start ;;
  status)
    if running; then
      echo "运行中（PID $(cat "${PID_FILE}")，端口 ${PORT}）"
      urls
    else
      echo "未运行"
      exit 1
    fi
    ;;
  logs) tail -n 50 -f "${LOG_FILE}" ;;
  foreground)
    # 给 systemd 用：前台运行，不写 PID 文件
    exec env PORT="${PORT}" HOST="${HOST}" node serve.js
    ;;
  *)
    echo "用法：./run.sh start|stop|restart|status|logs|foreground"
    exit 1
    ;;
esac
