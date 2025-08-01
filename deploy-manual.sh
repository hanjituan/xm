#!/bin/bash

echo "🚀 开始部署 GitHub Pages..."

# 确保在正确的目录
cd "$(dirname "$0")"

# 构建文档
echo "📦 构建文档..."
npm run docs:build

# 检查构建是否成功
if [ ! -d "docs/.vitepress/dist" ]; then
    echo "❌ 构建失败，找不到 dist 目录"
    exit 1
fi

echo "✅ 构建完成"

# 进入构建目录
cd docs/.vitepress/dist

# 初始化 git（如果还没有）
if [ ! -d ".git" ]; then
    git init
    git branch -M main
fi

# 添加所有文件
git add -A

# 检查是否有变化
if git diff --staged --quiet; then
    echo "📄 没有变化需要部署"
    exit 0
fi

# 提交
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')"

# 推送到 gh-pages 分支
echo "🌐 推送到 GitHub Pages..."
git push -f https://github.com/hanjituan/xm.git main:gh-pages

echo "✅ 部署完成！"
echo "🔗 访问地址: https://hanjituan.github.io/xm/"

# 返回项目根目录
cd - > /dev/null
