import { E as ElButton } from './el-button-Ci-hQSxb.mjs';
import { E as ElInput } from './el-input-BZXamVjT.mjs';
import { u as useTableHeight, E as ElTable, a as ElTableColumn } from './useTableHeight-DszGzTZt.mjs';
import { E as ElTag } from './index-Dn6mtLLY.mjs';
import { E as ElPagination } from './el-pagination-BNfONsi_.mjs';
import { E as ElDialog } from './el-dialog-BYYfQCZn.mjs';
import { E as ElForm, a as ElFormItem } from './el-form-item-CcZ4_kPm.mjs';
import { E as ElSelect, a as ElOption } from './el-select-Zfm1XGys.mjs';
import { v as vLoading } from './el-loading-CylbHp3O.mjs';
import { p as plus_default, P as search_default, E as ElMessage } from './request-D_zzMMA3.mjs';
import { E as ElMessageBox } from './el-message-box-BJAApCoR.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrGetDirectiveProps, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { v as validateUsername, a as validateEmail, b as validatePassword } from './email-CEn54U6N.mjs';
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
import './el-overlay-CUgtZWoK.mjs';
import './scroll-BmPP54RD.mjs';
import 'async-validator';
import '@popperjs/core';
import 'axios';
import './ssr-1ZCkBfDH.mjs';
import './cookie-CqLf-Dw-.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "user",
  __ssrInlineRender: true,
  setup(__props) {
    const { getUserList, createUser, updateUser, deleteUser, checkUsername } = useAuth();
    const tableData = ref([]);
    const total = ref(0);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const search = ref("");
    const loading = ref(false);
    const { tableHeight } = useTableHeight(0);
    const roleOptions = [
      { value: "USER", label: "\u666E\u901A\u7528\u6237" },
      { value: "ADMIN", label: "\u7BA1\u7406\u5458" },
      { value: "GUEST", label: "\u8BBF\u5BA2" }
    ];
    const roleTagType = { SUPERADMIN: "danger", ADMIN: "warning", USER: "success", GUEST: "info" };
    const roleLabel = { SUPERADMIN: "\u8D85\u7EA7\u7BA1\u7406\u5458", ADMIN: "\u7BA1\u7406\u5458", USER: "\u7528\u6237", GUEST: "\u8BBF\u5BA2" };
    const dialogVisible = ref(false);
    const dialogTitle = ref("");
    const editingId = ref(null);
    const form = ref({ username: "", email: "", password: "", role: "USER" });
    const submitting = ref(false);
    const formValid = computed(() => {
      if (!form.value.username || !form.value.email) return false;
      if (nameError.value || mailError.value) return false;
      if (!editingId.value && (!form.value.password || pwdError.value)) return false;
      return true;
    });
    const pwdError = ref("");
    const nameError = ref("");
    const mailError = ref("");
    async function onNameBlur(val) {
      if (!val) {
        nameError.value = "";
        return;
      }
      const err = validateUsername(val);
      if (err) {
        nameError.value = err;
        return;
      }
      if (!editingId.value) {
        const taken = await checkUsername(val);
        if (taken) {
          nameError.value = "\u7528\u6237\u540D\u5DF2\u88AB\u4F7F\u7528";
          return;
        }
      }
      nameError.value = "";
    }
    function onMailBlur(val) {
      if (!val) {
        mailError.value = "";
        return;
      }
      mailError.value = validateEmail(val) || "";
    }
    function onPwdBlur(val) {
      if (!val) {
        pwdError.value = "";
        return;
      }
      pwdError.value = validatePassword(val) || "";
    }
    async function loadData() {
      var _a, _b;
      loading.value = true;
      try {
        const res = await getUserList(currentPage.value, pageSize.value);
        tableData.value = (_a = res.content) != null ? _a : [];
        total.value = (_b = res.totalElements) != null ? _b : 0;
      } catch {
        tableData.value = [];
        total.value = 0;
      } finally {
        loading.value = false;
      }
    }
    function openCreate() {
      editingId.value = null;
      dialogTitle.value = "\u65B0\u589E\u7528\u6237";
      form.value = { username: "", email: "", password: "", role: "USER" };
      dialogVisible.value = true;
    }
    function openEdit(row) {
      var _a, _b, _c;
      editingId.value = row.id;
      dialogTitle.value = "\u7F16\u8F91\u7528\u6237";
      form.value = { username: (_a = row.username) != null ? _a : "", email: (_b = row.email) != null ? _b : "", password: "", role: (_c = row.role) != null ? _c : "USER" };
      dialogVisible.value = true;
    }
    async function handleSubmit() {
      const nameErr = validateUsername(form.value.username);
      const mailErr = validateEmail(form.value.email);
      nameError.value = nameErr || "";
      mailError.value = mailErr || "";
      if (nameErr || mailErr) return;
      if (!editingId.value) {
        const pwdErr = validatePassword(form.value.password);
        pwdError.value = pwdErr || "";
        if (pwdErr) return;
      }
      submitting.value = true;
      try {
        if (editingId.value) {
          await updateUser(editingId.value, { username: form.value.username, email: form.value.email, role: form.value.role });
          ElMessage.success("\u7528\u6237\u66F4\u65B0\u6210\u529F");
        } else {
          await createUser(form.value);
          ElMessage.success("\u7528\u6237\u521B\u5EFA\u6210\u529F");
        }
        dialogVisible.value = false;
        await loadData();
      } catch {
      } finally {
        submitting.value = false;
      }
    }
    async function handleDelete(id, username) {
      try {
        await ElMessageBox.confirm(`\u786E\u5B9A\u5220\u9664\u7528\u6237 "${username}"\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u6062\u590D`, "\u786E\u8BA4\u5220\u9664", { confirmButtonText: "\u786E\u5B9A", cancelButtonText: "\u53D6\u6D88", type: "warning" });
        await deleteUser(id);
        ElMessage.success("\u7528\u6237\u5DF2\u5220\u9664");
        await loadData();
      } catch {
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_input = ElInput;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_pagination = ElPagination;
      const _component_el_dialog = ElDialog;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "flex": "1", "min-height": "0", "display": "flex", "flex-direction": "column" } }, _attrs))}><div class="page-header"><h2>\u7528\u6237\u7BA1\u7406</h2>`);
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        icon: unref(plus_default),
        onClick: ($event) => openCreate()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u65B0\u589E\u7528\u6237`);
          } else {
            return [
              createTextVNode("\u65B0\u589E\u7528\u6237")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="page-card" style="${ssrRenderStyle({ "flex": "1", "min-height": "0" })}"><div class="filter-bar">`);
      _push(ssrRenderComponent(_component_el_input, {
        modelValue: search.value,
        "onUpdate:modelValue": ($event) => search.value = $event,
        placeholder: "\u641C\u7D22\u7528\u6237...",
        "prefix-icon": unref(search_default),
        style: { "width": "260px" },
        clearable: ""
      }, null, _parent));
      _push(`</div><div class="table-with-pagination">`);
      _push(ssrRenderComponent(_component_el_table, mergeProps({
        data: tableData.value,
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
              width: "60",
              index: (i) => (currentPage.value - 1) * pageSize.value + i + 1
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "username",
              label: "\u7528\u6237\u540D",
              width: "120"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "email",
              label: "\u90AE\u7BB1",
              width: "200"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "role",
              label: "\u89D2\u8272",
              width: "130"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: roleTagType[row.role] || "info",
                    size: "small"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(roleLabel[row.role] || row.role)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(roleLabel[row.role] || row.role), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      type: roleTagType[row.role] || "info",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(roleLabel[row.role] || row.role), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "createdAt",
              label: "\u521B\u5EFA\u65F6\u95F4",
              width: "170"
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
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u64CD\u4F5C",
              "min-width": "150",
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
                  if (row.role !== "SUPERADMIN") {
                    _push3(ssrRenderComponent(_component_el_button, {
                      link: "",
                      type: "danger",
                      size: "small",
                      onClick: ($event) => handleDelete(row.id, row.username)
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
                    _push3(`<!---->`);
                  }
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
                    row.role !== "SUPERADMIN" ? (openBlock(), createBlock(_component_el_button, {
                      key: 0,
                      link: "",
                      type: "danger",
                      size: "small",
                      onClick: ($event) => handleDelete(row.id, row.username)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("\u5220\u9664")
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_table_column, {
                type: "index",
                label: "\u5E8F\u53F7",
                width: "60",
                index: (i) => (currentPage.value - 1) * pageSize.value + i + 1
              }, null, 8, ["index"]),
              createVNode(_component_el_table_column, {
                prop: "username",
                label: "\u7528\u6237\u540D",
                width: "120"
              }),
              createVNode(_component_el_table_column, {
                prop: "email",
                label: "\u90AE\u7BB1",
                width: "200"
              }),
              createVNode(_component_el_table_column, {
                prop: "role",
                label: "\u89D2\u8272",
                width: "130"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, {
                    type: roleTagType[row.role] || "info",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(roleLabel[row.role] || row.role), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "createdAt",
                label: "\u521B\u5EFA\u65F6\u95F4",
                width: "170"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString((row.createdAt || "").replace("T", " ").slice(0, 16)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "\u64CD\u4F5C",
                "min-width": "150",
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
                  row.role !== "SUPERADMIN" ? (openBlock(), createBlock(_component_el_button, {
                    key: 0,
                    link: "",
                    type: "danger",
                    size: "small",
                    onClick: ($event) => handleDelete(row.id, row.username)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u5220\u9664")
                    ]),
                    _: 1
                  }, 8, ["onClick"])) : createCommentVNode("", true)
                ]),
                _: 1
              })
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
        total: total.value,
        layout: "prev, pager, next, jumper, total",
        "hide-on-single-page": false,
        background: "",
        onCurrentChange: loadData
      }, null, _parent));
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: dialogVisible.value,
        "onUpdate:modelValue": ($event) => dialogVisible.value = $event,
        title: dialogTitle.value,
        width: "520",
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
              disabled: !formValid.value,
              loading: submitting.value,
              onClick: ($event) => handleSubmit()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(editingId.value ? "\u4FDD\u5B58\u4FEE\u6539" : "\u786E\u8BA4\u521B\u5EFA")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(editingId.value ? "\u4FDD\u5B58\u4FEE\u6539" : "\u786E\u8BA4\u521B\u5EFA"), 1)
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
                disabled: !formValid.value,
                loading: submitting.value,
                onClick: ($event) => handleSubmit()
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(editingId.value ? "\u4FDD\u5B58\u4FEE\u6539" : "\u786E\u8BA4\u521B\u5EFA"), 1)
                ]),
                _: 1
              }, 8, ["disabled", "loading", "onClick"])
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
                    label: "\u7528\u6237\u540D",
                    required: "",
                    error: nameError.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.value.username,
                          "onUpdate:modelValue": ($event) => form.value.username = $event,
                          placeholder: "4~15\u4F4D\uFF0C\u5B57\u6BCD\u548C\u6570\u5B57",
                          maxlength: "15",
                          onBlur: ($event) => onNameBlur(form.value.username)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.value.username,
                            "onUpdate:modelValue": ($event) => form.value.username = $event,
                            placeholder: "4~15\u4F4D\uFF0C\u5B57\u6BCD\u548C\u6570\u5B57",
                            maxlength: "15",
                            onBlur: ($event) => onNameBlur(form.value.username)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u90AE\u7BB1",
                    required: "",
                    error: mailError.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: form.value.email,
                          "onUpdate:modelValue": ($event) => form.value.email = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
                          onBlur: ($event) => onMailBlur(form.value.email)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: form.value.email,
                            "onUpdate:modelValue": ($event) => form.value.email = $event,
                            placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
                            onBlur: ($event) => onMailBlur(form.value.email)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (!editingId.value) {
                    _push3(ssrRenderComponent(_component_el_form_item, {
                      label: "\u5BC6\u7801",
                      required: "",
                      error: pwdError.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_el_input, {
                            modelValue: form.value.password,
                            "onUpdate:modelValue": ($event) => form.value.password = $event,
                            type: "password",
                            placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801\uFF0C12~16\u4F4D\u542B\u5927\u5C0F\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u7279\u6B8A\u7B26\u53F7",
                            "show-password": "",
                            onBlur: ($event) => onPwdBlur(form.value.password)
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_el_input, {
                              modelValue: form.value.password,
                              "onUpdate:modelValue": ($event) => form.value.password = $event,
                              type: "password",
                              placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801\uFF0C12~16\u4F4D\u542B\u5927\u5C0F\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u7279\u6B8A\u7B26\u53F7",
                              "show-password": "",
                              onBlur: ($event) => onPwdBlur(form.value.password)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_el_form_item, {
                    label: "\u89D2\u8272",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_select, {
                          modelValue: form.value.role,
                          "onUpdate:modelValue": ($event) => form.value.role = $event,
                          placeholder: "\u9009\u62E9\u89D2\u8272",
                          style: { "width": "100%" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(roleOptions, (opt) => {
                                _push5(ssrRenderComponent(_component_el_option, {
                                  key: opt.value,
                                  label: opt.label,
                                  value: opt.value
                                }, null, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(roleOptions, (opt) => {
                                  return createVNode(_component_el_option, {
                                    key: opt.value,
                                    label: opt.label,
                                    value: opt.value
                                  }, null, 8, ["label", "value"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_select, {
                            modelValue: form.value.role,
                            "onUpdate:modelValue": ($event) => form.value.role = $event,
                            placeholder: "\u9009\u62E9\u89D2\u8272",
                            style: { "width": "100%" }
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(roleOptions, (opt) => {
                                return createVNode(_component_el_option, {
                                  key: opt.value,
                                  label: opt.label,
                                  value: opt.value
                                }, null, 8, ["label", "value"]);
                              }), 64))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, {
                      label: "\u7528\u6237\u540D",
                      required: "",
                      error: nameError.value
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.value.username,
                          "onUpdate:modelValue": ($event) => form.value.username = $event,
                          placeholder: "4~15\u4F4D\uFF0C\u5B57\u6BCD\u548C\u6570\u5B57",
                          maxlength: "15",
                          onBlur: ($event) => onNameBlur(form.value.username)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur"])
                      ]),
                      _: 1
                    }, 8, ["error"]),
                    createVNode(_component_el_form_item, {
                      label: "\u90AE\u7BB1",
                      required: "",
                      error: mailError.value
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.value.email,
                          "onUpdate:modelValue": ($event) => form.value.email = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
                          onBlur: ($event) => onMailBlur(form.value.email)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur"])
                      ]),
                      _: 1
                    }, 8, ["error"]),
                    !editingId.value ? (openBlock(), createBlock(_component_el_form_item, {
                      key: 0,
                      label: "\u5BC6\u7801",
                      required: "",
                      error: pwdError.value
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: form.value.password,
                          "onUpdate:modelValue": ($event) => form.value.password = $event,
                          type: "password",
                          placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801\uFF0C12~16\u4F4D\u542B\u5927\u5C0F\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u7279\u6B8A\u7B26\u53F7",
                          "show-password": "",
                          onBlur: ($event) => onPwdBlur(form.value.password)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur"])
                      ]),
                      _: 1
                    }, 8, ["error"])) : createCommentVNode("", true),
                    createVNode(_component_el_form_item, {
                      label: "\u89D2\u8272",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_select, {
                          modelValue: form.value.role,
                          "onUpdate:modelValue": ($event) => form.value.role = $event,
                          placeholder: "\u9009\u62E9\u89D2\u8272",
                          style: { "width": "100%" }
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(roleOptions, (opt) => {
                              return createVNode(_component_el_option, {
                                key: opt.value,
                                label: opt.label,
                                value: opt.value
                              }, null, 8, ["label", "value"]);
                            }), 64))
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
                    label: "\u7528\u6237\u540D",
                    required: "",
                    error: nameError.value
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.value.username,
                        "onUpdate:modelValue": ($event) => form.value.username = $event,
                        placeholder: "4~15\u4F4D\uFF0C\u5B57\u6BCD\u548C\u6570\u5B57",
                        maxlength: "15",
                        onBlur: ($event) => onNameBlur(form.value.username)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur"])
                    ]),
                    _: 1
                  }, 8, ["error"]),
                  createVNode(_component_el_form_item, {
                    label: "\u90AE\u7BB1",
                    required: "",
                    error: mailError.value
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.value.email,
                        "onUpdate:modelValue": ($event) => form.value.email = $event,
                        placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
                        onBlur: ($event) => onMailBlur(form.value.email)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur"])
                    ]),
                    _: 1
                  }, 8, ["error"]),
                  !editingId.value ? (openBlock(), createBlock(_component_el_form_item, {
                    key: 0,
                    label: "\u5BC6\u7801",
                    required: "",
                    error: pwdError.value
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: form.value.password,
                        "onUpdate:modelValue": ($event) => form.value.password = $event,
                        type: "password",
                        placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801\uFF0C12~16\u4F4D\u542B\u5927\u5C0F\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u7279\u6B8A\u7B26\u53F7",
                        "show-password": "",
                        onBlur: ($event) => onPwdBlur(form.value.password)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur"])
                    ]),
                    _: 1
                  }, 8, ["error"])) : createCommentVNode("", true),
                  createVNode(_component_el_form_item, {
                    label: "\u89D2\u8272",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: form.value.role,
                        "onUpdate:modelValue": ($event) => form.value.role = $event,
                        placeholder: "\u9009\u62E9\u89D2\u8272",
                        style: { "width": "100%" }
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(roleOptions, (opt) => {
                            return createVNode(_component_el_option, {
                              key: opt.value,
                              label: opt.label,
                              value: opt.value
                            }, null, 8, ["label", "value"]);
                          }), 64))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=user-C2kTYg7V.mjs.map
