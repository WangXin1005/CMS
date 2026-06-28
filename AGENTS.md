# CodeBlog 项目 — 编码规范与指南

## 项目概述
全栈博客 CMS 系统
> ⚠️ **重要：禁止自动启动服务 + 简体中文** — 任何时候都不要自动执行 `npm run dev`、`mvn.cmd spring-boot:run` 或其他启动命令。仅在用户明确要求且确认后方可启动。

，前端 Nuxt 4 + Vue 3 + Element Plus（端口 3000），后端 Spring Boot 3 + Java 21 + MySQL（端口 8080）。

## 目录结构
- `nuxt-test/` — 前端项目
  - `app/pages/` — 页面组件
  - `app/components/` — 公共组件
  - `app/composables/` — 组合式函数（API 请求封装）
  - `app/layouts/` — 布局（default/blank/public）
  - `app/middleware/` — 路由中间件
  - `app/utils/` — 工具函数（校验规则等）
- `java-backend/` — 后端项目
  - `src/main/java/com/example/nuxtproject/`
    - `controller/` — REST 控制器
    - `service/` — 业务逻辑
    - `repository/` — JPA 仓库
    - `entity/` — 实体类
    - `config/` — 安全/配置

## 重要约定
1. **Java 文件编码**：必须使用 UTF-8 **无 BOM**。`Set-Content -Encoding UTF8` 在 PowerShell 5.1 会添加 BOM，请改用 Node.js 的 `writeFileSync` 或 `[System.IO.File]::WriteAllBytes`
2. **端口**：前端 3000，后端 8080，MySQL 13306
3. 🔴 **禁止自动启动**：任何情况下都不要自动运行 `npm run dev` 或 `mvn.cmd spring-boot:run` 等启动命令。只有在用户明确要求且确认后才可执行。
4. **自行验证**：每次修改代码后，必须自行验证——前后端均需验证通过——后端运行 `mvn.cmd compile -q` 确保编译通过，前端需确认无模板解析或语法错误。如验证失败则立即修正，不可提交有报错的代码
5. **语言要求**：所有解答、回复、错误提示、注释、提交信息等均使用**简体中文**
5. **组件库**：Element Plus
6. **API 请求**：前端通过 `useAuth`、`useArticle` 等 composable 封装

## 角色权限体系
-
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
| 查看近期文章 | ✅ | ✅ | ✅ (只读) | ✅ (只读) |

> **权限约束**：编辑和删除操作只针对下级权限用户，对同级或上级用户不生效。例如 ADMIN 可编辑/删除 USER 和 GUEST，但不可编辑/删除其他 ADMIN 或 SUPERADMIN。

 SUPERADMIN（超级管理员）：最高权限
- ADMIN（管理员）：管理用户/文章
- USER（普通用户）：管理自己的文章
- GUEST（访客）：只读权限，可注册

## 常用命令
- 前端启动：`cd nuxt-test && npm run dev`
- 后端编译：`cd java-backend && mvn.cmd compile`
- 后端启动：`cd java-backend && mvn.cmd spring-boot:run`
- 重置后端锁文件：`Remove-Item -Force .\\.git\\index.lock`

## 认证与安全
- 后端使用 Spring Security + JWT
- 公开端点已在 `SecurityConfig.java` 配置
- 前端通过 `auth` 中间件保护路由
- `init.global.ts` 检查系统初始化状态
