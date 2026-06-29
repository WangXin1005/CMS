# CodeBlog — 博客内容管理系统

基于 **Nuxt 4** + **Spring Boot 3** + **MySQL** 的全栈博客 CMS 系统，支持多角色权限管理、文章/分类/标签/评论/媒体管理，提供 Docker 容器化部署方案。

## 技术栈

### 前端 (
uxt-test/)
- **Nuxt 4** + Vue 3（Composition API）
- **Element Plus** 组件库
- **Tiptap** 富文本编辑器
- **Axios** HTTP 请求
- **Less** 样式预处理

### 后端 (java-backend/)
- **Spring Boot 3.4** + Java 21
- **Spring Data JPA** + MySQL 8
- **Spring Security** + JWT 无状态认证
- **SpringDoc OpenAPI**（Swagger UI）
- **Maven** 构建

### 部署与运维
- **Docker** + Docker Compose 容器化
- **Nginx** 反向代理（生产环境入口）
- **GitHub Actions** CI/CD 自动部署

## 项目结构

`
nuxtProject/
├── nuxt-test/                 # 前端项目
│   ├── app/
│   │   ├── components/        # 公共组件
│   │   │   ├── Header.vue     # 顶部导航栏
│   │   │   ├── Menu.vue       # 侧边菜单
│   │   │   ├── ArticleCard.vue# 文章卡片
│   │   │   ├── CommentSection.vue # 评论区域
│   │   │   ├── Dialog.vue     # 通用弹窗
│   │   │   └── RichTextEditor.vue # 富文本编辑器
│   │   ├── composables/       # 组合式函数（useAuth、useArticle 等）
│   │   ├── layouts/           # 布局（default、blank、public）
│   │   ├── middleware/        # 路由中间件（auth、init.global）
│   │   ├── pages/             # 页面
│   │   │   ├── index.vue      # 博客首页（公开）
│   │   │   ├── article/[slug].vue # 文章详情页（公开）
│   │   │   ├── Login.vue      # 登录/注册/初始化
│   │   │   ├── Home.vue       # 仪表盘
│   │   │   ├── articles/      # 文章管理
│   │   │   │   ├── index.vue  # 文章列表
│   │   │   │   ├── create.vue # 创建文章
│   │   │   │   └── edit/[id].vue # 编辑文章
│   │   │   ├── categories.vue # 分类管理
│   │   │   ├── tags.vue       # 标签管理
│   │   │   ├── comments.vue   # 评论管理
│   │   │   ├── media.vue      # 媒体管理
│   │   │   ├── User.vue       # 用户管理
│   │   │   ├── logs.vue       # 操作日志
│   │   │   └── Setting.vue    # 站点设置
│   │   └── utils/             # 工具函数（request、password、username、email 校验）
│   └── Dockerfile             # 前端 Docker 构建（Node 20 + SSR）
├── java-backend/              # 后端项目
│   ├── src/main/java/com/example/nuxtproject/
│   │   ├── config/            # 配置（Security、JWT、CORS、Cache）
│   │   ├── controller/        # REST 控制器
│   │   ├── entity/            # 实体类
│   │   ├── repository/        # 数据访问层（JPA Repository）
│   │   ├── service/           # 业务逻辑层
│   │   └── util/              # 工具类（JWT）
│   └── Dockerfile             # 后端 Docker 构建（Maven + Temurin 21）
├── nginx/
│   └── nginx.conf             # Nginx 反向代理配置
├── .github/workflows/
│   └── deploy.yml             # GitHub Actions 自动部署
├── docker-compose.yml         # Docker Compose 主配置
├── docker-compose.prod.yml    # 生产环境覆盖配置
├── docker-compose.override.yml# 开发环境覆盖配置
├── .env.example               # 环境变量模板
├── .gitignore
├── AGENTS.md                  # 编码规范与指南
└── README.md
`

## 快速启动（开发环境）

### 前置要求
- Java 21+
- Node.js 20+
- MySQL 8+
- Maven 3.9+
- Docker（可选，用于容器化开发）

### 方式一：本地运行

**1. 启动数据库**

`ash
# 使用 Docker（推荐）
docker run -d --name codeblog-db \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=nuxt_test_db \
  -p 13306:3306 mysql:8
`

**2. 启动后端**
`ash
cd java-backend
mvn.cmd spring-boot:run
`

后端默认运行在 http://localhost:8080

**3. 启动前端**
`ash
cd nuxt-test
npm run dev
`

前端默认运行在 http://localhost:3000

### 方式二：Docker 开发环境
`ash
docker compose up -d
`

### 方式三：Docker 生产部署
`ash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
`

生产环境通过 Nginx 反向代理统一入口 http://localhost:80

### 初始化系统
首次访问会自动跳转到初始化页面，创建超级管理员账号后即可登录使用。

## 功能特性

### 用户系统
- 角色体系：**SUPERADMIN** > **ADMIN** > **USER** > **GUEST**
- 登录/注册
- JWT 无状态认证
- 账号密码修改

### 表单校验规则
- **用户名**：3~15 位字母数字组合，实时查重
- **密码**：8~16 位，需包含大小写字母、数字和特殊字符
- **邮箱**：格式校验

### 内容管理
- 文章 CRUD（支持 Tiptap 富文本编辑器）
- 分类管理
- 标签管理
- 评论管理
- 媒体文件管理（上传/删除）

### 权限控制

| 功能模块 | SUPERADMIN | ADMIN | USER | GUEST |
|---------|:----------:|:-----:|:----:|:-----:|
| **文章** | | | | |
| 创建文章 | ✅ | ✅ | ✅ | ❌ |
| 编辑/删除全部文章 | ✅ | ✅ | ❌ | ❌ |
| 编辑/删除自己文章 | ✅ | ✅ | ✅ | ❌ |
| 查看文章列表 | ✅ | ✅ | ✅ | ❌ |
| **分类/标签** | | | | |
| 增/删/改 | ✅ | ✅ | ❌ | ❌ |
| 查看 | ✅ | ✅ | ✅ | ✅ |
| **用户管理** | | | | |
| 查看用户列表 | ✅ | ✅ | ❌ | ❌ |
| 创建用户 | ✅ | ✅ | ❌ | ❌ |
| 编辑下级用户 | ✅ | ✅ | ❌ | ❌ |
| 删除下级用户 | ✅ | ✅ | ❌ | ❌ |
| **评论管理** | | | | |
| 查看/删除 | ✅ | ✅ | ❌ | ❌ |
| **媒体管理** | | | | |
| 上传 | ✅ | ✅ | ✅ | ❌ |
| 删除 | ✅ | ✅ | ❌ | ❌ |
| **站点设置** | ✅ | ❌ | ❌ | ❌ |
| **操作日志** | ✅ | ✅ | ❌ | ❌ |
| **仪表盘** | | | | |
| 查看统计 | ✅ | ✅ | ✅ | ✅ |
| 查看近期文章 | ✅ | ✅ | ✅（只读） | ✅（只读） |

> 编辑和删除操作只针对下级权限用户，对同级或上级用户不生效。

## API 文档

启动后端后访问 Swagger UI：http://localhost:8080/swagger-ui.html

## 环境变量

参考 .env.example：

`
# MySQL
MYSQL_ROOT_PASSWORD=your_strong_root_password
MYSQL_PASSWORD=your_strong_db_password

# JWT 密钥（至少32字节）
JWT_SECRET=your-jwt-secret-key-at-least-32-characters-long
`

### 后端配置 (pplication.yml)
`yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:13306/nuxt_test_db
    username: root
    password: root
  jpa:
    hibernate:
      ddl-auto: update
`

### 前端配置 (
uxt.config.ts)
- API 代理至 http://localhost:8080
- 默认端口 3000

## CI/CD

项目配置了 GitHub Actions 自动部署工作流（.github/workflows/deploy.yml）：
- 在 main 分支推送时自动触发
- 通过 SSH 连接服务器拉取最新代码
- 使用 docker-compose.yml + docker-compose.prod.yml 构建并启动生产容器

## 生产环境架构

`
                  ┌─────────────┐
                  │  Nginx :80   │
                  │ (反向代理)    │
                  └──────┬──────┘
                         │
               ┌─────────┴─────────┐
               ▼                   ▼
        ┌──────────────┐  ┌───────────────┐
        │  Nuxt SSR     │  │  Spring Boot   │
        │  :3000        │  │  :8080         │
        └──────────────┘  └───────┬───────┘
                                  ▼
                         ┌───────────────┐
                         │  MySQL 8       │
                         │  :3306         │
                         └───────────────┘
`

## 注意事项
- 前端端口 **3000**，后端端口 **8080**，MySQL 映射端口 **13306**（开发环境）
- 后端默认使用 dev profile，生产环境使用 prod profile
- 媒体文件上传大小限制 20MB（Nginx 端）
- Docker 环境下前端使用 SSR 模式运行