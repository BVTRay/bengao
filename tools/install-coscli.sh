#!/bin/sh
# 下载 coscli 到 tools/ 目录（macOS / Linux）
# 仅在 tools/coscli 不存在时执行；deploy 脚本会自动调用本脚本兜底。
set -e

OS="$(uname -s)"
DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET="$DIR/coscli"

if [ -x "$TARGET" ]; then
  echo "coscli 已存在: $TARGET"
  exit 0
fi

case "$OS" in
  Darwin) URL="https://cosbrowser.cloud.tencent.com/software/coscli/coscli-mac" ;;
  Linux)  URL="https://cosbrowser.cloud.tencent.com/software/coscli/coscli-linux" ;;
  *) echo "不支持的操作系统: $OS（仅支持 macOS / Linux）"; exit 1 ;;
esac

echo "下载 coscli -> $TARGET"
curl -fsSL "$URL" -o "$TARGET"
chmod +x "$TARGET"
echo "完成。运行 ./tools/coscli --version 验证。"
