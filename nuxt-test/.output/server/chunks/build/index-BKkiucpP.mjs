import { E as ElButton, u as useFormItem, b as useFormSize, c as useFormItemInputId, d as useFormDisabled, U as UPDATE_MODEL_EVENT, C as CHANGE_EVENT, I as INPUT_EVENT, e as useAriaProps } from './el-button-BT_d7SyZ.mjs';
import { E as ElInput } from './el-input-C-yVO0IL.mjs';
import { p as plus_default, a as ElIcon, w as withInstall, E as ElMessage, b as addUnit, l as loading_default, c as buildProps, i as iconPropType, d as definePropType } from './request-DEYIyDgU.mjs';
import { E as ElSelect, a as ElOption } from './el-select-C1F1Lv-K.mjs';
import { u as useTableHeight, E as ElTable, a as ElTableColumn } from './useTableHeight-DJUxn3_r.mjs';
import { E as ElTag } from './index-BF2UMlN_.mjs';
import { _ as _export_sfc, n as navigateTo, g as useNamespace, i as isBoolean, j as isNumber, t as throwError, f as debugWarn } from './server.mjs';
import { NOOP, isString, isPromise } from '@vue/shared';
import { E as ElMessageBox, i as isValidComponentSize } from './el-message-box-2xKN0eaW.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createTextVNode, openBlock, createBlock, createVNode, Fragment, renderList, toDisplayString, createCommentVNode, nextTick, shallowRef, watch, createElementBlock, withModifiers, normalizeClass, createElementVNode, withKeys, renderSlot, resolveDynamicComponent, normalizeStyle, useSSRContext } from 'vue';
import { E as ElDialog } from './el-dialog-7uDNzhQg.mjs';
import { v as vLoading } from './el-loading-C4Z06DhO.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrGetDirectiveProps, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { s as sanitizeHtml } from './sanitize-CMFdLwh2.mjs';
import { u as useArticle } from './useArticle-BnfRHitZ.mjs';
import { u as useAuth } from './useAuth-DCzOTuUd.mjs';
import '@ctrl/tinycolor';
import 'lodash-unified';
import '@vueuse/core';
import 'axios';
import './el-popper-BwEgDlhM.mjs';
import '@popperjs/core';
import './index-BtbUlw1r.mjs';
import './el-scrollbar-BQXU3ijv.mjs';
import 'normalize-wheel-es';
import './el-checkbox-D7uIkozQ.mjs';
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
import './el-overlay-xyoVwH6f.mjs';
import 'isomorphic-dompurify';
import './cookie-BrXVhyN0.mjs';

const switchProps = buildProps({
  /**
  * @description binding value, it should be equivalent to either `active-value` or `inactive-value`, by default it's `boolean` type
  */
  modelValue: {
    type: [
      Boolean,
      String,
      Number
    ],
    default: false
  },
  /**
  * @description whether Switch is disabled
  */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
  * @description whether Switch is in loading state
  */
  loading: Boolean,
  /**
  * @description size of Switch
  */
  size: {
    type: String,
    validator: isValidComponentSize
  },
  /**
  * @description width of Switch
  */
  width: {
    type: [String, Number],
    default: ""
  },
  /**
  * @description whether icon or text is displayed inside dot, only the first character will be rendered for text
  */
  inlinePrompt: Boolean,
  /**
  * @description component of the icon displayed in action when in `off` state
  */
  inactiveActionIcon: { type: iconPropType },
  /**
  * @description component of the icon displayed in action when in `on` state
  */
  activeActionIcon: { type: iconPropType },
  /**
  * @description component of the icon displayed when in `on` state, overrides `active-text`
  */
  activeIcon: { type: iconPropType },
  /**
  * @description component of the icon displayed when in `off` state, overrides `inactive-text`
  */
  inactiveIcon: { type: iconPropType },
  /**
  * @description text displayed when in `on` state
  */
  activeText: {
    type: String,
    default: ""
  },
  /**
  * @description text displayed when in `off` state
  */
  inactiveText: {
    type: String,
    default: ""
  },
  /**
  * @description switch value when in `on` state
  */
  activeValue: {
    type: [
      Boolean,
      String,
      Number
    ],
    default: true
  },
  /**
  * @description switch value when in `off` state
  */
  inactiveValue: {
    type: [
      Boolean,
      String,
      Number
    ],
    default: false
  },
  /**
  * @description input name of Switch
  */
  name: {
    type: String,
    default: ""
  },
  /**
  * @description whether to trigger form validation
  */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /**
  * @description before-change hook before the switch state changes. If `false` is returned or a `Promise` is returned and then is rejected, will stop switching
  */
  beforeChange: { type: definePropType(Function) },
  /**
  * @description id for input
  */
  id: String,
  /**
  * @description tabindex for input
  */
  tabindex: { type: [String, Number] },
  ...useAriaProps(["ariaLabel"])
});
const switchEmits = {
  [UPDATE_MODEL_EVENT]: (val) => isBoolean(val) || isString(val) || isNumber(val),
  [CHANGE_EVENT]: (val) => isBoolean(val) || isString(val) || isNumber(val),
  [INPUT_EVENT]: (val) => isBoolean(val) || isString(val) || isNumber(val)
};
const _hoisted_1 = [
  "id",
  "aria-checked",
  "aria-disabled",
  "aria-label",
  "name",
  "true-value",
  "false-value",
  "disabled",
  "tabindex"
];
const _hoisted_2 = ["aria-hidden"];
const _hoisted_3 = { key: 1 };
const _hoisted_4 = { key: 1 };
const _hoisted_5 = ["aria-hidden"];
const COMPONENT_NAME = "ElSwitch";
var switch_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: COMPONENT_NAME,
  __name: "switch",
  props: switchProps,
  emits: switchEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { formItem } = useFormItem();
    const switchSize = useFormSize();
    const ns = useNamespace("switch");
    const { inputId } = useFormItemInputId(props, { formItemContext: formItem });
    const switchDisabled = useFormDisabled(computed(() => {
      if (props.loading) return true;
    }));
    const isControlled = ref(props.modelValue !== false);
    const input = shallowRef();
    const switchKls = computed(() => [
      ns.b(),
      ns.m(switchSize.value),
      ns.is("disabled", switchDisabled.value),
      ns.is("checked", checked.value)
    ]);
    const labelLeftKls = computed(() => [
      ns.e("label"),
      ns.em("label", "left"),
      ns.is("active", !checked.value)
    ]);
    const labelRightKls = computed(() => [
      ns.e("label"),
      ns.em("label", "right"),
      ns.is("active", checked.value)
    ]);
    const coreStyle = computed(() => ({ width: addUnit(props.width) }));
    watch(() => props.modelValue, () => {
      isControlled.value = true;
    });
    const actualValue = computed(() => {
      return isControlled.value ? props.modelValue : false;
    });
    const checked = computed(() => actualValue.value === props.activeValue);
    if (![props.activeValue, props.inactiveValue].includes(actualValue.value)) {
      emit(UPDATE_MODEL_EVENT, props.inactiveValue);
      emit(CHANGE_EVENT, props.inactiveValue);
      emit(INPUT_EVENT, props.inactiveValue);
    }
    watch(checked, (val) => {
      input.value.checked = val;
      if (props.validateEvent) formItem?.validate?.("change").catch(NOOP);
    });
    const handleChange = () => {
      const val = checked.value ? props.inactiveValue : props.activeValue;
      emit(UPDATE_MODEL_EVENT, val);
      emit(CHANGE_EVENT, val);
      emit(INPUT_EVENT, val);
      nextTick(() => {
        input.value.checked = checked.value;
      });
    };
    const switchValue = () => {
      if (switchDisabled.value) return;
      const { beforeChange } = props;
      if (!beforeChange) {
        handleChange();
        return;
      }
      const shouldChange = beforeChange();
      if (![isPromise(shouldChange), isBoolean(shouldChange)].includes(true)) throwError(COMPONENT_NAME, "beforeChange must return type `Promise<boolean>` or `boolean`");
      if (isPromise(shouldChange)) shouldChange.then((result) => {
        if (result) handleChange();
      }).catch((e) => {
        debugWarn(COMPONENT_NAME, `some error occurred: ${e}`);
      });
      else if (shouldChange) handleChange();
    };
    const focus = () => {
      input.value?.focus?.();
    };
    __expose({
      /**
      *  @description manual focus to the switch component
      **/
      focus,
      /**
      * @description whether Switch is checked
      */
      checked
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(switchKls.value),
        onClick: withModifiers(switchValue, ["prevent"])
      }, [
        createElementVNode("input", {
          id: unref(inputId),
          ref_key: "input",
          ref: input,
          class: normalizeClass(unref(ns).e("input")),
          type: "checkbox",
          role: "switch",
          "aria-checked": checked.value,
          "aria-disabled": unref(switchDisabled),
          "aria-label": __props.ariaLabel,
          name: __props.name,
          "true-value": __props.activeValue,
          "false-value": __props.inactiveValue,
          disabled: unref(switchDisabled),
          tabindex: __props.tabindex,
          onChange: handleChange,
          onKeydown: withKeys(switchValue, ["enter"])
        }, null, 42, _hoisted_1),
        !__props.inlinePrompt && (__props.inactiveIcon || __props.inactiveText || _ctx.$slots.inactive) ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass(labelLeftKls.value)
        }, [renderSlot(_ctx.$slots, "inactive", {}, () => [__props.inactiveIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
          default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.inactiveIcon)))]),
          _: 1
        })) : createCommentVNode("v-if", true), !__props.inactiveIcon && __props.inactiveText ? (openBlock(), createElementBlock("span", {
          key: 1,
          "aria-hidden": checked.value
        }, toDisplayString(__props.inactiveText), 9, _hoisted_2)) : createCommentVNode("v-if", true)])], 2)) : createCommentVNode("v-if", true),
        createElementVNode("span", {
          class: normalizeClass(unref(ns).e("core")),
          style: normalizeStyle(coreStyle.value)
        }, [__props.inlinePrompt ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(ns).e("inner"))
        }, [!checked.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(ns).e("inner-wrapper"))
        }, [renderSlot(_ctx.$slots, "inactive", {}, () => [__props.inactiveIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
          default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.inactiveIcon)))]),
          _: 1
        })) : createCommentVNode("v-if", true), !__props.inactiveIcon && __props.inactiveText ? (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(__props.inactiveText), 1)) : createCommentVNode("v-if", true)])], 2)) : (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(unref(ns).e("inner-wrapper"))
        }, [renderSlot(_ctx.$slots, "active", {}, () => [__props.activeIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
          default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.activeIcon)))]),
          _: 1
        })) : createCommentVNode("v-if", true), !__props.activeIcon && __props.activeText ? (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(__props.activeText), 1)) : createCommentVNode("v-if", true)])], 2))], 2)) : createCommentVNode("v-if", true), createElementVNode("div", { class: normalizeClass(unref(ns).e("action")) }, [__props.loading ? (openBlock(), createBlock(unref(ElIcon), {
          key: 0,
          class: normalizeClass(unref(ns).is("loading"))
        }, {
          default: withCtx(() => [createVNode(unref(loading_default))]),
          _: 1
        }, 8, ["class"])) : checked.value ? renderSlot(_ctx.$slots, "active-action", { key: 1 }, () => [__props.activeActionIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
          default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.activeActionIcon)))]),
          _: 1
        })) : createCommentVNode("v-if", true)]) : !checked.value ? renderSlot(_ctx.$slots, "inactive-action", { key: 2 }, () => [__props.inactiveActionIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
          default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.inactiveActionIcon)))]),
          _: 1
        })) : createCommentVNode("v-if", true)]) : createCommentVNode("v-if", true)], 2)], 6),
        !__props.inlinePrompt && (__props.activeIcon || __props.activeText || _ctx.$slots.active) ? (openBlock(), createElementBlock("span", {
          key: 1,
          class: normalizeClass(labelRightKls.value)
        }, [renderSlot(_ctx.$slots, "active", {}, () => [__props.activeIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
          default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.activeIcon)))]),
          _: 1
        })) : createCommentVNode("v-if", true), !__props.activeIcon && __props.activeText ? (openBlock(), createElementBlock("span", {
          key: 1,
          "aria-hidden": !checked.value
        }, toDisplayString(__props.activeText), 9, _hoisted_5)) : createCommentVNode("v-if", true)])], 2)) : createCommentVNode("v-if", true)
      ], 2);
    };
  }
});
var switch_default = switch_vue_vue_type_script_setup_true_lang_default;
const ElSwitch = withInstall(switch_default);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { getAdminList, getMyArticles, update, updateMyArticle, remove, removeMyArticle } = useArticle();
    const { role, username: currentUsername } = useAuth();
    const isAdmin = computed(() => role.value === "ADMIN" || role.value === "SUPERADMIN");
    const isGuest = computed(() => role.value === "GUEST");
    const roleLevel = { SUPERADMIN: 3, ADMIN: 2, USER: 1, GUEST: 0 };
    function canEdit(row) {
      if (isGuest.value) return false;
      if (role.value === "SUPERADMIN") return true;
      if (row.author?.username === currentUsername.value) return true;
      if (role.value === "ADMIN") {
        const lv = roleLevel[row.author?.role || ""] ?? -1;
        return lv <= 1;
      }
      return false;
    }
    function canEditPreview() {
      if (isGuest.value) return false;
      if (role.value === "SUPERADMIN") return true;
      const authorName = dialogArticle.value?.author?.username;
      if (authorName === currentUsername.value) return true;
      const authorRole = dialogArticle.value?.author?.role || "";
      if (role.value === "ADMIN") return roleLevel[authorRole] <= 1;
      return false;
    }
    const canEditPreviewDialog = computed(() => canEditPreview());
    const articles = ref([]);
    const { tableHeight } = useTableHeight(0);
    const loading = ref(false);
    const currentPage = ref(1);
    const pageSize = ref(15);
    const total = ref(0);
    const statusFilter = ref(void 0);
    const keyword = ref("");
    const searchKeyword = ref("");
    const filterCategoryId = ref(void 0);
    const filterTagId = ref(void 0);
    const filterAuthorId = ref(void 0);
    const categories = ref([]);
    const tags = ref([]);
    const users = ref([]);
    const dialogVisible = ref(false);
    const dialogArticle = ref(null);
    const allLoaded = ref(false);
    const showEndMarker = computed(() => allLoaded.value && articles.value.length * 48 > (tableHeight.value || 600));
    const loadingMore = ref(false);
    const loadLocked = ref(false);
    const tableRef = ref();
    const displayArticles = computed(() => {
      if (showEndMarker.value) return [...articles.value, { _isEndMarker: true }];
      return articles.value;
    });
    const columnCount = computed(() => isAdmin.value ? 10 : 9);
    function tableSpanMethod({ row, columnIndex }) {
      if (row._isEndMarker) {
        if (columnIndex === 0) return [1, columnCount.value];
        return [0, 0];
      }
    }
    function viewArticle(row) {
      dialogArticle.value = row;
      dialogVisible.value = true;
    }
    function onSearch() {
      searchKeyword.value = keyword.value.trim();
      loadData();
    }
    function handleTableScroll() {
      if (allLoaded.value || loading.value || loadingMore.value || loadLocked.value) return;
      const el = tableRef.value?.$el?.querySelector(".el-table__body-wrapper");
      if (!el) return;
      const dist = el.scrollHeight - el.scrollTop - el.clientHeight;
      if (dist <= 60) {
        loadLocked.value = true;
        currentPage.value++;
        loadData(true);
      }
    }
    const statusLabel = { PUBLISHED: "已发布", DRAFT: "草稿" };
    const statusType = { PUBLISHED: "success", DRAFT: "warning" };
    async function loadData(append = false) {
      if (append) {
        loadingMore.value = true;
      } else {
        loading.value = true;
        currentPage.value = 1;
        allLoaded.value = false;
      }
      try {
        let res;
        if (isAdmin.value) {
          res = await getAdminList(currentPage.value, pageSize.value, statusFilter.value, searchKeyword.value || void 0, filterCategoryId.value, filterTagId.value, filterAuthorId.value);
        } else {
          res = await getMyArticles(currentPage.value, pageSize.value, statusFilter.value, searchKeyword.value || void 0, filterCategoryId.value, filterTagId.value);
        }
        const items = res.content ?? [];
        if (append) {
          articles.value = articles.value.concat(items);
        } else {
          articles.value = items;
        }
        total.value = res.totalElements ?? 0;
        if (items.length === 0 || items.length < pageSize.value) {
          allLoaded.value = true;
        }
        if (articles.value.length >= (res.totalElements ?? 0)) {
          allLoaded.value = true;
        }
      } catch {
        if (!append) {
          articles.value = [];
          total.value = 0;
        }
      } finally {
        loading.value = false;
        loadingMore.value = false;
        nextTick(() => {
          loadLocked.value = false;
        });
      }
    }
    function onStatusChange(val) {
      statusFilter.value = val;
      loadData();
    }
    async function handleDelete(id) {
      try {
        await ElMessageBox.confirm("确定删除此文章？此操作不可恢复", "确认删除", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" });
        if (isAdmin.value) await remove(id);
        else await removeMyArticle(id);
        ElMessage.success("删除成功");
        await loadData();
      } catch {
      }
    }
    async function handleVisibilityChange(row) {
      try {
        const targetVis = row.visibility;
        if (isAdmin.value) await update(row.id, { visibility: targetVis });
        else await updateMyArticle(row.id, { visibility: targetVis });
        const item = articles.value.find((a) => a.id === row.id);
        if (item) item.visibility = targetVis;
        ElMessage.success(targetVis === "PRIVATE" ? "已设为私密" : "已设为公开");
      } catch {
      }
    }
    function goCreate() {
      navigateTo("/articles/create");
    }
    function handleDialogEdit() {
      dialogVisible.value = false;
      goEdit(dialogArticle.value.id);
    }
    function goEdit(id) {
      navigateTo("/articles/edit/" + id);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_input = ElInput;
      const _component_el_icon = ElIcon;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_switch = ElSwitch;
      const _component_el_dialog = ElDialog;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "flex": "1", "min-height": "0", "display": "flex", "flex-direction": "column" } }, _attrs))} data-v-4caf46f0><div class="page-header" data-v-4caf46f0><h2 data-v-4caf46f0>文章管理</h2>`);
      if (!isGuest.value) {
        _push(ssrRenderComponent(_component_el_button, {
          type: "primary",
          icon: unref(plus_default),
          onClick: ($event) => goCreate()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`写文章`);
            } else {
              return [
                createTextVNode("写文章")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="page-card" style="${ssrRenderStyle({ "flex": "1", "min-height": "0" })}" data-v-4caf46f0><div class="filter-bar" style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "12px", "flex-wrap": "wrap" })}" data-v-4caf46f0><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center" })}" data-v-4caf46f0>`);
      _push(ssrRenderComponent(_component_el_input, {
        modelValue: keyword.value,
        "onUpdate:modelValue": ($event) => keyword.value = $event,
        placeholder: "搜索文章标题...",
        style: { "width": "240px" },
        clearable: "",
        onKeyup: onSearch
      }, {
        prefix: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-4caf46f0${_scopeId2}><path fill="currentColor" d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704" data-v-4caf46f0${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 1024 1024"
                    }, [
                      createVNode("path", {
                        fill: "currentColor",
                        d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704"
                      })
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 1024 1024"
                  }, [
                    createVNode("path", {
                      fill: "currentColor",
                      d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704"
                    })
                  ]))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, {
        type: "primary",
        onClick: onSearch,
        style: { "margin-left": "8px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`搜索`);
          } else {
            return [
              createTextVNode("搜索")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "12px", "margin-left": "auto" })}" data-v-4caf46f0>`);
      _push(ssrRenderComponent(_component_el_select, {
        modelValue: filterCategoryId.value,
        "onUpdate:modelValue": ($event) => filterCategoryId.value = $event,
        placeholder: "分类筛选",
        clearable: "",
        style: { "width": "140px" },
        onChange: ($event) => loadData()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(categories.value, (c) => {
              _push2(ssrRenderComponent(_component_el_option, {
                key: c.id,
                label: c.name,
                value: c.id
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (c) => {
                return openBlock(), createBlock(_component_el_option, {
                  key: c.id,
                  label: c.name,
                  value: c.id
                }, null, 8, ["label", "value"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_select, {
        modelValue: filterTagId.value,
        "onUpdate:modelValue": ($event) => filterTagId.value = $event,
        placeholder: "标签筛选",
        clearable: "",
        style: { "width": "140px" },
        onChange: ($event) => loadData()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(tags.value, (t) => {
              _push2(ssrRenderComponent(_component_el_option, {
                key: t.id,
                label: t.name,
                value: t.id
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(tags.value, (t) => {
                return openBlock(), createBlock(_component_el_option, {
                  key: t.id,
                  label: t.name,
                  value: t.id
                }, null, 8, ["label", "value"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_select, {
        modelValue: statusFilter.value,
        "onUpdate:modelValue": ($event) => statusFilter.value = $event,
        placeholder: "发布状态",
        clearable: "",
        style: { "width": "120px" },
        onChange: onStatusChange
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_option, {
              label: "已发布",
              value: "PUBLISHED"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_option, {
              label: "草稿",
              value: "DRAFT"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_option, {
                label: "已发布",
                value: "PUBLISHED"
              }),
              createVNode(_component_el_option, {
                label: "草稿",
                value: "DRAFT"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (isAdmin.value) {
        _push(ssrRenderComponent(_component_el_select, {
          modelValue: filterAuthorId.value,
          "onUpdate:modelValue": ($event) => filterAuthorId.value = $event,
          placeholder: "作者筛选",
          clearable: "",
          style: { "width": "140px" },
          onChange: ($event) => loadData()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(users.value, (u) => {
                _push2(ssrRenderComponent(_component_el_option, {
                  key: u.id,
                  label: u.username,
                  value: u.id
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(users.value, (u) => {
                  return openBlock(), createBlock(_component_el_option, {
                    key: u.id,
                    label: u.username,
                    value: u.id
                  }, null, 8, ["label", "value"]);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_el_table, mergeProps({
        ref_key: "tableRef",
        ref: tableRef,
        data: displayArticles.value,
        "span-method": tableSpanMethod,
        style: { "width": "100%" },
        "max-height": unref(tableHeight),
        onScroll: handleTableScroll,
        stripe: ""
      }, ssrGetDirectiveProps(_ctx, _directive_loading, loading.value)), {
        empty: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "padding": "40px 0", "color": "#909399" })}" data-v-4caf46f0${_scopeId}>暂无数据</div>`);
          } else {
            return [
              createVNode("div", { style: { "padding": "40px 0", "color": "#909399" } }, "暂无数据")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "序号",
              width: "55"
            }, {
              default: withCtx(({ row, $index }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (row._isEndMarker) {
                    _push3(`<div style="${ssrRenderStyle({ "text-align": "center", "color": "#999", "font-size": "13px", "padding": "2px 0", "line-height": "1.2", "width": "100%" })}" data-v-4caf46f0${_scopeId2}>已加载全部</div>`);
                  } else {
                    _push3(`<span data-v-4caf46f0${_scopeId2}>${ssrInterpolate($index + 1)}</span>`);
                  }
                } else {
                  return [
                    row._isEndMarker ? (openBlock(), createBlock("div", {
                      key: 0,
                      style: { "text-align": "center", "color": "#999", "font-size": "13px", "padding": "2px 0", "line-height": "1.2", "width": "100%" }
                    }, "已加载全部")) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString($index + 1), 1))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "标题",
              "min-width": "300"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!row._isEndMarker) {
                    _push3(`<div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "6px", "cursor": "pointer" })}"${ssrRenderAttr("type", isGuest.value ? "default" : "primary")}${ssrRenderAttr("underline", !isGuest.value)} data-v-4caf46f0${_scopeId2}><span style="${ssrRenderStyle({ "color": "#409eff", "overflow": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" })}" data-v-4caf46f0${_scopeId2}>${ssrInterpolate(row.title)}</span></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    !row._isEndMarker ? (openBlock(), createBlock("div", {
                      key: 0,
                      style: { "display": "flex", "align-items": "center", "gap": "6px", "cursor": "pointer" },
                      onClick: ($event) => viewArticle(row),
                      type: isGuest.value ? "default" : "primary",
                      underline: !isGuest.value
                    }, [
                      createVNode("span", { style: { "color": "#409eff", "overflow": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" } }, toDisplayString(row.title), 1)
                    ], 8, ["onClick", "type", "underline"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "分类",
              width: "80"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(row.category?.name || "-")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(row.category?.name || "-"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "标签",
              width: "150"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!row._isEndMarker) {
                    _push3(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "4px", "flex-wrap": "wrap" })}" data-v-4caf46f0${_scopeId2}><!--[-->`);
                    ssrRenderList(row.tags || [], (t) => {
                      _push3(ssrRenderComponent(_component_el_tag, {
                        key: t.id,
                        size: "small",
                        type: "info"
                      }, {
                        default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(t.name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(t.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    !row._isEndMarker ? (openBlock(), createBlock("div", {
                      key: 0,
                      style: { "display": "flex", "gap": "4px", "flex-wrap": "wrap" }
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(row.tags || [], (t) => {
                        return openBlock(), createBlock(_component_el_tag, {
                          key: t.id,
                          size: "small",
                          type: "info"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(t.name), 1)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "状态",
              width: "90"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!row._isEndMarker) {
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
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    !row._isEndMarker ? (openBlock(), createBlock(_component_el_tag, {
                      key: 0,
                      type: statusType[row.status] || "info",
                      size: "small"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(statusLabel[row.status] || row.status), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (isAdmin.value) {
              _push2(ssrRenderComponent(_component_el_table_column, {
                prop: "author.username",
                label: "作者",
                width: "100"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (!isGuest.value) {
              _push2(ssrRenderComponent(_component_el_table_column, {
                label: "可见性",
                width: "80",
                align: "center"
              }, {
                default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (!row._isEndMarker) {
                      _push3(ssrRenderComponent(_component_el_switch, {
                        disabled: !canEdit(row),
                        "model-value": row.visibility === "PUBLIC",
                        "active-text": "公",
                        "inactive-text": "私",
                        "inline-prompt": "",
                        size: "small",
                        onChange: ($event) => handleVisibilityChange({ ...row, visibility: row.visibility === "PUBLIC" ? "PRIVATE" : "PUBLIC" })
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      !row._isEndMarker ? (openBlock(), createBlock(_component_el_switch, {
                        key: 0,
                        disabled: !canEdit(row),
                        "model-value": row.visibility === "PUBLIC",
                        "active-text": "公",
                        "inactive-text": "私",
                        "inline-prompt": "",
                        size: "small",
                        onChange: ($event) => handleVisibilityChange({ ...row, visibility: row.visibility === "PUBLIC" ? "PRIVATE" : "PUBLIC" })
                      }, null, 8, ["disabled", "model-value", "onChange"])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "viewCount",
              label: "阅读",
              width: "70"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "创建时间",
              width: "160",
              align: "center"
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
            if (!isGuest.value) {
              _push2(ssrRenderComponent(_component_el_table_column, {
                label: "操作",
                width: "130",
                fixed: "right"
              }, {
                default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (!row._isEndMarker) {
                      _push3(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "4px" })}" data-v-4caf46f0${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_el_button, {
                        disabled: !canEdit(row),
                        link: "",
                        type: "primary",
                        size: "small",
                        onClick: ($event) => goEdit(row.id)
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
                        disabled: !canEdit(row),
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
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      !row._isEndMarker ? (openBlock(), createBlock("div", {
                        key: 0,
                        style: { "display": "flex", "gap": "4px" }
                      }, [
                        createVNode(_component_el_button, {
                          disabled: !canEdit(row),
                          link: "",
                          type: "primary",
                          size: "small",
                          onClick: ($event) => goEdit(row.id)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("编辑")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"]),
                        createVNode(_component_el_button, {
                          disabled: !canEdit(row),
                          link: "",
                          type: "danger",
                          size: "small",
                          onClick: ($event) => handleDelete(row.id)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("删除")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"])
                      ])) : createCommentVNode("", true)
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
                label: "序号",
                width: "55"
              }, {
                default: withCtx(({ row, $index }) => [
                  row._isEndMarker ? (openBlock(), createBlock("div", {
                    key: 0,
                    style: { "text-align": "center", "color": "#999", "font-size": "13px", "padding": "2px 0", "line-height": "1.2", "width": "100%" }
                  }, "已加载全部")) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString($index + 1), 1))
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "标题",
                "min-width": "300"
              }, {
                default: withCtx(({ row }) => [
                  !row._isEndMarker ? (openBlock(), createBlock("div", {
                    key: 0,
                    style: { "display": "flex", "align-items": "center", "gap": "6px", "cursor": "pointer" },
                    onClick: ($event) => viewArticle(row),
                    type: isGuest.value ? "default" : "primary",
                    underline: !isGuest.value
                  }, [
                    createVNode("span", { style: { "color": "#409eff", "overflow": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" } }, toDisplayString(row.title), 1)
                  ], 8, ["onClick", "type", "underline"])) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "分类",
                width: "80"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(row.category?.name || "-"), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "标签",
                width: "150"
              }, {
                default: withCtx(({ row }) => [
                  !row._isEndMarker ? (openBlock(), createBlock("div", {
                    key: 0,
                    style: { "display": "flex", "gap": "4px", "flex-wrap": "wrap" }
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(row.tags || [], (t) => {
                      return openBlock(), createBlock(_component_el_tag, {
                        key: t.id,
                        size: "small",
                        type: "info"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(t.name), 1)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "状态",
                width: "90"
              }, {
                default: withCtx(({ row }) => [
                  !row._isEndMarker ? (openBlock(), createBlock(_component_el_tag, {
                    key: 0,
                    type: statusType[row.status] || "info",
                    size: "small"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(statusLabel[row.status] || row.status), 1)
                    ]),
                    _: 2
                  }, 1032, ["type"])) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              isAdmin.value ? (openBlock(), createBlock(_component_el_table_column, {
                key: 0,
                prop: "author.username",
                label: "作者",
                width: "100"
              })) : createCommentVNode("", true),
              !isGuest.value ? (openBlock(), createBlock(_component_el_table_column, {
                key: 1,
                label: "可见性",
                width: "80",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  !row._isEndMarker ? (openBlock(), createBlock(_component_el_switch, {
                    key: 0,
                    disabled: !canEdit(row),
                    "model-value": row.visibility === "PUBLIC",
                    "active-text": "公",
                    "inactive-text": "私",
                    "inline-prompt": "",
                    size: "small",
                    onChange: ($event) => handleVisibilityChange({ ...row, visibility: row.visibility === "PUBLIC" ? "PRIVATE" : "PUBLIC" })
                  }, null, 8, ["disabled", "model-value", "onChange"])) : createCommentVNode("", true)
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(_component_el_table_column, {
                prop: "viewCount",
                label: "阅读",
                width: "70"
              }),
              createVNode(_component_el_table_column, {
                label: "创建时间",
                width: "160",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString((row.createdAt || "").replace("T", " ").slice(0, 16)), 1)
                ]),
                _: 1
              }),
              !isGuest.value ? (openBlock(), createBlock(_component_el_table_column, {
                key: 2,
                label: "操作",
                width: "130",
                fixed: "right"
              }, {
                default: withCtx(({ row }) => [
                  !row._isEndMarker ? (openBlock(), createBlock("div", {
                    key: 0,
                    style: { "display": "flex", "gap": "4px" }
                  }, [
                    createVNode(_component_el_button, {
                      disabled: !canEdit(row),
                      link: "",
                      type: "primary",
                      size: "small",
                      onClick: ($event) => goEdit(row.id)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("编辑")
                      ]),
                      _: 1
                    }, 8, ["disabled", "onClick"]),
                    createVNode(_component_el_button, {
                      disabled: !canEdit(row),
                      link: "",
                      type: "danger",
                      size: "small",
                      onClick: ($event) => handleDelete(row.id)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("删除")
                      ]),
                      _: 1
                    }, 8, ["disabled", "onClick"])
                  ])) : createCommentVNode("", true)
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
        title: "文章预览",
        width: "800",
        "destroy-on-close": "",
        top: "5vh"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => dialogVisible.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`关闭`);
                } else {
                  return [
                    createTextVNode("关闭")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (canEditPreviewDialog.value) {
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                onClick: handleDialogEdit
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`编辑`);
                  } else {
                    return [
                      createTextVNode("编辑")
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
              createVNode(_component_el_button, {
                onClick: ($event) => dialogVisible.value = false
              }, {
                default: withCtx(() => [
                  createTextVNode("关闭")
                ]),
                _: 1
              }, 8, ["onClick"]),
              canEditPreviewDialog.value ? (openBlock(), createBlock(_component_el_button, {
                key: 0,
                type: "primary",
                onClick: handleDialogEdit
              }, {
                default: withCtx(() => [
                  createTextVNode("编辑")
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (dialogArticle.value) {
              _push2(`<!--[--><div style="${ssrRenderStyle({ "margin-bottom": "16px", "padding-bottom": "12px", "border-bottom": "1px solid #ebeef5" })}" data-v-4caf46f0${_scopeId}><h3 style="${ssrRenderStyle({ "margin": "0 0 8px 0", "font-size": "20px" })}" data-v-4caf46f0${_scopeId}>${ssrInterpolate(dialogArticle.value.title)}</h3><div style="${ssrRenderStyle({ "display": "flex", "gap": "16px", "color": "#909399", "font-size": "13px" })}" data-v-4caf46f0${_scopeId}><span data-v-4caf46f0${_scopeId}>作者: ${ssrInterpolate(dialogArticle.value.author?.username)}</span><span data-v-4caf46f0${_scopeId}>分类: ${ssrInterpolate(dialogArticle.value.category?.name || "-")}</span><span data-v-4caf46f0${_scopeId}>${ssrInterpolate((dialogArticle.value.createdAt || "").replace("T", " ").slice(0, 16))}</span><span data-v-4caf46f0${_scopeId}>阅读: ${ssrInterpolate(dialogArticle.value.viewCount || 0)}</span></div></div><div class="article-preview-content" style="${ssrRenderStyle({ "max-height": "60vh", "overflow": "auto", "line-height": "1.8" })}" data-v-4caf46f0${_scopeId}>${unref(sanitizeHtml)(dialogArticle.value.content || "") ?? ""}</div><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              dialogArticle.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createVNode("div", { style: { "margin-bottom": "16px", "padding-bottom": "12px", "border-bottom": "1px solid #ebeef5" } }, [
                  createVNode("h3", { style: { "margin": "0 0 8px 0", "font-size": "20px" } }, toDisplayString(dialogArticle.value.title), 1),
                  createVNode("div", { style: { "display": "flex", "gap": "16px", "color": "#909399", "font-size": "13px" } }, [
                    createVNode("span", null, "作者: " + toDisplayString(dialogArticle.value.author?.username), 1),
                    createVNode("span", null, "分类: " + toDisplayString(dialogArticle.value.category?.name || "-"), 1),
                    createVNode("span", null, toDisplayString((dialogArticle.value.createdAt || "").replace("T", " ").slice(0, 16)), 1),
                    createVNode("span", null, "阅读: " + toDisplayString(dialogArticle.value.viewCount || 0), 1)
                  ])
                ]),
                createVNode("div", {
                  class: "article-preview-content",
                  innerHTML: unref(sanitizeHtml)(dialogArticle.value.content || ""),
                  style: { "max-height": "60vh", "overflow": "auto", "line-height": "1.8" }
                }, null, 8, ["innerHTML"])
              ], 64)) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/articles/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4caf46f0"]]);

export { index as default };
//# sourceMappingURL=index-BKkiucpP.mjs.map
