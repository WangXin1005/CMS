<!-- articles/create — 文章创建页：富文本/Markdown 编辑器，分类/标签选择 -->
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
definePageMeta({ middleware: 'auth' })

const { create, createMyArticle } = useArticle()
const { role } = useAuth()

const isAdmin = computed(() => role.value === 'ADMIN' || role.value === 'SUPERADMIN')

const { getList: getCategories } = useCategory()
const { getList: getTags } = useTag()

const categories = ref([])
const tags = ref([])
const submitting = ref(false)
const form = ref({
  title: '',
  slug: '',
  summary: '',
  content: '',
  coverImage: '',
  status: 'DRAFT',
  categoryId: undefined,
  tagIds: [],
})

onMounted(async () => {
  try {
    const [catRes, tagRes] = await Promise.all([getCategories(), getTags()])
    categories.value = catRes ?? []
    tags.value = tagRes ?? []
  } catch {
    /* ignore */
  }
})

async function handleSubmit(status) {
  form.value.status = status
  if (!form.value.title || !form.value.slug) {
    ElMessage.warning('标题和 Slug 不能为空')
    return
  }
  submitting.value = true
  try {
    if (isAdmin.value) {
      await create({ ...form.value })
    } else {
      await createMyArticle({ ...form.value })
    }
    ElMessage.success(status === 'PUBLISHED' ? '文章已发布' : '草稿已保存')
    navigateTo('/articles')
  } catch (e) {
    ElMessage.error(e.response?.data?.message || '保存失败')
  } finally {
    submitting.value = false
  }
}
function insertTabInTextarea(e, field) {
  const ta = e.target
  const start = ta.selectionStart,
    end = ta.selectionEnd
  form.value[field] =
    form.value[field].substring(0, start) + '\t' + form.value[field].substring(end)
  setTimeout(() => {
    ta.selectionStart = ta.selectionEnd = start + 1
  }, 0)
}
</script>

<template>
  <div>
    <div class="page-header">
      <h2>创建文章</h2>
      <div>
        <el-button @click="navigateTo('/articles')">取消</el-button>
        <el-button :loading="submitting" @click="handleSubmit('DRAFT')">保存草稿</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSubmit('PUBLISHED')"
          >发布</el-button
        >
      </div>
    </div>
    <div class="page-card">
      <el-form label-width="80px">
        <el-form-item label="标题" required>
          <el-input v-model="form.title" placeholder="文章标题" maxlength="200" />
        </el-form-item>
        <el-form-item label="Slug" required>
          <el-input
            v-model="form.slug"
            placeholder="文章标识（如 my-first-post）"
            maxlength="200"
          />
        </el-form-item>
        <el-form-item label="封面图">
          <el-input v-model="form.coverImage" placeholder="图片 URL（可选）" />
        </el-form-item>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="分类">
              <el-select
                v-model="form.categoryId"
                placeholder="选择分类"
                clearable
                style="width: 100%"
              >
                <el-option
                  v-for="cat in categories"
                  :key="cat.id"
                  :label="cat.name"
                  :value="cat.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签">
              <el-select
                v-model="form.tagIds"
                multiple
                placeholder="选择标签"
                clearable
                style="width: 100%"
              >
                <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="摘要">
          <el-input
            v-model="form.summary"
            type="textarea"
            :rows="3"
            placeholder="文章摘要（可选）"
            @keydown.tab.prevent="insertTabInTextarea($event, 'summary')"
          />
        </el-form-item>
        <el-form-item label="内容" style="width: 100%">
          <RichTextEditor v-model="form.content" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.el-form-item:has(.rich-editor) {
  width: 100% !important;
}
</style>
