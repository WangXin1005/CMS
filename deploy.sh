#!/bin/sh
set -e

echo "=============================="
echo " Webhook 自动部署"
echo "=============================="

cd /opt/codeblog || exit 1

echo ""
echo "[1/3] 拉取代码..."
git pull

echo ""
echo "[2/3] 重建镜像..."
docker compose build backend frontend

echo ""
echo "[3/3] 重启服务..."
docker compose up -d backend frontend

echo ""
echo "部署完成"
