import { Mark, mergeAttributes } from '@tiptap/core'

const TextStyle = Mark.create({
  name: 'textStyle',

  addOptions() {
    return { HTMLAttributes: {} }
  },

  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: (el) => {
          const style = el.style
          if (style.fontSize || style.color || style.fontFamily) return {}
          return false
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      removeEmptyTextStyle:
        () =>
        ({ state, commands }) => {
          const attrs = state.selection.$from.marks().find((m) => m.type.name === this.name)?.attrs
          if (!attrs || Object.keys(attrs).length === 0) return commands.unsetMark(this.name)
          return true
        },
    }
  },
})

export default TextStyle
