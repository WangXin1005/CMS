-- ============================================================
-- CodeBlog CMS — MySQL 初始化脚本
-- 仅在数据库首次创建时执行（docker-entrypoint-initdb.d）
-- ============================================================

-- 设置字符集
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- 数据库由 docker-compose 环境变量自动创建，此处仅做字符集确认
ALTER DATABASE nuxt_test_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
