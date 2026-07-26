import { E as ElButton, q as request, a as ElMessage } from './request-DjYQ2LWV.mjs';
import { E as ElForm, a as ElFormItem } from './el-form-item-CXMOch9W.mjs';
import { E as ElInput } from './el-input-CF5MZqZY.mjs';
import { E as ElDialog } from './el-dialog-0j0oxQ2L.mjs';
import { E as ElEmpty } from './el-empty-B1jsnVKx.mjs';
import { v as vLoading } from './el-loading-Ffpd8GnA.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, openBlock, createBlock, Fragment, createVNode, createCommentVNode, renderList, withDirectives, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { u as useMedia } from './useMedia-B8DhzOGa.mjs';
import 'axios';
import './server.mjs';
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
import '@vueuse/core';
import '@vue/shared';
import 'lodash-unified';
import '@ctrl/tinycolor';
import '@popperjs/core';
import './ssr-1ZCkBfDH.mjs';
import 'async-validator';
import './raf-BAuwCRq7.mjs';
import './el-overlay-_HexMisP.mjs';
import './scroll-DTXKn2B5.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "setting",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const { getList: getMediaList } = useMedia();
    const mediaDialogVisible = ref(false);
    const mediaList = ref([]);
    const mediaLoading = ref(false);
    async function openMediaPicker() {
      mediaDialogVisible.value = true;
      mediaLoading.value = true;
      try {
        const res = await getMediaList();
        mediaList.value = Array.isArray(res) ? res.filter((m) => m.mimeType && m.mimeType.startsWith("image/")) : [];
      } catch {
        mediaList.value = [];
      } finally {
        mediaLoading.value = false;
      }
    }
    function selectMedia(url) {
      settings.value.site_logo = url;
      mediaDialogVisible.value = false;
    }
    const settings = ref({
      site_name: "",
      site_description: "",
      site_logo: "",
      icp_number: "",
      gongan_number: ""
    });
    const settingKeys = [
      { key: "site_name", label: "网站名称", type: "text" },
      { key: "site_description", label: "网站描述", type: "textarea" },
      { key: "site_logo", label: "Logo", type: "image" },
      { key: "icp_number", label: "ICP备案号", type: "text" },
      { key: "gongan_number", label: "公安备案号", type: "text" }
    ];
    async function saveSetting(key) {
      try {
        await request.put(`/admin/settings/${key}`, { value: settings.value[key] });
        ElMessage.success("保存成功");
      } catch {
      }
    }
    async function saveAll() {
      loading.value = true;
      try {
        await Promise.all(
          settingKeys.map(
            (s) => request.put(`/admin/settings/${s.key}`, { value: settings.value[s.key] })
          )
        );
        ElMessage.success("全部设置已保存");
      } catch {
      } finally {
        loading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_dialog = ElDialog;
      const _component_el_empty = ElEmpty;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "flex": "1", "min-height": "0", "display": "flex", "flex-direction": "column" } }, _attrs))}><div class="page-header"><h2>站点设置</h2>`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        loading: loading.value,
        onClick: saveAll
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`保存全部`);
          } else {
            return [
              createTextVNode("保存全部")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="page-card" style="${ssrRenderStyle({ "flex": "1", "min-height": "0", "overflow": "auto" })}">`);
      _push(ssrRenderComponent(_component_el_form, {
        "label-width": "120px",
        style: { "max-width": "640px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(settingKeys, (s) => {
              _push2(ssrRenderComponent(_component_el_form_item, {
                key: s.key,
                label: s.label
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (s.type === "text") {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: settings.value[s.key],
                        "onUpdate:modelValue": ($event) => settings.value[s.key] = $event,
                        placeholder: `请输入${s.label}`
                      }, null, _parent3, _scopeId2));
                    } else if (s.type === "textarea") {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: settings.value[s.key],
                        "onUpdate:modelValue": ($event) => settings.value[s.key] = $event,
                        type: "textarea",
                        rows: 3,
                        placeholder: `请输入${s.label}`
                      }, null, _parent3, _scopeId2));
                    } else if (s.type === "image") {
                      _push3(`<!--[--><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "8px", "width": "100%" })}"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: settings.value[s.key],
                        "onUpdate:modelValue": ($event) => settings.value[s.key] = $event,
                        placeholder: "点击右侧按钮选择图片",
                        readonly: "",
                        style: { "flex": "1" }
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_el_button, {
                        onClick: openMediaPicker,
                        style: { "flex-shrink": "0" }
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`选择`);
                          } else {
                            return [
                              createTextVNode("选择")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                      if (settings.value[s.key]) {
                        _push3(`<img${ssrRenderAttr("src", settings.value[s.key])} style="${ssrRenderStyle({ "max-width": "200px", "max-height": "80px", "margin-top": "8px", "border-radius": "4px", "border": "1px solid #e8e8e8" })}"${_scopeId2}>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<!--]-->`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(_component_el_button, {
                      link: "",
                      type: "primary",
                      style: { "margin-left": "8px" },
                      onClick: ($event) => saveSetting(s.key)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`保存`);
                        } else {
                          return [
                            createTextVNode("保存")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      s.type === "text" ? (openBlock(), createBlock(_component_el_input, {
                        key: 0,
                        modelValue: settings.value[s.key],
                        "onUpdate:modelValue": ($event) => settings.value[s.key] = $event,
                        placeholder: `请输入${s.label}`
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : s.type === "textarea" ? (openBlock(), createBlock(_component_el_input, {
                        key: 1,
                        modelValue: settings.value[s.key],
                        "onUpdate:modelValue": ($event) => settings.value[s.key] = $event,
                        type: "textarea",
                        rows: 3,
                        placeholder: `请输入${s.label}`
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : s.type === "image" ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                        createVNode("div", { style: { "display": "flex", "align-items": "center", "gap": "8px", "width": "100%" } }, [
                          createVNode(_component_el_input, {
                            modelValue: settings.value[s.key],
                            "onUpdate:modelValue": ($event) => settings.value[s.key] = $event,
                            placeholder: "点击右侧按钮选择图片",
                            readonly: "",
                            style: { "flex": "1" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_el_button, {
                            onClick: openMediaPicker,
                            style: { "flex-shrink": "0" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode("选择")
                            ]),
                            _: 1
                          })
                        ]),
                        settings.value[s.key] ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: settings.value[s.key],
                          style: { "max-width": "200px", "max-height": "80px", "margin-top": "8px", "border-radius": "4px", "border": "1px solid #e8e8e8" }
                        }, null, 8, ["src"])) : createCommentVNode("", true)
                      ], 64)) : createCommentVNode("", true),
                      createVNode(_component_el_button, {
                        link: "",
                        type: "primary",
                        style: { "margin-left": "8px" },
                        onClick: ($event) => saveSetting(s.key)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("保存")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(settingKeys, (s) => {
                return createVNode(_component_el_form_item, {
                  key: s.key,
                  label: s.label
                }, {
                  default: withCtx(() => [
                    s.type === "text" ? (openBlock(), createBlock(_component_el_input, {
                      key: 0,
                      modelValue: settings.value[s.key],
                      "onUpdate:modelValue": ($event) => settings.value[s.key] = $event,
                      placeholder: `请输入${s.label}`
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : s.type === "textarea" ? (openBlock(), createBlock(_component_el_input, {
                      key: 1,
                      modelValue: settings.value[s.key],
                      "onUpdate:modelValue": ($event) => settings.value[s.key] = $event,
                      type: "textarea",
                      rows: 3,
                      placeholder: `请输入${s.label}`
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : s.type === "image" ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                      createVNode("div", { style: { "display": "flex", "align-items": "center", "gap": "8px", "width": "100%" } }, [
                        createVNode(_component_el_input, {
                          modelValue: settings.value[s.key],
                          "onUpdate:modelValue": ($event) => settings.value[s.key] = $event,
                          placeholder: "点击右侧按钮选择图片",
                          readonly: "",
                          style: { "flex": "1" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_el_button, {
                          onClick: openMediaPicker,
                          style: { "flex-shrink": "0" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode("选择")
                          ]),
                          _: 1
                        })
                      ]),
                      settings.value[s.key] ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: settings.value[s.key],
                        style: { "max-width": "200px", "max-height": "80px", "margin-top": "8px", "border-radius": "4px", "border": "1px solid #e8e8e8" }
                      }, null, 8, ["src"])) : createCommentVNode("", true)
                    ], 64)) : createCommentVNode("", true),
                    createVNode(_component_el_button, {
                      link: "",
                      type: "primary",
                      style: { "margin-left": "8px" },
                      onClick: ($event) => saveSetting(s.key)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("保存")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 2
                }, 1032, ["label"]);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: mediaDialogVisible.value,
        "onUpdate:modelValue": ($event) => mediaDialogVisible.value = $event,
        title: "选择图片",
        width: "700",
        "destroy-on-close": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "flex-wrap": "wrap", "gap": "12px", "min-height": "100px" } }, ssrGetDirectiveProps(_ctx, _directive_loading, mediaLoading.value)))}${_scopeId}>`);
            if (!mediaLoading.value && mediaList.value.length === 0) {
              _push2(ssrRenderComponent(_component_el_empty, { description: "暂无图片" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(mediaList.value, (m) => {
              _push2(`<div style="${ssrRenderStyle([{ "width": "140px", "cursor": "pointer", "border": "2px solid transparent", "border-radius": "8px", "overflow": "hidden", "transition": "all .2s" }, { borderColor: settings.value.site_logo === m.url ? "#409eff" : "transparent" }])}"${_scopeId}><img${ssrRenderAttr("src", m.url)} style="${ssrRenderStyle({ "width": "100%", "height": "100px", "object-fit": "cover", "display": "block" })}"${_scopeId}><div style="${ssrRenderStyle({ "padding": "4px 8px", "font-size": "12px", "color": "#666", "text-align": "center", "overflow": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" })}"${_scopeId}>${ssrInterpolate(m.originalName || m.filename)}</div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              withDirectives((openBlock(), createBlock("div", { style: { "display": "flex", "flex-wrap": "wrap", "gap": "12px", "min-height": "100px" } }, [
                !mediaLoading.value && mediaList.value.length === 0 ? (openBlock(), createBlock(_component_el_empty, {
                  key: 0,
                  description: "暂无图片"
                })) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(mediaList.value, (m) => {
                  return openBlock(), createBlock("div", {
                    key: m.id,
                    style: [{ "width": "140px", "cursor": "pointer", "border": "2px solid transparent", "border-radius": "8px", "overflow": "hidden", "transition": "all .2s" }, { borderColor: settings.value.site_logo === m.url ? "#409eff" : "transparent" }],
                    onClick: ($event) => selectMedia(m.url)
                  }, [
                    createVNode("img", {
                      src: m.url,
                      style: { "width": "100%", "height": "100px", "object-fit": "cover", "display": "block" }
                    }, null, 8, ["src"]),
                    createVNode("div", { style: { "padding": "4px 8px", "font-size": "12px", "color": "#666", "text-align": "center", "overflow": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" } }, toDisplayString(m.originalName || m.filename), 1)
                  ], 12, ["onClick"]);
                }), 128))
              ])), [
                [_directive_loading, mediaLoading.value]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/setting.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=setting-D8elhiGU.mjs.map
