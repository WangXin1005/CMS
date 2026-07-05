#!/bin/bash
# ============================================================
# CodeBlog CMS — Docker 部署脚本
# 
# 两种模式：
#   开发模式：docker-compose.yml（本地构建镜像）
#   生产模式：docker-compose.prod.yml（拉取 GHCR 预构建镜像）
#
# 用法：
#   bash deploy.sh              # 自动检测模式并部署
#   bash deploy.sh --update     # 更新部署（仅重建 backend + frontend）
#   bash deploy.sh --stop       # 停止所有服务
#   bash deploy.sh --logs       # 查看实时日志
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

# 检测 Docker Compose 命令
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

# 检测 compose 文件（生产优先）
detect_compose_file() {
    if [ -f "docker-compose.prod.yml" ] && [ -n "${GITHUB_REPO_OWNER:-}" ] && [ "$GITHUB_REPO_OWNER" != "your-username" ]; then
        COMPOSE_FILE="docker-compose.prod.yml"
        COMPOSE_MODE="生产模式（GHCR 预构建镜像）"
    else
        COMPOSE_FILE="docker-compose.yml"
        COMPOSE_MODE="开发模式（本地构建镜像）"
    fi
    log_info "部署模式：$COMPOSE_MODE"
}

# 检查环境
check_docker() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker 未安装，请先运行 bash server-setup.sh"
        exit 1
    fi
}

check_env() {
    if [ ! -f .env ]; then
        log_warn ".env 文件不存在，从 .env.example 复制..."
        cp .env.example .env
        log_error "请先编辑 .env 文件，修改密码和密钥后重新运行！"
        exit 1
    fi
    # 加载环境变量
    set -a; source .env; set +a
}

# ==================== 首次部署 ====================
deploy() {
    log_info "开始部署..."

    # 创建上传目录
    mkdir -p uploads

    if [ "$COMPOSE_MODE" = "生产模式（GHCR 预构建镜像）" ]; then
        log_info "登录 GitHub Container Registry..."
        echo "$GITHUB_TOKEN" | docker login ghcr.io -u "$GITHUB_REPO_OWNER" --password-stdin 2>/dev/null || \
            docker login ghcr.io -u "$GITHUB_REPO_OWNER"
        log_info "拉取最新镜像..."
        $DOCKER_COMPOSE -f "$COMPOSE_FILE" pull
    fi

    log_info "启动所有服务..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" up -d --remove-orphans

    # 非生产模式才本地构建
    if [ "$COMPOSE_MODE" != "生产模式（GHCR 预构建镜像）" ]; then
        $DOCKER_COMPOSE -f "$COMPOSE_FILE" build
        $DOCKER_COMPOSE -f "$COMPOSE_FILE" up -d --remove-orphans
    fi

    # 等待服务就绪
    log_info "等待服务启动（最多 120 秒）..."
    wait_for_services

    log_info "============================================"
    log_info "  部署完成！"
    log_info "  前端: http://localhost"
    log_info "  API:  http://localhost/api"
    log_info "============================================"
}

# ==================== 更新部署 ====================
update_deploy() {
    log_info "更新部署..."

    if [ "$COMPOSE_MODE" = "生产模式（GHCR 预构建镜像）" ]; then
        log_info "拉取最新镜像..."
        $DOCKER_COMPOSE -f "$COMPOSE_FILE" pull backend frontend
        $DOCKER_COMPOSE -f "$COMPOSE_FILE" up -d --remove-orphans backend frontend nginx
    else
        log_info "重建镜像..."
        $DOCKER_COMPOSE -f "$COMPOSE_FILE" up -d --build --no-deps backend frontend
    fi

    # 清理旧镜像
    docker image prune -f

    log_info "更新完成！"
}

# ==================== 停止服务 ====================
stop_services() {
    log_info "停止所有服务..."
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" down
    log_info "服务已停止"
}

# ==================== 查看日志 ====================
show_logs() {
    $DOCKER_COMPOSE -f "$COMPOSE_FILE" logs -f --tail=50
}

# ==================== 等待服务就绪 ====================
wait_for_services() {
    local max_attempts=60
    local attempts=0

    while [ $attempts -lt $max_attempts ]; do
        local status
        status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/api/users/check 2>/dev/null || echo "000")
        if [ "$status" = "200" ]; then
            log_info "✓ 后端服务就绪"
            break
        fi
        attempts=$((attempts + 1))
        sleep 2
    done

    sleep 5
    local front_status
    front_status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/ 2>/dev/null || echo "000")
    if [ "$front_status" = "200" ]; then
        log_info "✓ 前端服务就绪"
    fi
}

# ==================== 主流程 ====================
check_docker
detect_compose_file

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
    *)
        check_env
        deploy
        ;;
esac
