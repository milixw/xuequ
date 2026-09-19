#!/bin/bash
# 关闭 start.sh 启动的本地服务器
cd "$(dirname "$0")/.." || exit 1
PID_FILE=".server.pid"

if [ ! -f "${PID_FILE}" ]; then
  echo "服务器没有在运行（找不到 ${PID_FILE}）"
  exit 0
fi

read -r PID PORT < "${PID_FILE}"
# 只关闭确实是 http.server 的进程，避免 PID 被系统复用后误杀别的程序
if kill -0 "${PID}" 2>/dev/null && ps -p "${PID}" -o command= | grep -q "http.server"; then
  kill "${PID}"
  echo "服务器已关闭（PID ${PID}，端口 ${PORT}）"
else
  echo "服务器进程已经不在了"
fi
rm -f "${PID_FILE}"
