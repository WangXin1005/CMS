import { E as ElTooltip } from './el-tag-Bo0paWdy.mjs';
import { E as ElSelect, a as ElOption } from './el-select-CcGgEtTi.mjs';
import { a as ElButtonGroup, E as ElButton } from './el-button-BJk5PihZ.mjs';
import { defineComponent, ref, watch, computed, mergeProps, unref, withCtx, openBlock, createBlock, Fragment, renderList, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Mark, mergeAttributes } from '@tiptap/core';
import { s as sanitizeHtml } from './sanitize-CMFdLwh2.mjs';
import TurndownService from 'turndown';
import { marked } from 'marked';
import { _ as _export_sfc } from './server.mjs';

const TextStyle = Mark.create({
  name: "textStyle",
  addOptions() {
    return { HTMLAttributes: {} };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (el) => {
          const style = el.style;
          if (style.fontSize || style.color || style.fontFamily) return {};
          return false;
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ state, commands }) => {
        var _a;
        const attrs = (_a = state.selection.$from.marks().find((m) => m.type.name === this.name)) == null ? void 0 : _a.attrs;
        if (!attrs || Object.keys(attrs).length === 0) return commands.unsetMark(this.name);
        return true;
      }
    };
  }
});
const FontSize = Mark.create({
  name: "fontSize",
  addOptions() {
    return { types: ["textStyle"] };
  },
  addAttributes() {
    return {
      fontSize: {
        default: null,
        parseHTML: (el) => el.style.fontSize || null,
        renderHTML: (attrs) => !attrs.fontSize ? {} : { style: "font-size: " + attrs.fontSize }
      }
    };
  },
  parseHTML() {
    return [{ style: "font-size", getAttrs: (val) => ({ fontSize: val }) }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", HTMLAttributes, 0];
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RichTextEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const currentSize = ref("16");
    const savedRange = ref(null);
    const mode = ref("rich");
    const markdownContent = ref("");
    const fontSizes = ["12", "14", "16", "18", "20", "24", "28", "32", "36", "42", "48", "54", "60"];
    const turndownService = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
      emDelimiter: "*"
    });
    turndownService.addRule("image", {
      filter: "img",
      replacement: function(content, node) {
        const el = node;
        const alt = el.getAttribute("alt") || "";
        const src = el.getAttribute("src") || "";
        return "![" + alt + "](" + src + ")";
      }
    });
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
          heading: { levels: [1, 2, 3, 4, 5] },
          link: false
        }),
        Image.configure({ inline: false }),
        Link.configure({ openOnClick: false }),
        TextStyle,
        FontSize
      ],
      onUpdate: () => {
        var _a, _b;
        if (mode.value === "rich") {
          emit("update:modelValue", (_b = (_a = editor.value) == null ? void 0 : _a.getHTML()) != null ? _b : "");
          syncFontSize();
        }
      }
    });
    watch(
      () => props.modelValue,
      (val) => {
        if (mode.value !== "rich" || !editor.value) return;
        if (val !== editor.value.getHTML()) {
          editor.value.commands.setContent(val, false);
        }
      }
    );
    watch(
      mode,
      (val) => {
        if (val === "rich" && editor.value) {
          editor.value.commands.setContent(props.modelValue || "", false);
        }
      },
      { immediate: true }
    );
    function toggleMode() {
      var _a;
      if (mode.value === "rich") {
        const html = ((_a = editor.value) == null ? void 0 : _a.getHTML()) || props.modelValue || "";
        markdownContent.value = turndownService.turndown(html);
        mode.value = "markdown";
      } else {
        const md = markdownContent.value || "";
        const html = marked.parse(md) || "";
        mode.value = "rich";
        if (editor.value) {
          editor.value.commands.setContent(html, false);
          emit("update:modelValue", html);
        }
      }
    }
    watch(markdownContent, (md) => {
      if (mode.value === "markdown") {
        const html = marked.parse(md || "") || "";
        emit("update:modelValue", html);
      }
    });
    function syncFontSize() {
      if (!editor.value) return;
      const fontSize = editor.value.getAttributes("textStyle").fontSize;
      currentSize.value = fontSize || "16";
    }
    function saveSelection(_e) {
      const domSel = (void 0).getSelection();
      if (!domSel || domSel.rangeCount === 0 || !editor.value) return;
      const range = domSel.getRangeAt(0);
      if (editor.value.view.dom.contains(range.commonAncestorContainer)) {
        savedRange.value = range.cloneRange();
      }
    }
    function setParagraphStyle() {
      var _a;
      (_a = editor.value) == null ? void 0 : _a.chain().focus().setParagraph().unsetMark("fontSize").run();
      currentSize.value = "16";
    }
    function setFontSize(size) {
      if (savedRange.value && editor.value) {
        const domSel = (void 0).getSelection();
        domSel.removeAllRanges();
        domSel.addRange(savedRange.value);
        savedRange.value = null;
      }
      if (!editor.value) return;
      const { view } = editor.value;
      view.focus();
      const { from, to } = view.state.selection;
      if (size === "16") {
        view.dispatch(view.state.tr.removeMark(from, to, view.state.schema.marks.fontSize));
      } else {
        const mark = view.state.schema.marks.fontSize.create({ fontSize: size + "px" });
        view.dispatch(view.state.tr.addMark(from, to, mark));
      }
      currentSize.value = size;
    }
    function mdWrap(before, after) {
      const ta = (void 0).querySelector(".markdown-textarea");
      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const text = markdownContent.value;
      const selected = text.substring(start, end);
      markdownContent.value = text.substring(0, start) + before + selected + after + text.substring(end);
      requestAnimationFrame(() => {
        ta.focus();
        if (selected) {
          ta.setSelectionRange(start + before.length, start + before.length + selected.length);
        } else {
          ta.setSelectionRange(start + before.length, start + before.length);
        }
      });
    }
    function mdLinePrefix(prefix) {
      const ta = (void 0).querySelector(".markdown-textarea");
      if (!ta) return;
      const start = ta.selectionStart;
      const text = markdownContent.value;
      const nl = String.fromCharCode(10);
      const lineStart = start === 0 ? 0 : text.lastIndexOf(nl, start - 1) + 1;
      const lineEnd = text.indexOf(nl, start);
      const lineEndIdx = lineEnd === -1 ? text.length : lineEnd;
      const line = text.substring(lineStart, lineEndIdx);
      if (line.startsWith(prefix + " ")) {
        markdownContent.value = text.substring(0, lineStart) + line.substring(prefix.length + 1) + text.substring(lineEndIdx);
      } else if (line.startsWith(prefix)) {
        markdownContent.value = text.substring(0, lineStart) + line.substring(prefix.length) + text.substring(lineEndIdx);
      } else {
        const cleaned = line.replace(/^[#\->*+]+(\s|$)/, "");
        markdownContent.value = text.substring(0, lineStart) + prefix + " " + cleaned + text.substring(lineEndIdx);
      }
      requestAnimationFrame(() => {
        ta.focus();
        ta.setSelectionRange(lineStart, lineStart);
      });
    }
    function mdHr() {
      const ta = (void 0).querySelector(".markdown-textarea");
      if (!ta) return;
      const nl = String.fromCharCode(10);
      const text = markdownContent.value;
      markdownContent.value = text + (text.endsWith(nl) ? "" : nl) + "---" + nl;
      requestAnimationFrame(() => {
        ta.focus();
        ta.selectionStart = ta.selectionEnd = markdownContent.value.length;
      });
    }
    function mdCodeBlock() {
      const ta = (void 0).querySelector(".markdown-textarea");
      if (!ta) return;
      const nl = String.fromCharCode(10);
      const bt = String.fromCharCode(96);
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const text = markdownContent.value;
      const selected = text.substring(start, end);
      markdownContent.value = text.substring(0, start) + nl + bt + bt + bt + nl + selected + nl + bt + bt + bt + nl + text.substring(end);
      requestAnimationFrame(() => {
        ta.focus();
        ta.setSelectionRange(start + 1, start + 1);
      });
    }
    function mdLink() {
      const ta = (void 0).querySelector(".markdown-textarea");
      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = markdownContent.value.substring(start, end);
      if (selected) {
        mdWrap("[", "](url)");
      } else {
        mdWrap("[\u94FE\u63A5\u6587\u672C](", ")");
      }
    }
    function mdImage() {
      mdWrap("![\u56FE\u7247\u63CF\u8FF0](", ")");
    }
    const previewHtml = computed(() => {
      if (mode.value !== "markdown") return "";
      try {
        return marked.parse(markdownContent.value || "") || "";
      } catch {
        return markdownContent.value || "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_el_tooltip = ElTooltip;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_button_group = ElButtonGroup;
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rich-editor" }, _attrs))} data-v-c7fe8ab0>`);
      if (mode.value === "rich" && unref(editor)) {
        _push(`<div class="editor-toolbar" data-v-c7fe8ab0>`);
        _push(ssrRenderComponent(_component_el_tooltip, {
          content: "\u5B57\u53F7",
          placement: "top"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_select, {
                modelValue: currentSize.value,
                "onUpdate:modelValue": ($event) => currentSize.value = $event,
                style: { "width": "68px", "vertical-align": "top" },
                size: "small",
                onChange: setFontSize,
                onMousedown: ($event) => saveSelection()
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(fontSizes, (s) => {
                      _push3(ssrRenderComponent(_component_el_option, {
                        key: s,
                        label: s,
                        value: s
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(), createBlock(Fragment, null, renderList(fontSizes, (s) => {
                        return createVNode(_component_el_option, {
                          key: s,
                          label: s,
                          value: s
                        }, null, 8, ["label", "value"]);
                      }), 64))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_select, {
                  modelValue: currentSize.value,
                  "onUpdate:modelValue": ($event) => currentSize.value = $event,
                  style: { "width": "68px", "vertical-align": "top" },
                  size: "small",
                  onChange: setFontSize,
                  onMousedown: ($event) => saveSelection()
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(Fragment, null, renderList(fontSizes, (s) => {
                      return createVNode(_component_el_option, {
                        key: s,
                        label: s,
                        value: s
                      }, null, 8, ["label", "value"]);
                    }), 64))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "onMousedown"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_button_group, { size: "small" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u6B63\u6587",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("paragraph") },
                      style: { "font-size": "13px" },
                      onClick: setParagraphStyle
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u6B63\u6587`);
                        } else {
                          return [
                            createTextVNode("\u6B63\u6587")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        class: { "is-active": unref(editor).isActive("paragraph") },
                        style: { "font-size": "13px" },
                        onClick: setParagraphStyle
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u6B63\u6587")
                        ]),
                        _: 1
                      }, 8, ["class"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u6807\u98981",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("heading", { level: 1 }) },
                      onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: 1 }).run()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`H1`);
                        } else {
                          return [
                            createTextVNode("H1")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        class: { "is-active": unref(editor).isActive("heading", { level: 1 }) },
                        onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: 1 }).run()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("H1")
                        ]),
                        _: 1
                      }, 8, ["class", "onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u6807\u98982",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("heading", { level: 2 }) },
                      onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: 2 }).run()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`H2`);
                        } else {
                          return [
                            createTextVNode("H2")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        class: { "is-active": unref(editor).isActive("heading", { level: 2 }) },
                        onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: 2 }).run()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("H2")
                        ]),
                        _: 1
                      }, 8, ["class", "onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u6807\u98983",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("heading", { level: 3 }) },
                      onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: 3 }).run()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`H3`);
                        } else {
                          return [
                            createTextVNode("H3")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        class: { "is-active": unref(editor).isActive("heading", { level: 3 }) },
                        onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: 3 }).run()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("H3")
                        ]),
                        _: 1
                      }, 8, ["class", "onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u6807\u98984",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("heading", { level: 4 }) },
                      onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: 4 }).run()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`H4`);
                        } else {
                          return [
                            createTextVNode("H4")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        class: { "is-active": unref(editor).isActive("heading", { level: 4 }) },
                        onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: 4 }).run()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("H4")
                        ]),
                        _: 1
                      }, 8, ["class", "onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u6807\u98985",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("heading", { level: 5 }) },
                      onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: 5 }).run()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`H5`);
                        } else {
                          return [
                            createTextVNode("H5")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        class: { "is-active": unref(editor).isActive("heading", { level: 5 }) },
                        onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: 5 }).run()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("H5")
                        ]),
                        _: 1
                      }, 8, ["class", "onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_tooltip, {
                  content: "\u6B63\u6587",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("paragraph") },
                      style: { "font-size": "13px" },
                      onClick: setParagraphStyle
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u6B63\u6587")
                      ]),
                      _: 1
                    }, 8, ["class"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tooltip, {
                  content: "\u6807\u98981",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("heading", { level: 1 }) },
                      onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: 1 }).run()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("H1")
                      ]),
                      _: 1
                    }, 8, ["class", "onClick"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tooltip, {
                  content: "\u6807\u98982",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("heading", { level: 2 }) },
                      onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: 2 }).run()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("H2")
                      ]),
                      _: 1
                    }, 8, ["class", "onClick"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tooltip, {
                  content: "\u6807\u98983",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("heading", { level: 3 }) },
                      onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: 3 }).run()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("H3")
                      ]),
                      _: 1
                    }, 8, ["class", "onClick"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tooltip, {
                  content: "\u6807\u98984",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("heading", { level: 4 }) },
                      onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: 4 }).run()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("H4")
                      ]),
                      _: 1
                    }, 8, ["class", "onClick"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tooltip, {
                  content: "\u6807\u98985",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("heading", { level: 5 }) },
                      onClick: ($event) => unref(editor).chain().focus().toggleHeading({ level: 5 }).run()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("H5")
                      ]),
                      _: 1
                    }, 8, ["class", "onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_button_group, { size: "small" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u52A0\u7C97",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("bold") },
                      onClick: ($event) => unref(editor).chain().focus().toggleBold().run()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<strong data-v-c7fe8ab0${_scopeId3}>B</strong>`);
                        } else {
                          return [
                            createVNode("strong", null, "B")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        class: { "is-active": unref(editor).isActive("bold") },
                        onClick: ($event) => unref(editor).chain().focus().toggleBold().run()
                      }, {
                        default: withCtx(() => [
                          createVNode("strong", null, "B")
                        ]),
                        _: 1
                      }, 8, ["class", "onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u659C\u4F53",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("italic") },
                      onClick: ($event) => unref(editor).chain().focus().toggleItalic().run()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<em data-v-c7fe8ab0${_scopeId3}>I</em>`);
                        } else {
                          return [
                            createVNode("em", null, "I")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        class: { "is-active": unref(editor).isActive("italic") },
                        onClick: ($event) => unref(editor).chain().focus().toggleItalic().run()
                      }, {
                        default: withCtx(() => [
                          createVNode("em", null, "I")
                        ]),
                        _: 1
                      }, 8, ["class", "onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u5220\u9664\u7EBF",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("strike") },
                      onClick: ($event) => unref(editor).chain().focus().toggleStrike().run()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span style="${ssrRenderStyle({ "text-decoration": "line-through" })}" data-v-c7fe8ab0${_scopeId3}>S</span>`);
                        } else {
                          return [
                            createVNode("span", { style: { "text-decoration": "line-through" } }, "S")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        class: { "is-active": unref(editor).isActive("strike") },
                        onClick: ($event) => unref(editor).chain().focus().toggleStrike().run()
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { style: { "text-decoration": "line-through" } }, "S")
                        ]),
                        _: 1
                      }, 8, ["class", "onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_tooltip, {
                  content: "\u52A0\u7C97",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("bold") },
                      onClick: ($event) => unref(editor).chain().focus().toggleBold().run()
                    }, {
                      default: withCtx(() => [
                        createVNode("strong", null, "B")
                      ]),
                      _: 1
                    }, 8, ["class", "onClick"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tooltip, {
                  content: "\u659C\u4F53",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("italic") },
                      onClick: ($event) => unref(editor).chain().focus().toggleItalic().run()
                    }, {
                      default: withCtx(() => [
                        createVNode("em", null, "I")
                      ]),
                      _: 1
                    }, 8, ["class", "onClick"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tooltip, {
                  content: "\u5220\u9664\u7EBF",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("strike") },
                      onClick: ($event) => unref(editor).chain().focus().toggleStrike().run()
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { style: { "text-decoration": "line-through" } }, "S")
                      ]),
                      _: 1
                    }, 8, ["class", "onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_button_group, { size: "small" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u65E0\u5E8F\u5217\u8868",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("bulletList") },
                      onClick: ($event) => unref(editor).chain().focus().toggleBulletList().run()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`UL`);
                        } else {
                          return [
                            createTextVNode("UL")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        class: { "is-active": unref(editor).isActive("bulletList") },
                        onClick: ($event) => unref(editor).chain().focus().toggleBulletList().run()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("UL")
                        ]),
                        _: 1
                      }, 8, ["class", "onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u6709\u5E8F\u5217\u8868",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("orderedList") },
                      onClick: ($event) => unref(editor).chain().focus().toggleOrderedList().run()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`OL`);
                        } else {
                          return [
                            createTextVNode("OL")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        class: { "is-active": unref(editor).isActive("orderedList") },
                        onClick: ($event) => unref(editor).chain().focus().toggleOrderedList().run()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("OL")
                        ]),
                        _: 1
                      }, 8, ["class", "onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_tooltip, {
                  content: "\u65E0\u5E8F\u5217\u8868",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("bulletList") },
                      onClick: ($event) => unref(editor).chain().focus().toggleBulletList().run()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("UL")
                      ]),
                      _: 1
                    }, 8, ["class", "onClick"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tooltip, {
                  content: "\u6709\u5E8F\u5217\u8868",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("orderedList") },
                      onClick: ($event) => unref(editor).chain().focus().toggleOrderedList().run()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("OL")
                      ]),
                      _: 1
                    }, 8, ["class", "onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_button_group, { size: "small" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u5F15\u7528",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("blockquote") },
                      onClick: ($event) => unref(editor).chain().focus().toggleBlockquote().run()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u5F15\u7528`);
                        } else {
                          return [
                            createTextVNode("\u5F15\u7528")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        class: { "is-active": unref(editor).isActive("blockquote") },
                        onClick: ($event) => unref(editor).chain().focus().toggleBlockquote().run()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u5F15\u7528")
                        ]),
                        _: 1
                      }, 8, ["class", "onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u4EE3\u7801\u5757",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("codeBlock") },
                      onClick: ($event) => unref(editor).chain().focus().toggleCodeBlock().run()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`&lt;/&gt;`);
                        } else {
                          return [
                            createTextVNode("</>")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        class: { "is-active": unref(editor).isActive("codeBlock") },
                        onClick: ($event) => unref(editor).chain().focus().toggleCodeBlock().run()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("</>")
                        ]),
                        _: 1
                      }, 8, ["class", "onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u5206\u9694\u7EBF",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      onClick: ($event) => unref(editor).chain().focus().setHorizontalRule().run()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u2014`);
                        } else {
                          return [
                            createTextVNode("\u2014")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        onClick: ($event) => unref(editor).chain().focus().setHorizontalRule().run()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u2014")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_tooltip, {
                  content: "\u5F15\u7528",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("blockquote") },
                      onClick: ($event) => unref(editor).chain().focus().toggleBlockquote().run()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u5F15\u7528")
                      ]),
                      _: 1
                    }, 8, ["class", "onClick"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tooltip, {
                  content: "\u4EE3\u7801\u5757",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      class: { "is-active": unref(editor).isActive("codeBlock") },
                      onClick: ($event) => unref(editor).chain().focus().toggleCodeBlock().run()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("</>")
                      ]),
                      _: 1
                    }, 8, ["class", "onClick"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tooltip, {
                  content: "\u5206\u9694\u7EBF",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      onClick: ($event) => unref(editor).chain().focus().setHorizontalRule().run()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u2014")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_button_group, { size: "small" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u64A4\u9500",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      onClick: ($event) => unref(editor).chain().focus().undo().run()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u2190`);
                        } else {
                          return [
                            createTextVNode("\u2190")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        onClick: ($event) => unref(editor).chain().focus().undo().run()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u2190")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u6062\u590D",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      onClick: ($event) => unref(editor).chain().focus().redo().run()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u2192`);
                        } else {
                          return [
                            createTextVNode("\u2192")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        onClick: ($event) => unref(editor).chain().focus().redo().run()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u2192")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_tooltip, {
                  content: "\u64A4\u9500",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      onClick: ($event) => unref(editor).chain().focus().undo().run()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u2190")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tooltip, {
                  content: "\u6062\u590D",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      onClick: ($event) => unref(editor).chain().focus().redo().run()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u2192")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_button_group, {
          size: "small",
          style: { "margin-left": "auto" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u5207\u6362\u5230 Markdown \u7F16\u8F91",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      style: { "font-weight": "bold" },
                      onClick: ($event) => toggleMode()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`MD`);
                        } else {
                          return [
                            createTextVNode("MD")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        style: { "font-weight": "bold" },
                        onClick: ($event) => toggleMode()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("MD")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_tooltip, {
                  content: "\u5207\u6362\u5230 Markdown \u7F16\u8F91",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      style: { "font-weight": "bold" },
                      onClick: ($event) => toggleMode()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("MD")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "markdown") {
        _push(`<div class="editor-toolbar" data-v-c7fe8ab0>`);
        _push(ssrRenderComponent(_component_el_button_group, { size: "small" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u52A0\u7C97",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      onClick: ($event) => mdWrap("**", "**")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<strong data-v-c7fe8ab0${_scopeId3}>B</strong>`);
                        } else {
                          return [
                            createVNode("strong", null, "B")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        onClick: ($event) => mdWrap("**", "**")
                      }, {
                        default: withCtx(() => [
                          createVNode("strong", null, "B")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u659C\u4F53",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      onClick: ($event) => mdWrap("*", "*")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<em data-v-c7fe8ab0${_scopeId3}>I</em>`);
                        } else {
                          return [
                            createVNode("em", null, "I")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        onClick: ($event) => mdWrap("*", "*")
                      }, {
                        default: withCtx(() => [
                          createVNode("em", null, "I")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u5220\u9664\u7EBF",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      onClick: ($event) => mdWrap("~~", "~~")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span style="${ssrRenderStyle({ "text-decoration": "line-through" })}" data-v-c7fe8ab0${_scopeId3}>S</span>`);
                        } else {
                          return [
                            createVNode("span", { style: { "text-decoration": "line-through" } }, "S")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        onClick: ($event) => mdWrap("~~", "~~")
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { style: { "text-decoration": "line-through" } }, "S")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_tooltip, {
                  content: "\u52A0\u7C97",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      onClick: ($event) => mdWrap("**", "**")
                    }, {
                      default: withCtx(() => [
                        createVNode("strong", null, "B")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tooltip, {
                  content: "\u659C\u4F53",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      onClick: ($event) => mdWrap("*", "*")
                    }, {
                      default: withCtx(() => [
                        createVNode("em", null, "I")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tooltip, {
                  content: "\u5220\u9664\u7EBF",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      onClick: ($event) => mdWrap("~~", "~~")
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { style: { "text-decoration": "line-through" } }, "S")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_button_group, { size: "small" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u6807\u98981",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      onClick: ($event) => mdLinePrefix("#")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`H1`);
                        } else {
                          return [
                            createTextVNode("H1")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        onClick: ($event) => mdLinePrefix("#")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("H1")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u6807\u98982",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      onClick: ($event) => mdLinePrefix("##")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`H2`);
                        } else {
                          return [
                            createTextVNode("H2")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        onClick: ($event) => mdLinePrefix("##")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("H2")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u6807\u98983",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      onClick: ($event) => mdLinePrefix("###")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`H3`);
                        } else {
                          return [
                            createTextVNode("H3")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        onClick: ($event) => mdLinePrefix("###")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("H3")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u6807\u98984",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      onClick: ($event) => mdLinePrefix("####")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`H4`);
                        } else {
                          return [
                            createTextVNode("H4")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        onClick: ($event) => mdLinePrefix("####")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("H4")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u6807\u98985",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      onClick: ($event) => mdLinePrefix("#####")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`H5`);
                        } else {
                          return [
                            createTextVNode("H5")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        onClick: ($event) => mdLinePrefix("#####")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("H5")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_tooltip, {
                  content: "\u6807\u98981",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      onClick: ($event) => mdLinePrefix("#")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("H1")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tooltip, {
                  content: "\u6807\u98982",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      onClick: ($event) => mdLinePrefix("##")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("H2")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tooltip, {
                  content: "\u6807\u98983",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      onClick: ($event) => mdLinePrefix("###")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("H3")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tooltip, {
                  content: "\u6807\u98984",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      onClick: ($event) => mdLinePrefix("####")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("H4")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tooltip, {
                  content: "\u6807\u98985",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      onClick: ($event) => mdLinePrefix("#####")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("H5")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_button_group, { size: "small" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u65E0\u5E8F\u5217\u8868",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      onClick: ($event) => mdLinePrefix("-")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`UL`);
                        } else {
                          return [
                            createTextVNode("UL")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        onClick: ($event) => mdLinePrefix("-")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("UL")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u6709\u5E8F\u5217\u8868",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      onClick: ($event) => mdLinePrefix("1.")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`OL`);
                        } else {
                          return [
                            createTextVNode("OL")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        onClick: ($event) => mdLinePrefix("1.")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("OL")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_tooltip, {
                  content: "\u65E0\u5E8F\u5217\u8868",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      onClick: ($event) => mdLinePrefix("-")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("UL")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tooltip, {
                  content: "\u6709\u5E8F\u5217\u8868",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      onClick: ($event) => mdLinePrefix("1.")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("OL")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_button_group, { size: "small" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u5F15\u7528",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      onClick: ($event) => mdLinePrefix(">")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u5F15\u7528`);
                        } else {
                          return [
                            createTextVNode("\u5F15\u7528")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        onClick: ($event) => mdLinePrefix(">")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u5F15\u7528")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u4EE3\u7801\u5757",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      onClick: ($event) => mdCodeBlock()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`&lt;/&gt;`);
                        } else {
                          return [
                            createTextVNode("</>")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        onClick: ($event) => mdCodeBlock()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("</>")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u5206\u9694\u7EBF",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      onClick: ($event) => mdHr()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`-`);
                        } else {
                          return [
                            createTextVNode("-")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        onClick: ($event) => mdHr()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("-")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_tooltip, {
                  content: "\u5F15\u7528",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      onClick: ($event) => mdLinePrefix(">")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u5F15\u7528")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tooltip, {
                  content: "\u4EE3\u7801\u5757",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      onClick: ($event) => mdCodeBlock()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("</>")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tooltip, {
                  content: "\u5206\u9694\u7EBF",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      onClick: ($event) => mdHr()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("-")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_button_group, { size: "small" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u94FE\u63A5",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      onClick: ($event) => mdLink()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u94FE\u63A5`);
                        } else {
                          return [
                            createTextVNode("\u94FE\u63A5")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        onClick: ($event) => mdLink()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u94FE\u63A5")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u56FE\u7247",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      onClick: ($event) => mdImage()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u56FE\u7247`);
                        } else {
                          return [
                            createTextVNode("\u56FE\u7247")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        onClick: ($event) => mdImage()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u56FE\u7247")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_tooltip, {
                  content: "\u94FE\u63A5",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      onClick: ($event) => mdLink()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u94FE\u63A5")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tooltip, {
                  content: "\u56FE\u7247",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      onClick: ($event) => mdImage()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u56FE\u7247")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_button_group, {
          size: "small",
          style: { "margin-left": "auto" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_tooltip, {
                content: "\u5207\u6362\u5230\u5BCC\u6587\u672C\u7F16\u8F91",
                placement: "top"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      style: { "font-weight": "bold" },
                      onClick: ($event) => toggleMode()
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u5BCC\u6587\u672C`);
                        } else {
                          return [
                            createTextVNode("\u5BCC\u6587\u672C")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        style: { "font-weight": "bold" },
                        onClick: ($event) => toggleMode()
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u5BCC\u6587\u672C")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_tooltip, {
                  content: "\u5207\u6362\u5230\u5BCC\u6587\u672C\u7F16\u8F91",
                  placement: "top"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      style: { "font-weight": "bold" },
                      onClick: ($event) => toggleMode()
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u5BCC\u6587\u672C")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "rich") {
        _push(ssrRenderComponent(unref(EditorContent), {
          editor: unref(editor),
          class: "editor-content"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (mode.value === "markdown") {
        _push(`<div class="markdown-editor-wrapper" data-v-c7fe8ab0><textarea class="markdown-textarea" placeholder="\u4F7F\u7528 Markdown \u8BED\u6CD5\u7F16\u5199\u5185\u5BB9..." spellcheck="false" data-v-c7fe8ab0>${ssrInterpolate(markdownContent.value)}</textarea><div class="markdown-preview" data-v-c7fe8ab0><div class="preview-label" data-v-c7fe8ab0>\u9884\u89C8</div><div class="preview-content" data-v-c7fe8ab0>${(_a = unref(sanitizeHtml)(previewHtml.value)) != null ? _a : ""}</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RichTextEditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_8 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-c7fe8ab0"]]), { __name: "RichTextEditor" });

export { __nuxt_component_8 as _ };
//# sourceMappingURL=RichTextEditor-CeSPASqo.mjs.map
