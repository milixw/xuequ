#!/bin/bash
# 启动本地服务器（后台运行），手机连同一个 Wi-Fi 就能访问
# 用法：./scripts/start.sh [端口]，默认 8000；在任何目录下运行都可以
cd "$(dirname "$0")/.." || exit 1
PORT="${1:-8000}"
PID_FILE=".server.pid"
LOG_FILE=".server.log"

print_urls() {
  echo "电脑上访问：http://localhost:${1}"
  local found=0
  for i in 0 1 2 3 4 5 6 7 8 9; do
    ip=$(ipconfig getifaddr "en${i}" 2>/dev/null)
    if [ -n "$ip" ]; then
      echo "手机上访问：http://$ip:${1}　（网卡 en${i}）"
      found=1
    fi
  done
  [ $found = 0 ] && echo "没有找到局域网 IP，请确认电脑已连上 Wi-Fi"
  echo "手机要和电脑连同一个 Wi-Fi；关闭服务器：./scripts/stop.sh"
}

# 已经在运行：直接给出地址
if [ -f "${PID_FILE}" ]; then
  read -r OLD_PID OLD_PORT < "${PID_FILE}"
  if kill -0 "${OLD_PID}" 2>/dev/null; then
    echo "服务器已经在运行（PID ${OLD_PID}）"
    print_urls "$OLD_PORT"
    exit 0
  fi
  rm -f "${PID_FILE}"
fi

if lsof -nP -iTCP:"${PORT}" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "端口 ${PORT} 已被其他程序占用："
  lsof -nP -iTCP:"${PORT}" -sTCP:LISTEN
  echo "可以换一个端口，比如：./scripts/start.sh 8001"
  exit 1
fi

nohup python3 -m http.server "${PORT}" --bind 0.0.0.0 > "$LOG_FILE" 2>&1 &
echo "$! ${PORT}" > "${PID_FILE}"
sleep 1
read -r PID _ < "${PID_FILE}"
if ! kill -0 "${PID}" 2>/dev/null; then
  echo "启动失败，日志如下："
  cat "$LOG_FILE"
  rm -f "${PID_FILE}"
  exit 1
fi
echo "服务器已启动（PID ${PID}）"
print_urls "${PORT}"
