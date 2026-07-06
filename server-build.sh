#!/bin/bash
# ============================================================
# 服务器端构建 — 2核2GB 逐个构建
# 用法：bash server-build.sh
# ============================================================
set -e

cd /opt/codeblog

echo "=== 停止现有容器 ==="
docker compose down 2>/dev/null || true
sleep 3

# 确保 swap 可用
sudo swapon --show | grep -q . || (sudo swapon -a && echo "swap 已启用")

echo ""
echo "=== [1/2] 构建后端（约5-10分钟，内存限额512M） ==="
COMPOSE_PARALLEL_LIMIT=1 docker compose build --no-cache backend

echo ""
echo "=== [2/2] 构建前端（约3-5分钟，内存限额400M） ==="
COMPOSE_PARALLEL_LIMIT=1 docker compose build --no-cache frontend

echo ""
echo "=== 启动服务 ==="
docker compose up -d

echo ""
for i in $(seq 1 60); do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/api/users/check 2>/dev/null || echo "000")
  if [ "$code" = "200" ]; then
    echo "后端就绪！(HTTP $code)"
    break
  fi
  sleep 2
done

curl -s -o /dev/null -w "前端状态: HTTP %{http_code}\n" http://localhost/
echo ""
echo "构建完成！"