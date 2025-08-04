#!/bin/bash

set -e  # 遇到错误时停止执行

echo "🚀 开始部署 GitHub Pages..."

# 确保在正确的目录
cd "$(dirname "$0")"

# 构建文档
echo "📦 构建文档..."
pnpm docs:build

# 检查构建是否成功
if [ ! -d "docs/.vitepress/dist" ]; then
    echo "❌ 构建失败，找不到 dist 目录"
    exit 1
fi

echo "✅ 构建完成"

# 部署到 gh-pages 分支
echo "🌐 部署到 GitHub Pages..."
npx gh-pages -d docs/.vitepress/dist

if [ $? -eq 0 ]; then
    echo "✅ 部署完成！"
    echo "🔗 访问地址: https://hanjituan.github.io/xm/"
else
    echo "❌ 部署失败"
    exit 1
fi
