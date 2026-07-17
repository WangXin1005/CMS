import { E as ElInput } from './el-input-CTC7_SKv.mjs';
import { E as ElButton, b as useFormSize } from './el-button-BJk5PihZ.mjs';
import { E as ElSelect, a as ElOption } from './el-select-CcGgEtTi.mjs';
import { u as useTableHeight, E as ElTable, a as ElTableColumn } from './useTableHeight-NmLT3WyF.mjs';
import { E as ElTag } from './index-CGgDwGwP.mjs';
import { E as ElPagination } from './el-pagination-xmsb50DP.mjs';
import { E as ElDialog } from './el-dialog-DSK7x349.mjs';
import { w as withInstall, f as withNoopInstall, c as buildProps, u as useSizeProp, e as request, d as definePropType, b as addUnit } from './request-C7D5KCOD.mjs';
import { f as flattedChildren, g as getNormalizedProps } from './index-BtbUlw1r.mjs';
import { g as useNamespace } from './server.mjs';
import { isNil } from 'lodash-unified';
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, createVNode, unref, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSlots, provide, createElementBlock, normalizeClass, createElementVNode, renderSlot, inject, withDirectives, h, useSSRContext } from 'vue';
import { v as vLoading } from './el-loading-zZLyVR5l.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import '@vueuse/core';
import '@vue/shared';
import '@ctrl/tinycolor';
import './scroll-DbhaYLWL.mjs';
import './el-tag-Bo0paWdy.mjs';
import '@popperjs/core';
import './el-scrollbar-Drn659wJ.mjs';
import 'normalize-wheel-es';
import './el-checkbox-DkmOuvb5.mjs';
import './el-overlay-Bs80FkLO.mjs';
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
import './ssr-1ZCkBfDH.mjs';
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
    var _a, _b, _c, _d;
    const item = getNormalizedProps(this.cell);
    const directives = (((_a = this.cell) == null ? void 0 : _a.dirs) || []).map((dire) => {
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
    const renderLabel = () => {
      var _a2, _b2, _c2;
      return ((_c2 = (_b2 = (_a2 = this.cell) == null ? void 0 : _a2.children) == null ? void 0 : _b2.label) == null ? void 0 : _c2.call(_b2)) || item.label;
    };
    const renderContent = () => {
      var _a2, _b2, _c2;
      return (_c2 = (_b2 = (_a2 = this.cell) == null ? void 0 : _a2.children) == null ? void 0 : _b2.default) == null ? void 0 : _c2.call(_b2);
    };
    const span = item.span;
    const rowspan = item.rowspan;
    const align = item.align ? `is-${item.align}` : "";
    const labelAlign = item.labelAlign ? `is-${item.labelAlign}` : align;
    const className = item.className;
    const labelClassName = item.labelClassName;
    const style = {
      width: addUnit(this.type === "label" ? (_c = (_b = item.labelWidth) != null ? _b : this.descriptions.labelWidth) != null ? _c : item.width : item.width),
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
        const width = addUnit((_d = item.labelWidth) != null ? _d : this.descriptions.labelWidth);
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
      const children = flattedChildren(slots.default()).filter((node) => {
        var _a;
        return ((_a = node == null ? void 0 : node.type) == null ? void 0 : _a.name) === COMPONENT_NAME;
      });
      const rows = [];
      let temp = [];
      let count = props.column;
      let totalSpan = 0;
      const rowspanTemp = [];
      children.forEach((node, index) => {
        var _a, _b, _c;
        const span = ((_a = node.props) == null ? void 0 : _a.span) || 1;
        const rowspan = ((_b = node.props) == null ? void 0 : _b.rowspan) || 1;
        const rowNo = rows.length;
        rowspanTemp[rowNo] || (rowspanTemp[rowNo] = 0);
        if (rowspan > 1) for (let i = 1; i < rowspan; i++) {
          rowspanTemp[_c = rowNo + i] || (rowspanTemp[_c] = 0);
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
    if (filters == null ? void 0 : filters.username) params.username = filters.username;
    if (filters == null ? void 0 : filters.action) params.action = filters.action;
    if (filters == null ? void 0 : filters.entity) params.entity = filters.entity;
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
    const catMap = ref({});
    const tagMap = ref({});
    const { tableHeight } = useTableHeight(0);
    const actionWeight = {
      DELETE: { weight: 5, type: "danger", label: "\u5220\u9664" },
      APPROVE: { weight: 3, type: "success", label: "\u901A\u8FC7" },
      REJECT: { weight: 3, type: "warning", label: "\u9A73\u56DE" },
      UPLOAD: { weight: 4, type: "success", label: "\u4E0A\u4F20" },
      CREATE: { weight: 4, type: "success", label: "\u521B\u5EFA" },
      UPDATE: { weight: 3, type: "warning", label: "\u4FEE\u6539" },
      LOGOUT: { weight: 2, type: "info", label: "\u9000\u51FA" },
      LOGIN: { weight: 1, type: "info", label: "\u767B\u5F55" },
      OTHER: { weight: 0, type: "", label: "\u5176\u4ED6" }
    };
    function actionStyle(action) {
      var _a, _b;
      const w = (_a = (actionWeight[action] || {}).weight) != null ? _a : 0;
      const opacity = (_b = [0.55, 0.65, 0.8, 1, 1, 1][w]) != null ? _b : 0.6;
      const fontWeight = w >= 4 ? 700 : w >= 3 ? 600 : 400;
      return { opacity, fontWeight };
    }
    const actionMap = { CREATE: "\u521B\u5EFA", UPDATE: "\u4FEE\u6539", DELETE: "\u5220\u9664", UPLOAD: "\u4E0A\u4F20", APPROVE: "\u901A\u8FC7", REJECT: "\u9A73\u56DE", LOGIN: "\u767B\u5F55", LOGOUT: "\u9000\u51FA", OTHER: "\u5176\u4ED6" };
    const roleMap = { SUPERADMIN: "\u8D85\u7EA7\u7BA1\u7406\u5458", ADMIN: "\u7BA1\u7406\u5458", USER: "\u7528\u6237", GUEST: "\u8BBF\u5BA2" };
    const settingLabelMap = { site_name: "\u7F51\u7AD9\u540D\u79F0", site_description: "\u7F51\u7AD9\u63CF\u8FF0", site_logo: "Logo URL", icp_number: "\u5907\u6848\u53F7" };
    const entityMap = { Article: "\u6587\u7AE0", Category: "\u5206\u7C7B", Tag: "\u6807\u7B7E", User: "\u7528\u6237", Comment: "\u8BC4\u8BBA", Media: "\u5A92\u4F53", SiteSetting: "\u7AD9\u70B9\u8BBE\u7F6E", Auth: "\u8BA4\u8BC1" };
    const entityOptions = Object.entries(entityMap).map(([value, label]) => ({ value, label }));
    const detailDialogVisible = ref(false);
    const detailRow = ref(null);
    function showDetail(row) {
      detailRow.value = row;
      detailDialogVisible.value = true;
    }
    const logDesc = computed(() => detailRow.value ? formatLogDesc(detailRow.value) : null);
    const updateDiff = computed(() => detailRow.value ? getUpdateDiff(detailRow.value) : null);
    function parseData(details) {
      if (!details) return { summary: "", data: "" };
      const idx = details.indexOf(" | \u6570\u636E:");
      if (idx === -1) return { summary: details, data: "" };
      return { summary: details.substring(0, idx), data: details.substring(idx + 6).trim() };
    }
    const fieldLabelMap = {
      username: "\u7528\u6237\u540D",
      email: "\u90AE\u7BB1",
      role: "\u89D2\u8272",
      password: "\u5BC6\u7801",
      title: "\u6807\u9898",
      content: "\u5185\u5BB9",
      categoryId: "\u5206\u7C7B",
      tagIds: "\u6807\u7B7E",
      status: "\u72B6\u6001",
      visibility: "\u53EF\u89C1\u6027",
      name: "\u540D\u79F0",
      description: "\u63CF\u8FF0",
      oldPassword: "\u539F\u5BC6\u7801",
      newPassword: "\u65B0\u5BC6\u7801",
      value: "\u503C",
      summary: "\u6458\u8981"
    };
    const visibilityLabelMap = { PUBLIC: "\u516C\u5F00", PRIVATE: "\u79C1\u5BC6" };
    const statusLabelMap = { DRAFT: "\u8349\u7A3F", PUBLISHED: "\u5DF2\u53D1\u5E03" };
    const roleLabelMap = { SUPERADMIN: "\u8D85\u7EA7\u7BA1\u7406\u5458", ADMIN: "\u7BA1\u7406\u5458", USER: "\u666E\u901A\u7528\u6237", GUEST: "\u8BBF\u5BA2" };
    function formatLogDesc(row) {
      if (row.action === "UPDATE") return null;
      const { data } = parseData(row.details);
      let parsed = null;
      if (data) {
        try {
          parsed = JSON.parse(data);
        } catch {
        }
      }
      const entityLabel = entityMap[row.entity] || row.entity;
      const idStr = row.entityId ? "\uFF0CID\uFF1A" + row.entityId : "";
      function getName(obj) {
        if (!obj) return "";
        if (row.entity === "Article") return obj.title || "";
        if (row.entity === "User") {
          const rl = roleMap[obj.role] || "\u7528\u6237";
          return rl + " " + (obj.username || "");
        }
        if (row.entity === "Media") return obj.originalName || obj.filename || "";
        if (row.entity === "Comment") return (obj.content || "").substring(0, 30) + (obj.content && obj.content.length > 30 ? "..." : "");
        if (row.entity === "Auth") return obj.username || "";
        return obj.name || obj.title || "";
      }
      if (row.action === "CREATE") {
        const name = getName(parsed);
        const isArticleDraft = row.entity === "Article" && parsed && parsed.status === "DRAFT";
        const prefix = isArticleDraft ? "\u521B\u5EFA\u8349\u7A3F" + entityLabel + " " : "\u521B\u5EFA" + entityLabel + " ";
        if (name) return { prefix, name, nameColor: "#67c23a", suffix: "" };
      }
      if (row.action === "DELETE") {
        const name = getName(parsed);
        if (name) return { prefix: "\u5220\u9664" + entityLabel + " ", name, nameColor: "#f56c6c", suffixLabel: idStr ? "\uFF0CID\uFF1A" : "", suffixValue: row.entityId ? String(row.entityId) : "", suffixColor: "#f56c6c" };
        return { prefix: "\u5220\u9664" + entityLabel, name: "", nameColor: "", suffixLabel: " ID\uFF1A", suffixValue: row.entityId ? String(row.entityId) : "", suffixColor: "#f56c6c" };
      }
      if (row.action === "UPLOAD") {
        const name = getName(parsed);
        if (name) return { prefix: "\u4E0A\u4F20" + entityLabel + " ", name, nameColor: "#67c23a", suffix: "" };
      }
      if (row.action === "APPROVE" || row.action === "REJECT") {
        const name = getName(parsed);
        const actLabel = row.action === "APPROVE" ? "\u901A\u8FC7" : "\u9A73\u56DE";
        const color = row.action === "APPROVE" ? "#67c23a" : "#f56c6c";
        if (name) return { prefix: actLabel + entityLabel + " ", name, nameColor: color, suffixLabel: row.entityId ? "\uFF0CID\uFF1A" : "", suffixValue: row.entityId ? String(row.entityId) : "", suffixColor: color };
      }
      if (row.action === "LOGIN" || row.action === "LOGOUT") {
        const name = parsed ? parsed.username || "" : row.username || "";
        const loginColor = row.result === "FAIL" ? "#f56c6c" : row.action === "LOGIN" ? "#67c23a" : "#f56c6c";
        return { prefix: "\u7528\u6237 ", name, nameColor: loginColor, suffix: row.action === "LOGIN" ? " \u767B\u5F55" : " \u9000\u51FA", suffixColor: "" };
      }
      return null;
    }
    function parseOldNewData(row) {
      if (row.action !== "UPDATE") return { oldObj: null, newObj: null };
      const { data } = parseData(row.details);
      if (!data) return { oldObj: null, newObj: null };
      try {
        const parsed = JSON.parse(data);
        return { oldObj: parsed.o || null, newObj: parsed.n || null };
      } catch {
        return { oldObj: null, newObj: null };
      }
    }
    function getUpdateDiff(row) {
      if (row.action !== "UPDATE") return null;
      const { oldObj, newObj } = parseOldNewData(row);
      if (!newObj) return null;
      const isSiteSetting = row.entity === "SiteSetting";
      const settingKeyLabel = isSiteSetting && newObj.key ? settingLabelMap[newObj.key] || newObj.key : null;
      function normalizeTagIds(val) {
        if (Array.isArray(val)) return [...val].sort((a, b) => Number(a) - Number(b));
        if (typeof val === "string" && val.includes(",")) return val.split(",").map(Number).sort((a, b) => a - b);
        return val;
      }
      function normalizeVal(key, val) {
        if (key === "tagIds") return normalizeTagIds(val);
        return val;
      }
      function skipKey(key) {
        return key === "id" || key === "createdAt" || key === "updatedAt" || key === "password" || key === "viewCount" || key === "slug" || isSiteSetting && key === "key";
      }
      function displayKey(key) {
        if (isSiteSetting && key === "value" && settingKeyLabel) return settingKeyLabel;
        return key;
      }
      if (!oldObj) {
        const changes2 = [];
        for (const key of Object.keys(newObj)) {
          if (skipKey(key)) continue;
          changes2.push({ key: displayKey(key), oldVal: null, newVal: normalizeVal(key, newObj[key]) });
        }
        return changes2.length > 0 ? changes2 : null;
      }
      const changes = [];
      const newKeys = Object.keys(newObj).filter((k) => !skipKey(k));
      for (const key of newKeys) {
        const oldVal = normalizeVal(key, oldObj[key]);
        const newVal = normalizeVal(key, newObj[key]);
        if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
          changes.push({ key: displayKey(key), oldVal: oldObj[key], newVal: newObj[key] });
        }
      }
      return changes.length > 0 ? changes : null;
    }
    function stripHtml(html) {
      if (!html || typeof html !== "string") return String(html != null ? html : "");
      return html.replace(/<br\s*\/?>/gi, "\n").replace(/<\/?(p|div|h[1-6]|li|blockquote|pre|hr|table|tr|ul|ol)[^>]*>/gi, "\n").replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/\n{3,}/g, "\n\n").trim();
    }
    function computeCharDiff(oldStr, newStr) {
      const o = stripHtml(String(oldStr != null ? oldStr : ""));
      const n = stripHtml(String(newStr != null ? newStr : ""));
      if (o === n) return [{ type: "same", text: o }];
      if (o.length <= 100 && n.length <= 100) {
        const m = o.length, len = n.length;
        const dp = Array.from({ length: m + 1 }, () => new Uint16Array(len + 1));
        for (let i2 = 1; i2 <= m; i2++) {
          for (let j2 = 1; j2 <= len; j2++) {
            dp[i2][j2] = o[i2 - 1] === n[j2 - 1] ? dp[i2 - 1][j2 - 1] + 1 : Math.max(dp[i2 - 1][j2], dp[i2][j2 - 1]);
          }
        }
        const temp = [];
        let i = m, j = len;
        while (i > 0 || j > 0) {
          if (i > 0 && j > 0 && o[i - 1] === n[j - 1]) {
            temp.push({ type: "same", char: o[i - 1] });
            i--;
            j--;
          } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
            temp.push({ type: "insert", char: n[j - 1] });
            j--;
          } else {
            temp.push({ type: "delete", char: o[i - 1] });
            i--;
          }
        }
        temp.reverse();
        const segs = [];
        for (const s of temp) {
          const last = segs[segs.length - 1];
          if (last && last.type === s.type) last.text += s.char;
          else segs.push({ type: s.type, text: s.char });
        }
        return segs;
      }
      const CTX = 50;
      let samePrefix = 0;
      while (samePrefix < o.length && samePrefix < n.length && o[samePrefix] === n[samePrefix]) samePrefix++;
      let sameSuffix = 0;
      while (sameSuffix < o.length - samePrefix && sameSuffix < n.length - samePrefix && o[o.length - 1 - sameSuffix] === n[n.length - 1 - sameSuffix]) sameSuffix++;
      const prefixStart = Math.max(0, samePrefix - CTX);
      const suffixEndOld = Math.min(o.length, o.length - sameSuffix + CTX);
      Math.min(n.length, n.length - sameSuffix + CTX);
      const hasMoreLeft = prefixStart > 0;
      const hasMoreRight = o.length - sameSuffix + CTX < o.length || n.length - sameSuffix + CTX < n.length;
      const oldMid = o.slice(samePrefix, o.length - sameSuffix);
      const newMid = n.slice(samePrefix, n.length - sameSuffix);
      const result = [];
      if (samePrefix > 0) {
        const pre = o.slice(prefixStart, samePrefix);
        result.push({ type: "same", text: (hasMoreLeft ? "\u2026" : "") + pre });
      }
      if (oldMid) result.push({ type: "delete", text: oldMid });
      if (newMid) result.push({ type: "insert", text: newMid });
      if (sameSuffix > 0) {
        const suf = o.slice(o.length - sameSuffix, suffixEndOld);
        result.push({ type: "same", text: suf + (hasMoreRight ? "\u2026" : "") });
      }
      return result;
    }
    const selectFields = /* @__PURE__ */ new Set(["status", "visibility", "role", "categoryId", "tagIds"]);
    function isDiffable(val) {
      if (val === null || val === void 0) return false;
      const s = String(val);
      return s.length > 0 && typeof val !== "object";
    }
    function formatDiffVal(val, key) {
      if (val === null || val === void 0) return "(\u7A7A)";
      if (key === "categoryId" && val != null) {
        const id = typeof val === "object" ? val.id : Number(val);
        if (catMap.value[id]) return catMap.value[id];
      }
      if (key === "tagIds" && val != null) {
        const ids = Array.isArray(val) ? val : String(val).split(",").map(Number);
        const names = ids.map((id) => tagMap.value[id] || id).filter(Boolean);
        return names.join(", ");
      }
      if (key === "visibility") return visibilityLabelMap[String(val)] || String(val);
      if (key === "status") return statusLabelMap[String(val)] || String(val);
      if (key === "role") return roleLabelMap[String(val)] || String(val);
      if (typeof val === "object") return JSON.stringify(val);
      return String(val);
    }
    function getFieldLabel(key) {
      return fieldLabelMap[key] || key;
    }
    async function loadData() {
      var _a, _b;
      loading.value = true;
      try {
        const res = await getLogs(currentPage.value, pageSize.value, {
          username: filterUsername.value || void 0,
          action: filterAction.value || void 0,
          entity: filterEntity.value || void 0
        });
        logs.value = (_a = res.content) != null ? _a : [];
        total.value = (_b = res.totalElements) != null ? _b : 0;
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
    const resultIcon = { SUCCESS: "\u2713", FAIL: "\u2717" };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      const _component_el_select = ElSelect;
      const _component_el_option = ElOption;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_pagination = ElPagination;
      const _component_el_dialog = ElDialog;
      const _component_el_descriptions = ElDescriptions;
      const _component_el_descriptions_item = ElDescriptionsItem;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "flex": "1", "min-height": "0", "display": "flex", "flex-direction": "column" } }, _attrs))}><div class="page-header"><h2>\u64CD\u4F5C\u65E5\u5FD7</h2></div><div class="page-card" style="${ssrRenderStyle({ "flex": "1", "min-height": "0" })}"><div class="filter-bar" style="${ssrRenderStyle({ "display": "flex", "gap": "12px", "flex-wrap": "wrap", "align-items": "center" })}">`);
      _push(ssrRenderComponent(_component_el_input, {
        modelValue: filterUsername.value,
        "onUpdate:modelValue": ($event) => filterUsername.value = $event,
        placeholder: "\u7528\u6237\u540D",
        clearable: "",
        style: { "width": "140px" },
        onClear: onFilter,
        onKeyup: onFilter
      }, null, _parent));
      _push(ssrRenderComponent(_component_el_button, { onClick: onFilter }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u641C\u7D22`);
          } else {
            return [
              createTextVNode("\u641C\u7D22")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "12px", "align-items": "center", "margin-left": "auto" })}">`);
      _push(ssrRenderComponent(_component_el_select, {
        modelValue: filterAction.value,
        "onUpdate:modelValue": ($event) => filterAction.value = $event,
        placeholder: "\u64CD\u4F5C\u7C7B\u578B",
        clearable: "",
        style: { "width": "120px" },
        onChange: onFilter
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_option, {
              label: "\u767B\u5F55",
              value: "LOGIN"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_option, {
              label: "\u9000\u51FA",
              value: "LOGOUT"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_option, {
              label: "\u521B\u5EFA",
              value: "CREATE"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_option, {
              label: "\u4FEE\u6539",
              value: "UPDATE"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_option, {
              label: "\u5220\u9664",
              value: "DELETE"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_option, {
              label: "\u901A\u8FC7",
              value: "APPROVE"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_option, {
              label: "\u9A73\u56DE",
              value: "REJECT"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_option, {
                label: "\u767B\u5F55",
                value: "LOGIN"
              }),
              createVNode(_component_el_option, {
                label: "\u9000\u51FA",
                value: "LOGOUT"
              }),
              createVNode(_component_el_option, {
                label: "\u521B\u5EFA",
                value: "CREATE"
              }),
              createVNode(_component_el_option, {
                label: "\u4FEE\u6539",
                value: "UPDATE"
              }),
              createVNode(_component_el_option, {
                label: "\u5220\u9664",
                value: "DELETE"
              }),
              createVNode(_component_el_option, {
                label: "\u901A\u8FC7",
                value: "APPROVE"
              }),
              createVNode(_component_el_option, {
                label: "\u9A73\u56DE",
                value: "REJECT"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_select, {
        modelValue: filterEntity.value,
        "onUpdate:modelValue": ($event) => filterEntity.value = $event,
        placeholder: "\u64CD\u4F5C\u5BF9\u8C61",
        clearable: "",
        style: { "width": "140px" },
        onChange: onFilter
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(entityOptions), (e) => {
              _push2(ssrRenderComponent(_component_el_option, {
                key: e.value,
                label: e.label,
                value: e.value
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(entityOptions), (e) => {
                return openBlock(), createBlock(_component_el_option, {
                  key: e.value,
                  label: e.label,
                  value: e.value
                }, null, 8, ["label", "value"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="table-with-pagination">`);
      _push(ssrRenderComponent(_component_el_table, mergeProps({
        style: { "width": "100%" },
        data: logs.value,
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
              prop: "username",
              label: "\u7528\u6237\u540D",
              "min-width": "100",
              align: "center",
              "header-align": "center"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "\u64CD\u4F5C\u7C7B\u578B",
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
              label: "\u64CD\u4F5C\u5BF9\u8C61",
              "min-width": "100",
              align: "center",
              "header-align": "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(entityMap[row.entity] || row.entity)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(entityMap[row.entity] || row.entity), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "entityId",
              label: "\u5BF9\u8C61ID",
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
              label: "\u7ED3\u679C",
              width: "70",
              align: "center",
              "header-align": "center"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span style="${ssrRenderStyle(resultStyle[row.result] || "")}"${_scopeId2}>${ssrInterpolate(resultIcon[row.result] || "")} ${ssrInterpolate(row.result === "SUCCESS" ? "\u6210\u529F" : row.result === "FAIL" ? "\u5931\u8D25" : row.result)}</span>`);
                } else {
                  return [
                    createVNode("span", {
                      style: resultStyle[row.result] || ""
                    }, toDisplayString(resultIcon[row.result] || "") + " " + toDisplayString(row.result === "SUCCESS" ? "\u6210\u529F" : row.result === "FAIL" ? "\u5931\u8D25" : row.result), 5)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "createdAt",
              label: "\u65F6\u95F4",
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
              label: "\u64CD\u4F5C",
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
                        _push4(`\u8BE6\u60C5`);
                      } else {
                        return [
                          createTextVNode("\u8BE6\u60C5")
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
                        createTextVNode("\u8BE6\u60C5")
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
                label: "\u5E8F\u53F7",
                width: "55",
                align: "center",
                index: (i) => (currentPage.value - 1) * pageSize.value + i + 1
              }, null, 8, ["index"]),
              createVNode(_component_el_table_column, {
                prop: "username",
                label: "\u7528\u6237\u540D",
                "min-width": "100",
                align: "center",
                "header-align": "center"
              }),
              createVNode(_component_el_table_column, {
                label: "\u64CD\u4F5C\u7C7B\u578B",
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
                label: "\u64CD\u4F5C\u5BF9\u8C61",
                "min-width": "100",
                align: "center",
                "header-align": "center"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(entityMap[row.entity] || row.entity), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "entityId",
                label: "\u5BF9\u8C61ID",
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
                label: "\u7ED3\u679C",
                width: "70",
                align: "center",
                "header-align": "center"
              }, {
                default: withCtx(({ row }) => [
                  createVNode("span", {
                    style: resultStyle[row.result] || ""
                  }, toDisplayString(resultIcon[row.result] || "") + " " + toDisplayString(row.result === "SUCCESS" ? "\u6210\u529F" : row.result === "FAIL" ? "\u5931\u8D25" : row.result), 5)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "createdAt",
                label: "\u65F6\u95F4",
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
                label: "\u64CD\u4F5C",
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
                      createTextVNode("\u8BE6\u60C5")
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
        title: "\u65E5\u5FD7\u8BE6\u60C5",
        width: "700",
        "destroy-on-close": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (detailRow.value) {
              _push2(ssrRenderComponent(_component_el_descriptions, {
                column: 2,
                border: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u7528\u6237\u540D" }, {
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
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u64CD\u4F5C\u7C7B\u578B" }, {
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
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u64CD\u4F5C\u5BF9\u8C61" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(entityMap[detailRow.value.entity] || detailRow.value.entity)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(entityMap[detailRow.value.entity] || detailRow.value.entity), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u64CD\u4F5C\u5B9E\u4F53ID" }, {
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
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u7ED3\u679C" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span style="${ssrRenderStyle(resultStyle[detailRow.value.result] || "")}"${_scopeId3}>${ssrInterpolate(detailRow.value.result === "SUCCESS" ? "\u6210\u529F" : detailRow.value.result === "FAIL" ? "\u5931\u8D25" : detailRow.value.result)}</span>`);
                        } else {
                          return [
                            createVNode("span", {
                              style: resultStyle[detailRow.value.result] || ""
                            }, toDisplayString(detailRow.value.result === "SUCCESS" ? "\u6210\u529F" : detailRow.value.result === "FAIL" ? "\u5931\u8D25" : detailRow.value.result), 5)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "IP\u5730\u5740" }, {
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
                      label: "\u64CD\u4F5C\u63CF\u8FF0",
                      span: 2
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (detailRow.value.action === "UPDATE") {
                            _push4(`<!--[-->`);
                            if (updateDiff.value) {
                              _push4(`<div style="${ssrRenderStyle({ "font-size": "13px", "line-height": "1.8", "white-space": "pre-wrap" })}"${_scopeId3}><!--[-->`);
                              ssrRenderList(updateDiff.value, (c) => {
                                var _a, _b;
                                _push4(`<div style="${ssrRenderStyle({ "margin-bottom": "4px" })}"${_scopeId3}><strong${_scopeId3}>${ssrInterpolate(getFieldLabel(c.key))}\uFF1A</strong>`);
                                if (c.oldVal != null && c.newVal != null && (isDiffable(c.oldVal) || isDiffable(c.newVal)) && !unref(selectFields).has(c.key) && c.key !== "Logo URL") {
                                  _push4(`<!--[-->`);
                                  ssrRenderList(computeCharDiff(String((_a = c.oldVal) != null ? _a : ""), String((_b = c.newVal) != null ? _b : "")), (seg) => {
                                    _push4(`<!--[-->`);
                                    if (seg.type === "same") {
                                      _push4(`<span${_scopeId3}>${ssrInterpolate(seg.text)}</span>`);
                                    } else if (seg.type === "delete") {
                                      _push4(`<span style="${ssrRenderStyle({ "color": "#f56c6c", "text-decoration": "line-through" })}"${_scopeId3}>${ssrInterpolate(seg.text)}</span>`);
                                    } else {
                                      _push4(`<span style="${ssrRenderStyle({ "color": "#67c23a", "font-weight": "bold" })}"${_scopeId3}>${ssrInterpolate(seg.text)}</span>`);
                                    }
                                    _push4(`<!--]-->`);
                                  });
                                  _push4(`<!--]-->`);
                                } else {
                                  _push4(`<!--[--><span style="${ssrRenderStyle({ "color": "#f56c6c", "text-decoration": "line-through" })}"${_scopeId3}>${ssrInterpolate(formatDiffVal(c.oldVal, c.key))}</span><span style="${ssrRenderStyle({ "margin": "0 6px", "color": "#909399" })}"${_scopeId3}>\u2192</span><span style="${ssrRenderStyle({ "color": "#67c23a", "font-weight": "bold" })}"${_scopeId3}>${ssrInterpolate(formatDiffVal(c.newVal, c.key))}</span><!--]-->`);
                                }
                                _push4(`</div>`);
                              });
                              _push4(`<!--]--></div>`);
                            } else {
                              _push4(`<div style="${ssrRenderStyle({ "color": "#909399", "font-size": "13px" })}"${_scopeId3}>\u65E0\u5B57\u6BB5\u53D8\u66F4</div>`);
                            }
                            _push4(`<!--]-->`);
                          } else if (logDesc.value) {
                            _push4(`<!--[--><span${_scopeId3}>${ssrInterpolate(logDesc.value.prefix)}</span><span style="${ssrRenderStyle({ color: logDesc.value.nameColor, fontWeight: "bold" })}"${_scopeId3}>${ssrInterpolate(logDesc.value.name)}</span>`);
                            if (logDesc.value.suffixLabel) {
                              _push4(`<!--[-->${ssrInterpolate(logDesc.value.suffixLabel)}<span style="${ssrRenderStyle({ color: logDesc.value.suffixColor, fontWeight: "bold" })}"${_scopeId3}>${ssrInterpolate(logDesc.value.suffixValue)}</span><!--]-->`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`<span${_scopeId3}>${ssrInterpolate(logDesc.value.suffix)}</span><!--]-->`);
                          } else {
                            _push4(`<pre style="${ssrRenderStyle({ "background": "#f5f7fa", "padding": "10px 12px", "border-radius": "4px", "font-size": "13px", "white-space": "pre-wrap", "word-break": "break-all", "max-height": "200px", "overflow": "auto", "margin": "0" })}"${_scopeId3}>${ssrInterpolate(detailRow.value.details || "\u65E0")}</pre>`);
                          }
                        } else {
                          return [
                            detailRow.value.action === "UPDATE" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              updateDiff.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                style: { "font-size": "13px", "line-height": "1.8", "white-space": "pre-wrap" }
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(updateDiff.value, (c) => {
                                  var _a, _b;
                                  return openBlock(), createBlock("div", {
                                    key: c.key,
                                    style: { "margin-bottom": "4px" }
                                  }, [
                                    createVNode("strong", null, toDisplayString(getFieldLabel(c.key)) + "\uFF1A", 1),
                                    c.oldVal != null && c.newVal != null && (isDiffable(c.oldVal) || isDiffable(c.newVal)) && !unref(selectFields).has(c.key) && c.key !== "Logo URL" ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(computeCharDiff(String((_a = c.oldVal) != null ? _a : ""), String((_b = c.newVal) != null ? _b : "")), (seg) => {
                                      return openBlock(), createBlock(Fragment, {
                                        key: seg.type + seg.text
                                      }, [
                                        seg.type === "same" ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(seg.text), 1)) : seg.type === "delete" ? (openBlock(), createBlock("span", {
                                          key: 1,
                                          style: { "color": "#f56c6c", "text-decoration": "line-through" }
                                        }, toDisplayString(seg.text), 1)) : (openBlock(), createBlock("span", {
                                          key: 2,
                                          style: { "color": "#67c23a", "font-weight": "bold" }
                                        }, toDisplayString(seg.text), 1))
                                      ], 64);
                                    }), 128)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                      createVNode("span", { style: { "color": "#f56c6c", "text-decoration": "line-through" } }, toDisplayString(formatDiffVal(c.oldVal, c.key)), 1),
                                      createVNode("span", { style: { "margin": "0 6px", "color": "#909399" } }, "\u2192"),
                                      createVNode("span", { style: { "color": "#67c23a", "font-weight": "bold" } }, toDisplayString(formatDiffVal(c.newVal, c.key)), 1)
                                    ], 64))
                                  ]);
                                }), 128))
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                style: { "color": "#909399", "font-size": "13px" }
                              }, "\u65E0\u5B57\u6BB5\u53D8\u66F4"))
                            ], 64)) : logDesc.value ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createVNode("span", null, toDisplayString(logDesc.value.prefix), 1),
                              createVNode("span", {
                                style: { color: logDesc.value.nameColor, fontWeight: "bold" }
                              }, toDisplayString(logDesc.value.name), 5),
                              logDesc.value.suffixLabel ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createTextVNode(toDisplayString(logDesc.value.suffixLabel), 1),
                                createVNode("span", {
                                  style: { color: logDesc.value.suffixColor, fontWeight: "bold" }
                                }, toDisplayString(logDesc.value.suffixValue), 5)
                              ], 64)) : createCommentVNode("", true),
                              createVNode("span", null, toDisplayString(logDesc.value.suffix), 1)
                            ], 64)) : (openBlock(), createBlock("pre", {
                              key: 2,
                              style: { "background": "#f5f7fa", "padding": "10px 12px", "border-radius": "4px", "font-size": "13px", "white-space": "pre-wrap", "word-break": "break-all", "max-height": "200px", "overflow": "auto", "margin": "0" }
                            }, toDisplayString(detailRow.value.details || "\u65E0"), 1))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(` `);
                    _push3(ssrRenderComponent(_component_el_descriptions_item, { label: "\u65F6\u95F4" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate((detailRow.value.createdAt || "").replace("T", " ").slice(0, 16))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString((detailRow.value.createdAt || "").replace("T", " ").slice(0, 16)), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_descriptions_item, {
                      label: "\u8BF7\u6C42\u8DEF\u5F84",
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
                      createVNode(_component_el_descriptions_item, { label: "\u7528\u6237\u540D" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(detailRow.value.username), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "\u64CD\u4F5C\u7C7B\u578B" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(actionMap[detailRow.value.action] || detailRow.value.action), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "\u64CD\u4F5C\u5BF9\u8C61" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(entityMap[detailRow.value.entity] || detailRow.value.entity), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "\u64CD\u4F5C\u5B9E\u4F53ID" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(detailRow.value.entityId), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "\u7ED3\u679C" }, {
                        default: withCtx(() => [
                          createVNode("span", {
                            style: resultStyle[detailRow.value.result] || ""
                          }, toDisplayString(detailRow.value.result === "SUCCESS" ? "\u6210\u529F" : detailRow.value.result === "FAIL" ? "\u5931\u8D25" : detailRow.value.result), 5)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, { label: "IP\u5730\u5740" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(detailRow.value.clientIp), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, {
                        label: "\u64CD\u4F5C\u63CF\u8FF0",
                        span: 2
                      }, {
                        default: withCtx(() => [
                          detailRow.value.action === "UPDATE" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            updateDiff.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              style: { "font-size": "13px", "line-height": "1.8", "white-space": "pre-wrap" }
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(updateDiff.value, (c) => {
                                var _a, _b;
                                return openBlock(), createBlock("div", {
                                  key: c.key,
                                  style: { "margin-bottom": "4px" }
                                }, [
                                  createVNode("strong", null, toDisplayString(getFieldLabel(c.key)) + "\uFF1A", 1),
                                  c.oldVal != null && c.newVal != null && (isDiffable(c.oldVal) || isDiffable(c.newVal)) && !unref(selectFields).has(c.key) && c.key !== "Logo URL" ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(computeCharDiff(String((_a = c.oldVal) != null ? _a : ""), String((_b = c.newVal) != null ? _b : "")), (seg) => {
                                    return openBlock(), createBlock(Fragment, {
                                      key: seg.type + seg.text
                                    }, [
                                      seg.type === "same" ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(seg.text), 1)) : seg.type === "delete" ? (openBlock(), createBlock("span", {
                                        key: 1,
                                        style: { "color": "#f56c6c", "text-decoration": "line-through" }
                                      }, toDisplayString(seg.text), 1)) : (openBlock(), createBlock("span", {
                                        key: 2,
                                        style: { "color": "#67c23a", "font-weight": "bold" }
                                      }, toDisplayString(seg.text), 1))
                                    ], 64);
                                  }), 128)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                    createVNode("span", { style: { "color": "#f56c6c", "text-decoration": "line-through" } }, toDisplayString(formatDiffVal(c.oldVal, c.key)), 1),
                                    createVNode("span", { style: { "margin": "0 6px", "color": "#909399" } }, "\u2192"),
                                    createVNode("span", { style: { "color": "#67c23a", "font-weight": "bold" } }, toDisplayString(formatDiffVal(c.newVal, c.key)), 1)
                                  ], 64))
                                ]);
                              }), 128))
                            ])) : (openBlock(), createBlock("div", {
                              key: 1,
                              style: { "color": "#909399", "font-size": "13px" }
                            }, "\u65E0\u5B57\u6BB5\u53D8\u66F4"))
                          ], 64)) : logDesc.value ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createVNode("span", null, toDisplayString(logDesc.value.prefix), 1),
                            createVNode("span", {
                              style: { color: logDesc.value.nameColor, fontWeight: "bold" }
                            }, toDisplayString(logDesc.value.name), 5),
                            logDesc.value.suffixLabel ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              createTextVNode(toDisplayString(logDesc.value.suffixLabel), 1),
                              createVNode("span", {
                                style: { color: logDesc.value.suffixColor, fontWeight: "bold" }
                              }, toDisplayString(logDesc.value.suffixValue), 5)
                            ], 64)) : createCommentVNode("", true),
                            createVNode("span", null, toDisplayString(logDesc.value.suffix), 1)
                          ], 64)) : (openBlock(), createBlock("pre", {
                            key: 2,
                            style: { "background": "#f5f7fa", "padding": "10px 12px", "border-radius": "4px", "font-size": "13px", "white-space": "pre-wrap", "word-break": "break-all", "max-height": "200px", "overflow": "auto", "margin": "0" }
                          }, toDisplayString(detailRow.value.details || "\u65E0"), 1))
                        ]),
                        _: 1
                      }),
                      createTextVNode(),
                      createVNode(_component_el_descriptions_item, { label: "\u65F6\u95F4" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString((detailRow.value.createdAt || "").replace("T", " ").slice(0, 16)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_descriptions_item, {
                        label: "\u8BF7\u6C42\u8DEF\u5F84",
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
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              detailRow.value ? (openBlock(), createBlock(_component_el_descriptions, {
                key: 0,
                column: 2,
                border: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_descriptions_item, { label: "\u7528\u6237\u540D" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(detailRow.value.username), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_descriptions_item, { label: "\u64CD\u4F5C\u7C7B\u578B" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(actionMap[detailRow.value.action] || detailRow.value.action), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_descriptions_item, { label: "\u64CD\u4F5C\u5BF9\u8C61" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(entityMap[detailRow.value.entity] || detailRow.value.entity), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_descriptions_item, { label: "\u64CD\u4F5C\u5B9E\u4F53ID" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(detailRow.value.entityId), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_descriptions_item, { label: "\u7ED3\u679C" }, {
                    default: withCtx(() => [
                      createVNode("span", {
                        style: resultStyle[detailRow.value.result] || ""
                      }, toDisplayString(detailRow.value.result === "SUCCESS" ? "\u6210\u529F" : detailRow.value.result === "FAIL" ? "\u5931\u8D25" : detailRow.value.result), 5)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_descriptions_item, { label: "IP\u5730\u5740" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(detailRow.value.clientIp), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_descriptions_item, {
                    label: "\u64CD\u4F5C\u63CF\u8FF0",
                    span: 2
                  }, {
                    default: withCtx(() => [
                      detailRow.value.action === "UPDATE" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        updateDiff.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          style: { "font-size": "13px", "line-height": "1.8", "white-space": "pre-wrap" }
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(updateDiff.value, (c) => {
                            var _a, _b;
                            return openBlock(), createBlock("div", {
                              key: c.key,
                              style: { "margin-bottom": "4px" }
                            }, [
                              createVNode("strong", null, toDisplayString(getFieldLabel(c.key)) + "\uFF1A", 1),
                              c.oldVal != null && c.newVal != null && (isDiffable(c.oldVal) || isDiffable(c.newVal)) && !unref(selectFields).has(c.key) && c.key !== "Logo URL" ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(computeCharDiff(String((_a = c.oldVal) != null ? _a : ""), String((_b = c.newVal) != null ? _b : "")), (seg) => {
                                return openBlock(), createBlock(Fragment, {
                                  key: seg.type + seg.text
                                }, [
                                  seg.type === "same" ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(seg.text), 1)) : seg.type === "delete" ? (openBlock(), createBlock("span", {
                                    key: 1,
                                    style: { "color": "#f56c6c", "text-decoration": "line-through" }
                                  }, toDisplayString(seg.text), 1)) : (openBlock(), createBlock("span", {
                                    key: 2,
                                    style: { "color": "#67c23a", "font-weight": "bold" }
                                  }, toDisplayString(seg.text), 1))
                                ], 64);
                              }), 128)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createVNode("span", { style: { "color": "#f56c6c", "text-decoration": "line-through" } }, toDisplayString(formatDiffVal(c.oldVal, c.key)), 1),
                                createVNode("span", { style: { "margin": "0 6px", "color": "#909399" } }, "\u2192"),
                                createVNode("span", { style: { "color": "#67c23a", "font-weight": "bold" } }, toDisplayString(formatDiffVal(c.newVal, c.key)), 1)
                              ], 64))
                            ]);
                          }), 128))
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          style: { "color": "#909399", "font-size": "13px" }
                        }, "\u65E0\u5B57\u6BB5\u53D8\u66F4"))
                      ], 64)) : logDesc.value ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                        createVNode("span", null, toDisplayString(logDesc.value.prefix), 1),
                        createVNode("span", {
                          style: { color: logDesc.value.nameColor, fontWeight: "bold" }
                        }, toDisplayString(logDesc.value.name), 5),
                        logDesc.value.suffixLabel ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createTextVNode(toDisplayString(logDesc.value.suffixLabel), 1),
                          createVNode("span", {
                            style: { color: logDesc.value.suffixColor, fontWeight: "bold" }
                          }, toDisplayString(logDesc.value.suffixValue), 5)
                        ], 64)) : createCommentVNode("", true),
                        createVNode("span", null, toDisplayString(logDesc.value.suffix), 1)
                      ], 64)) : (openBlock(), createBlock("pre", {
                        key: 2,
                        style: { "background": "#f5f7fa", "padding": "10px 12px", "border-radius": "4px", "font-size": "13px", "white-space": "pre-wrap", "word-break": "break-all", "max-height": "200px", "overflow": "auto", "margin": "0" }
                      }, toDisplayString(detailRow.value.details || "\u65E0"), 1))
                    ]),
                    _: 1
                  }),
                  createTextVNode(),
                  createVNode(_component_el_descriptions_item, { label: "\u65F6\u95F4" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString((detailRow.value.createdAt || "").replace("T", " ").slice(0, 16)), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_descriptions_item, {
                    label: "\u8BF7\u6C42\u8DEF\u5F84",
                    span: 2
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(detailRow.value.path), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true)
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
//# sourceMappingURL=logs-3uLdmXSJ.mjs.map
