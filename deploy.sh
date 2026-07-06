#!/bin/bash
# ============================================================
# CodeBlog CMS — 一键部署脚本（2核2G 服务器）
#
# 用法：
#   bash deploy.sh              # 首次部署
#   bash deploy.sh --update     # 更新部署
#   bash deploy.sh --stop       # 停止服务
#   bash deploy.sh --logs       # 查看日志
#   bash deploy.sh --ssl        # 配置 HTTPS（备案完成后）
# ============================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info()  { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn()  { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

if docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

# ==================== 环境检查 ====================
check_docker() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker 未安装"
        exit 1
    fi
}

check_env() {
    if [ ! -f .env ]; then
        log_warn ".env 不存在，从 .env.example 复制..."
        cp .env.example .env
        log_error "请先编辑 .env 修改密码和密钥后重新运行！"
        exit 1
    fi
    set -a; source .env; set +a
}

# ==================== 首次部署 ====================
deploy() {
    log_info "========== 开始部署 =========="
    mkdir -p uploads

    # 检查 swap
    if ! swapon --show | grep -q .; then
        log_warn "swap 未启用，正在启用..."
        sudo swapon -a 2>/dev/null || log_warn "无法启用 swap"
    fi

    # 拉取基础镜像
    log_info "拉取基础镜像..."
    $DOCKER_COMPOSE pull mysql nginx

    # 逐序构建
    log_info "[1/3] 构建后端（约 5-10 分钟）..."
    $DOCKER_COMPOSE build --no-cache backend

    log_info "[2/3] 构建前端（约 3-5 分钟）..."
    $DOCKER_COMPOSE build --no-cache frontend

    log_info "[3/3] 构建 Webhook..."
    $DOCKER_COMPOSE build webhook

    # 启动
    log_info "启动所有服务..."
    $DOCKER_COMPOSE up -d --remove-orphans

    wait_for_services
    log_info "部署完成！浏览器访问 http://服务器IP"
}

# ==================== 更新部署 ====================
update_deploy() {
    log_info "========== 更新部署 =========="

    log_info "拉取最新代码..."
    git pull origin main 2>/dev/null || log_warn "git pull 失败"

    log_info "停止现有服务..."
    $DOCKER_COMPOSE down

    log_info "[1/2] 重建后端..."
    $DOCKER_COMPOSE build --no-cache backend

    log_info "[2/2] 重建前端..."
    $DOCKER_COMPOSE build --no-cache frontend

    log_info "启动服务..."
    $DOCKER_COMPOSE up -d --remove-orphans

    docker image prune -f
    wait_for_services
    log_info "更新完成！"
}

# ==================== 停止/日志 ====================
stop_services() {
    log_info "停止所有服务..."
    $DOCKER_COMPOSE down
    log_info "已停止"
}

show_logs() {
    $DOCKER_COMPOSE logs -f --tail=50
}

# ==================== HTTPS 配置 ====================
setup_ssl() {
    check_env

    if [ -z "${DOMAIN:-}" ] || [ "$DOMAIN" = "your-domain.com" ]; then
        log_error "请先编辑 .env 设置 DOMAIN"
        exit 1
    fi

    log_info "为 $DOMAIN 配置 HTTPS..."
    mkdir -p docker/certbot/www docker/certbot/certs

    $DOCKER_COMPOSE stop nginx 2>/dev/null || true

    log_info "申请 Let's Encrypt 证书..."
    docker run --rm \
        -v "$(pwd)/docker/certbot/certs:/etc/letsencrypt" \
        -v "$(pwd)/docker/certbot/www:/var/www/certbot" \
        -p 80:80 \
        certbot/certbot:latest \
        certonly --standalone \
        -d "$DOMAIN" \
        --email "${EMAIL:-admin@$DOMAIN}" \
        --agree-tos \
        --no-eff-email

    if [ $? -ne 0 ]; then
        log_error "证书申请失败，请检查 DNS 解析"
        exit 1
    fi

    log_info "切换到 HTTPS 模式..."
    sed -i 's|^    include /etc/nginx/conf.d/ip.conf;|    # include /etc/nginx/conf.d/ip.conf;|' docker/nginx/nginx.conf
    sed -i 's|^    # include /etc/nginx/conf.d/default.conf;|    include /etc/nginx/conf.d/default.conf;|' docker/nginx/nginx.conf

    $DOCKER_COMPOSE restart nginx
    log_info "HTTPS 配置完成！https://$DOMAIN"
}

# ==================== 等待服务就绪 ====================
wait_for_services() {
    log_info "等待服务就绪（最多 120 秒）..."

    for i in $(seq 1 60); do
        local code
        code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/api/users/check 2>/dev/null || echo "000")
        if [ "$code" = "200" ]; then
            log_info "后端就绪"
            break
        fi
        sleep 2
    done

    sleep 5
    local fcode
    fcode=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/ 2>/dev/null || echo "000")
    if [ "$fcode" = "200" ] || [ "$fcode" = "302" ]; then
        log_info "前端就绪"
    fi
}

# ==================== 主流程 ====================
check_docker

case "${1:-}" in
    --update)
        check_env
        update_deploy
        ;;
    --stop)
        stop_services
        ;;
    --logs)
        show_logs
        ;;
    --ssl)
        setup_ssl
        ;;
    *)
        check_env
        deploy
        ;;
esac