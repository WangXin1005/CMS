@echo off
REM ============================================================
REM CodeBlog CMS — Windows 构建并推送脚本
REM 用法：build.bat [版本号]
REM ============================================================
setlocal enabledelayedexpansion

set VERSION=%1
if "%VERSION%"=="" set VERSION=latest

echo [1/4] 登录 GHCR...
docker login ghcr.io -u WangXin1005

echo [2/4] 构建后端镜像...
cd /d D:\projects\nuxtProject\java-backend
docker build -f ..\docker\Dockerfile.backend -t ghcr.io/wangxin1005/codeblog-backend:%VERSION% -t ghcr.io/wangxin1005/codeblog-backend:latest .
if %ERRORLEVEL% neq 0 goto :error

echo [3/4] 构建前端镜像...
cd /d D:\projects\nuxtProject\nuxt-test
docker build -f ..\docker\Dockerfile.frontend -t ghcr.io/wangxin1005/codeblog-frontend:%VERSION% -t ghcr.io/wangxin1005/codeblog-frontend:latest .
if %ERRORLEVEL% neq 0 goto :error

echo [4/4] 推送到 GHCR...
docker push ghcr.io/wangxin1005/codeblog-backend:%VERSION%
docker push ghcr.io/wangxin1005/codeblog-backend:latest
docker push ghcr.io/wangxin1005/codeblog-frontend:%VERSION%
docker push ghcr.io/wangxin1005/codeblog-frontend:latest

echo.
echo ====================================
echo  构建完成！现在 git push 触发自动部署
echo ====================================
goto :end

:error
echo 构建失败！
exit /b 1

:end
endlocal