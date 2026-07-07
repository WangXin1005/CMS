import { E as ElButton, p as plus_default, f as ElIcon, r as rank_default, a as ElForm, b as ElFormItem, c as ElInput, d as ElMessage, q as request } from './request-BOYQ0nPL.mjs';
import { u as useTableHeight, E as ElTable, a as ElTableColumn } from './useTableHeight-DweIKLz9.mjs';
import { E as ElDialog } from './el-dialog-C-3iWC7V.mjs';
import { v as vLoading } from './el-loading-BK0wVkoV.mjs';
import { E as ElMessageBox } from './el-message-box-w2Z9DXtQ.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-E3jONGWF.mjs';
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
import './el-scrollbar-DfPbNqGG.mjs';
import 'normalize-wheel-es';
import './el-popper-CdNYTAm2.mjs';
import '@popperjs/core';
import './el-checkbox-DnsbqAIr.mjs';
import './el-overlay-BZs4Z3MS.mjs';
import './cookie-BrXVhyN0.mjs';

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
    const displayCount = ref(5);
    const allLoaded = ref(false);
    const loadingMore = ref(false);
    const tableRef = ref();
    const displayCategories = computed(() => {
      const items = categories.value.slice(0, displayCount.value);
      if (allLoaded.value && items.length > 0) return [...items, { _isEndMarker: true }];
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
        displayCount.value = 5;
        allLoaded.value = false;
      } else {
        loadingMore.value = true;
      }
      try {
        const res = await getList();
        categories.value = res ?? [];
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
      editingId.value = cat.id;
      form.value = { name: cat.name, description: cat.description ?? "" };
      dialogVisible.value = true;
    }
    async function handleSave() {
      if (!form.value.name) {
        ElMessage.warning("名称不能为空");
        return;
      }
      try {
        if (editingId.value) {
          await update(editingId.value, { name: form.value.name, description: form.value.description });
          ElMessage.success("更新成功");
        } else {
          const slug = form.value.name.toLowerCase().replace(/s+/g, "-");
          await create({ name: form.value.name, slug, description: form.value.description });
          ElMessage.success("创建成功");
        }
        dialogVisible.value = false;
        await loadData();
      } catch {
      }
    }
    async function handleDelete(id) {
      try {
        await ElMessageBox.confirm("确定删除此分类？", "确认", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" });
        await remove(id);
        ElMessage.success("删除成功");
        await loadData();
      } catch {
      }
    }
    function handleScroll() {
      if (allLoaded.value || loading.value || loadingMore.value) return;
      const el = tableRef.value?.$el?.querySelector(".el-table__body-wrapper");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "flex": "1", "min-height": "0", "display": "flex", "flex-direction": "column" } }, _attrs))}><div class="page-header"><h2>分类管理</h2>`);
      if (!isGuest.value) {
        _push(ssrRenderComponent(_component_el_button, {
          type: "primary",
          icon: unref(plus_default),
          onClick: openCreate
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`新增分类`);
            } else {
              return [
                createTextVNode("新增分类")
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
            _push2(`<div style="${ssrRenderStyle({ "padding": "40px 0", "color": "#909399" })}"${_scopeId}>暂无数据</div>`);
          } else {
            return [
              createVNode("div", { style: { "padding": "40px 0", "color": "#909399" } }, "暂无数据")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "排序",
              width: "55",
              "class-name": "drag-handle-col",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row._isEndMarker) {
                    _push3(`<div style="${ssrRenderStyle({ "text-align": "center", "color": "#999", "font-size": "13px", "padding": "2px 0", "line-height": "1.2", "width": "100%" })}"${_scopeId2}>已加载全部</div>`);
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
                    }, "已加载全部")) : (openBlock(), createBlock(_component_el_icon, {
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
              label: "名称",
              "min-width": "220"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "description",
              label: "描述",
              "min-width": "300",
              "show-overflow-tooltip": ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "createdAt",
              label: "创建时间",
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
                label: "操作",
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
                          _push4(`编辑`);
                        } else {
                          return [
                            createTextVNode("编辑")
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
                          _push4(`删除`);
                        } else {
                          return [
                            createTextVNode("删除")
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
                          createTextVNode("编辑")
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
                          createTextVNode("删除")
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
                label: "排序",
                width: "55",
                "class-name": "drag-handle-col",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  row._isEndMarker ? (openBlock(), createBlock("div", {
                    key: 0,
                    style: { "text-align": "center", "color": "#999", "font-size": "13px", "padding": "2px 0", "line-height": "1.2", "width": "100%" }
                  }, "已加载全部")) : (openBlock(), createBlock(_component_el_icon, {
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
                label: "名称",
                "min-width": "220"
              }),
              createVNode(_component_el_table_column, {
                prop: "description",
                label: "描述",
                "min-width": "300",
                "show-overflow-tooltip": ""
              }),
              createVNode(_component_el_table_column, {
                prop: "createdAt",
                label: "创建时间",
                width: "160"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString((row.createdAt || "").replace("T", " ").slice(0, 16)), 1)
                ]),
                _: 1
              }),
              isAdmin.value ? (openBlock(), createBlock(_component_el_table_column, {
                key: 0,
                label: "操作",
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
                      createTextVNode("编辑")
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
                      createTextVNode("删除")
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
        title: editingId.value ? "编辑分类" : "新增分类",
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
                  _push3(`取消`);
                } else {
                  return [
                    createTextVNode("取消")
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
                  _push3(`保存`);
                } else {
                  return [
                    createTextVNode("保存")
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
                  createTextVNode("取消")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_component_el_button, {
                type: "primary",
                onClick: handleSave
              }, {
                default: withCtx(() => [
                  createTextVNode("保存")
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
              "label-width": "80px"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "名称",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.value.name,
                          "onUpdate:modelValue": ($event) => form.value.name = $event,
                          placeholder: "分类名称"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.value.name,
                            "onUpdate:modelValue": ($event) => form.value.name = $event,
                            placeholder: "分类名称"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "描述" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.value.description,
                          "onUpdate:modelValue": ($event) => form.value.description = $event,
                          type: "textarea",
                          placeholder: "分类描述"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.value.description,
                            "onUpdate:modelValue": ($event) => form.value.description = $event,
                            type: "textarea",
                            placeholder: "分类描述"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "名称",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.value.name,
                          "onUpdate:modelValue": ($event) => form.value.name = $event,
                          placeholder: "分类名称"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "描述" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.value.description,
                          "onUpdate:modelValue": ($event) => form.value.description = $event,
                          type: "textarea",
                          placeholder: "分类描述"
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
                "label-width": "80px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    label: "名称",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.value.name,
                        "onUpdate:modelValue": ($event) => form.value.name = $event,
                        placeholder: "分类名称"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "描述" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.value.description,
                        "onUpdate:modelValue": ($event) => form.value.description = $event,
                        type: "textarea",
                        placeholder: "分类描述"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"])
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
//# sourceMappingURL=categories-DZ0hnznG.mjs.map
