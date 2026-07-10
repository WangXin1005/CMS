#!/bin/sh
set -e

echo "=============================="
echo " Webhook 自动部署"
echo "=============================="

cd /opt/codeblog || { echo "错误: 目录不存在"; exit 1; }

echo "[1/3] 拉取代码..."
if [ -n "$GIT_TOKEN" ]; then
  git -c credential.helper= pull https://oauth2:${GIT_TOKEN}@gitee.com/${GITEE_REPO_OWNER}/${GITEE_REPO_NAME}.git main
else
  git pull
fi

echo "[2/3] 重建镜像..."
docker compose build backend frontend

echo "[3/3] 重启服务..."
docker compose up -d backend frontend

echo "部署完成"