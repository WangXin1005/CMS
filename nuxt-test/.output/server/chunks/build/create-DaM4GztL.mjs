import { E as ElButton, a as ElMessage } from './request-DjYQ2LWV.mjs';
import { E as ElForm, a as ElFormItem } from './el-form-item-CXMOch9W.mjs';
import { E as ElInput } from './el-input-CF5MZqZY.mjs';
import { E as ElRow, a as ElCol } from './el-col-CkOy4FVw.mjs';
import { E as ElSelect, a as ElOption } from './el-select-BZB3TeJD.mjs';
import { _ as __nuxt_component_8 } from './RichTextEditor-DxzeVR5_.mjs';
import { E as ElDialog } from './el-dialog-0j0oxQ2L.mjs';
import { v as vLoading } from './el-loading-Ffpd8GnA.mjs';
import { _ as _export_sfc, n as navigateTo } from './server.mjs';
import { defineComponent, computed, ref, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, withKeys, withModifiers, mergeProps, withDirectives, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderAttrs, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { u as useArticle } from './useArticle-yzv9mzfq.mjs';
import { u as useAuth } from './useAuth-DcSGENLv.mjs';
import { u as useMedia } from './useMedia-B8DhzOGa.mjs';
import 'axios';
import '@vue/shared';
import 'lodash-unified';
import '@vueuse/core';
import '@ctrl/tinycolor';
import '@popperjs/core';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './ssr-1ZCkBfDH.mjs';
import 'async-validator';
import './raf-BAuwCRq7.mjs';
import './el-scrollbar-BOL8Bkkk.mjs';
import './index-Dk8Y1Ngv.mjs';
import './scroll-DTXKn2B5.mjs';
import '@tiptap/vue-3';
import '@tiptap/starter-kit';
import '@tiptap/extension-image';
import '@tiptap/extension-table';
import '@tiptap/extension-table-row';
import '@tiptap/extension-table-cell';
import '@tiptap/extension-table-header';
import '@tiptap/extension-link';
import '@tiptap/core';
import './sanitize-CMFdLwh2.mjs';
import 'isomorphic-dompurify';
import 'turndown';
import 'marked';
import './el-overlay-_HexMisP.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import './cookie-CqLf-Dw-.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    const { create: create2, createMyArticle } = useArticle();
    const { role } = useAuth();
    const isAdmin = computed(() => role.value === "ADMIN" || role.value === "SUPERADMIN");
    const { getList: getMediaList } = useMedia();
    const categories = ref([]);
    const tags = ref([]);
    const submitting = ref(false);
    const coverPickerVisible = ref(false);
    const mediaList = ref([]);
    const mediaLoading = ref(false);
    const form = ref({
      title: "",
      summary: "",
      content: "",
      coverImage: "",
      status: "DRAFT",
      categoryId: void 0,
      tagIds: []
    });
    async function openCoverPicker() {
      coverPickerVisible.value = true;
      mediaLoading.value = true;
      try {
        const res = await getMediaList();
        mediaList.value = (res || []).filter(function(m) {
          return m.mimeType && m.mimeType.startsWith("image/");
        });
      } catch {
        mediaList.value = [];
      } finally {
        mediaLoading.value = false;
      }
    }
    function selectCoverImage(media) {
      if (media && media.url) {
        form.value.coverImage = media.url;
      }
      coverPickerVisible.value = false;
    }
    function genSlug(title) {
      const base = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\u4e00-\u9fa5-]/g, "").substring(0, 60) || "article";
      return base + "-" + Date.now();
    }
    async function handleSubmit(status) {
      form.value.status = status;
      form.value.slug = genSlug(form.value.title);
      if (!form.value.title) {
        ElMessage.warning("标题不能为空");
        return;
      }
      submitting.value = true;
      try {
        if (isAdmin.value) {
          await create2({ ...form.value });
        } else {
          await createMyArticle({ ...form.value });
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
      const _component_el_dialog = ElDialog;
      const _directive_loading = vLoading;
      _push(`<!--[--><div style="${ssrRenderStyle({ "overflow-y": "auto", "height": "100%" })}" data-v-1b86439e><div class="page-header" data-v-1b86439e><h2 data-v-1b86439e>创建文章</h2><div data-v-1b86439e>`);
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
      _push(`</div></div><div class="page-card" data-v-1b86439e>`);
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
                  _push3(`<div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "8px", "flex-wrap": "wrap" })}" data-v-1b86439e${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_button, {
                    size: "small",
                    onClick: openCoverPicker
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`从媒体库选择`);
                      } else {
                        return [
                          createTextVNode("从媒体库选择")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (form.value.coverImage) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      size: "small",
                      type: "danger",
                      plain: "",
                      onClick: ($event) => form.value.coverImage = ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`清除`);
                        } else {
                          return [
                            createTextVNode("清除")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  if (form.value.coverImage) {
                    _push3(`<img${ssrRenderAttr("src", form.value.coverImage)} style="${ssrRenderStyle({ "margin-top": "8px", "max-width": "300px", "max-height": "200px", "border-radius": "6px", "border": "1px solid #e8e8e8", "display": "block" })}" data-v-1b86439e${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { style: { "display": "flex", "align-items": "center", "gap": "8px", "flex-wrap": "wrap" } }, [
                      createVNode(_component_el_button, {
                        size: "small",
                        onClick: openCoverPicker
                      }, {
                        default: withCtx(() => [
                          createTextVNode("从媒体库选择")
                        ]),
                        _: 1
                      }),
                      form.value.coverImage ? (openBlock(), createBlock(_component_el_button, {
                        key: 0,
                        size: "small",
                        type: "danger",
                        plain: "",
                        onClick: ($event) => form.value.coverImage = ""
                      }, {
                        default: withCtx(() => [
                          createTextVNode("清除")
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : createCommentVNode("", true)
                    ]),
                    form.value.coverImage ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: form.value.coverImage,
                      style: { "margin-top": "8px", "max-width": "300px", "max-height": "200px", "border-radius": "6px", "border": "1px solid #e8e8e8", "display": "block" }
                    }, null, 8, ["src"])) : createCommentVNode("", true)
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
                  createVNode("div", { style: { "display": "flex", "align-items": "center", "gap": "8px", "flex-wrap": "wrap" } }, [
                    createVNode(_component_el_button, {
                      size: "small",
                      onClick: openCoverPicker
                    }, {
                      default: withCtx(() => [
                        createTextVNode("从媒体库选择")
                      ]),
                      _: 1
                    }),
                    form.value.coverImage ? (openBlock(), createBlock(_component_el_button, {
                      key: 0,
                      size: "small",
                      type: "danger",
                      plain: "",
                      onClick: ($event) => form.value.coverImage = ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode("清除")
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : createCommentVNode("", true)
                  ]),
                  form.value.coverImage ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: form.value.coverImage,
                    style: { "margin-top": "8px", "max-width": "300px", "max-height": "200px", "border-radius": "6px", "border": "1px solid #e8e8e8", "display": "block" }
                  }, null, 8, ["src"])) : createCommentVNode("", true)
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
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: coverPickerVisible.value,
        "onUpdate:modelValue": ($event) => coverPickerVisible.value = $event,
        title: "选择封面图",
        width: "700px",
        "destroy-on-close": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttrs(mergeProps({ style: { "min-height": "200px" } }, ssrGetDirectiveProps(_ctx, _directive_loading, mediaLoading.value)))} data-v-1b86439e${_scopeId}>`);
            if (mediaList.value.length === 0 && !mediaLoading.value) {
              _push2(`<div style="${ssrRenderStyle({ "text-align": "center", "padding": "60px 0", "color": "#999" })}" data-v-1b86439e${_scopeId}>暂无图片，请先在媒体管理中上传</div>`);
            } else {
              _push2(`<div style="${ssrRenderStyle({ "display": "flex", "flex-wrap": "wrap", "gap": "12px" })}" data-v-1b86439e${_scopeId}><!--[-->`);
              ssrRenderList(mediaList.value, (m) => {
                _push2(`<div class="cover-picker-item" data-v-1b86439e${_scopeId}><img${ssrRenderAttr("src", m.url)}${ssrRenderAttr("alt", m.originalName)} data-v-1b86439e${_scopeId}><div class="cover-picker-name" data-v-1b86439e${_scopeId}>${ssrInterpolate(m.originalName)}</div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              withDirectives((openBlock(), createBlock("div", { style: { "min-height": "200px" } }, [
                mediaList.value.length === 0 && !mediaLoading.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  style: { "text-align": "center", "padding": "60px 0", "color": "#999" }
                }, "暂无图片，请先在媒体管理中上传")) : (openBlock(), createBlock("div", {
                  key: 1,
                  style: { "display": "flex", "flex-wrap": "wrap", "gap": "12px" }
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(mediaList.value, (m) => {
                    return openBlock(), createBlock("div", {
                      key: m.id,
                      class: "cover-picker-item",
                      onClick: ($event) => selectCoverImage(m)
                    }, [
                      createVNode("img", {
                        src: m.url,
                        alt: m.originalName
                      }, null, 8, ["src", "alt"]),
                      createVNode("div", { class: "cover-picker-name" }, toDisplayString(m.originalName), 1)
                    ], 8, ["onClick"]);
                  }), 128))
                ]))
              ])), [
                [_directive_loading, mediaLoading.value]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/articles/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1b86439e"]]);

export { create as default };
//# sourceMappingURL=create-DaM4GztL.mjs.map
