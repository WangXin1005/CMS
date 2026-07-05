#!/bin/bash
# ============================================================
# CodeBlog CMS — 一键配置 HTTPS（备案完成后执行）
# 前提：域名已备案 + DNS 已解析到当前服务器 IP
# 用法：bash setup-ssl.sh
# ============================================================

set -e

RED=$'\e[0;31m'
GREEN=$'\e[0;32m'
YELLOW=$'\e[1;33m'
NC=$'\e[0m'

log_info()  { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn()  { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

# ==================== 1. 检查前置条件 ====================
log_info "Step 1/5: 检查前置条件..."

if [ ! -f .env ]; then
    log_error ".env 文件不存在，请先 cp .env.example .env 并编辑"
    exit 1
fi

set -a; source .env; set +a

if [ -z "${DOMAIN:-}" ] || [ "$DOMAIN" = "your-domain.com" ]; then
    log_error "请先在 .env 中设置 DOMAIN 为你的实际域名"
    exit 1
fi

if [ -z "${EMAIL:-}" ] || [ "$EMAIL" = "your-email@example.com" ]; then
    log_error "请先在 .env 中设置 EMAIL（Let's Encrypt 证书到期提醒用）"
    exit 1
fi

log_info "域名: $DOMAIN"
log_info "邮箱: $EMAIL"

# 检查 DNS 解析
SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || curl -s ip.sb 2>/dev/null)
log_info "服务器 IP: $SERVER_IP"
log_warn "请确保 ${DOMAIN} 的 DNS A 记录指向 $SERVER_IP"

# ==================== 2. 更新 CORS 配置 ====================
log_info "Step 2/5: 更新 CORS 和 .env 配置..."

CORS_ORIGINS="https://${DOMAIN},https://www.${DOMAIN}"
sed -i "s|^CORS_ORIGINS=.*|CORS_ORIGINS=${CORS_ORIGINS}|" .env
log_info "CORS 配置已更新: ${CORS_ORIGINS}"

# ==================== 3. 申请 Let's Encrypt 证书 ====================
log_info "Step 3/5: 申请 Let's Encrypt 证书..."

# 创建证书目录
mkdir -p certbot/www certbot/certs

# 临时停止 Nginx（释放 80 端口给 certbot standalone）
docker compose -f docker-compose.prod.yml stop nginx 2>/dev/null || true

log_info "正在申请 Lets Encrypt 证书..."
docker run --rm \
    -v "$(pwd)/certbot/certs:/etc/letsencrypt" \
    -v "$(pwd)/certbot/www:/var/www/certbot" \
    -p 80:80 \
    certbot/certbot:latest \
    certonly --standalone \
    -d "$DOMAIN" \
    -d "www.$DOMAIN" \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email

if [ $? -ne 0 ]; then
    log_error "证书申请失败，请检查：1) DNS 是否正确解析 2) 80 端口是否开放"
    exit 1
fi

log_info "u2713 证书申请成功！"

# ==================== 4. 切换 Nginx 到 HTTPS 模式 ====================
log_info "Step 4/5: 切换 Nginx 到 HTTPS 模式..."

# 修改 nginx.conf：注释 ip.conf，启用 default.conf
sed -i "s|^    include /etc/nginx/conf.d/ip.conf;|    # include /etc/nginx/conf.d/ip.conf;|" docker/nginx/nginx.conf
sed -i "s|^    # include /etc/nginx/conf.d/default.conf;|    include /etc/nginx/conf.d/default.conf;|" docker/nginx/nginx.conf

log_info "Nginx 配置已切换到 HTTPS 模式"

# ==================== 5. 重启所有服务 ====================
log_info "Step 5/5: 重启所有服务..."

docker compose -f docker-compose.prod.yml up -d
sleep 15

# 验证 HTTPS
log_info "验证 HTTPS..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://${DOMAIN}/" 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
    log_info "u2713 HTTPS 访问正常！"
else
    log_warn "HTTPS 状态码: ${HTTP_CODE}，请稍后手动检查 https://${DOMAIN}"
fi

echo ""
log_info "============================================"
log_info "  HTTPS 配置完成！"
log_info "============================================"
log_info ""
log_info "站点: https://${DOMAIN}"
log_info "证书: certbot/certs/live/${DOMAIN}/"
log_info "续签: certbot 容器每12小时自动检查"
log_info "手动续: docker compose -f docker-compose.prod.yml run --rm certbot renew"
