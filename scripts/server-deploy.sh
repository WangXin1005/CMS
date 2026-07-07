#!/bin/sh
set -e

cd /opt/codeblog || { echo "目录不存在"; exit 1; }

[ -f .env ] || { echo "请先配置 .env"; exit 1; }

echo "构建并启动所有服务..."
docker compose up -d --build

echo "部署完成"