import { E as ElButton } from './el-button-Ci-hQSxb.mjs';
import { E as ElInput } from './el-input-BZXamVjT.mjs';
import { u as useTableHeight, E as ElTable, a as ElTableColumn } from './useTableHeight-DszGzTZt.mjs';
import { E as ElPagination } from './el-pagination-BNfONsi_.mjs';
import { E as ElDialog } from './el-dialog-BYYfQCZn.mjs';
import { E as ElForm, a as ElFormItem } from './el-form-item-CcZ4_kPm.mjs';
import { v as vLoading } from './el-loading-CylbHp3O.mjs';
import { p as plus_default, P as search_default, E as ElMessage, f as request } from './request-D_zzMMA3.mjs';
import { E as ElMessageBox } from './el-message-box-BJAApCoR.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-Ln_QZRNp.mjs';
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
import './el-scrollbar-DaqqO3rh.mjs';
import 'normalize-wheel-es';
import './el-checkbox-CEM_OFcg.mjs';
import './el-select-Zfm1XGys.mjs';
import './index-Dn6mtLLY.mjs';
import './scroll-BmPP54RD.mjs';
import '@popperjs/core';
import './el-overlay-CUgtZWoK.mjs';
import 'async-validator';
import 'axios';
import './ssr-1ZCkBfDH.mjs';
import './cookie-CqLf-Dw-.mjs';

const useTag = () => {
  const getList = async () => {
    const res = await request.get("/tags");
    return res.data;
  };
  const getBySlug = async (slug) => {
    const res = await request.get(`/tags/${slug}`);
    return res.data;
  };
  const create = async (data) => {
    const res = await request.post("/admin/tags", data);
    return res.data;
  };
  const update = async (id, data) => {
    const res = await request.put(`/admin/tags/${id}`, data);
    return res.data;
  };
  const remove = async (id) => {
    const res = await request.delete(`/admin/tags/${id}`);
    return res.data;
  };
  return { getList, getBySlug, create, update, remove };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tags",
  __ssrInlineRender: true,
  setup(__props) {
    const { role } = useAuth();
    const isGuest = computed(() => role.value === "GUEST");
    const isAdmin = computed(() => role.value === "ADMIN" || role.value === "SUPERADMIN");
    const { getList, create, update, remove } = useTag();
    const tags = ref([]);
    const search = ref("");
    const loading = ref(false);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const { tableHeight } = useTableHeight(0);
    const filteredTags = computed(() => {
      if (!search.value) return tags.value;
      return tags.value.filter((t) => t.name && t.name.includes(search.value));
    });
    const pagedTags = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      return filteredTags.value.slice(start, start + pageSize.value);
    });
    const dialogVisible = ref(false);
    const editingId = ref(null);
    const form = ref({ name: "" });
    async function loadData() {
      loading.value = true;
      try {
        const res = await getList();
        tags.value = res != null ? res : [];
        currentPage.value = 1;
      } catch {
        tags.value = [];
      } finally {
        loading.value = false;
      }
    }
    function openCreate() {
      editingId.value = null;
      form.value = { name: "" };
      dialogVisible.value = true;
    }
    function openEdit(tag) {
      editingId.value = tag.id;
      form.value = { name: tag.name };
      dialogVisible.value = true;
    }
    async function handleSave() {
      if (!form.value.name) {
        ElMessage.warning("\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A");
        return;
      }
      try {
        if (editingId.value) {
          await update(editingId.value, form.value);
          ElMessage.success("\u66F4\u65B0\u6210\u529F");
        } else {
          const slug = form.value.name.toLowerCase().replace(/s+/g, "-");
          await create({ name: form.value.name, slug });
          ElMessage.success("\u521B\u5EFA\u6210\u529F");
        }
        dialogVisible.value = false;
        await loadData();
      } catch {
      }
    }
    async function handleDelete(id) {
      try {
        await ElMessageBox.confirm("\u786E\u5B9A\u5220\u9664\u6B64\u6807\u7B7E\uFF1F", "\u786E\u8BA4", { confirmButtonText: "\u786E\u5B9A", cancelButtonText: "\u53D6\u6D88", type: "warning" });
        await remove(id);
        ElMessage.success("\u5220\u9664\u6210\u529F");
        await loadData();
      } catch {
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_input = ElInput;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_pagination = ElPagination;
      const _component_el_dialog = ElDialog;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "flex": "1", "min-height": "0", "display": "flex", "flex-direction": "column" } }, _attrs))}><div class="page-header"><h2>\u6807\u7B7E\u7BA1\u7406</h2>`);
      if (!isGuest.value) {
        _push(ssrRenderComponent(_component_el_button, {
          type: "primary",
          icon: unref(plus_default),
          onClick: openCreate
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u65B0\u589E\u6807\u7B7E`);
            } else {
              return [
                createTextVNode("\u65B0\u589E\u6807\u7B7E")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="page-card" style="${ssrRenderStyle({ "flex": "1", "min-height": "0" })}"><div class="filter-bar">`);
      _push(ssrRenderComponent(_component_el_input, {
        modelValue: search.value,
        "onUpdate:modelValue": ($event) => search.value = $event,
        placeholder: "\u641C\u7D22\u6807\u7B7E...",
        "prefix-icon": unref(search_default),
        style: { "width": "260px" },
        clearable: ""
      }, null, _parent));
      _push(`</div><div class="table-with-pagination">`);
      _push(ssrRenderComponent(_component_el_table, mergeProps({
        data: pagedTags.value,
        style: { "width": "100%" },
        "max-height": unref(tableHeight),
        stripe: ""
      }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)), {
        empty: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "padding": "40px 0", "color": "#909399" })}"${_scopeId}>\u6682\u65E0\u6570\u636E</div>`);
          } else {
            return [
              createVNode("div", { style: { "padding": "40px 0", "color": "#909399" } }, "\u6682\u65E0\u6570\u636E")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              type: "index",
              label: "\u5E8F\u53F7",
              width: "55",
              align: "center",
              index: (i) => (currentPage.value - 1) * pageSize.value + i + 1
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "name",
              label: "\u540D\u79F0",
              "min-width": "280"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "createdAt",
              label: "\u521B\u5EFA\u65F6\u95F4",
              width: "160"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate((row.createdAt || "").replace("T", " ").slice(0, 16))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString((row.createdAt || "").replace("T", " ").slice(0, 16)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (isAdmin.value) {
              _push2(ssrRenderComponent(_component_el_table_column, {
                label: "\u64CD\u4F5C",
                width: "130",
                fixed: "right"
              }, {
                default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_button, {
                      link: "",
                      type: "primary",
                      size: "small",
                      onClick: ($event) => openEdit(row)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u7F16\u8F91`);
                        } else {
                          return [
                            createTextVNode("\u7F16\u8F91")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_button, {
                      link: "",
                      type: "danger",
                      size: "small",
                      onClick: ($event) => handleDelete(row.id)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u5220\u9664`);
                        } else {
                          return [
                            createTextVNode("\u5220\u9664")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_button, {
                        link: "",
                        type: "primary",
                        size: "small",
                        onClick: ($event) => openEdit(row)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u7F16\u8F91")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_el_button, {
                        link: "",
                        type: "danger",
                        size: "small",
                        onClick: ($event) => handleDelete(row.id)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u5220\u9664")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_el_table_column, {
                type: "index",
                label: "\u5E8F\u53F7",
                width: "55",
                align: "center",
                index: (i) => (currentPage.value - 1) * pageSize.value + i + 1
              }, null, 8, ["index"]),
              createVNode(_component_el_table_column, {
                prop: "name",
                label: "\u540D\u79F0",
                "min-width": "280"
              }),
              createVNode(_component_el_table_column, {
                prop: "createdAt",
                label: "\u521B\u5EFA\u65F6\u95F4",
                width: "160"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString((row.createdAt || "").replace("T", " ").slice(0, 16)), 1)
                ]),
                _: 1
              }),
              isAdmin.value ? (openBlock(), createBlock(_component_el_table_column, {
                key: 0,
                label: "\u64CD\u4F5C",
                width: "130",
                fixed: "right"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_button, {
                    link: "",
                    type: "primary",
                    size: "small",
                    onClick: ($event) => openEdit(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u7F16\u8F91")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_el_button, {
                    link: "",
                    type: "danger",
                    size: "small",
                    onClick: ($event) => handleDelete(row.id)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u5220\u9664")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="pagination-wrapper">`);
      _push(ssrRenderComponent(_component_el_pagination, {
        "current-page": currentPage.value,
        "onUpdate:currentPage": ($event) => currentPage.value = $event,
        "page-size": pageSize.value,
        total: filteredTags.value.length,
        layout: "prev, pager, next, jumper, total",
        "hide-on-single-page": false,
        background: ""
      }, null, _parent));
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: dialogVisible.value,
        "onUpdate:modelValue": ($event) => dialogVisible.value = $event,
        title: editingId.value ? "\u7F16\u8F91\u6807\u7B7E" : "\u65B0\u589E\u6807\u7B7E",
        width: "480",
        "destroy-on-close": ""
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => dialogVisible.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u53D6\u6D88`);
                } else {
                  return [
                    createTextVNode("\u53D6\u6D88")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              onClick: handleSave
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u4FDD\u5B58`);
                } else {
                  return [
                    createTextVNode("\u4FDD\u5B58")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                onClick: ($event) => dialogVisible.value = false
              }, {
                default: withCtx(() => [
                  createTextVNode("\u53D6\u6D88")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_component_el_button, {
                type: "primary",
                onClick: handleSave
              }, {
                default: withCtx(() => [
                  createTextVNode("\u4FDD\u5B58")
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, {
              model: form.value,
              "label-width": "80px",
              onSubmit: () => {
              }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u540D\u79F0",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.value.name,
                          "onUpdate:modelValue": ($event) => form.value.name = $event,
                          placeholder: "\u6807\u7B7E\u540D\u79F0"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.value.name,
                            "onUpdate:modelValue": ($event) => form.value.name = $event,
                            placeholder: "\u6807\u7B7E\u540D\u79F0"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "\u540D\u79F0",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.value.name,
                          "onUpdate:modelValue": ($event) => form.value.name = $event,
                          placeholder: "\u6807\u7B7E\u540D\u79F0"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_form, {
                model: form.value,
                "label-width": "80px",
                onSubmit: withModifiers(() => {
                }, ["prevent"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: "\u540D\u79F0",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.value.name,
                        "onUpdate:modelValue": ($event) => form.value.name = $event,
                        placeholder: "\u6807\u7B7E\u540D\u79F0"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model", "onSubmit"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tags.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=tags-CKlw4SeY.mjs.map
