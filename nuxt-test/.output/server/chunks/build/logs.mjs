import { E as ElInput } from './el-input.mjs';
import { E as ElSelect, a as ElOption } from './el-select.mjs';
import { E as ElButton, b as useFormSize } from './el-button.mjs';
import { u as useTableHeight, E as ElTable, a as ElTableColumn } from './useTableHeight.mjs';
import { E as ElTag } from './index4.mjs';
import { E as ElPagination } from './el-pagination.mjs';
import { E as ElDialog } from './el-dialog.mjs';
import { w as withInstall, f as withNoopInstall, c as buildProps, u as useSizeProp, e as request, d as definePropType, b as addUnit } from './request.mjs';
import { f as flattedChildren, g as getNormalizedProps } from './index3.mjs';
import { g as useNamespace } from './server.mjs';
import { isNil } from 'lodash-unified';
import { defineComponent, ref, mergeProps, withCtx, createVNode, createTextVNode, unref, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSlots, provide, computed, createElementBlock, normalizeClass, createElementVNode, renderSlot, inject, withDirectives, h, useSSRContext } from 'vue';
import { v as vLoading } from './el-loading.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import '@vueuse/core';
import '@vue/shared';
import './el-popper.mjs';
import '@popperjs/core';
import './el-scrollbar.mjs';
import '@ctrl/tinycolor';
import 'normalize-wheel-es';
import './el-checkbox.mjs';
import './el-overlay.mjs';
import 'axios';
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

const columnAlignment = [
  "left",
  "center",
  "right"
];
const descriptionProps = buildProps({
  /**
  * @description with or without border
  */
  border: Boolean,
  /**
  * @description numbers of `Descriptions Item` in one line
  */
  column: {
    type: Number,
    default: 3
  },
  /**
  * @description direction of list
  */
  direction: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "horizontal"
  },
  /**
  * @description size of list
  */
  size: useSizeProp,
  /**
  * @description title text, display on the top left
  */
  title: {
    type: String,
    default: ""
  },
  /**
  * @description extra text, display on the top right
  */
  extra: {
    type: String,
    default: ""
  },
  /**
  * @description width of every label column
  */
  labelWidth: { type: [String, Number] }
});
const COMPONENT_NAME = "ElDescriptionsItem";
const descriptionItemProps = buildProps({
  /**
  * @description label text
  */
  label: {
    type: String,
    default: ""
  },
  /**
  * @description colspan of column
  */
  span: {
    type: Number,
    default: 1
  },
  /**
  * @description the number of rows a cell should span
  */
  rowspan: {
    type: Number,
    default: 1
  },
  /**
  * @description column width, the width of the same column in different rows is set by the max value (If no `border`, width contains label and content)
  */
  width: {
    type: [String, Number],
    default: ""
  },
  /**
  * @description column minimum width, columns with `width` has a fixed width, while columns with `min-width` has a width that is distributed in proportion (If no`border`, width contains label and content)
  */
  minWidth: {
    type: [String, Number],
    default: ""
  },
  /**
  * @description column label width, if not set, it will be the same as the width of the column. Higher priority than the `label-width` of `Descriptions`
  */
  labelWidth: { type: [String, Number] },
  /**
  * @description column content alignment (If no `border`, effective for both label and content)
  */
  align: {
    type: String,
    values: columnAlignment,
    default: "left"
  },
  /**
  * @description column label alignment, if omitted, the value of the above `align` attribute will be applied (If no `border`, please use `align` attribute)
  */
  labelAlign: {
    type: String,
    values: columnAlignment
  },
  /**
  * @description column content custom class name
  */
  className: {
    type: String,
    default: ""
  },
  /**
  * @description column label custom class name
  */
  labelClassName: {
    type: String,
    default: ""
  }
});
const DescriptionItem = defineComponent({
  name: COMPONENT_NAME,
  props: descriptionItemProps
});
const descriptionsKey = /* @__PURE__ */ Symbol("elDescriptions");
const descriptionsRowProps = buildProps({ row: {
  type: definePropType(Array),
  default: () => []
} });
var descriptions_cell_default = defineComponent({
  name: "ElDescriptionsCell",
  props: {
    cell: { type: Object },
    tag: {
      type: String,
      default: "td"
    },
    type: { type: String }
  },
  setup() {
    return { descriptions: inject(descriptionsKey, {}) };
  },
  render() {
    const item = getNormalizedProps(this.cell);
    const directives = (this.cell?.dirs || []).map((dire) => {
      const { dir, arg, modifiers, value } = dire;
      return [
        dir,
        value,
        arg,
        modifiers
      ];
    });
    const { border, direction } = this.descriptions;
    const isVertical = direction === "vertical";
    const renderLabel = () => this.cell?.children?.label?.() || item.label;
    const renderContent = () => this.cell?.children?.default?.();
    const span = item.span;
    const rowspan = item.rowspan;
    const align = item.align ? `is-${item.align}` : "";
    const labelAlign = item.labelAlign ? `is-${item.labelAlign}` : align;
    const className = item.className;
    const labelClassName = item.labelClassName;
    const style = {
      width: addUnit(this.type === "label" ? item.labelWidth ?? this.descriptions.labelWidth ?? item.width : item.width),
      minWidth: addUnit(item.minWidth)
    };
    const ns = useNamespace("descriptions");
    switch (this.type) {
      case "label":
        return withDirectives(h(this.tag, {
          style,
          class: [
            ns.e("cell"),
            ns.e("label"),
            ns.is("bordered-label", border),
            ns.is("vertical-label", isVertical),
            labelAlign,
            labelClassName
          ],
          colSpan: isVertical ? span : 1,
          rowspan: isVertical ? 1 : rowspan
        }, renderLabel()), directives);
      case "content":
        return withDirectives(h(this.tag, {
          style,
          class: [
            ns.e("cell"),
            ns.e("content"),
            ns.is("bordered-content", border),
            ns.is("vertical-content", isVertical),
            align,
            className
          ],
          colSpan: isVertical ? span : span * 2 - 1,
          rowspan: isVertical ? rowspan * 2 - 1 : rowspan
        }, renderContent()), directives);
      default: {
        const label = renderLabel();
        const labelStyle = {};
        const width = addUnit(item.labelWidth ?? this.descriptions.labelWidth);
        if (width) {
          labelStyle.width = width;
          labelStyle.display = "inline-block";
        }
        return withDirectives(h("td", {
          style,
          class: [ns.e("cell"), align],
          colSpan: span,
          rowspan
        }, [!isNil(label) ? h("span", {
          style: labelStyle,
          class: [ns.e("label"), labelClassName]
        }, label) : void 0, h("span", { class: [ns.e("content"), className] }, renderContent())]), directives);
      }
    }
  }
});
const _hoisted_1 = { key: 1 };
var descriptions_row_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElDescriptionsRow",
  __name: "descriptions-row",
  props: descriptionsRowProps,
  setup(__props) {
    const descriptions = inject(descriptionsKey, {});
    return (_ctx, _cache) => {
      return unref(descriptions).direction === "vertical" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createElementVNode("tr", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.row, (cell, _index) => {
        return openBlock(), createBlock(unref(descriptions_cell_default), {
          key: `tr1-${_index}`,
          cell,
          tag: "th",
          type: "label"
        }, null, 8, ["cell"]);
      }), 128))]), createElementVNode("tr", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.row, (cell, _index) => {
        return openBlock(), createBlock(unref(descriptions_cell_default), {
          key: `tr2-${_index}`,
          cell,
          tag: "td",
          type: "content"
        }, null, 8, ["cell"]);
      }), 128))])], 64)) : (openBlock(), createElementBlock("tr", _hoisted_1, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.row, (cell, _index) => {
        return openBlock(), createElementBlock(Fragment, { key: `tr3-${_index}` }, [unref(descriptions).border ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(unref(descriptions_cell_default), {
          cell,
          tag: "td",
          type: "label"
        }, null, 8, ["cell"]), createVNode(unref(descriptions_cell_default), {
          cell,
          tag: "td",
          type: "content"
        }, null, 8, ["cell"])], 64)) : (openBlock(), createBlock(unref(descriptions_cell_default), {
          key: 1,
          cell,
          tag: "td",
          type: "both"
        }, null, 8, ["cell"]))], 64);
      }), 128))]));
    };
  }
});
var descriptions_row_default = descriptions_row_vue_vue_type_script_setup_true_lang_default;
var description_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElDescriptions",
  __name: "description",
  props: descriptionProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("descriptions");
    const descriptionsSize = useFormSize();
    const slots = useSlots();
    provide(descriptionsKey, props);
    const descriptionKls = computed(() => [ns.b(), ns.m(descriptionsSize.value)]);
    const filledNode = (node, span, count, isLast = false) => {
      if (!node.props) node.props = {};
      if (span > count) node.props.span = count;
      if (isLast) node.props.span = span;
      return node;
    };
    const getRows = () => {
      if (!slots.default) return [];
      const children = flattedChildren(slots.default()).filter((node) => node?.type?.name === COMPONENT_NAME);
      const rows = [];
      let temp = [];
      let count = props.column;
      let totalSpan = 0;
      const rowspanTemp = [];
      children.forEach((node, index) => {
        const span = node.props?.span || 1;
        const rowspan = node.props?.rowspan || 1;
        const rowNo = rows.length;
        rowspanTemp[rowNo] ||= 0;
        if (rowspan > 1) for (let i = 1; i < rowspan; i++) {
          rowspanTemp[rowNo + i] ||= 0;
          rowspanTemp[rowNo + i]++;
          totalSpan++;
        }
        if (rowspanTemp[rowNo] > 0) {
          count -= rowspanTemp[rowNo];
          rowspanTemp[rowNo] = 0;
        }
        if (index < children.length - 1) totalSpan += span > count ? count : span;
        if (index === children.length - 1) {
          const lastSpan = props.column - totalSpan % props.column;
          temp.push(filledNode(node, lastSpan, count, true));
          rows.push(temp);
          return;
        }
        if (span < count) {
          count -= span;
          temp.push(node);
        } else {
          temp.push(filledNode(node, span, count));
          rows.push(temp);
          count = props.column;
          temp = [];
        }
      });
      return rows;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", { class: normalizeClass(descriptionKls.value) }, [__props.title || __props.extra || _ctx.$slots.title || _ctx.$slots.extra ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(unref(ns).e("header"))
      }, [createElementVNode("div", { class: normalizeClass(unref(ns).e("title")) }, [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])], 2), createElementVNode("div", { class: normalizeClass(unref(ns).e("extra")) }, [renderSlot(_ctx.$slots, "extra", {}, () => [createTextVNode(toDisplayString(__props.extra), 1)])], 2)], 2)) : createCommentVNode("v-if", true), createElementVNode("div", { class: normalizeClass(unref(ns).e("body")) }, [createElementVNode("table", { class: normalizeClass([unref(ns).e("table"), unref(ns).is("bordered", __props.border)]) }, [createElementVNode("tbody", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(getRows(), (row, _index) => {
        return openBlock(), createBlock(descriptions_row_default, {
          key: _index,
          row
        }, null, 8, ["row"]);
      }), 128))])], 2)], 2)], 2);
    };
  }
});
var description_default = description_vue_vue_type_script_setup_true_lang_default;
const ElDescriptions = withInstall(description_default, { DescriptionsItem: DescriptionItem });
const ElDescriptionsItem = withNoopInstall(DescriptionItem);
const useLog = () => {
  const getLogs = async (page = 1, size = 20, filters) => {
    const params = { page, size };
    if (filters?.username) params.username = filters.username;
    if (filters?.action) params.action = filters.action;
    if (filters?.entity) params.entity = filters.entity;
    const res = await request.get("/admin/logs", { params });
    return res.data;
  };
  return { getLogs };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "logs",
  __ssrInlineRender: true,
  setup(__props) {
    const { getLogs } = useLog();
    const logs = ref([]);
    const loading = ref(false);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const total = ref(0);
    const filterUsername = ref("");
    const filterAction = ref("");
    const filterEntity = ref("");
    ref({});
    ref({});
    const { tableHeight } = useTableHeight(0);
    const actionWeight = {
      DELETE: { weight: 5, type: "danger", label: "删除" },
      CREATE: { weight: 4, type: "success", label: "创建" },
      UPDATE: { weight: 3, type: "warning", label: "修改" },
      LOGOUT: { weight: 2, type: "info", label: "退出" },
      LOGIN: { weight: 1, type: "info", label: "登录" },
      OTHER: { weight: 0, type: "", label: "其他" }
    };
    function actionStyle(action) {
      const w = (actionWeight[action] || {}).weight ?? 0;
      const opacity = [0.55, 0.65, 0.8, 1, 1, 1][w] ?? 0.6;
      const fontWeight = w >= 4 ? 700 : w >= 3 ? 600 : 400;
      return { opacity, fontWeight };
    }
    const actionMap = { CREATE: "创建", UPDATE: "修改", DELETE: "删除", LOGIN: "登录", LOGOUT: "退出", OTHER: "其他" };
    const detailDialogVisible = ref(false);
    const detailRow = ref(null);
    function showDetail(row) {
      detailRow.value = row;
      detailDialogVisible.value = true;
    }
    const fieldLabelMap = {
      username: "用户名",
      email: "邮箱",
      role: "角色",
      password: "密码",
      title: "标题",
      content: "内容",
      categoryId: "分类",
      tagIds: "标签",
      status: "状态",
      visibility: "可见性",
      name: "名称",
      description: "描述",
      oldPassword: "原密码",
      newPassword: "新密码"
    };
    function parseDataFields(detailsStr) {
      if (!detailsStr) return {};
      const fields = {};
      const parts = detailsStr.split(" | ");
      for (const part of parts) {
        const colonIdx = part.indexOf(": ");
        if (colonIdx === -1) continue;
        const key = part.substring(0, colonIdx).trim();
        const value = part.substring(colonIdx + 2).trim();
        fields[key] = value;
      }
      return fields;
    }
    function getFieldLabel(key) {
      return fieldLabelMap[key] || key;
    }
    async function loadData() {
      loading.value = true;
      try {
        const res = await getLogs(currentPage.value, pageSize.value, {
          username: filterUsername.value || void 0,
          action: filterAction.value || void 0,
          entity: filterEntity.value || void 0
        });
        logs.value = res.content ?? [];
        total.value = res.totalElements ?? 0;
      } catch {
        logs.value = [];
        total.value = 0;
      } finally {
        loading.value = false;
      }
    }
    function onFilter() {
      currentPage.value = 1;
      loadData();
    }
    const resultStyle = { SUCCESS: "color: #67c23a; font-weight: bold;", FAIL: "color: #f56c6c; font-weight: bold;" };
    const resultIcon = { SUCCESS: "✓", FAIL: "✗" };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_input = ElInput;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_button = ElButton;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_pagination = ElPagination;
      const _component_el_dialog = ElDialog;
      const _component_el_descriptions = ElDescriptions;
      const _component_el_descriptions_item = ElDescriptionsItem;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "flex": "1", "min-height": "0", "display": "flex", "flex-direction": "column" } }, _attrs))}><div class="page-header"><h2>操作日志</h2></div><div class="page-card" style="${ssrRenderStyle({ "flex": "1", "min-height": "0" })}"><div class="filter-bar" style="${ssrRenderStyle({ "display": "flex", "gap": "12px", "flex-wrap": "wrap", "align-items": "center" })}">`);
      _push(ssrRenderComponent(_component_el_input, {
        modelValue: filterUsername.value,
        "onUpdate:modelValue": ($event) => filterUsername.value = $event,
        placeholder: "用户名",
        clearable: "",
        style: { "width": "140px" },
        onClear: onFilter,
        onKeyup: onFilter
      }, null, _parent));
      _push(ssrRenderComponent(_component_el_select, {
        modelValue: filterAction.value,
        "onUpdate:modelValue": ($event) => filterAction.value = $event,
        placeholder: "操作类型",
        clearable: "",
        style: { "width": "120px" },
        onChange: onFilter
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_option, {
              label: "登录",
              value: "LOGIN"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_option, {
              label: "退出",
              value: "LOGOUT"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_option, {
              label: "创建",
              value: "CREATE"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_option, {
              label: "修改",
              value: "UPDATE"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_option, {
              label: "删除",
              value: "DELETE"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_option, {
                label: "登录",
                value: "LOGIN"
              }),
              createVNode(_component_el_option, {
                label: "退出",
                value: "LOGOUT"
              }),
              createVNode(_component_el_option, {
                label: "创建",
                value: "CREATE"
              }),
              createVNode(_component_el_option, {
                label: "修改",
                value: "UPDATE"
              }),
              createVNode(_component_el_option, {
                label: "删除",
                value: "DELETE"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_input, {
        modelValue: filterEntity.value,
        "onUpdate:modelValue": ($event) => filterEntity.value = $event,
        placeholder: "操作对象",
        clearable: "",
        style: { "width": "140px" },
        onClear: onFilter,
        onKeyup: onFilter
      }, null, _parent));
      _push(ssrRenderComponent(_component_el_button, { onClick: onFilter }, {
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
      _push(`</div><div class="table-with-pagination">`);
      _push(ssrRenderComponent(_component_el_table, mergeProps({
        style: { "width": "100%" },
        data: logs.value,
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
              prop: "username",
              label: "用户名",
              "min-width": "100",
              align: "center",
              "header-align": "center"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "操作类型",
              "min-width": "100",
              align: "center",
              "header-align": "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_tag, {
                    type: (actionWeight[row.action] || {}).type || "info",
                    size: "small",
                    style: actionStyle(row.action)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(actionMap[row.action] || row.action)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(actionMap[row.action] || row.action), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_tag, {
                      type: (actionWeight[row.action] || {}).type || "info",
                      size: "small",
                      style: actionStyle(row.action)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(actionMap[row.action] || row.action), 1)
                      ]),
                      _: 2
                    }, 1032, ["type", "style"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "entity",
              label: "操作对象",
              "min-width": "120",
              align: "center",
              "header-align": "center"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "entityId",
              label: "对象ID",
              width: "85",
              "show-overflow-tooltip": "",
              "header-align": "center"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "clientIp",
              label: "IP",
              "min-width": "130",
              align: "center",
              "header-align": "center"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "结果",
              width: "70",
              align: "center",
              "header-align": "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span style="${ssrRenderStyle(resultStyle[row.result] || "")}"${_scopeId2}>${ssrInterpolate(resultIcon[row.result] || "")} ${ssrInterpolate(row.result === "SUCCESS" ? "成功" : row.result === "FAIL" ? "失败" : row.result)}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      style: resultStyle[row.result] || ""
                    }, toDisplayString(resultIcon[row.result] || "") + " " + toDisplayString(row.result === "SUCCESS" ? "成功" : row.result === "FAIL" ? "失败" : row.result), 5)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "createdAt",
              label: "时间",
              width: "170",
              align: "center",
              "header-align": "center"
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
              width: "80",
              fixed: "right",
              align: "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    link: "",
                    type: "primary",
                    size: "small",
                    onClick: ($event) => showDetail(row)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`详情`);
                      } else {
                        return [
                          createTextVNode("详情")
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
                      onClick: ($event) => showDetail(row)
                    }, {
                      default: withCtx(() => [
                        createTextVNode("详情")
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
                prop: "username",
                label: "用户名",
                "min-width": "100",
                align: "center",
                "header-align": "center"
              }),
              createVNode(_component_el_table_column, {
                label: "操作类型",
                "min-width": "100",
                align: "center",
                "header-align": "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_tag, {
                    type: (actionWeight[row.action] || {}).type || "info",
                    size: "small",
                    style: actionStyle(row.action)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(actionMap[row.action] || row.action), 1)
                    ]),
                    _: 2
                  }, 1032, ["type", "style"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "entity",
                label: "操作对象",
                "min-width": "120",
                align: "center",
                "header-align": "center"
              }),
              createVNode(_component_el_table_column, {
                prop: "entityId",
                label: "对象ID",
                width: "85",
                "show-overflow-tooltip": "",
                "header-align": "center"
              }),
              createVNode(_component_el_table_column, {
                prop: "clientIp",
                label: "IP",
                "min-width": "130",
                align: "center",
                "header-align": "center"
              }),
              createVNode(_component_el_table_column, {
                label: "结果",
                width: "70",
                align: "center",
                "header-align": "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", {
                    style: resultStyle[row.result] || ""
                  }, toDisplayString(resultIcon[row.result] || "") + " " + toDisplayString(row.result === "SUCCESS" ? "成功" : row.result === "FAIL" ? "失败" : row.result), 5)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "createdAt",
                label: "时间",
                width: "170",
                align: "center",
                "header-align": "center"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString((row.createdAt || "").replace("T", " ").slice(0, 16)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                label: "操作",
                width: "80",
                fixed: "right",
                align: "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_button, {
                    link: "",
                    type: "primary",
                    size: "small",
                    onClick: ($event) => showDetail(row)
                  }, {
                    default: withCtx(() => [
                      createTextVNode("详情")
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
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: detailDialogVisible.value,
        "onUpdate:modelValue": ($event) => detailDialogVisible.value = $event,
        title: "日志详情",
        width: "700",
        "destroy-on-close": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (detailRow.value) {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(_component_el_descriptions, {
                column: 2,
                border: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "用户名" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(detailRow.value.username)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(detailRow.value.username), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "操作类型" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(actionMap[detailRow.value.action] || detailRow.value.action)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(actionMap[detailRow.value.action] || detailRow.value.action), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "操作对象" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(detailRow.value.entity)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(detailRow.value.entity), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "操作实体ID" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(detailRow.value.entityId)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(detailRow.value.entityId), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "结果" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span style="${ssrRenderStyle(resultStyle[detailRow.value.result] || "")}"${_scopeId3}>${ssrInterpolate(detailRow.value.result === "SUCCESS" ? "成功" : detailRow.value.result === "FAIL" ? "失败" : detailRow.value.result)}</span>`);
                        } else {
                          return [
                            createVNode("span", {
                              style: resultStyle[detailRow.value.result] || ""
                            }, toDisplayString(detailRow.value.result === "SUCCESS" ? "成功" : detailRow.value.result === "FAIL" ? "失败" : detailRow.value.result), 5)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "IP地址" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(detailRow.value.clientIp)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(detailRow.value.clientIp), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, {
                      label: "操作描述",
                      span: 2
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(detailRow.value.details)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(detailRow.value.details), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "时间" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(detailRow.value.createdAt)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(detailRow.value.createdAt), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, {
                      label: "请求路径",
                      span: 2
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(detailRow.value.path)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(detailRow.value.path), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_descriptions_item, { label: "用户名" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(detailRow.value.username), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "操作类型" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(actionMap[detailRow.value.action] || detailRow.value.action), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "操作对象" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(detailRow.value.entity), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "操作实体ID" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(detailRow.value.entityId), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "结果" }, {
                        default: withCtx(() => [
                          createVNode("span", {
                            style: resultStyle[detailRow.value.result] || ""
                          }, toDisplayString(detailRow.value.result === "SUCCESS" ? "成功" : detailRow.value.result === "FAIL" ? "失败" : detailRow.value.result), 5)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "IP地址" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(detailRow.value.clientIp), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, {
                        label: "操作描述",
                        span: 2
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(detailRow.value.details), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "时间" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(detailRow.value.createdAt), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, {
                        label: "请求路径",
                        span: 2
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(detailRow.value.path), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (detailRow.value.oldData || detailRow.value.newData) {
                _push2(`<div style="${ssrRenderStyle({ "margin-top": "16px" })}"${_scopeId}><h4 style="${ssrRenderStyle({ "margin-bottom": "8px", "color": "#303133" })}"${_scopeId}>操作数据</h4><div style="${ssrRenderStyle({ "background": "#f5f7fa", "padding": "12px", "border-radius": "4px", "max-height": "300px", "overflow": "auto" })}"${_scopeId}>`);
                if (detailRow.value.action === "UPDATE" && detailRow.value.oldData && detailRow.value.newData) {
                  _push2(`<div style="${ssrRenderStyle({ "font-family": "monospace", "font-size": "13px", "line-height": "1.8" })}"${_scopeId}><!--[-->`);
                  ssrRenderList(parseDataFields(detailRow.value.oldData), (changes, key) => {
                    _push2(`<div${_scopeId}>`);
                    if (detailRow.value.newData && parseDataFields(detailRow.value.newData)[key] !== changes) {
                      _push2(`<div style="${ssrRenderStyle({ "margin-bottom": "4px" })}"${_scopeId}><strong${_scopeId}>${ssrInterpolate(getFieldLabel(key))}:</strong><span style="${ssrRenderStyle({ "color": "#f56c6c", "text-decoration": "line-through", "margin-right": "6px" })}"${_scopeId}>${ssrInterpolate(changes)}</span><span style="${ssrRenderStyle({ "color": "#67c23a" })}"${_scopeId}>${ssrInterpolate(parseDataFields(detailRow.value.newData)[key])}</span></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<div style="${ssrRenderStyle({ "font-family": "monospace", "font-size": "13px", "white-space": "pre-wrap", "word-break": "break-all" })}"${_scopeId}>${ssrInterpolate(detailRow.value.oldData || detailRow.value.newData || "")}</div>`);
                }
                _push2(`</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              detailRow.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createVNode(_component_el_descriptions, {
                  column: 2,
                  border: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_descriptions_item, { label: "用户名" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(detailRow.value.username), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "操作类型" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(actionMap[detailRow.value.action] || detailRow.value.action), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "操作对象" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(detailRow.value.entity), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "操作实体ID" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(detailRow.value.entityId), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "结果" }, {
                      default: withCtx(() => [
                        createVNode("span", {
                          style: resultStyle[detailRow.value.result] || ""
                        }, toDisplayString(detailRow.value.result === "SUCCESS" ? "成功" : detailRow.value.result === "FAIL" ? "失败" : detailRow.value.result), 5)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "IP地址" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(detailRow.value.clientIp), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, {
                      label: "操作描述",
                      span: 2
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(detailRow.value.details), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, { label: "时间" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(detailRow.value.createdAt), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_descriptions_item, {
                      label: "请求路径",
                      span: 2
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(detailRow.value.path), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                detailRow.value.oldData || detailRow.value.newData ? (openBlock(), createBlock("div", {
                  key: 0,
                  style: { "margin-top": "16px" }
                }, [
                  createVNode("h4", { style: { "margin-bottom": "8px", "color": "#303133" } }, "操作数据"),
                  createVNode("div", { style: { "background": "#f5f7fa", "padding": "12px", "border-radius": "4px", "max-height": "300px", "overflow": "auto" } }, [
                    detailRow.value.action === "UPDATE" && detailRow.value.oldData && detailRow.value.newData ? (openBlock(), createBlock("div", {
                      key: 0,
                      style: { "font-family": "monospace", "font-size": "13px", "line-height": "1.8" }
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(parseDataFields(detailRow.value.oldData), (changes, key) => {
                        return openBlock(), createBlock("div", { key }, [
                          detailRow.value.newData && parseDataFields(detailRow.value.newData)[key] !== changes ? (openBlock(), createBlock("div", {
                            key: 0,
                            style: { "margin-bottom": "4px" }
                          }, [
                            createVNode("strong", null, toDisplayString(getFieldLabel(key)) + ":", 1),
                            createVNode("span", { style: { "color": "#f56c6c", "text-decoration": "line-through", "margin-right": "6px" } }, toDisplayString(changes), 1),
                            createVNode("span", { style: { "color": "#67c23a" } }, toDisplayString(parseDataFields(detailRow.value.newData)[key]), 1)
                          ])) : createCommentVNode("", true)
                        ]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      style: { "font-family": "monospace", "font-size": "13px", "white-space": "pre-wrap", "word-break": "break-all" }
                    }, toDisplayString(detailRow.value.oldData || detailRow.value.newData || ""), 1))
                  ])
                ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/logs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=logs.mjs.map
