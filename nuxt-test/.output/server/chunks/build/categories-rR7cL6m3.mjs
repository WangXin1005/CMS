import { E as ElButton } from './el-button-Ci-hQSxb.mjs';
import { u as useTableHeight, E as ElTable, a as ElTableColumn } from './useTableHeight-DszGzTZt.mjs';
import { p as plus_default, b as ElIcon, r as rank_default, E as ElMessage, f as request } from './request-D_zzMMA3.mjs';
import { E as ElDialog } from './el-dialog-BYYfQCZn.mjs';
import { E as ElForm, a as ElFormItem } from './el-form-item-CcZ4_kPm.mjs';
import { E as ElInput } from './el-input-BZXamVjT.mjs';
import { v as vLoading } from './el-loading-CylbHp3O.mjs';
import { E as ElMessageBox } from './el-message-box-BJAApCoR.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, withModifiers, nextTick, useSSRContext } from 'vue';
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
import 'axios';
import '@popperjs/core';
import './ssr-1ZCkBfDH.mjs';
import './el-overlay-CUgtZWoK.mjs';
import './scroll-BmPP54RD.mjs';
import 'async-validator';
import './cookie-CqLf-Dw-.mjs';

const useCategory = () => {
  const getList = async () => {
    const res = await request.get("/categories");
    return res.data;
  };
  const getBySlug = async (slug) => {
    const res = await request.get(`/categories/${slug}`);
    return res.data;
  };
  const create = async (data) => {
    const res = await request.post("/admin/categories", data);
    return res.data;
  };
  const update = async (id, data) => {
    const res = await request.put(`/admin/categories/${id}`, data);
    return res.data;
  };
  const reorder = async (orders) => {
    const res = await request.put("/admin/categories/reorder", orders);
    return res.data;
  };
  const remove = async (id) => {
    const res = await request.delete(`/admin/categories/${id}`);
    return res.data;
  };
  return { getList, getBySlug, create, update, remove, reorder };
};
const columnCount = 5;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "categories",
  __ssrInlineRender: true,
  setup(__props) {
    const { role } = useAuth();
    const isGuest = computed(() => role.value === "GUEST");
    const isAdmin = computed(() => role.value === "ADMIN" || role.value === "SUPERADMIN");
    const { getList, create, update, remove } = useCategory();
    const categories = ref([]);
    const { tableHeight } = useTableHeight(0);
    const loading = ref(false);
    const displayCount = ref(15);
    const allLoaded = ref(false);
    const showEndMarker = computed(() => allLoaded.value && categories.value.length * 42 > (tableHeight.value || 400));
    const loadingMore = ref(false);
    const tableRef = ref();
    const displayCategories = computed(() => {
      const items = categories.value.slice(0, displayCount.value);
      if (showEndMarker.value) return [...items, { _isEndMarker: true }];
      return items;
    });
    function tableSpanMethod({ row, columnIndex }) {
      if (row._isEndMarker) {
        if (columnIndex === 0) return [1, columnCount];
        return [0, 0];
      }
    }
    const dialogVisible = ref(false);
    const editingId = ref(null);
    const form = ref({ name: "", description: "" });
    async function loadData(append = false) {
      if (!append) {
        loading.value = true;
        displayCount.value = 15;
        allLoaded.value = false;
      } else {
        loadingMore.value = true;
      }
      try {
        const res = await getList();
        categories.value = res != null ? res : [];
        if (!append && tableHeight.value) {
          const rowH = 42;
          const needed = Math.ceil(tableHeight.value / rowH) + 2;
          displayCount.value = Math.min(needed, categories.value.length);
        }
        if (displayCount.value >= categories.value.length) allLoaded.value = true;
      } catch {
        if (!append) categories.value = [];
      } finally {
        loading.value = false;
        loadingMore.value = false;
      }
    }
    function openCreate() {
      editingId.value = null;
      form.value = { name: "", description: "" };
      dialogVisible.value = true;
    }
    function openEdit(cat) {
      var _a;
      editingId.value = cat.id;
      form.value = { name: cat.name, description: (_a = cat.description) != null ? _a : "" };
      dialogVisible.value = true;
    }
    async function handleSave() {
      if (!form.value.name) {
        ElMessage.warning("\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A");
        return;
      }
      try {
        if (editingId.value) {
          await update(editingId.value, { name: form.value.name, description: form.value.description });
          ElMessage.success("\u66F4\u65B0\u6210\u529F");
        } else {
          const slug = form.value.name.toLowerCase().replace(/s+/g, "-");
          await create({ name: form.value.name, slug, description: form.value.description });
          ElMessage.success("\u521B\u5EFA\u6210\u529F");
        }
        dialogVisible.value = false;
        await loadData();
      } catch {
      }
    }
    async function handleDelete(id) {
      try {
        await ElMessageBox.confirm("\u786E\u5B9A\u5220\u9664\u6B64\u5206\u7C7B\uFF1F", "\u786E\u8BA4", { confirmButtonText: "\u786E\u5B9A", cancelButtonText: "\u53D6\u6D88", type: "warning" });
        await remove(id);
        ElMessage.success("\u5220\u9664\u6210\u529F");
        await loadData();
      } catch {
      }
    }
    function handleScroll() {
      var _a, _b;
      if (allLoaded.value || loading.value || loadingMore.value) return;
      const el = (_b = (_a = tableRef.value) == null ? void 0 : _a.$el) == null ? void 0 : _b.querySelector(".el-table__body-wrapper");
      if (!el) return;
      const dist = el.scrollHeight - el.scrollTop - el.clientHeight;
      if (dist <= 50) {
        loadingMore.value = true;
        displayCount.value = Math.min(displayCount.value + 8, categories.value.length);
        if (displayCount.value >= categories.value.length) allLoaded.value = true;
        nextTick(() => {
          loadingMore.value = false;
        });
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_icon = ElIcon;
      const _component_el_dialog = ElDialog;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "flex": "1", "min-height": "0", "display": "flex", "flex-direction": "column" } }, _attrs))}><div class="page-header"><h2>\u5206\u7C7B\u7BA1\u7406</h2>`);
      if (!isGuest.value) {
        _push(ssrRenderComponent(_component_el_button, {
          type: "primary",
          icon: unref(plus_default),
          onClick: openCreate
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u65B0\u589E\u5206\u7C7B`);
            } else {
              return [
                createTextVNode("\u65B0\u589E\u5206\u7C7B")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="page-card" style="${ssrRenderStyle({ "flex": "1", "min-height": "0" })}">`);
      _push(ssrRenderComponent(_component_el_table, mergeProps({
        ref_key: "tableRef",
        ref: tableRef,
        data: displayCategories.value,
        "span-method": tableSpanMethod,
        style: { "width": "100%" },
        "max-height": unref(tableHeight),
        onScroll: handleScroll,
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
              label: "\u6392\u5E8F",
              width: "55",
              "class-name": "drag-handle-col",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row._isEndMarker) {
                    _push3(`<div style="${ssrRenderStyle({ "text-align": "center", "color": "#999", "font-size": "13px", "padding": "2px 0", "line-height": "1.2", "width": "100%" })}"${_scopeId2}>\u5DF2\u52A0\u8F7D\u5168\u90E8</div>`);
                  } else {
                    _push3(ssrRenderComponent(_component_el_icon, {
                      class: "drag-handle",
                      style: { "cursor": "grab", "color": "#bbb", "font-size": "16px" }
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(rank_default), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(rank_default))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    row._isEndMarker ? (openBlock(), createBlock("div", {
                      key: 0,
                      style: { "text-align": "center", "color": "#999", "font-size": "13px", "padding": "2px 0", "line-height": "1.2", "width": "100%" }
                    }, "\u5DF2\u52A0\u8F7D\u5168\u90E8")) : (openBlock(), createBlock(_component_el_icon, {
                      key: 1,
                      class: "drag-handle",
                      style: { "cursor": "grab", "color": "#bbb", "font-size": "16px" }
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(rank_default))
                      ]),
                      _: 1
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "name",
              label: "\u540D\u79F0",
              "min-width": "220"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "description",
              label: "\u63CF\u8FF0",
              "min-width": "300",
              "show-overflow-tooltip": ""
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
                label: "\u6392\u5E8F",
                width: "55",
                "class-name": "drag-handle-col",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  row._isEndMarker ? (openBlock(), createBlock("div", {
                    key: 0,
                    style: { "text-align": "center", "color": "#999", "font-size": "13px", "padding": "2px 0", "line-height": "1.2", "width": "100%" }
                  }, "\u5DF2\u52A0\u8F7D\u5168\u90E8")) : (openBlock(), createBlock(_component_el_icon, {
                    key: 1,
                    class: "drag-handle",
                    style: { "cursor": "grab", "color": "#bbb", "font-size": "16px" }
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(rank_default))
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "name",
                label: "\u540D\u79F0",
                "min-width": "220"
              }),
              createVNode(_component_el_table_column, {
                prop: "description",
                label: "\u63CF\u8FF0",
                "min-width": "300",
                "show-overflow-tooltip": ""
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
      _push(`</div>`);
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: dialogVisible.value,
        "onUpdate:modelValue": ($event) => dialogVisible.value = $event,
        title: editingId.value ? "\u7F16\u8F91\u5206\u7C7B" : "\u65B0\u589E\u5206\u7C7B",
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
                          placeholder: "\u5206\u7C7B\u540D\u79F0"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.value.name,
                            "onUpdate:modelValue": ($event) => form.value.name = $event,
                            placeholder: "\u5206\u7C7B\u540D\u79F0"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u63CF\u8FF0" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.value.description,
                          "onUpdate:modelValue": ($event) => form.value.description = $event,
                          type: "textarea",
                          placeholder: "\u5206\u7C7B\u63CF\u8FF0"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.value.description,
                            "onUpdate:modelValue": ($event) => form.value.description = $event,
                            type: "textarea",
                            placeholder: "\u5206\u7C7B\u63CF\u8FF0"
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
                          placeholder: "\u5206\u7C7B\u540D\u79F0"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u63CF\u8FF0" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.value.description,
                          "onUpdate:modelValue": ($event) => form.value.description = $event,
                          type: "textarea",
                          placeholder: "\u5206\u7C7B\u63CF\u8FF0"
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
                        placeholder: "\u5206\u7C7B\u540D\u79F0"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u63CF\u8FF0" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.value.description,
                        "onUpdate:modelValue": ($event) => form.value.description = $event,
                        type: "textarea",
                        placeholder: "\u5206\u7C7B\u63CF\u8FF0"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/categories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=categories-rR7cL6m3.mjs.map
