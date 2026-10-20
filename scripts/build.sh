#!/bin/bash
# 打包成可以上传到云服务器的压缩包
# 用法：./scripts/build.sh [--skip-tests] [--dir]
# 产物：dist/xuequ-<日期>-<提交号>.tar.gz
#   --dir  只留目录 dist/xuequ-<日期>-<提交号>/、不打压缩包（给用 rsync 增量上传的发布脚本用）
set -e
cd "$(dirname "$0")/.." || exit 1

SKIP_TESTS=0
DIR_ONLY=0
for arg in "$@"; do
  case "$arg" in
    --skip-tests) SKIP_TESTS=1 ;;
    --dir) DIR_ONLY=1 ;;
    *) echo "未知参数：${arg}（可选 --skip-tests / --dir）"; exit 1 ;;
  esac
done

if [ "${SKIP_TESTS}" = 0 ]; then
  echo "==> 运行校验"
  if ! node tests/run.js; then
    echo "校验没通过，已中止打包。确认要跳过请用：./scripts/build.sh --skip-tests"
    exit 1
  fi
else
  echo "==> 跳过校验"
fi

STAMP=$(date +%Y%m%d-%H%M)
REV=$(git rev-parse --short HEAD 2>/dev/null || echo nogit)
NAME="xuequ-${STAMP}-${REV}"
OUT="dist/${NAME}"

echo "==> 准备文件"
rm -rf dist
mkdir -p "${OUT}"

# 运行时需要的文件（不含测试、文档、教材照片、开发脚本）
cp index.html "${OUT}/"
cp -R src vendor content "${OUT}/"
cp scripts/serve.js scripts/run.sh scripts/private-gate.js "${OUT}/"
chmod +x "${OUT}/run.sh"

cat > "${OUT}/VERSION" <<EOF
name: ${NAME}
built: $(date '+%Y-%m-%d %H:%M:%S')
commit: $(git rev-parse HEAD 2>/dev/null || echo unknown)
branch: $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo unknown)
EOF

# 内容清单，方便上线后核对
{
  echo "已上线的小节："
  grep -o "{ no: '[0-9.]*', title: '[^']*', ready: true }" content/catalog.js | sed "s/{ no: '/  /; s/', title: '/ /; s/', ready: true }//"
} >> "${OUT}/VERSION"

if [ "${DIR_ONLY}" = 1 ]; then
  echo
  echo "已生成目录：${OUT}/（$(du -sh "${OUT}" | cut -f1)）"
  exit 0
fi

echo "==> 打包"
tar -czf "dist/${NAME}.tar.gz" -C dist "${NAME}"
rm -rf "${OUT}"

SIZE=$(du -h "dist/${NAME}.tar.gz" | cut -f1)
echo
echo "打包完成：dist/${NAME}.tar.gz（${SIZE}）"
echo
echo "上传并启动（把 user@server 换成你的服务器）："
echo "  scp dist/${NAME}.tar.gz user@server:~/"
echo "  ssh user@server"
echo "  tar -xzf ${NAME}.tar.gz && cd ${NAME}"
echo "  ./run.sh start          # 默认 8080 端口，换端口：PORT=9000 ./run.sh start"
echo
echo "详细部署说明见 docs/deploy.md"
