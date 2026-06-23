<script lang="ts" setup>
/** 通用对话框组件，支持 v-model 控制显隐 */
const props = defineProps<{ visible: boolean }>()
const emit = defineEmits<{ 'update:visible': [value: boolean] }>()
/** 双向绑定计算属性：将 visible prop 同步给父组件 */
const visibleComputed = computed({
    get: () => props.visible,
    set: (val: boolean) => emit('update:visible', val)
})
</script>
<template>
    <el-dialog v-model="visibleComputed" title="Notice" width="500" destroy-on-close center>
        <span>
            Notice: before the dialog is opened for the first time, this node and the
            one below will not be rendered.
        </span>
        <div>
            <strong>Extra content (Not rendered)</strong>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="visibleComputed = false">Cancel</el-button>
                <el-button type="primary" @click="visibleComputed = false">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<style lang="less" scoped></style>