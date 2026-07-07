# ============================================
# 本地构建前后端，然后推送到 Gitee
# 用法：.\scripts\build-local.ps1
# ============================================

Write-Host "==============================" -ForegroundColor Cyan
Write-Host " CodeBlog 本地构建" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan

# 后端构建
Write-Host "`n[1/2] Maven 编译后端..." -ForegroundColor Yellow
cd java-backend
mvn.cmd package -DskipTests -q
if ($LASTEXITCODE -ne 0) {
    Write-Host "后端构建失败!" -ForegroundColor Red
    cd ..
    exit 1
}
cd ..
Write-Host "  后端构建完成" -ForegroundColor Green

# 前端构建
Write-Host "`n[2/2] Nuxt 构建前端..." -ForegroundColor Yellow
cd nuxt-test
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "前端构建失败!" -ForegroundColor Red
    cd ..
    exit 1
}
cd ..
Write-Host "  前端构建完成" -ForegroundColor Green

Write-Host "`n==============================" -ForegroundColor Green
Write-Host " 构建完成！" -ForegroundColor Green
Write-Host "==============================" -ForegroundColor Green
Write-Host "`n产物位置："
Write-Host "  后端: java-backend\target\*.jar"
Write-Host "  前端: nuxt-test\.output\"
Write-Host "`n下一步：git add + commit + push 到 Gitee"