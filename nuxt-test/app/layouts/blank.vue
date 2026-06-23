<!-- 空白布局：居中显示卡片内容（用于登录/注册页） -->
<template>
    <div class="blank-layout">
        <slot />
    </div>
</template>

<script lang="ts" setup>
</script>
<style lang="less" scoped>
.blank-layout {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #f5f7fa;
}
</style>