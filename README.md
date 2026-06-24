# CodeBlog — 博客内容管理系统

基于 **Nuxt 4** + **Spring Boot 3** + **MySQL** 的全栈博客 CMS 系统。

## 技术栈

### 前端 (nuxt-test)
- **Nuxt 4** + Vue 3 (Composition API)
- **Element Plus** 组件库
- **Tiptap** 富文本编辑器
- **Axios** HTTP 请求
- **Less** 样式预处理

### 后端 (java-backend)
- **Spring Boot 3.4** + Java 21
- **Spring Data JPA** + MySQL
- **Spring Security** + JWT 认证
- **SpringDoc OpenAPI** (Swagger)
- **Maven** 构建

## 项目结构

```
nuxtProject/
├── nuxt-test/                 # 前端项目
│   └── app/
│       ├── components/         # 公共组件 (Header, Menu, ArticleCard 等)
│       ├── composables/        # 组合式函数 (useAuth, useArticle 等)
│       ├── layouts/            # 布局 (default, blank, public)
│       ├── middleware/         # 路由中间件 (auth, init.global)
│       ├── pages/              # 页面
│       │   ├── index.vue       # 博客首页（公开）
│       │   ├── Login.vue       # 登录/注册/初始化
│       │   ├── Home.vue        # 仪表盘
│       │   ├── articles/       # 文章管理
│       │   ├── categories.vue  # 分类管理
│       │   ├── tags.vue        # 标签管理
│       │   ├── comments.vue    # 评论管理
│       │   ├── media.vue       # 媒体管理
│       │   ├── User.vue        # 用户管理
│       │   └── Setting.vue     # 站点设置
│       └── utils/              # 工具函数 (request, password, username, email)
├── java-backend/               # 后端项目
│   └── src/main/java/com/example/nuxtproject/
│       ├── config/             # 配置 (Security, JWT, CORS, Cache)
│       ├── controller/         # REST 控制器
│       ├── entity/             # 实体类
│       ├── repository/         # 数据访问层
│       ├── service/            # 业务逻辑层
│       └── util/               # 工具类 (JWT)
└── README.md
```

## 快速启动

### 前置要求
- Java 21+
- Node.js 18+
- MySQL 8+
- Maven

### 1. 启动数据库
```bash
# 使用 Docker（推荐）
docker run -d --name mysql-blog \
  -e MYSQL_ROOT_PASSWORD=root123 \
  -e MYSQL_DATABASE=nuxt_project \
  -p 13306:3306 \
  mysql:8
```

### 2. 启动后端
```bash
cd java-backend
mvn spring-boot:run
```
后端运行在 http://localhost:8080

### 3. 启动前端
```bash
cd nuxt-test
npm install
npm run dev
```
前端运行在 http://localhost:3001

### 4. 初始化系统
首次访问会自动跳转到初始化页面，创建超级管理员账号后即可登录使用。

## 功能特性

### 用户系统
- 角色体系：**SUPERADMIN** > **ADMIN** > **USER** > **GUEST**
- 登录/注册（游客注册需管理员审核概念）
- JWT 无状态认证
- 记住账号功能
- 个人密码修改

### 表单校验
- **用户名**：5~15 位，只能包含大小写字母和数字，实时重复性检查
- **密码**：12~16 位，需包含大小写字母、数字和特殊字符
- **邮箱**：格式校验

### 内容管理
- 文章 CRUD（支持 Markdown 富文本编辑）
- 分类管理
- 标签管理
- 评论管理
- 媒体文件管理

### 权限控制
- **SUPERADMIN**：全部权限
- **ADMIN**：管理后台（用户管理受限）
- **USER**：管理自己的文章
- **GUEST**：只读访问

## API 文档

启动后端后访问 Swagger UI：
http://localhost:8080/swagger-ui.html

## 环境变量

后端 `application.yml` 主要配置：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:13306/nuxt_project
    username: root
    password: root123
  jpa:
    hibernate:
      ddl-auto: update
```

前端 `nuxt.config.ts`：
- API 代理至 http://localhost:8080
- 默认端口 3001
