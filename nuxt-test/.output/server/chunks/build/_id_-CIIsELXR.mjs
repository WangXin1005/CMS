import { E as ElButton } from './el-button-DZeW7ss9.mjs';
import { E as ElForm, a as ElFormItem } from './el-form-item-Pc8j8EuU.mjs';
import { E as ElInput } from './el-input-BAmmpY8C.mjs';
import { E as ElRow, a as ElCol } from './el-col-CoZ_4RfQ.mjs';
import { E as ElSelect, a as ElOption } from './el-select-faaHp9Q_.mjs';
import { _ as __nuxt_component_8 } from './RichTextEditor-BMEK0tYM.mjs';
import { v as vLoading } from './el-loading-4TRz9k9O.mjs';
import { E as ElMessage } from './request-CPAxCwDy.mjs';
import { _ as _export_sfc, d as useRoute, n as navigateTo } from './server.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, withKeys, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { u as useArticle } from './useArticle-Bsqe9LnA.mjs';
import { u as useAuth } from './useAuth-DAEZDiUX.mjs';
import '@ctrl/tinycolor';
import 'lodash-unified';
import '@vueuse/core';
import '@vue/shared';
import 'async-validator';
import './scroll-CAX4BlZD.mjs';
import './index-BtbUlw1r.mjs';
import './el-popper-Dwc4J52N.mjs';
import '@popperjs/core';
import './el-scrollbar-D9tL2LRa.mjs';
import './index-CyDblldq.mjs';
import '@tiptap/vue-3';
import '@tiptap/starter-kit';
import '@tiptap/extension-image';
import '@tiptap/extension-link';
import '@tiptap/core';
import './sanitize-CMFdLwh2.mjs';
import 'isomorphic-dompurify';
import 'turndown';
import 'marked';
import 'axios';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import './cookie-BrXVhyN0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const { update, updateMyArticle } = useArticle();
    const { role } = useAuth();
    const isAdmin = computed(() => role.value === "ADMIN" || role.value === "SUPERADMIN");
    const route = useRoute();
    const id = Number(route.params.id);
    const categories = ref([]);
    const tags = ref([]);
    const loading = ref(true);
    const submitting = ref(false);
    const form = ref({
      title: "",
      summary: "",
      content: "",
      coverImage: "",
      status: "DRAFT",
      categoryId: void 0,
      tagIds: []
    });
    function genSlug(title) {
      return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\u4e00-\u9fa5-]/g, "").substring(0, 80) || "article-" + Date.now();
    }
    async function handleSubmit(status) {
      form.value.status = status;
      if (!form.value.slug) form.value.slug = genSlug(form.value.title);
      if (!form.value.title) {
        ElMessage.warning("标题不能为空");
        return;
      }
      submitting.value = true;
      try {
        if (isAdmin.value) {
          await update(id, { ...form.value });
        } else {
          await updateMyArticle(id, { ...form.value });
        }
        ElMessage.success(status === "PUBLISHED" ? "文章已发布" : "草稿已保存");
        navigateTo("/articles");
      } catch (e) {
      } finally {
        submitting.value = false;
      }
    }
    function insertTabInTextarea(e, field) {
      const ta = e.target;
      const start = ta.selectionStart, end = ta.selectionEnd;
      form.value[field] = form.value[field].substring(0, start) + "	" + form.value[field].substring(end);
      setTimeout(() => {
        ta.selectionStart = ta.selectionEnd = start + 1;
      }, 0);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_RichTextEditor = __nuxt_component_8;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "overflow-y": "auto", "height": "100%" } }, _attrs, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)))} data-v-38efbaee><div class="page-header" data-v-38efbaee><h2 data-v-38efbaee>编辑文章</h2><div data-v-38efbaee>`);
      _push(ssrRenderComponent(_component_el_button, {
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/articles")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`取消`);
          } else {
            return [
              createTextVNode("取消")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        loading: submitting.value,
        onClick: ($event) => handleSubmit("DRAFT")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`保存草稿`);
          } else {
            return [
              createTextVNode("保存草稿")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        loading: submitting.value,
        onClick: ($event) => handleSubmit("PUBLISHED")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`发布`);
          } else {
            return [
              createTextVNode("发布")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (!loading.value) {
        _push(`<div class="page-card" data-v-38efbaee>`);
        _push(ssrRenderComponent(_component_el_form, { "label-width": "80px" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_form_item, {
                label: "标题",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: form.value.title,
                      "onUpdate:modelValue": ($event) => form.value.title = $event,
                      placeholder: "文章标题",
                      maxlength: "200"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: form.value.title,
                        "onUpdate:modelValue": ($event) => form.value.title = $event,
                        placeholder: "文章标题",
                        maxlength: "200"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_form_item, { label: "封面图" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: form.value.coverImage,
                      "onUpdate:modelValue": ($event) => form.value.coverImage = $event,
                      placeholder: "图片 URL（可选）"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: form.value.coverImage,
                        "onUpdate:modelValue": ($event) => form.value.coverImage = $event,
                        placeholder: "图片 URL（可选）"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_row, { gutter: 16 }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_col, { span: 12 }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_form_item, { label: "分类" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_select, {
                                  modelValue: form.value.categoryId,
                                  "onUpdate:modelValue": ($event) => form.value.categoryId = $event,
                                  placeholder: "选择分类",
                                  clearable: "",
                                  style: { "width": "100%" }
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(categories.value, (cat) => {
                                        _push6(ssrRenderComponent(_component_el_option, {
                                          key: cat.id,
                                          label: cat.name,
                                          value: cat.id
                                        }, null, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
                                          return openBlock(), createBlock(_component_el_option, {
                                            key: cat.id,
                                            label: cat.name,
                                            value: cat.id
                                          }, null, 8, ["label", "value"]);
                                        }), 128))
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_select, {
                                    modelValue: form.value.categoryId,
                                    "onUpdate:modelValue": ($event) => form.value.categoryId = $event,
                                    placeholder: "选择分类",
                                    clearable: "",
                                    style: { "width": "100%" }
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
                                        return openBlock(), createBlock(_component_el_option, {
                                          key: cat.id,
                                          label: cat.name,
                                          value: cat.id
                                        }, null, 8, ["label", "value"]);
                                      }), 128))
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_form_item, { label: "分类" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_select, {
                                  modelValue: form.value.categoryId,
                                  "onUpdate:modelValue": ($event) => form.value.categoryId = $event,
                                  placeholder: "选择分类",
                                  clearable: "",
                                  style: { "width": "100%" }
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
                                      return openBlock(), createBlock(_component_el_option, {
                                        key: cat.id,
                                        label: cat.name,
                                        value: cat.id
                                      }, null, 8, ["label", "value"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_col, { span: 12 }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_form_item, { label: "标签" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_el_select, {
                                  modelValue: form.value.tagIds,
                                  "onUpdate:modelValue": ($event) => form.value.tagIds = $event,
                                  multiple: "",
                                  placeholder: "选择标签",
                                  clearable: "",
                                  style: { "width": "100%" }
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(tags.value, (tag) => {
                                        _push6(ssrRenderComponent(_component_el_option, {
                                          key: tag.id,
                                          label: tag.name,
                                          value: tag.id
                                        }, null, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(tags.value, (tag) => {
                                          return openBlock(), createBlock(_component_el_option, {
                                            key: tag.id,
                                            label: tag.name,
                                            value: tag.id
                                          }, null, 8, ["label", "value"]);
                                        }), 128))
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_el_select, {
                                    modelValue: form.value.tagIds,
                                    "onUpdate:modelValue": ($event) => form.value.tagIds = $event,
                                    multiple: "",
                                    placeholder: "选择标签",
                                    clearable: "",
                                    style: { "width": "100%" }
                                  }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(tags.value, (tag) => {
                                        return openBlock(), createBlock(_component_el_option, {
                                          key: tag.id,
                                          label: tag.name,
                                          value: tag.id
                                        }, null, 8, ["label", "value"]);
                                      }), 128))
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_form_item, { label: "标签" }, {
                              default: withCtx(() => [
                                createVNode(_component_el_select, {
                                  modelValue: form.value.tagIds,
                                  "onUpdate:modelValue": ($event) => form.value.tagIds = $event,
                                  multiple: "",
                                  placeholder: "选择标签",
                                  clearable: "",
                                  style: { "width": "100%" }
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(tags.value, (tag) => {
                                      return openBlock(), createBlock(_component_el_option, {
                                        key: tag.id,
                                        label: tag.name,
                                        value: tag.id
                                      }, null, 8, ["label", "value"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_col, { span: 12 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "分类" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_select, {
                                modelValue: form.value.categoryId,
                                "onUpdate:modelValue": ($event) => form.value.categoryId = $event,
                                placeholder: "选择分类",
                                clearable: "",
                                style: { "width": "100%" }
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
                                    return openBlock(), createBlock(_component_el_option, {
                                      key: cat.id,
                                      label: cat.name,
                                      value: cat.id
                                    }, null, 8, ["label", "value"]);
                                  }), 128))
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_col, { span: 12 }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "标签" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_select, {
                                modelValue: form.value.tagIds,
                                "onUpdate:modelValue": ($event) => form.value.tagIds = $event,
                                multiple: "",
                                placeholder: "选择标签",
                                clearable: "",
                                style: { "width": "100%" }
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(tags.value, (tag) => {
                                    return openBlock(), createBlock(_component_el_option, {
                                      key: tag.id,
                                      label: tag.name,
                                      value: tag.id
                                    }, null, 8, ["label", "value"]);
                                  }), 128))
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_form_item, { label: "摘要" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: form.value.summary,
                      "onUpdate:modelValue": ($event) => form.value.summary = $event,
                      type: "textarea",
                      rows: 3,
                      placeholder: "文章摘要（可选）",
                      onKeydown: ($event) => insertTabInTextarea($event, "summary")
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: form.value.summary,
                        "onUpdate:modelValue": ($event) => form.value.summary = $event,
                        type: "textarea",
                        rows: 3,
                        placeholder: "文章摘要（可选）",
                        onKeydown: withKeys(withModifiers(($event) => insertTabInTextarea($event, "summary"), ["prevent"]), ["tab"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_form_item, {
                label: "内容",
                style: { "width": "100%" }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_RichTextEditor, {
                      modelValue: form.value.content,
                      "onUpdate:modelValue": ($event) => form.value.content = $event
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_RichTextEditor, {
                        modelValue: form.value.content,
                        "onUpdate:modelValue": ($event) => form.value.content = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_form_item, {
                  label: "标题",
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: form.value.title,
                      "onUpdate:modelValue": ($event) => form.value.title = $event,
                      placeholder: "文章标题",
                      maxlength: "200"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_form_item, { label: "封面图" }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: form.value.coverImage,
                      "onUpdate:modelValue": ($event) => form.value.coverImage = $event,
                      placeholder: "图片 URL（可选）"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_row, { gutter: 16 }, {
                  default: withCtx(() => [
                    createVNode(_component_el_col, { span: 12 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form_item, { label: "分类" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_select, {
                              modelValue: form.value.categoryId,
                              "onUpdate:modelValue": ($event) => form.value.categoryId = $event,
                              placeholder: "选择分类",
                              clearable: "",
                              style: { "width": "100%" }
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (cat) => {
                                  return openBlock(), createBlock(_component_el_option, {
                                    key: cat.id,
                                    label: cat.name,
                                    value: cat.id
                                  }, null, 8, ["label", "value"]);
                                }), 128))
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_col, { span: 12 }, {
                      default: withCtx(() => [
                        createVNode(_component_el_form_item, { label: "标签" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_select, {
                              modelValue: form.value.tagIds,
                              "onUpdate:modelValue": ($event) => form.value.tagIds = $event,
                              multiple: "",
                              placeholder: "选择标签",
                              clearable: "",
                              style: { "width": "100%" }
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(tags.value, (tag) => {
                                  return openBlock(), createBlock(_component_el_option, {
                                    key: tag.id,
                                    label: tag.name,
                                    value: tag.id
                                  }, null, 8, ["label", "value"]);
                                }), 128))
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_el_form_item, { label: "摘要" }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: form.value.summary,
                      "onUpdate:modelValue": ($event) => form.value.summary = $event,
                      type: "textarea",
                      rows: 3,
                      placeholder: "文章摘要（可选）",
                      onKeydown: withKeys(withModifiers(($event) => insertTabInTextarea($event, "summary"), ["prevent"]), ["tab"])
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_form_item, {
                  label: "内容",
                  style: { "width": "100%" }
                }, {
                  default: withCtx(() => [
                    createVNode(_component_RichTextEditor, {
                      modelValue: form.value.content,
                      "onUpdate:modelValue": ($event) => form.value.content = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/articles/edit/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-38efbaee"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CIIsELXR.mjs.map
