#!/bin/sh
set -e

echo "=============================="
echo " Webhook 自动部署"
echo "=============================="

cd /opt/codeblog || exit 1

echo "[1/3] 拉取最新代码（含预构建产物）..."
git pull

echo "[2/3] 重建镜像（仅 COPY，无编译）..."
docker compose build backend frontend

echo "[3/3] 重启服务..."
docker compose up -d backend frontend nginx

echo "=============================="
echo " 部署完成"
echo "=============================="