#!/bin/bash

# 构建文档
npm run docs:build

# 进入构建目录
cd docs/.vitepress/dist

# 如果你要部署到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果你要部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:hanjituan/xm.git main:gh-pages

cd -
