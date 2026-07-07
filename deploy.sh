#!/bin/sh
set -e

echo "=============================="
echo " CodeBlog 自动化部署"
echo " $(date '+%Y-%m-%d %H:%M:%S')"
echo "=============================="

cd /app || exit 1

echo ""
echo "[1/4] 拉取最新代码..."
git pull origin main 2>/dev/null || git pull origin master 2>/dev/null || {
  echo "警告: 无法拉取代码，使用当前版本继续"
}

echo ""
echo "[2/4] 重新构建镜像..."
docker compose build --no-cache backend frontend

echo ""
echo "[3/4] 重启服务..."
docker compose up -d backend frontend nginx

echo ""
echo "[4/4] 清理旧镜像..."
docker image prune -f

echo ""
echo "=============================="
echo " 部署完成"
echo "=============================="
