<!--
  RichTextEditor - 富文本/Markdown 双模式编辑器组件
  基于 Tiptap 实现，支持 v-model 双向绑定
  工具栏：字号、正文/H1-H5、加粗/斜体/删除线、有序/无序列表、引用/代码块/分隔线、撤销/恢复、模式切换
  输出 HTML 格式。
-->
<script lang="ts" setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { ref, watch, computed, onBeforeUnmount } from 'vue'
import TextStyle from '~/extensions/TextStyle'
import FontSize from '~/extensions/FontSize'
import { sanitizeHtml } from '~/utils/sanitize'
import TurndownService from 'turndown'
import { marked } from 'marked'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const currentSize = ref('16')
const savedRange = ref(null)
const mode = ref('rich')
const markdownContent = ref('')
const fontSizes = ['12', '14', '16', '18', '20', '24', '28', '32', '36', '42', '48', '54', '60']

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
})

turndownService.addRule('image', {
  filter: 'img',
  replacement: function (content, node) {
    const el = node
    const alt = el.getAttribute('alt') || ''
    const src = el.getAttribute('src') || ''
    return '![' + alt + '](' + src + ')'
  },
})

const editor = useEditor({
  editorProps: {
    handleKeyDown: (view, event) => {
      if (event.key === 'Tab' && !event.shiftKey) {
        view.dispatch(view.state.tr.insertText('    '))
        return true
      }
      return false
    },
  },
  content: props.modelValue,
  extensions: [
    StarterKit.configure({
      heading: { levels: [1, 2, 3, 4, 5] },
      link: false,
    }),
    Image.configure({ inline: false }),
    Link.configure({ openOnClick: false }),
    TextStyle,
    FontSize,
  ],
  onUpdate: () => {
    if (mode.value === 'rich') {
      emit('update:modelValue', editor.value?.getHTML() ?? '')
      syncFontSize()
    }
  },
})

watch(
  () => props.modelValue,
  (val) => {
    if (mode.value !== 'rich' || !editor.value) return
    if (val !== editor.value.getHTML()) {
      editor.value.commands.setContent(val, false)
    }
  },
)

watch(
  mode,
  (val) => {
    if (val === 'rich' && editor.value) {
      editor.value.commands.setContent(props.modelValue || '', false)
    }
  },
  { immediate: true },
)

function toggleMode() {
  if (mode.value === 'rich') {
    const html = editor.value?.getHTML() || props.modelValue || ''
    markdownContent.value = turndownService.turndown(html)
    mode.value = 'markdown'
  } else {
    const md = markdownContent.value || ''
    const html = marked.parse(md) || ''
    mode.value = 'rich'
    if (editor.value) {
      editor.value.commands.setContent(html, false)
      emit('update:modelValue', html)
    }
  }
}

watch(markdownContent, (md) => {
  if (mode.value === 'markdown') {
    const html = marked.parse(md || '') || ''
    emit('update:modelValue', html)
  }
})

function syncFontSize() {
  if (!editor.value) return
  const fontSize = editor.value.getAttributes('textStyle').fontSize
  currentSize.value = fontSize || '16'
}

function saveSelection(_e) {
  const domSel = window.getSelection()
  if (!domSel || domSel.rangeCount === 0 || !editor.value) return
  const range = domSel.getRangeAt(0)
  if (editor.value.view.dom.contains(range.commonAncestorContainer)) {
    savedRange.value = range.cloneRange()
  }
}

// 工具栏：设置为正文段落样式
function setParagraphStyle() {
  editor.value?.chain().focus().setParagraph().unsetMark('fontSize').run()
  currentSize.value = '16'
}
function setFontSize(size) {
  if (savedRange.value && editor.value) {
    const domSel = window.getSelection()
    domSel.removeAllRanges()
    domSel.addRange(savedRange.value)
    savedRange.value = null
  }
  if (!editor.value) return
  const { view } = editor.value
  view.focus()
  const { from, to } = view.state.selection
  if (size === '16') {
    view.dispatch(view.state.tr.removeMark(from, to, view.state.schema.marks.fontSize))
  } else {
    const mark = view.state.schema.marks.fontSize.create({ fontSize: size + 'px' })
    view.dispatch(view.state.tr.addMark(from, to, mark))
  }
  currentSize.value = size
}

/** Markdown 包裹选中文本语法 */
function mdWrap(before, after) {
  const ta = document.querySelector('.markdown-textarea')
  if (!ta) return
  const start = ta.selectionStart
  const end = ta.selectionEnd
  const text = markdownContent.value
  const selected = text.substring(start, end)
  markdownContent.value = text.substring(0, start) + before + selected + after + text.substring(end)
  requestAnimationFrame(() => {
    ta.focus()
    if (selected) {
      ta.setSelectionRange(start + before.length, start + before.length + selected.length)
    } else {
      ta.setSelectionRange(start + before.length, start + before.length)
    }
  })
}

/** Markdown 行首前缀（标题/列表/引用等） */
function mdLinePrefix(prefix) {
  const ta = document.querySelector('.markdown-textarea')
  if (!ta) return
  const start = ta.selectionStart
  const text = markdownContent.value
  const nl = String.fromCharCode(10)
  const lineStart = start === 0 ? 0 : text.lastIndexOf(nl, start - 1) + 1
  const lineEnd = text.indexOf(nl, start)
  const lineEndIdx = lineEnd === -1 ? text.length : lineEnd
  const line = text.substring(lineStart, lineEndIdx)
  if (line.startsWith(prefix + ' ')) {
    markdownContent.value =
      text.substring(0, lineStart) + line.substring(prefix.length + 1) + text.substring(lineEndIdx)
  } else if (line.startsWith(prefix)) {
    markdownContent.value =
      text.substring(0, lineStart) + line.substring(prefix.length) + text.substring(lineEndIdx)
  } else {
    const cleaned = line.replace(/^[#\->*+]+(\s|$)/, '')
    markdownContent.value =
      text.substring(0, lineStart) + prefix + ' ' + cleaned + text.substring(lineEndIdx)
  }
  requestAnimationFrame(() => {
    ta.focus()
    ta.setSelectionRange(lineStart, lineStart)
  })
}

/** Markdown 插入水平线 */
function mdHr() {
  const ta = document.querySelector('.markdown-textarea')
  if (!ta) return
  const nl = String.fromCharCode(10)
  const text = markdownContent.value
  markdownContent.value = text + (text.endsWith(nl) ? '' : nl) + '---' + nl
  requestAnimationFrame(() => {
    ta.focus()
    ta.selectionStart = ta.selectionEnd = markdownContent.value.length
  })
}

/** Markdown 插入块级代码 */
function mdCodeBlock() {
  const ta = document.querySelector('.markdown-textarea')
  if (!ta) return
  const nl = String.fromCharCode(10)
  const bt = String.fromCharCode(96)
  const start = ta.selectionStart
  const end = ta.selectionEnd
  const text = markdownContent.value
  const selected = text.substring(start, end)
  markdownContent.value =
    text.substring(0, start) +
    nl +
    bt +
    bt +
    bt +
    nl +
    selected +
    nl +
    bt +
    bt +
    bt +
    nl +
    text.substring(end)
  requestAnimationFrame(() => {
    ta.focus()
    ta.setSelectionRange(start + 1, start + 1)
  })
}

/** Markdown 插入链接 */
function mdLink() {
  const ta = document.querySelector('.markdown-textarea')
  if (!ta) return
  const start = ta.selectionStart
  const end = ta.selectionEnd
  const selected = markdownContent.value.substring(start, end)
  if (selected) {
    mdWrap('[', '](url)')
  } else {
    mdWrap('[链接文本](', ')')
  }
}

/** Markdown 插入图片 */
function mdImage() {
  mdWrap('![图片描述](', ')')
}

onBeforeUnmount(() => {
  editor.value?.destroy()
})

const previewHtml = computed(() => {
  if (mode.value !== 'markdown') return ''
  try {
    return marked.parse(markdownContent.value || '') || ''
  } catch {
    return markdownContent.value || ''
  }
})
</script>

<template>
  <div class="rich-editor">
    <div v-if="mode === 'rich' && editor" class="editor-toolbar">
      <el-tooltip content="字号" placement="top">
        <el-select
          v-model="currentSize"
          style="width: 68px; vertical-align: top"
          size="small"
          @change="setFontSize"
          @mousedown="saveSelection($event)"
        >
          <el-option v-for="s in fontSizes" :key="s" :label="s" :value="s" />
        </el-select>
      </el-tooltip>

      <el-button-group size="small">
        <el-tooltip content="正文" placement="top">
          <el-button
            :class="{ 'is-active': editor.isActive('paragraph') }"
            style="font-size: 13px"
            @click="setParagraphStyle"
            >正文</el-button
          >
        </el-tooltip>
        <el-tooltip content="标题1" placement="top">
          <el-button
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            >H1</el-button
          >
        </el-tooltip>
        <el-tooltip content="标题2" placement="top">
          <el-button
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            >H2</el-button
          >
        </el-tooltip>
        <el-tooltip content="标题3" placement="top">
          <el-button
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            >H3</el-button
          >
        </el-tooltip>
        <el-tooltip content="标题4" placement="top">
          <el-button
            :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
            >H4</el-button
          >
        </el-tooltip>
        <el-tooltip content="标题5" placement="top">
          <el-button
            :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
            >H5</el-button
          >
        </el-tooltip>
      </el-button-group>

      <el-button-group size="small">
        <el-tooltip content="加粗" placement="top">
          <el-button
            :class="{ 'is-active': editor.isActive('bold') }"
            @click="editor.chain().focus().toggleBold().run()"
            ><strong>B</strong></el-button
          >
        </el-tooltip>
        <el-tooltip content="斜体" placement="top">
          <el-button
            :class="{ 'is-active': editor.isActive('italic') }"
            @click="editor.chain().focus().toggleItalic().run()"
            ><em>I</em></el-button
          >
        </el-tooltip>
        <el-tooltip content="删除线" placement="top">
          <el-button
            :class="{ 'is-active': editor.isActive('strike') }"
            @click="editor.chain().focus().toggleStrike().run()"
            ><span style="text-decoration: line-through">S</span></el-button
          >
        </el-tooltip>
      </el-button-group>

      <el-button-group size="small">
        <el-tooltip content="无序列表" placement="top">
          <el-button
            :class="{ 'is-active': editor.isActive('bulletList') }"
            @click="editor.chain().focus().toggleBulletList().run()"
            >UL</el-button
          >
        </el-tooltip>
        <el-tooltip content="有序列表" placement="top">
          <el-button
            :class="{ 'is-active': editor.isActive('orderedList') }"
            @click="editor.chain().focus().toggleOrderedList().run()"
            >OL</el-button
          >
        </el-tooltip>
      </el-button-group>

      <el-button-group size="small">
        <el-tooltip content="引用" placement="top">
          <el-button
            :class="{ 'is-active': editor.isActive('blockquote') }"
            @click="editor.chain().focus().toggleBlockquote().run()"
            >引用</el-button
          >
        </el-tooltip>
        <el-tooltip content="代码块" placement="top">
          <el-button
            :class="{ 'is-active': editor.isActive('codeBlock') }"
            @click="editor.chain().focus().toggleCodeBlock().run()"
            >&lt;/&gt;</el-button
          >
        </el-tooltip>
        <el-tooltip content="分隔线" placement="top">
          <el-button @click="editor.chain().focus().setHorizontalRule().run()">—</el-button>
        </el-tooltip>
      </el-button-group>

      <el-button-group size="small">
        <el-tooltip content="撤销" placement="top">
          <el-button @click="editor.chain().focus().undo().run()">←</el-button>
        </el-tooltip>
        <el-tooltip content="恢复" placement="top">
          <el-button @click="editor.chain().focus().redo().run()">→</el-button>
        </el-tooltip>
      </el-button-group>

      <el-button-group size="small" style="margin-left: auto">
        <el-tooltip content="切换到 Markdown 编辑" placement="top">
          <el-button style="font-weight: bold" @click="toggleMode()">MD</el-button>
        </el-tooltip>
      </el-button-group>
    </div>

    <div v-if="mode === 'markdown'" class="editor-toolbar">
      <el-button-group size="small">
        <el-tooltip content="加粗" placement="top">
          <el-button @click="mdWrap('**', '**')"><strong>B</strong></el-button>
        </el-tooltip>
        <el-tooltip content="斜体" placement="top">
          <el-button @click="mdWrap('*', '*')"><em>I</em></el-button>
        </el-tooltip>
        <el-tooltip content="删除线" placement="top">
          <el-button @click="mdWrap('~~', '~~')"
            ><span style="text-decoration: line-through">S</span></el-button
          >
        </el-tooltip>
      </el-button-group>

      <el-button-group size="small">
        <el-tooltip content="标题1" placement="top">
          <el-button @click="mdLinePrefix('#')">H1</el-button>
        </el-tooltip>
        <el-tooltip content="标题2" placement="top">
          <el-button @click="mdLinePrefix('##')">H2</el-button>
        </el-tooltip>
        <el-tooltip content="标题3" placement="top">
          <el-button @click="mdLinePrefix('###')">H3</el-button>
        </el-tooltip>
        <el-tooltip content="标题4" placement="top">
          <el-button @click="mdLinePrefix('####')">H4</el-button>
        </el-tooltip>
        <el-tooltip content="标题5" placement="top">
          <el-button @click="mdLinePrefix('#####')">H5</el-button>
        </el-tooltip>
      </el-button-group>

      <el-button-group size="small">
        <el-tooltip content="无序列表" placement="top">
          <el-button @click="mdLinePrefix('-')">UL</el-button>
        </el-tooltip>
        <el-tooltip content="有序列表" placement="top">
          <el-button @click="mdLinePrefix('1.')">OL</el-button>
        </el-tooltip>
      </el-button-group>

      <el-button-group size="small">
        <el-tooltip content="引用" placement="top">
          <el-button @click="mdLinePrefix('>')">引用</el-button>
        </el-tooltip>
        <el-tooltip content="代码块" placement="top">
          <el-button @click="mdCodeBlock()">&lt;/&gt;</el-button>
        </el-tooltip>
        <el-tooltip content="分隔线" placement="top">
          <el-button @click="mdHr()">-</el-button>
        </el-tooltip>
      </el-button-group>

      <el-button-group size="small">
        <el-tooltip content="链接" placement="top">
          <el-button @click="mdLink()">链接</el-button>
        </el-tooltip>
        <el-tooltip content="图片" placement="top">
          <el-button @click="mdImage()">图片</el-button>
        </el-tooltip>
      </el-button-group>

      <el-button-group size="small" style="margin-left: auto">
        <el-tooltip content="切换到富文本编辑" placement="top">
          <el-button style="font-weight: bold" @click="toggleMode()">富文本</el-button>
        </el-tooltip>
      </el-button-group>
    </div>

    <editor-content v-if="mode === 'rich'" :editor="editor" class="editor-content" />

    <div v-if="mode === 'markdown'" class="markdown-editor-wrapper">
      <textarea
        v-model="markdownContent"
        class="markdown-textarea"
        placeholder="使用 Markdown 语法编写内容..."
        spellcheck="false"
      ></textarea>
      <div class="markdown-preview">
        <div class="preview-label">预览</div>
        <div class="preview-content" v-html="sanitizeHtml(previewHtml)"></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.rich-editor {
  width: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
}

.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 8px;
  border-bottom: 1px solid #dcdfe6;
  background: #fafafa;

  .el-button.is-active {
    color: var(--el-color-primary);
    border-color: var(--el-color-primary);
    background: rgba(64, 158, 255, 0.08);
  }
}

.editor-content {
  padding: 16px;
  min-height: 400px;
  max-height: 600px;
  overflow-y: auto;

  :deep(.ProseMirror) {
    outline: none;
    min-height: 380px;
    font-size: 15px;
    line-height: 1.8;

    p {
      margin: 0 0 8px;
    }
    h1,
    h2,
    h3,
    h4 {
      margin: 16px 0 8px;
      font-weight: 600;
    }
    h1 {
      font-size: 24px;
    }
    h2 {
      font-size: 20px;
    }
    h3 {
      font-size: 17px;
    }
    h4 {
      font-size: 15px;
    }
    h5 {
      font-size: 14px;
      margin: 14px 0 6px;
      font-weight: 600;
    }

    ul,
    ol {
      padding-left: 24px;
      margin: 8px 0;
    }
    li {
      margin: 4px 0;
    }

    blockquote {
      border-left: 3px solid var(--el-color-primary);
      margin: 8px 0;
      padding: 8px 16px;
      background: #f5f7fa;
      color: #666;
    }

    pre {
      background: #282c34;
      color: #abb2bf;
      padding: 16px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 13px;
    }

    code {
      background: #f0f0f0;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 13px;
    }

    img {
      max-width: 100%;
      border-radius: 4px;
      margin: 8px 0;
    }

    a {
      color: var(--el-color-primary);
      text-decoration: underline;
    }

    hr {
      margin: 16px 0;
      border: none;
      border-top: 1px solid #dcdfe6;
    }

    p.is-editor-empty:first-child::before {
      color: #adb5bd;
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
    }
  }
}

.markdown-editor-wrapper {
  display: flex;
  min-height: 400px;
  max-height: 600px;
}

.markdown-textarea {
  flex: 1;
  min-width: 0;
  border: none;
  border-right: 1px solid #dcdfe6;
  padding: 16px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.7;
  resize: none;
  outline: none;
  color: #333;
  background: #fafafa;

  &::placeholder {
    color: #adb5bd;
  }
}

.markdown-preview {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.preview-label {
  padding: 8px 16px;
  font-size: 12px;
  color: #999;
  background: #f5f7fa;
  border-bottom: 1px solid #eee;
}

.preview-content {
  padding: 16px;
  font-size: 15px;
  line-height: 1.8;

  :deep(p) {
    margin: 0 0 8px;
  }
  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4) {
    margin: 16px 0 8px;
    font-weight: 600;
  }
  :deep(h1) {
    font-size: 24px;
  }
  :deep(h2) {
    font-size: 20px;
  }
  :deep(h3) {
    font-size: 17px;
  }
  :deep(h4) {
    font-size: 15px;
  }
  :deep(h5) {
    font-size: 14px;
    margin: 14px 0 6px;
    font-weight: 600;
  }
  :deep(ul),
  :deep(ol) {
    padding-left: 24px;
    margin: 8px 0;
  }
  :deep(li) {
    margin: 4px 0;
  }
  :deep(blockquote) {
    border-left: 3px solid var(--el-color-primary);
    margin: 8px 0;
    padding: 8px 16px;
    background: #f5f7fa;
    color: #666;
  }
  :deep(pre) {
    background: #282c34;
    color: #abb2bf;
    padding: 16px;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 13px;
  }
  :deep(code) {
    background: #f0f0f0;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 13px;
  }
  :deep(img) {
    max-width: 100%;
    border-radius: 4px;
    margin: 8px 0;
  }
  :deep(a) {
    color: var(--el-color-primary);
    text-decoration: underline;
  }
  :deep(hr) {
    margin: 16px 0;
    border: none;
    border-top: 1px solid #dcdfe6;
  }
}
</style>
