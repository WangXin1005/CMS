import { E as ElButton, a as ElForm, b as ElFormItem, c as ElInput, q as request, d as ElMessage } from './request-BOYQ0nPL.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, openBlock, createBlock, createVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
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
import 'async-validator';
import '@ctrl/tinycolor';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "setting",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const settings = ref({
      site_name: "",
      site_description: "",
      site_logo: "",
      icp_number: ""
    });
    const settingKeys = [
      { key: "site_name", label: "网站名称", type: "text" },
      { key: "site_description", label: "网站描述", type: "textarea" },
      { key: "site_logo", label: "Logo URL", type: "text" },
      { key: "icp_number", label: "备案号", type: "text" }
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
                    } else {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: settings.value[s.key],
                        "onUpdate:modelValue": ($event) => settings.value[s.key] = $event,
                        type: "textarea",
                        rows: 3,
                        placeholder: `请输入${s.label}`
                      }, null, _parent3, _scopeId2));
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
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : (openBlock(), createBlock(_component_el_input, {
                        key: 1,
                        modelValue: settings.value[s.key],
                        "onUpdate:modelValue": ($event) => settings.value[s.key] = $event,
                        type: "textarea",
                        rows: 3,
                        placeholder: `请输入${s.label}`
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])),
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
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : (openBlock(), createBlock(_component_el_input, {
                      key: 1,
                      modelValue: settings.value[s.key],
                      "onUpdate:modelValue": ($event) => settings.value[s.key] = $event,
                      type: "textarea",
                      rows: 3,
                      placeholder: `请输入${s.label}`
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])),
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
      _push(`</div></div>`);
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
//# sourceMappingURL=setting-CktBzSAd.mjs.map
