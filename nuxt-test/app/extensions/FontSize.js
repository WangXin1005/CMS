import { Mark } from '@tiptap/core'

const FontSize = Mark.create({
  name: 'fontSize',

  addOptions() {
    return { types: ['textStyle'] }
  },

  addAttributes() {
    return {
      fontSize: {
        default: null,
        parseHTML: el => el.style.fontSize || null,
        renderHTML: attrs => !attrs.fontSize ? {} : { style: 'font-size: ' + attrs.fontSize },
      },
    }
  },

  parseHTML() {
    return [{ style: 'font-size', getAttrs: val => ({ fontSize: val }) }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0]
  },
})

export default FontSize
