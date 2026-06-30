<!-- Dialog — 通用对话框组件，支持标题、宽度、确认/取消回调 -->
<script lang="ts" setup>
/** 通用对话框组件，支持 v-model 控制显隐 */
const props = defineProps<{ visible: boolean }>()
const emit = defineEmits<{ 'update:visible': [value: boolean] }>()
/** 双向绑定计算属性：将 visible prop 同步给父组件 */
const visibleComputed = computed({
  get: () => props.visible,
  set: (val: boolean) => emit('update:visible', val),
})
</script>
<template>
  <el-dialog v-model="visibleComputed" title="提示" width="500" destroy-on-close center>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visibleComputed = false">取消</el-button>
        <el-button type="primary" @click="visibleComputed = false"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style lang="less" scoped></style>
