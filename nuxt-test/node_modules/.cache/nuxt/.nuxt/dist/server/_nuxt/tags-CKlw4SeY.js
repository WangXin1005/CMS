import { E as ElButton } from "./el-button-Ci-hQSxb.js";
import { E as ElInput } from "./el-input-BZXamVjT.js";
import { u as useTableHeight, E as ElTable, a as ElTableColumn } from "./useTableHeight-DszGzTZt.js";
import { E as ElPagination } from "./el-pagination-BNfONsi_.js";
import { E as ElDialog } from "./el-dialog-BYYfQCZn.js";
import { E as ElForm, a as ElFormItem } from "./el-form-item-CcZ4_kPm.js";
import { v as vLoading } from "./el-loading-CylbHp3O.js";
import { L as request, P as plus_default, al as search_default, E as ElMessage } from "./request-D_zzMMA3.js";
import "./el-scrollbar-DaqqO3rh.js";
/* empty css                */
/* empty css                    */
import "./el-checkbox-CEM_OFcg.js";
import "./el-select-Zfm1XGys.js";
import "./el-overlay-CUgtZWoK.js";
import { E as ElMessageBox } from "./el-message-box-BJAApCoR.js";
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrGetDirectiveProps, ssrInterpolate } from "vue/server-renderer";
import "../server.mjs";
import "dayjs";
import { u as useAuth } from "./useAuth-Ln_QZRNp.js";
import "@ctrl/tinycolor";
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
import "normalize-wheel-es";
import "async-validator";
import "axios";
import "@popperjs/core";
import "D:/projects/nuxtProject/nuxt-test/node_modules/perfect-debounce/dist/index.mjs";
import "D:/projects/nuxtProject/nuxt-test/node_modules/defu/dist/defu.mjs";
import "D:/projects/nuxtProject/nuxt-test/node_modules/@nuxt/nitro-server/dist/runtime/h3-compat.mjs";
import "D:/projects/nuxtProject/nuxt-test/node_modules/ohash/dist/index.mjs";
import "./ssr-1ZCkBfDH.js";
import "D:/projects/nuxtProject/nuxt-test/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "./index-Dn6mtLLY.js";
import "./scroll-BmPP54RD.js";
import "D:/projects/nuxtProject/nuxt-test/node_modules/ofetch/dist/node.mjs";
import "D:/projects/nuxtProject/nuxt-test/node_modules/hookable/dist/index.mjs";
import "D:/projects/nuxtProject/nuxt-test/node_modules/unctx/dist/index.mjs";
import "vue-router";
import "D:/projects/nuxtProject/nuxt-test/node_modules/ufo/dist/index.mjs";
import "./cookie-CqLf-Dw-.js";
import "D:/projects/nuxtProject/nuxt-test/node_modules/cookie-es/dist/index.mjs";
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
        tags.value = res ?? [];
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
        ElMessage.warning("名称不能为空");
        return;
      }
      try {
        if (editingId.value) {
          await update(editingId.value, form.value);
          ElMessage.success("更新成功");
        } else {
          const slug = form.value.name.toLowerCase().replace(/s+/g, "-");
          await create({ name: form.value.name, slug });
          ElMessage.success("创建成功");
        }
        dialogVisible.value = false;
        await loadData();
      } catch {
      }
    }
    async function handleDelete(id) {
      try {
        await ElMessageBox.confirm("确定删除此标签？", "确认", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" });
        await remove(id);
        ElMessage.success("删除成功");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "flex": "1", "min-height": "0", "display": "flex", "flex-direction": "column" } }, _attrs))}><div class="page-header"><h2>标签管理</h2>`);
      if (!isGuest.value) {
        _push(ssrRenderComponent(_component_el_button, {
          type: "primary",
          icon: unref(plus_default),
          onClick: openCreate
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`新增标签`);
            } else {
              return [
                createTextVNode("新增标签")
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
        placeholder: "搜索标签...",
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
              type: "index",
              label: "序号",
              width: "55",
              align: "center",
              index: (i) => (currentPage.value - 1) * pageSize.value + i + 1
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "name",
              label: "名称",
              "min-width": "280"
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
                type: "index",
                label: "序号",
                width: "55",
                align: "center",
                index: (i) => (currentPage.value - 1) * pageSize.value + i + 1
              }, null, 8, ["index"]),
              createVNode(_component_el_table_column, {
                prop: "name",
                label: "名称",
                "min-width": "280"
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
        title: editingId.value ? "编辑标签" : "新增标签",
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
              "label-width": "80px",
              onSubmit: () => {
              }
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
                          placeholder: "标签名称"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.value.name,
                            "onUpdate:modelValue": ($event) => form.value.name = $event,
                            placeholder: "标签名称"
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
                          placeholder: "标签名称"
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
                    label: "名称",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.value.name,
                        "onUpdate:modelValue": ($event) => form.value.name = $event,
                        placeholder: "标签名称"
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
export {
  _sfc_main as default
};
//# sourceMappingURL=tags-CKlw4SeY.js.map
