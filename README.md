# CodeBlog — 博客内容管理系统

基于 **Nuxt 4** + **Spring Boot 3** + **MySQL** 的全栈博客 CMS 系统，支持多角色权限管理、文章/分类/标签/评论/媒体管理，提供 Docker 容器化部署方案。

## 技术栈

### 前端 (nuxt-test/)
- Nuxt 4 + Vue 3（Composition API）
- Element Plus 组件库
- Tiptap 富文本编辑器
- Axios HTTP 请求

### 后端 (java-backend/)
- Spring Boot 3.4 + Java 21
- Spring Data JPA + MySQL 8
- Spring Security + JWT 无状态认证
- Maven 构建

### 部署与运维
- Docker + Docker Compose 容器化
- Nginx 反向代理（生产环境入口）
- GitHub Actions CI/CD 自动部署
- GitHub Container Registry (GHCR) 镜像托管

## 快速启动（开发环境）

### 前置要求
- Java 21+
- Node.js 20+
- MySQL 8+
- Maven 3.9+

### 1. 启动数据库
`ash
docker run -d --name mysql-dev -p 13306:3306 \\
  -e MYSQL_ROOT_PASSWORD=yourpassword \\
  -e MYSQL_DATABASE=nuxt_test_db \\
  mysql:8.0
`

### 2. 启动后端
`ash
cd java-backend
mvn.cmd spring-boot:run
`

### 3. 启动前端
`ash
cd nuxt-test
npm run dev
`

### 4. 访问
- 前端：http://localhost:3000
- 后端 API：http://localhost:8080
- 首次访问自动跳转到初始化页面，创建超级管理员账号后即可登录使用

## 角色权限体系

| 功能模块 | SUPERADMIN | ADMIN | USER | GUEST |
|---------|:----------:|:-----:|:----:|:-----:|
| 创建文章 | ✅ | ✅ | ✅ | ❌ |
| 编辑/删除全部文章 | ✅ | ✅ | ❌ | ❌ |
| 编辑/删除自己文章 | ✅ | ✅ | ✅ | ❌ |
| 查看文章列表 | ✅ | ✅ | ✅ | ❌ |
| 分类/标签增删改 | ✅ | ✅ | ❌ | ❌ |
| 分类/标签查看 | ✅ | ✅ | ✅ | ✅ |
| 用户管理 | ✅ | ✅ | ❌ | ❌ |
| 评论管理 | ✅ | ✅ | ❌ | ❌ |
| 媒体上传 | ✅ | ✅ | ✅ | ❌ |
| 媒体删除 | ✅ | ✅ | ❌ | ❌ |
| 站点设置 | ✅ | ❌ | ❌ | ❌ |
| 操作日志 | ✅ | ✅ | ❌ | ❌ |
| 仪表盘 | ✅ | ✅ | ✅(只读) | ✅(只读) |

> 编辑和删除操作只针对下级权限用户，对同级或上级用户不生效

## 表单校验规则
- 用户名：4~15 位字母数字组合，实时查重
- 密码：12~16 位，需包含大小写字母、数字和特殊字符
- 邮箱：标准格式校验

## 项目结构

### 前端 (nuxt-test/)

| 目录 | 说明 |
|------|------|
| app/pages/ | 首页/登录/仪表盘/用户/文章/分类/标签/评论/媒体/日志/设置 |
| app/components/ | Header, Menu, ArticleCard, CommentSection, Dialog, RichTextEditor |
| app/composables/ | useAuth, useArticle, useCategory, useTag, useComment, useMedia, useLog |
| app/layouts/ | default, blank, public |
| app/middleware/ | auth.ts, init.global.ts |
| app/utils/ | 校验规则, 请求封装, HTML过滤 |

### 后端 (java-backend/)

| 目录 | 说明 |
|------|------|
| controller/ | Auth, Article, Category, Tag, Comment, User, Media, OperationLog, SiteSetting |
| service/ | 业务逻辑层 |
| repository/ | JPA 数据访问层 |
| entity/ | Article, Category, Tag, Comment, User, Media, OperationLog, SiteSetting |
| config/ | SecurityConfig, JwtAuthFilter, LoggingAspect |
| util/ | JwtUtil |

### 部署

| 文件 | 说明 |
|------|------|
| nginx/ | Nginx 反向代理配置 |
| docker/ | Dockerfile.backend, Dockerfile.frontend |
| .github/workflows/ | CI/CD (deploy.yml) |
| docker-compose.yml | Docker Compose 主配置 |
| docker-compose.prod.yml | 生产环境覆盖配置 |

## 环境变量
`ash
# MySQL
DB_ROOT_PASSWORD=your_strong_password
DB_NAME=nuxt_test_db

# JWT
JWT_SECRET=your-jwt-secret-key-at-least-32-characters
JWT_EXPIRATION=86400000

# CORS
CORS_ORIGINS=https://your-domain.com

# 域名
DOMAIN=your-domain.com
`

## 生产环境部署
`ash
docker compose -f docker-compose.prod.yml up -d
`

架构：Nginx(:80/443) → Nuxt SSR(:3000) / Spring Boot(:8080) → MySQL(:3306)

## 注意事项
- 开发环境：前端 3000，后端 8080，MySQL 13306
- 生产环境：Nginx 监听 80/443，其他端口不对外暴露
- 媒体文件上传大小限制 10MB（后端）
- 日志记录已自动过滤密码等敏感字段
