<!-- articles/create — 文章创建页：富文本/Markdown 编辑器，分类/标签选择 -->
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
definePageMeta({ middleware: 'auth' })

const { create, createMyArticle } = useArticle()
const { role } = useAuth()

const isAdmin = computed(() => role.value === 'ADMIN' || role.value === 'SUPERADMIN')

const { getList: getCategories } = useCategory()
const { getList: getMediaList } = useMedia()
const { getList: getTags } = useTag()

const categories = ref([])
const tags = ref([])
const submitting = ref(false)
// 封面媒体选择
const coverPickerVisible = ref(false)
const mediaList = ref([])
const mediaLoading = ref(false)
const form = ref({
  title: '',
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

// 打开封面媒体选择器
async function openCoverPicker() {
  coverPickerVisible.value = true;
  mediaLoading.value = true;
  try {
    const res = await getMediaList();
    mediaList.value = (res || []).filter(function(m) { return m.mimeType && m.mimeType.startsWith("image/"); });
  } catch {
    mediaList.value = [];
  } finally {
    mediaLoading.value = false;
  }
}

// 选择封面图片
function selectCoverImage(media) {
  if (media && media.url) {
    form.value.coverImage = media.url;
  }
  coverPickerVisible.value = false;
}

function genSlug(title) {
    const base = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\u4e00-\u9fa5-]/g, '').substring(0, 60) || 'article';
    // 添加时间戳后缀保证唯一性，避免同标题文章 slug 冲突
    return base + '-' + Date.now();
  }

async function handleSubmit(status) {
  form.value.status = status
  form.value.slug = genSlug(form.value.title)
  if (!form.value.title) {
    ElMessage.warning('标题不能为空')
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
    /* 拦截器已处理消息提示 */
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
  <div style="overflow-y: auto; height: 100%;">
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
        <el-form-item label="封面图">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <el-button size="small" @click="openCoverPicker">从媒体库选择</el-button>
            <el-button v-if="form.coverImage" size="small" type="danger" plain @click="form.coverImage = ''">清除</el-button>
          </div>
          <img v-if="form.coverImage" :src="form.coverImage" style="margin-top:8px;max-width:300px;max-height:200px;border-radius:6px;border:1px solid #e8e8e8;display:block" />
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
  <!-- 封面媒体选择弹窗 -->
    <el-dialog v-model="coverPickerVisible" title="选择封面图" width="700px" destroy-on-close>
      <div v-loading="mediaLoading" style="min-height: 200px">
        <div v-if="mediaList.length === 0 && !mediaLoading" style="text-align:center;padding:60px 0;color:#999">暂无图片，请先在媒体管理中上传</div>
        <div v-else style="display:flex;flex-wrap:wrap;gap:12px">
          <div
            v-for="m in mediaList"
            :key="m.id"
            class="cover-picker-item"
            @click="selectCoverImage(m)"
          >
            <img :src="m.url" :alt="m.originalName" />
            <div class="cover-picker-name">{{ m.originalName }}</div>
          </div>
        </div>
      </div>
    </el-dialog>
</template>

<style scoped>
.el-form-item:has(.rich-editor) {
  width: 100% !important;
}
</style>

<style>
.cover-picker-item {
  width: 150px;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 6px;
  overflow: hidden;
  transition: border-color 0.2s;
}
.cover-picker-item:hover {
  border-color: #409eff;
}
.cover-picker-item img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
}
.cover-picker-item .cover-picker-name {
  padding: 4px 8px;
  font-size: 12px;
  color: #666;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
