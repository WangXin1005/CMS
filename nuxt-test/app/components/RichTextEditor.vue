<!--
  RichTextEditor — 富文本编辑器组件
  基于 Tiptap 实现，支持 v-model 双向绑定。
  工具栏：加粗/斜体/删除线、H1-H4、有序/无序列表、引用、代码块、分隔线、撤销/重做。
  输出 HTML 格式。
-->
<script lang="ts" setup>
/**
 * 基于 Tiptap 的富文本编辑器组件
 * 支持基础排版、列表、链接、图片插入
 */
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editor = useEditor({
  editorProps: {
    handleKeyDown: (view, event) => {
      if (event.key === "Tab" && !event.shiftKey) {
        view.dispatch(view.state.tr.insertText("    "));
        return true;
      }
      return false;
    }
  },
  content: props.modelValue,
  extensions: [
    StarterKit.configure({
      heading: { levels: [1, 2, 3, 4] },
    }),
    Image.configure({ inline: false }),
    Link.configure({ openOnClick: false }),
  ],
  onUpdate: () => {
    emit('update:modelValue', editor.value?.getHTML() ?? '')
  },
})

watch(() => props.modelValue, (val) => {
  if (editor.value && val !== editor.value.getHTML()) {
    editor.value.commands.setContent(val, false)
  }
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<template>
  <div class="rich-editor" v-if="editor">
    <!-- 工具栏 -->
    <div class="editor-toolbar">
      <el-button-group size="small">
        <el-tooltip content="加粗" placement="top">
          <el-button :class="{ 'is-active': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">
            <strong>B</strong>
          </el-button>
        </el-tooltip>
        <el-tooltip content="斜体" placement="top">
          <el-button :class="{ 'is-active': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">
            <em>I</em>
          </el-button>
        </el-tooltip>
        <el-tooltip content="删除线" placement="top">
          <el-button :class="{ 'is-active': editor.isActive('strike') }" @click="editor.chain().focus().toggleStrike().run()">
            <span style="text-decoration:line-through">S</span>
          </el-button>
        </el-tooltip>
      </el-button-group>

      <el-button-group size="small">
        <el-tooltip content="标题1" placement="top">
          <el-button :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">H1</el-button>
        </el-tooltip>
        <el-tooltip content="标题2" placement="top">
          <el-button :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">H2</el-button>
        </el-tooltip>
        <el-tooltip content="标题3" placement="top">
          <el-button :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">H3</el-button>
        </el-tooltip>
      </el-button-group>

      <el-button-group size="small">
        <el-tooltip content="无序列表" placement="top">
          <el-button :class="{ 'is-active': editor.isActive('bulletList') }"
            @click="editor.chain().focus().toggleBulletList().run()">UL</el-button>
        </el-tooltip>
        <el-tooltip content="有序列表" placement="top">
          <el-button :class="{ 'is-active': editor.isActive('orderedList') }"
            @click="editor.chain().focus().toggleOrderedList().run()">OL</el-button>
        </el-tooltip>
      </el-button-group>

      <el-button-group size="small">
        <el-tooltip content="引用" placement="top">
          <el-button :class="{ 'is-active': editor.isActive('blockquote') }"
            @click="editor.chain().focus().toggleBlockquote().run()">❝</el-button>
        </el-tooltip>
        <el-tooltip content="代码块" placement="top">
          <el-button :class="{ 'is-active': editor.isActive('codeBlock') }"
            @click="editor.chain().focus().toggleCodeBlock().run()">&lt;/&gt;</el-button>
        </el-tooltip>
        <el-tooltip content="分隔线" placement="top">
          <el-button @click="editor.chain().focus().setHorizontalRule().run()">—</el-button>
        </el-tooltip>
      </el-button-group>

      <el-tooltip content="撤销" placement="top">
        <el-button size="small" @click="editor.chain().focus().undo().run()">↶</el-button>
      </el-tooltip>
      <el-tooltip content="重做" placement="top">
        <el-button size="small" @click="editor.chain().focus().redo().run()">↷</el-button>
      </el-tooltip>
    </div>

    <!-- 编辑区域 -->
    <editor-content :editor="editor" class="editor-content" />
  </div>
</template>

<style lang="less" scoped>
.rich-editor {
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

    p { margin: 0 0 8px; }
    h1, h2, h3, h4 { margin: 16px 0 8px; font-weight: 600; }
    h1 { font-size: 24px; }
    h2 { font-size: 20px; }
    h3 { font-size: 17px; }
    h4 { font-size: 15px; }

    ul, ol { padding-left: 24px; margin: 8px 0; }
    li { margin: 4px 0; }

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

    a { color: var(--el-color-primary); text-decoration: underline; }

    hr { margin: 16px 0; border: none; border-top: 1px solid #dcdfe6; }

    p.is-editor-empty:first-child::before {
      color: #adb5bd;
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
    }
  }
}
</style>
