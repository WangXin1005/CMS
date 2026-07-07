import { E as ElTag } from './index-DMOTimOd.mjs';
import { E as ElButton, s as withNoopInstall, d as ElMessage, u as useFormItem, h as useFormItemInputId, C as CHANGE_EVENT, U as UPDATE_MODEL_EVENT, k as buildProps, t as useSizeProp, n as useAriaProps, o as definePropType, g as useFormSize, i as useFormDisabled, v as useDeprecated, w as withInstall } from './request-BOYQ0nPL.mjs';
import { h as useNamespace, o as useId, i as isNumber, m as isBoolean, y as isPropAbsent } from './server.mjs';
import { NOOP, isString } from '@vue/shared';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, unref, openBlock, createBlock, createCommentVNode, computed, provide, reactive, toRefs, watch, createElementBlock, normalizeClass, renderSlot, Fragment, renderList, resolveDynamicComponent, withDirectives, createElementVNode, withModifiers, isRef, vModelRadio, normalizeStyle, nextTick, inject, useSSRContext } from 'vue';
import { isEqual, omit } from 'lodash-unified';
import { u as useTableHeight, E as ElTable, a as ElTableColumn } from './useTableHeight-DweIKLz9.mjs';
import { E as ElPagination } from './el-pagination-CF6rt7A3.mjs';
import { v as vLoading } from './el-loading-BK0wVkoV.mjs';
import { E as ElMessageBox } from './el-message-box-w2Z9DXtQ.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrGetDirectiveProps } from 'vue/server-renderer';
import { u as useComment } from './useComment-DbQ6uf3b.mjs';
import 'axios';
import '@vueuse/core';
import 'async-validator';
import '@ctrl/tinycolor';
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
import './el-scrollbar-DfPbNqGG.mjs';
import 'normalize-wheel-es';
import './el-popper-CdNYTAm2.mjs';
import '@popperjs/core';
import './el-checkbox-DnsbqAIr.mjs';
import './el-select-BH9xLs8J.mjs';
import './index-CZXf4ZJ_.mjs';
import './el-overlay-BZs4Z3MS.mjs';

const radioPropsBase = buildProps({
  /**
  * @description binding value
  */
  modelValue: {
    type: [
      String,
      Number,
      Boolean
    ],
    default: void 0
  },
  /**
  * @description size of the Radio
  */
  size: useSizeProp,
  /**
  * @description whether Radio is disabled
  */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
  * @description the label of Radio
  */
  label: {
    type: [
      String,
      Number,
      Boolean
    ],
    default: void 0
  },
  /**
  * @description the value of Radio
  */
  value: {
    type: [
      String,
      Number,
      Boolean
    ],
    default: void 0
  },
  /**
  * @description native `name` attribute
  */
  name: {
    type: String,
    default: void 0
  }
});
const radioProps = buildProps({
  ...radioPropsBase,
  /**
  * @description whether to add a border around Radio
  */
  border: Boolean
});
const radioEmits = {
  [UPDATE_MODEL_EVENT]: (val) => isString(val) || isNumber(val) || isBoolean(val),
  [CHANGE_EVENT]: (val) => isString(val) || isNumber(val) || isBoolean(val)
};
const radioGroupKey = /* @__PURE__ */ Symbol("radioGroupKey");
const radioButtonProps = buildProps({ ...radioPropsBase });
const radioDefaultProps = {
  label: "label",
  value: "value",
  disabled: "disabled"
};
const radioGroupProps = buildProps({
  /**
  * @description native `id` attribute
  */
  id: {
    type: String,
    default: void 0
  },
  /**
  * @description the size of radio buttons or bordered radios
  */
  size: useSizeProp,
  /**
  * @description whether the nesting radios are disabled
  */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
  * @description binding value
  */
  modelValue: {
    type: [
      String,
      Number,
      Boolean
    ],
    default: void 0
  },
  /**
  * @description border and background color when button is active
  */
  fill: {
    type: String,
    default: ""
  },
  /**
  * @description font color when button is active
  */
  textColor: {
    type: String,
    default: ""
  },
  /**
  * @description native `name` attribute
  */
  name: {
    type: String,
    default: void 0
  },
  /**
  * @description whether to trigger form validation
  */
  validateEvent: {
    type: Boolean,
    default: true
  },
  options: { type: definePropType(Array) },
  props: {
    type: definePropType(Object),
    default: () => radioDefaultProps
  },
  type: {
    type: String,
    values: ["radio", "button"],
    default: "radio"
  },
  ...useAriaProps(["ariaLabel"])
});
const radioGroupEmits = radioEmits;
const useRadio = (props, emit) => {
  const radioRef = ref();
  const radioGroup = inject(radioGroupKey, void 0);
  const isGroup = computed(() => !!radioGroup);
  const actualValue = computed(() => {
    if (!isPropAbsent(props.value)) return props.value;
    return props.label;
  });
  const modelValue = computed({
    get() {
      return isGroup.value ? radioGroup.modelValue : props.modelValue;
    },
    set(val) {
      if (isGroup.value) radioGroup.changeEvent(val);
      else emit && emit("update:modelValue", val);
      radioRef.value.checked = props.modelValue === actualValue.value;
    }
  });
  const size = useFormSize(computed(() => radioGroup?.size));
  const disabled = useFormDisabled(computed(() => radioGroup?.disabled));
  const focus = ref(false);
  const tabIndex = computed(() => {
    return disabled.value || isGroup.value && modelValue.value !== actualValue.value ? -1 : 0;
  });
  useDeprecated({
    from: "label act as value",
    replacement: "value",
    version: "3.0.0",
    scope: "el-radio",
    ref: "https://element-plus.org/en-US/component/radio.html"
  }, computed(() => isGroup.value && isPropAbsent(props.value)));
  return {
    radioRef,
    isGroup,
    radioGroup,
    focus,
    size,
    disabled,
    tabIndex,
    modelValue,
    actualValue
  };
};
const _hoisted_1$2 = [
  "value",
  "name",
  "disabled",
  "checked"
];
var radio_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElRadio",
  __name: "radio",
  props: radioProps,
  emits: radioEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("radio");
    const { radioRef, radioGroup, focus, size, disabled, modelValue, actualValue } = useRadio(props, emit);
    function handleChange() {
      nextTick(() => emit(CHANGE_EVENT, modelValue.value));
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("label", { class: normalizeClass([
        unref(ns).b(),
        unref(ns).is("disabled", unref(disabled)),
        unref(ns).is("focus", unref(focus)),
        unref(ns).is("bordered", __props.border),
        unref(ns).is("checked", unref(modelValue) === unref(actualValue)),
        unref(ns).m(unref(size))
      ]) }, [createElementVNode("span", { class: normalizeClass([
        unref(ns).e("input"),
        unref(ns).is("disabled", unref(disabled)),
        unref(ns).is("checked", unref(modelValue) === unref(actualValue))
      ]) }, [withDirectives(createElementVNode("input", {
        ref_key: "radioRef",
        ref: radioRef,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(modelValue) ? modelValue.value = $event : null),
        class: normalizeClass(unref(ns).e("original")),
        value: unref(actualValue),
        name: __props.name || unref(radioGroup)?.name,
        disabled: unref(disabled),
        checked: unref(modelValue) === unref(actualValue),
        type: "radio",
        onFocus: _cache[1] || (_cache[1] = ($event) => focus.value = true),
        onBlur: _cache[2] || (_cache[2] = ($event) => focus.value = false),
        onChange: handleChange,
        onClick: _cache[3] || (_cache[3] = withModifiers(() => {
        }, ["stop"]))
      }, null, 42, _hoisted_1$2), [[vModelRadio, unref(modelValue)]]), createElementVNode("span", { class: normalizeClass(unref(ns).e("inner")) }, null, 2)], 2), createElementVNode("span", {
        class: normalizeClass(unref(ns).e("label")),
        onKeydown: _cache[4] || (_cache[4] = withModifiers(() => {
        }, ["stop"]))
      }, [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(toDisplayString(__props.label), 1)])], 34)], 2);
    };
  }
});
var radio_default = radio_vue_vue_type_script_setup_true_lang_default;
const _hoisted_1$1 = [
  "value",
  "name",
  "disabled"
];
var radio_button_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElRadioButton",
  __name: "radio-button",
  props: radioButtonProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("radio");
    const { radioRef, focus, size, disabled, modelValue, radioGroup, actualValue } = useRadio(props);
    const activeStyle = computed(() => {
      return {
        backgroundColor: radioGroup?.fill || "",
        borderColor: radioGroup?.fill || "",
        boxShadow: radioGroup?.fill ? `-1px 0 0 0 ${radioGroup.fill}` : "",
        color: radioGroup?.textColor || ""
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("label", { class: normalizeClass([
        unref(ns).b("button"),
        unref(ns).is("active", unref(modelValue) === unref(actualValue)),
        unref(ns).is("disabled", unref(disabled)),
        unref(ns).is("focus", unref(focus)),
        unref(ns).bm("button", unref(size))
      ]) }, [withDirectives(createElementVNode("input", {
        ref_key: "radioRef",
        ref: radioRef,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(modelValue) ? modelValue.value = $event : null),
        class: normalizeClass(unref(ns).be("button", "original-radio")),
        value: unref(actualValue),
        type: "radio",
        name: __props.name || unref(radioGroup)?.name,
        disabled: unref(disabled),
        onFocus: _cache[1] || (_cache[1] = ($event) => focus.value = true),
        onBlur: _cache[2] || (_cache[2] = ($event) => focus.value = false),
        onClick: _cache[3] || (_cache[3] = withModifiers(() => {
        }, ["stop"]))
      }, null, 42, _hoisted_1$1), [[vModelRadio, unref(modelValue)]]), createElementVNode("span", {
        class: normalizeClass(unref(ns).be("button", "inner")),
        style: normalizeStyle(unref(modelValue) === unref(actualValue) ? activeStyle.value : {}),
        onKeydown: _cache[4] || (_cache[4] = withModifiers(() => {
        }, ["stop"]))
      }, [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(toDisplayString(__props.label), 1)])], 38)], 2);
    };
  }
});
var radio_button_default = radio_button_vue_vue_type_script_setup_true_lang_default;
const _hoisted_1 = [
  "id",
  "aria-label",
  "aria-labelledby"
];
var radio_group_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElRadioGroup",
  __name: "radio-group",
  props: radioGroupProps,
  emits: radioGroupEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("radio");
    const radioId = useId();
    const radioGroupRef = ref();
    const { formItem } = useFormItem();
    const { inputId: groupId, isLabeledByFormItem } = useFormItemInputId(props, { formItemContext: formItem });
    const changeEvent = (value) => {
      emit(UPDATE_MODEL_EVENT, value);
      nextTick(() => emit(CHANGE_EVENT, value));
    };
    const name = computed(() => {
      return props.name || radioId.value;
    });
    const aliasProps = computed(() => ({
      ...radioDefaultProps,
      ...props.props
    }));
    const getOptionProps = (option) => {
      const { label, value, disabled } = aliasProps.value;
      const base = {
        label: option[label],
        value: option[value],
        disabled: option[disabled]
      };
      return {
        ...omit(option, [
          label,
          value,
          disabled
        ]),
        ...base
      };
    };
    const optionComponent = computed(() => props.type === "button" ? radio_button_default : radio_default);
    provide(radioGroupKey, reactive({
      ...toRefs(props),
      changeEvent,
      name
    }));
    watch(() => props.modelValue, (newVal, oldValue) => {
      if (props.validateEvent && !isEqual(newVal, oldValue)) formItem?.validate("change").catch(NOOP);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        id: unref(groupId),
        ref_key: "radioGroupRef",
        ref: radioGroupRef,
        class: normalizeClass(unref(ns).b("group")),
        role: "radiogroup",
        "aria-label": !unref(isLabeledByFormItem) ? __props.ariaLabel || "radio-group" : void 0,
        "aria-labelledby": unref(isLabeledByFormItem) ? unref(formItem).labelId : void 0
      }, [renderSlot(_ctx.$slots, "default", {}, () => [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (item, index) => {
        return openBlock(), createBlock(resolveDynamicComponent(optionComponent.value), mergeProps({ key: index }, { ref_for: true }, getOptionProps(item)), null, 16);
      }), 128))])], 10, _hoisted_1);
    };
  }
});
var radio_group_default = radio_group_vue_vue_type_script_setup_true_lang_default;
withInstall(radio_default, {
  RadioButton: radio_button_default,
  RadioGroup: radio_group_default
});
const ElRadioGroup = withNoopInstall(radio_group_default);
const ElRadioButton = withNoopInstall(radio_button_default);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "comments",
  __ssrInlineRender: true,
  setup(__props) {
    const { getAdminList, approve, reject, remove, getStats } = useComment();
    const comments = ref([]);
    const loading = ref(false);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const total = ref(0);
    const statusFilter = ref(void 0);
    const stats = ref({ pending: 0, approved: 0 });
    const { tableHeight } = useTableHeight(0);
    const statusLabel = { PENDING: "待审核", APPROVED: "已通过", REJECTED: "已驳回" };
    const statusType = { PENDING: "warning", APPROVED: "success", REJECTED: "danger" };
    async function loadData() {
      loading.value = true;
      try {
        const res = await getAdminList(currentPage.value, pageSize.value, statusFilter.value);
        comments.value = res.content ?? [];
        total.value = res.totalElements ?? 0;
      } catch {
        comments.value = [];
        total.value = 0;
      } finally {
        loading.value = false;
      }
    }
    async function loadStats() {
      try {
        const res = await getStats();
        stats.value = res;
      } catch {
      }
    }
    async function handleApprove(id) {
      try {
        await approve(id);
        ElMessage.success("已通过");
        await loadData();
        await loadStats();
      } catch {
      }
    }
    async function handleReject(id) {
      try {
        await reject(id);
        ElMessage.success("已驳回");
        await loadData();
        await loadStats();
      } catch {
      }
    }
    async function handleDelete(id) {
      try {
        await ElMessageBox.confirm("确定删除此评论？", "确认", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" });
        await remove(id);
        ElMessage.success("删除成功");
        await loadData();
        await loadStats();
      } catch {
      }
    }
    function onStatusChange(val) {
      statusFilter.value = val === "__all__" ? void 0 : val;
      currentPage.value = 1;
      loadData();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_tag = ElTag;
      const _component_el_radio_group = ElRadioGroup;
      const _component_el_radio_button = ElRadioButton;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_button = ElButton;
      const _component_el_pagination = ElPagination;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "flex": "1", "min-height": "0", "display": "flex", "flex-direction": "column" } }, _attrs))}><div class="page-header"><h2>评论管理</h2><div style="${ssrRenderStyle({ "display": "flex", "gap": "8px" })}">`);
      _push(ssrRenderComponent(_component_el_tag, { type: "warning" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`待审核: ${ssrInterpolate(stats.value.pending ?? 0)}`);
          } else {
            return [
              createTextVNode("待审核: " + toDisplayString(stats.value.pending ?? 0), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_tag, { type: "success" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`已通过: ${ssrInterpolate(stats.value.approved ?? 0)}`);
          } else {
            return [
              createTextVNode("已通过: " + toDisplayString(stats.value.approved ?? 0), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="page-card" style="${ssrRenderStyle({ "flex": "1", "min-height": "0" })}"><div class="filter-bar">`);
      _push(ssrRenderComponent(_component_el_radio_group, {
        "model-value": statusFilter.value,
        onChange: onStatusChange
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_radio_button, { value: "__all__" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`全部`);
                } else {
                  return [
                    createTextVNode("全部")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_radio_button, { value: "PENDING" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`待审核`);
                } else {
                  return [
                    createTextVNode("待审核")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_radio_button, { value: "APPROVED" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`已通过`);
                } else {
                  return [
                    createTextVNode("已通过")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_radio_button, { value: "REJECTED" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`已驳回`);
                } else {
                  return [
                    createTextVNode("已驳回")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_radio_button, { value: "__all__" }, {
                default: withCtx(() => [
                  createTextVNode("全部")
                ]),
                _: 1
              }),
              createVNode(_component_el_radio_button, { value: "PENDING" }, {
                default: withCtx(() => [
                  createTextVNode("待审核")
                ]),
                _: 1
              }),
              createVNode(_component_el_radio_button, { value: "APPROVED" }, {
                default: withCtx(() => [
                  createTextVNode("已通过")
                ]),
                _: 1
              }),
              createVNode(_component_el_radio_button, { value: "REJECTED" }, {
                default: withCtx(() => [
                  createTextVNode("已驳回")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="table-with-pagination">`);
      _push(ssrRenderComponent(_component_el_table, mergeProps({
        data: comments.value,
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
              prop: "content",
              label: "评论内容",
              "min-width": "250",
              "show-overflow-tooltip": ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "author.username",
              label: "用户",
              width: "120"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "状态",
              width: "100"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: statusType[row.status] || "info",
                    size: "small"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(statusLabel[row.status] || row.status)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(statusLabel[row.status] || row.status), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      type: statusType[row.status] || "info",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(statusLabel[row.status] || row.status), 1)
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
              label: "时间",
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
              label: "操作",
              width: "200",
              fixed: "right"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row.status === "PENDING") {
                    _push3(ssrRenderComponent(_component_el_button, {
                      link: "",
                      type: "success",
                      size: "small",
                      onClick: ($event) => handleApprove(row.id)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`通过`);
                        } else {
                          return [
                            createTextVNode("通过")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (row.status === "PENDING") {
                    _push3(ssrRenderComponent(_component_el_button, {
                      link: "",
                      type: "warning",
                      size: "small",
                      onClick: ($event) => handleReject(row.id)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`驳回`);
                        } else {
                          return [
                            createTextVNode("驳回")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
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
                    row.status === "PENDING" ? (openBlock(), createBlock(_component_el_button, {
                      key: 0,
                      link: "",
                      type: "success",
                      size: "small",
                      onClick: ($event) => handleApprove(row.id)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("通过")
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : createCommentVNode("", true),
                    row.status === "PENDING" ? (openBlock(), createBlock(_component_el_button, {
                      key: 1,
                      link: "",
                      type: "warning",
                      size: "small",
                      onClick: ($event) => handleReject(row.id)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("驳回")
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : createCommentVNode("", true),
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
            return [
              createVNode(_component_el_table_column, {
                type: "index",
                label: "序号",
                width: "55",
                align: "center",
                index: (i) => (currentPage.value - 1) * pageSize.value + i + 1
              }, null, 8, ["index"]),
              createVNode(_component_el_table_column, {
                prop: "content",
                label: "评论内容",
                "min-width": "250",
                "show-overflow-tooltip": ""
              }),
              createVNode(_component_el_table_column, {
                prop: "author.username",
                label: "用户",
                width: "120"
              }),
              createVNode(_component_el_table_column, {
                label: "状态",
                width: "100"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, {
                    type: statusType[row.status] || "info",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(statusLabel[row.status] || row.status), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "createdAt",
                label: "时间",
                width: "170"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString((row.createdAt || "").replace("T", " ").slice(0, 16)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "操作",
                width: "200",
                fixed: "right"
              }, {
                default: withCtx(({ row }) => [
                  row.status === "PENDING" ? (openBlock(), createBlock(_component_el_button, {
                    key: 0,
                    link: "",
                    type: "success",
                    size: "small",
                    onClick: ($event) => handleApprove(row.id)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("通过")
                    ]),
                    _: 1
                  }, 8, ["onClick"])) : createCommentVNode("", true),
                  row.status === "PENDING" ? (openBlock(), createBlock(_component_el_button, {
                    key: 1,
                    link: "",
                    type: "warning",
                    size: "small",
                    onClick: ($event) => handleReject(row.id)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("驳回")
                    ]),
                    _: 1
                  }, 8, ["onClick"])) : createCommentVNode("", true),
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
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/comments.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=comments-CzkGKjpJ.mjs.map
