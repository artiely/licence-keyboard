#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 打包
npm run dev

# 发布
# npm publish
# 上传
git init
git add -A
git commit -m 'deploy'

git push -f origin git@github.com:artiely/licence-keyboard.git master

cd -