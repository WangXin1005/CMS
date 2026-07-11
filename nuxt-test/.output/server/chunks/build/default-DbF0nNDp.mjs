import { a as ElIcon, W as arrow_down_default, a6 as home_filled_default, o as document_default, a7 as folder_default, a8 as price_tag_default, a9 as chat_dot_round_default, aa as picture_default, h as user_default, ab as setting_default, ac as list_default, ad as view_default, f as withNoopInstall, w as withInstall, E as ElMessage, c as buildProps, i as iconPropType, L as componentSizes, d as definePropType, Q as EVENT_CODE, ae as composeEventHandlers, n as useLocale, b as addUnit, C as arrow_right_default, af as more_default, m as mutable, ag as focusElement, P as getEventCode, ah as whenMouse, R as addClass, X as hasClass, S as removeClass } from './request-BS6DhAWT.mjs';
import { _ as _export_sfc, d as useRoute, j as isNumber, h as useId, g as useNamespace, t as throwError, l as isUndefined } from './server.mjs';
import { mergeProps, defineComponent, computed, ref, withCtx, unref, createTextVNode, toDisplayString, createVNode, withModifiers, openBlock, createBlock, createCommentVNode, inject, provide, toRef, readonly, watch, getCurrentInstance, reactive, h, Fragment, withDirectives, vShow, watchEffect, useSSRContext, isVNode, cloneVNode, createElementBlock, normalizeStyle, normalizeClass, resolveDynamicComponent, renderSlot, Transition, toHandlers, useSlots, nextTick, createElementVNode, resolveComponent, normalizeProps, guardReactiveProps, createSlots } from 'vue';
import { u as useTooltipContentProps, r as roleTypes, a as useTooltipTriggerProps, O as OnlyChild, E as ElTooltip, _ as _plugin_vue_export_helper_default } from './el-popper-DfkNFIQu.mjs';
import { castArray, isNil } from 'lodash-unified';
import { E as ElButton, b as useFormSize } from './el-button-D6yHhR7A.mjs';
import { E as ElScrollbar } from './el-scrollbar-fZbsEcs-.mjs';
import { useEventListener, useResizeObserver, useTimeoutFn, unrefElement } from '@vueuse/core';
import { E as ElDialog, c as composeRefs } from './el-dialog-CchEyLT0.mjs';
import { isString, isObject, isArray } from '@vue/shared';
import { f as flattedChildren, C as ClickOutside } from './index-BtbUlw1r.mjs';
import { placements } from '@popperjs/core';
import { E as ElForm, a as ElFormItem } from './el-form-item-GVjPUIjF.mjs';
import { E as ElInput } from './el-input-mx3aTNK2.mjs';
import { E as ElTag } from './index-BeMPG4FX.mjs';
import { E as ElDivider } from './el-divider-Q3VSkgAk.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-BPTRPnVU.mjs';
import { TinyColor } from '@ctrl/tinycolor';
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
import './el-overlay-DzvV49jr.mjs';
import 'async-validator';
import './cookie-BrXVhyN0.mjs';

const avatarProps = buildProps({
  /**
  * @description avatar size.
  */
  size: {
    type: [Number, String],
    values: componentSizes,
    validator: (val) => isNumber(val)
  },
  /**
  * @description avatar shape.
  */
  shape: {
    type: String,
    values: ["circle", "square"]
  },
  /**
  * @description representation type to icon, more info on icon component.
  */
  icon: { type: iconPropType },
  /**
  * @description the source of the image for an image avatar.
  */
  src: {
    type: String,
    default: ""
  },
  /**
  * @description native attribute `alt` of image avatar.
  */
  alt: String,
  /**
  * @description native attribute srcset of image avatar.
  */
  srcSet: String,
  /**
  * @description set how the image fit its container for an image avatar.
  */
  fit: {
    type: definePropType(String),
    default: "cover"
  }
});
const avatarEmits = { error: (evt) => evt instanceof Event };
const avatarGroupContextKey = /* @__PURE__ */ Symbol("avatarGroupContextKey");
const avatarGroupProps = {
  /**
  * @description control the size of avatars in this avatar-group
  */
  size: {
    type: definePropType([Number, String]),
    values: componentSizes,
    validator: (val) => isNumber(val)
  },
  /**
  * @description control the shape of avatars in this avatar-group
  */
  shape: {
    type: definePropType(String),
    values: ["circle", "square"]
  },
  /**
  * @description whether to collapse avatars
  */
  collapseAvatars: Boolean,
  /**
  * @description whether show all collapsed avatars when mouse hover text of the collapse-avatar. To use this, `collapse-avatars` must be true
  */
  collapseAvatarsTooltip: Boolean,
  /**
  * @description the max avatars number to be shown. To use this, `collapse-avatars` must be true
  */
  maxCollapseAvatars: {
    type: Number,
    default: 1
  },
  /**
  * @description tooltip theme, built-in theme: `dark` / `light`
  */
  effect: {
    type: definePropType(String),
    default: "light"
  },
  /**
  * @description placement of tooltip
  */
  placement: {
    type: definePropType(String),
    values: placements,
    default: "top"
  },
  /**
  * @description custom class name for tooltip
  */
  popperClass: useTooltipContentProps.popperClass,
  /**
  * @description custom style for tooltip
  */
  popperStyle: useTooltipContentProps.popperStyle,
  /**
  * @description custom class name for the collapse-avatar
  */
  collapseClass: String,
  /**
  * @description custom style for the collapse-avatar
  */
  collapseStyle: {
    type: definePropType([
      String,
      Array,
      Object,
      Boolean
    ]),
    default: void 0
  }
};
const _hoisted_1$2 = [
  "src",
  "alt",
  "srcset"
];
var avatar_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElAvatar",
  __name: "avatar",
  props: avatarProps,
  emits: avatarEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const avatarGroupContext = inject(avatarGroupContextKey, void 0);
    const ns = useNamespace("avatar");
    const hasLoadError = ref(false);
    const size = computed(() => props.size ?? avatarGroupContext?.size);
    const shape = computed(() => props.shape ?? avatarGroupContext?.shape ?? "circle");
    const avatarClass = computed(() => {
      const { icon } = props;
      const classList = [ns.b()];
      if (isString(size.value)) classList.push(ns.m(size.value));
      if (icon) classList.push(ns.m("icon"));
      if (shape.value) classList.push(ns.m(shape.value));
      return classList;
    });
    const sizeStyle = computed(() => {
      return isNumber(size.value) ? ns.cssVarBlock({ size: addUnit(size.value) }) : void 0;
    });
    const fitStyle = computed(() => ({ objectFit: props.fit }));
    watch(() => [props.src, props.srcSet], () => hasLoadError.value = false);
    function handleError(e) {
      hasLoadError.value = true;
      emit("error", e);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", {
        class: normalizeClass(avatarClass.value),
        style: normalizeStyle(sizeStyle.value)
      }, [(__props.src || __props.srcSet) && !hasLoadError.value ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: __props.src,
        alt: __props.alt,
        srcset: __props.srcSet,
        style: normalizeStyle(fitStyle.value),
        onError: handleError
      }, null, 44, _hoisted_1$2)) : __props.icon ? (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
        default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.icon)))]),
        _: 1
      })) : renderSlot(_ctx.$slots, "default", { key: 2 })], 6);
    };
  }
});
var avatar_default = avatar_vue_vue_type_script_setup_true_lang_default;
var avatar_group_default = /* @__PURE__ */ defineComponent({
  name: "ElAvatarGroup",
  props: avatarGroupProps,
  setup(props, { slots }) {
    const ns = useNamespace("avatar-group");
    provide(avatarGroupContextKey, reactive({
      size: toRef(props, "size"),
      shape: toRef(props, "shape")
    }));
    return () => {
      const avatars = flattedChildren(slots.default?.() ?? []);
      let visibleAvatars = avatars;
      if (props.collapseAvatars && avatars.length > props.maxCollapseAvatars) {
        visibleAvatars = avatars.slice(0, props.maxCollapseAvatars);
        const hiddenAvatars = avatars.slice(props.maxCollapseAvatars);
        visibleAvatars.push(createVNode(ElTooltip, {
          "popperClass": props.popperClass,
          "popperStyle": props.popperStyle,
          "placement": props.placement,
          "effect": props.effect,
          "disabled": !props.collapseAvatarsTooltip
        }, {
          default: () => createVNode(avatar_default, {
            "size": props.size,
            "shape": props.shape,
            "class": props.collapseClass,
            "style": props.collapseStyle
          }, { default: () => [createTextVNode("+ "), hiddenAvatars.length] }),
          content: () => createVNode("div", { "class": ns.e("collapse-avatars") }, [hiddenAvatars.map((node, idx) => isVNode(node) ? cloneVNode(node, { key: node.key ?? idx }) : node)])
        }));
      }
      return createVNode("div", { "class": ns.b() }, [visibleAvatars]);
    };
  }
});
const ElAvatar = withInstall(avatar_default, { AvatarGroup: avatar_group_default });
withNoopInstall(avatar_group_default);
var collapse_transition_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElCollapseTransition",
  __name: "collapse-transition",
  setup(__props) {
    const ns = useNamespace("collapse-transition");
    const reset = (el) => {
      el.style.maxHeight = "";
      el.style.overflow = el.dataset.oldOverflow;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    };
    const on = {
      beforeEnter(el) {
        if (!el.dataset) el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        if (el.style.height) el.dataset.elExistsHeight = el.style.height;
        el.style.maxHeight = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      },
      enter(el) {
        requestAnimationFrame(() => {
          el.dataset.oldOverflow = el.style.overflow;
          if (el.dataset.elExistsHeight) el.style.maxHeight = el.dataset.elExistsHeight;
          else if (el.scrollHeight !== 0) el.style.maxHeight = `${el.scrollHeight}px`;
          else el.style.maxHeight = 0;
          el.style.paddingTop = el.dataset.oldPaddingTop;
          el.style.paddingBottom = el.dataset.oldPaddingBottom;
          el.style.overflow = "hidden";
        });
      },
      afterEnter(el) {
        el.style.maxHeight = "";
        el.style.overflow = el.dataset.oldOverflow;
      },
      enterCancelled(el) {
        reset(el);
      },
      beforeLeave(el) {
        if (!el.dataset) el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.dataset.oldOverflow = el.style.overflow;
        el.style.maxHeight = `${el.scrollHeight}px`;
        el.style.overflow = "hidden";
      },
      leave(el) {
        if (el.scrollHeight !== 0) {
          el.style.maxHeight = 0;
          el.style.paddingTop = 0;
          el.style.paddingBottom = 0;
        }
      },
      afterLeave(el) {
        reset(el);
      },
      leaveCancelled(el) {
        reset(el);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, mergeProps({ name: unref(ns).b() }, toHandlers(on)), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["name"]);
    };
  }
});
var collapse_transition_default = collapse_transition_vue_vue_type_script_setup_true_lang_default;
const ElCollapseTransition = withInstall(collapse_transition_default);
var container_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElContainer",
  __name: "container",
  props: { direction: {
    type: String,
    required: false
  } },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const ns = useNamespace("container");
    const isVertical = computed(() => {
      if (props.direction === "vertical") return true;
      else if (props.direction === "horizontal") return false;
      if (slots && slots.default) return slots.default().some((vNode) => {
        const tag = vNode.type.name;
        return tag === "ElHeader" || tag === "ElFooter";
      });
      else return false;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", { class: normalizeClass([unref(ns).b(), unref(ns).is("vertical", isVertical.value)]) }, [renderSlot(_ctx.$slots, "default")], 2);
    };
  }
});
var container_default = container_vue_vue_type_script_setup_true_lang_default;
var aside_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElAside",
  __name: "aside",
  props: { width: {
    type: [String, null],
    required: false,
    default: null
  } },
  setup(__props) {
    const props = __props;
    const ns = useNamespace("aside");
    const style = computed(() => props.width ? ns.cssVarBlock({ width: props.width }) : {});
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("aside", {
        class: normalizeClass(unref(ns).b()),
        style: normalizeStyle(style.value)
      }, [renderSlot(_ctx.$slots, "default")], 6);
    };
  }
});
var aside_default = aside_vue_vue_type_script_setup_true_lang_default;
var footer_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElFooter",
  __name: "footer",
  props: { height: {
    type: [String, null],
    required: false,
    default: null
  } },
  setup(__props) {
    const props = __props;
    const ns = useNamespace("footer");
    const style = computed(() => props.height ? ns.cssVarBlock({ height: props.height }) : {});
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("footer", {
        class: normalizeClass(unref(ns).b()),
        style: normalizeStyle(style.value)
      }, [renderSlot(_ctx.$slots, "default")], 6);
    };
  }
});
var footer_default = footer_vue_vue_type_script_setup_true_lang_default;
var header_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElHeader",
  __name: "header",
  props: { height: {
    type: [String, null],
    required: false,
    default: null
  } },
  setup(__props) {
    const props = __props;
    const ns = useNamespace("header");
    const style = computed(() => {
      return props.height ? ns.cssVarBlock({ height: props.height }) : {};
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("header", {
        class: normalizeClass(unref(ns).b()),
        style: normalizeStyle(style.value)
      }, [renderSlot(_ctx.$slots, "default")], 6);
    };
  }
});
var header_default = header_vue_vue_type_script_setup_true_lang_default;
var main_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElMain",
  __name: "main",
  setup(__props) {
    const ns = useNamespace("main");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("main", { class: normalizeClass(unref(ns).b()) }, [renderSlot(_ctx.$slots, "default")], 2);
    };
  }
});
var main_default = main_vue_vue_type_script_setup_true_lang_default;
withInstall(container_default, {
  Aside: aside_default,
  Footer: footer_default,
  Header: header_default,
  Main: main_default
});
withNoopInstall(aside_default);
withNoopInstall(footer_default);
const ElHeader = withNoopInstall(header_default);
withNoopInstall(main_default);
const dropdownProps = buildProps({
  /**
  * @description how to trigger
  */
  trigger: {
    ...useTooltipTriggerProps.trigger,
    type: definePropType([String, Array])
  },
  triggerKeys: {
    type: definePropType(Array),
    default: () => [
      EVENT_CODE.enter,
      EVENT_CODE.numpadEnter,
      EVENT_CODE.space,
      EVENT_CODE.down
    ]
  },
  /**
  * @description Indicates whether virtual triggering is enabled
  */
  virtualTriggering: useTooltipTriggerProps.virtualTriggering,
  /**
  * @description Indicates the reference element to which the dropdown is attached
  */
  virtualRef: useTooltipTriggerProps.virtualRef,
  /**
  * @description Tooltip theme, built-in theme: `dark` / `light`
  */
  effect: {
    ...useTooltipContentProps.effect,
    default: "light"
  },
  /**
  * @description menu button type, refer to `Button` Component, only works when `split-button` is true
  */
  type: { type: definePropType(String) },
  /**
  * @description placement of pop menu
  */
  placement: {
    type: definePropType(String),
    default: "bottom"
  },
  /**
  * @description [popper.js](https://popper.js.org/docs/v2/) parameters
  */
  popperOptions: {
    type: definePropType(Object),
    default: () => ({})
  },
  id: String,
  /**
  * @description menu size, also works on the split button
  */
  size: {
    type: String,
    default: ""
  },
  /**
  * @description whether a button group is displayed
  */
  splitButton: Boolean,
  /**
  * @description whether to hide menu after clicking menu-item
  */
  hideOnClick: {
    type: Boolean,
    default: true
  },
  loop: {
    type: Boolean,
    default: true
  },
  /**
  * @description whether the tooltip content has an arrow
  */
  showArrow: {
    type: Boolean,
    default: true
  },
  /**
  * @description delay time before show a dropdown (only works when trigger is `hover`)
  */
  showTimeout: {
    type: Number,
    default: 150
  },
  /**
  * @description delay time before hide a dropdown (only works when trigger is `hover`)
  */
  hideTimeout: {
    type: Number,
    default: 150
  },
  /**
  * @description [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of Dropdown
  */
  tabindex: {
    type: definePropType([Number, String]),
    default: 0
  },
  /**
  * @description the max height of menu
  */
  maxHeight: {
    type: definePropType([Number, String]),
    default: ""
  },
  /**
  * @description custom class name for Dropdown's dropdown
  */
  popperClass: useTooltipContentProps.popperClass,
  /**
  * @description custom style for Dropdown's dropdown
  */
  popperStyle: useTooltipContentProps.popperStyle,
  /**
  * @description whether to disable
  */
  disabled: Boolean,
  /**
  * @description the ARIA role attribute for the dropdown menu. Depending on the use case, you may want to change this to 'navigation'
  */
  role: {
    type: String,
    values: roleTypes,
    default: "menu"
  },
  buttonProps: { type: definePropType(Object) },
  /**
  * @description whether the dropdown popup is teleported to the body
  */
  teleported: useTooltipContentProps.teleported,
  /**
  * @description which element the dropdown CONTENT appends to
  */
  appendTo: useTooltipContentProps.appendTo,
  /**
  * @description when dropdown inactive and `persistent` is `false` , dropdown menu will be destroyed
  */
  persistent: {
    type: Boolean,
    default: true
  }
});
const dropdownItemProps = buildProps({
  /**
  * @description a command to be dispatched to Dropdown's `command` callback
  */
  command: {
    type: [
      Object,
      String,
      Number
    ],
    default: () => ({})
  },
  /**
  * @description whether the item is disabled
  */
  disabled: Boolean,
  /**
  * @description whether a divider is displayed
  */
  divided: Boolean,
  textValue: String,
  /**
  * @description custom icon
  */
  icon: { type: iconPropType }
});
const dropdownMenuProps = buildProps({ onKeydown: { type: definePropType(Function) } });
const DROPDOWN_INJECTION_KEY = /* @__PURE__ */ Symbol("elDropdown");
const DROPDOWN_INSTANCE_INJECTION_KEY = "elDropdown";
var collection_vue_vue_type_script_lang_default = defineComponent({ inheritAttrs: false });
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}
var collection_default = /* @__PURE__ */ _plugin_vue_export_helper_default(collection_vue_vue_type_script_lang_default, [["render", _sfc_render$8]]);
var collection_item_vue_vue_type_script_lang_default = defineComponent({
  name: "ElCollectionItem",
  inheritAttrs: false
});
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}
var collection_item_default = /* @__PURE__ */ _plugin_vue_export_helper_default(collection_item_vue_vue_type_script_lang_default, [["render", _sfc_render$7]]);
const COLLECTION_ITEM_SIGN = `data-el-collection-item`;
const createCollectionWithScope = (name) => {
  const COLLECTION_NAME = `El${name}Collection`;
  const COLLECTION_ITEM_NAME = `${COLLECTION_NAME}Item`;
  const COLLECTION_INJECTION_KEY2 = Symbol(COLLECTION_NAME);
  const COLLECTION_ITEM_INJECTION_KEY2 = Symbol(COLLECTION_ITEM_NAME);
  return {
    COLLECTION_INJECTION_KEY: COLLECTION_INJECTION_KEY2,
    COLLECTION_ITEM_INJECTION_KEY: COLLECTION_ITEM_INJECTION_KEY2,
    ElCollection: Object.assign({}, collection_default, {
      name: COLLECTION_NAME,
      setup() {
        const collectionRef = ref();
        const itemMap = /* @__PURE__ */ new Map();
        const getItems = (() => {
          const collectionEl = unref(collectionRef);
          if (!collectionEl) return [];
          const orderedNodes = Array.from(collectionEl.querySelectorAll(`[${COLLECTION_ITEM_SIGN}]`));
          return [...itemMap.values()].sort((a, b) => orderedNodes.indexOf(a.ref) - orderedNodes.indexOf(b.ref));
        });
        provide(COLLECTION_INJECTION_KEY2, {
          itemMap,
          getItems,
          collectionRef
        });
      }
    }),
    ElCollectionItem: Object.assign({}, collection_item_default, {
      name: COLLECTION_ITEM_NAME,
      setup(_, { attrs }) {
        const collectionItemRef = ref();
        inject(COLLECTION_INJECTION_KEY2, void 0);
        provide(COLLECTION_ITEM_INJECTION_KEY2, { collectionItemRef });
      }
    })
  };
};
const rovingFocusGroupProps = buildProps({
  style: {
    type: definePropType([
      String,
      Array,
      Object,
      Boolean
    ]),
    default: void 0
  },
  currentTabId: { type: definePropType(String) },
  defaultCurrentTabId: String,
  loop: Boolean,
  dir: {
    type: String,
    values: ["ltr", "rtl"],
    default: "ltr"
  },
  orientation: { type: definePropType(String) },
  onBlur: Function,
  onFocus: Function,
  onMousedown: Function
});
const { ElCollection, ElCollectionItem, COLLECTION_INJECTION_KEY, COLLECTION_ITEM_INJECTION_KEY } = createCollectionWithScope("RovingFocusGroup");
const ROVING_FOCUS_GROUP_INJECTION_KEY = /* @__PURE__ */ Symbol("elRovingFocusGroup");
const ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY = /* @__PURE__ */ Symbol("elRovingFocusGroupItem");
const MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
const getDirectionAwareKey = (key, dir) => {
  return key;
};
const getFocusIntent = (event, orientation, dir) => {
  const key = getDirectionAwareKey(getEventCode(event));
  return MAP_KEY_TO_FOCUS_INTENT[key];
};
const reorderArray = (array, atIdx) => {
  return array.map((_, idx) => array[(idx + atIdx) % array.length]);
};
const focusFirst = (elements) => {
  const { activeElement: prevActive } = void 0;
  for (const element of elements) {
    if (element === prevActive) return;
    element.focus();
    if (prevActive !== (void 0).activeElement) return;
  }
};
const CURRENT_TAB_ID_CHANGE_EVT = "currentTabIdChange";
const ENTRY_FOCUS_EVT = "rovingFocusGroup.entryFocus";
const EVT_OPTS = {
  bubbles: false,
  cancelable: true
};
var roving_focus_group_impl_vue_vue_type_script_lang_default = defineComponent({
  name: "ElRovingFocusGroupImpl",
  inheritAttrs: false,
  props: rovingFocusGroupProps,
  emits: [CURRENT_TAB_ID_CHANGE_EVT, "entryFocus"],
  setup(props, { emit }) {
    const currentTabbedId = ref((props.currentTabId || props.defaultCurrentTabId) ?? null);
    const isBackingOut = ref(false);
    const isClickFocus = ref(false);
    const rovingFocusGroupRef = ref();
    const { getItems } = inject(COLLECTION_INJECTION_KEY, void 0);
    const rovingFocusGroupRootStyle = computed(() => {
      return [{ outline: "none" }, props.style];
    });
    const onItemFocus = (tabbedId) => {
      emit(CURRENT_TAB_ID_CHANGE_EVT, tabbedId);
    };
    const onItemShiftTab = () => {
      isBackingOut.value = true;
    };
    const onMousedown = composeEventHandlers((e) => {
      props.onMousedown?.(e);
    }, () => {
      isClickFocus.value = true;
    });
    const onFocus = composeEventHandlers((e) => {
      props.onFocus?.(e);
    }, (e) => {
      const isKeyboardFocus = !unref(isClickFocus);
      const { target, currentTarget } = e;
      if (target === currentTarget && isKeyboardFocus && !unref(isBackingOut)) {
        const entryFocusEvt = new Event(ENTRY_FOCUS_EVT, EVT_OPTS);
        currentTarget?.dispatchEvent(entryFocusEvt);
        if (!entryFocusEvt.defaultPrevented) {
          const items = getItems().filter((item) => item.focusable);
          focusFirst([
            items.find((item) => item.active),
            items.find((item) => item.id === unref(currentTabbedId)),
            ...items
          ].filter(Boolean).map((item) => item.ref));
        }
      }
      isClickFocus.value = false;
    });
    const onBlur = composeEventHandlers((e) => {
      props.onBlur?.(e);
    }, () => {
      isBackingOut.value = false;
    });
    const handleEntryFocus = (...args) => {
      emit("entryFocus", ...args);
    };
    const onKeydown = (e) => {
      const focusIntent = getFocusIntent(e);
      if (focusIntent) {
        e.preventDefault();
        let elements = getItems().filter((item) => item.focusable).map((item) => item.ref);
        switch (focusIntent) {
          case "last":
            elements.reverse();
            break;
          case "prev":
          case "next": {
            if (focusIntent === "prev") elements.reverse();
            const currentIdx = elements.indexOf(e.currentTarget);
            elements = props.loop ? reorderArray(elements, currentIdx + 1) : elements.slice(currentIdx + 1);
            break;
          }
        }
        nextTick(() => {
          focusFirst(elements);
        });
      }
    };
    provide(ROVING_FOCUS_GROUP_INJECTION_KEY, {
      currentTabbedId: readonly(currentTabbedId),
      loop: toRef(props, "loop"),
      tabIndex: computed(() => {
        return unref(isBackingOut) ? -1 : 0;
      }),
      rovingFocusGroupRef,
      rovingFocusGroupRootStyle,
      orientation: toRef(props, "orientation"),
      dir: toRef(props, "dir"),
      onItemFocus,
      onItemShiftTab,
      onBlur,
      onFocus,
      onMousedown,
      onKeydown
    });
    watch(() => props.currentTabId, (val) => {
      currentTabbedId.value = val ?? null;
    });
    useEventListener(rovingFocusGroupRef, ENTRY_FOCUS_EVT, handleEntryFocus);
  }
});
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}
var roving_focus_group_impl_default = /* @__PURE__ */ _plugin_vue_export_helper_default(roving_focus_group_impl_vue_vue_type_script_lang_default, [["render", _sfc_render$6]]);
var roving_focus_group_vue_vue_type_script_lang_default = defineComponent({
  name: "ElRovingFocusGroup",
  components: {
    ElFocusGroupCollection: ElCollection,
    ElRovingFocusGroupImpl: roving_focus_group_impl_default
  }
});
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_roving_focus_group_impl = resolveComponent("el-roving-focus-group-impl");
  const _component_el_focus_group_collection = resolveComponent("el-focus-group-collection");
  return openBlock(), createBlock(_component_el_focus_group_collection, null, {
    default: withCtx(() => [createVNode(_component_el_roving_focus_group_impl, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
      default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
      _: 3
    }, 16)]),
    _: 3
  });
}
var roving_focus_group_default = /* @__PURE__ */ _plugin_vue_export_helper_default(roving_focus_group_vue_vue_type_script_lang_default, [["render", _sfc_render$5]]);
var roving_focus_item_vue_vue_type_script_lang_default = defineComponent({
  components: { ElRovingFocusCollectionItem: ElCollectionItem },
  props: {
    focusable: {
      type: Boolean,
      default: true
    },
    active: Boolean
  },
  emits: [
    "mousedown",
    "focus",
    "keydown"
  ],
  setup(props, { emit }) {
    const { currentTabbedId, onItemFocus, onItemShiftTab, onKeydown } = inject(ROVING_FOCUS_GROUP_INJECTION_KEY, void 0);
    const id = useId();
    const rovingFocusGroupItemRef = ref();
    const handleMousedown = composeEventHandlers((e) => {
      emit("mousedown", e);
    }, (e) => {
      if (!props.focusable) e.preventDefault();
      else onItemFocus(unref(id));
    });
    const handleFocus = composeEventHandlers((e) => {
      emit("focus", e);
    }, () => {
      onItemFocus(unref(id));
    });
    const handleKeydown = composeEventHandlers((e) => {
      emit("keydown", e);
    }, (e) => {
      const { shiftKey, target, currentTarget } = e;
      if (getEventCode(e) === EVENT_CODE.tab && shiftKey) {
        onItemShiftTab();
        return;
      }
      if (target !== currentTarget) return;
      onKeydown(e);
    });
    const isCurrentTab = computed(() => currentTabbedId.value === unref(id));
    provide(ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY, {
      rovingFocusGroupItemRef,
      tabIndex: computed(() => unref(isCurrentTab) ? 0 : -1),
      handleMousedown,
      handleFocus,
      handleKeydown
    });
    return {
      id,
      handleKeydown,
      handleFocus,
      handleMousedown
    };
  }
});
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_roving_focus_collection_item = resolveComponent("el-roving-focus-collection-item");
  return openBlock(), createBlock(_component_el_roving_focus_collection_item, {
    id: _ctx.id,
    focusable: _ctx.focusable,
    active: _ctx.active
  }, {
    default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
    _: 3
  }, 8, [
    "id",
    "focusable",
    "active"
  ]);
}
var roving_focus_item_default = /* @__PURE__ */ _plugin_vue_export_helper_default(roving_focus_item_vue_vue_type_script_lang_default, [["render", _sfc_render$4]]);
var roving_focus_group_default$1 = roving_focus_group_default;
const { ButtonGroup: ElButtonGroup } = ElButton;
var dropdown_vue_vue_type_script_lang_default = defineComponent({
  name: "ElDropdown",
  components: {
    ElButton,
    ElButtonGroup,
    ElScrollbar,
    ElTooltip,
    ElRovingFocusGroup: roving_focus_group_default$1,
    ElOnlyChild: OnlyChild,
    ElIcon,
    ArrowDown: arrow_down_default
  },
  props: dropdownProps,
  emits: [
    "visible-change",
    "click",
    "command"
  ],
  setup(props, { emit }) {
    const _instance = getCurrentInstance();
    const ns = useNamespace("dropdown");
    const { t } = useLocale();
    const triggeringElementRef = ref();
    const referenceElementRef = ref();
    const popperRef = ref();
    const contentRef = ref();
    const scrollbar = ref(null);
    const currentTabId = ref(null);
    const isUsingKeyboard = ref(false);
    const wrapStyle = computed(() => ({ maxHeight: addUnit(props.maxHeight) }));
    const dropdownTriggerKls = computed(() => [ns.m(dropdownSize.value)]);
    const trigger = computed(() => castArray(props.trigger));
    const defaultTriggerId = useId().value;
    const triggerId = computed(() => props.id || defaultTriggerId);
    function handleClick() {
      popperRef.value?.onClose(void 0, 0);
    }
    function handleClose() {
      popperRef.value?.onClose();
    }
    function handleOpen() {
      popperRef.value?.onOpen();
    }
    const dropdownSize = useFormSize();
    function commandHandler(...args) {
      emit("command", ...args);
    }
    function onItemEnter() {
    }
    function onItemLeave() {
      const contentEl = unref(contentRef);
      trigger.value.includes("hover") && contentEl?.focus({ preventScroll: true });
      currentTabId.value = null;
    }
    function handleCurrentTabIdChange(id) {
      currentTabId.value = id;
    }
    function handleBeforeShowTooltip() {
      emit("visible-change", true);
    }
    function handleShowTooltip(event) {
      isUsingKeyboard.value = event?.type === "keydown";
      contentRef.value?.focus();
    }
    function handleBeforeHideTooltip() {
      emit("visible-change", false);
    }
    provide(DROPDOWN_INJECTION_KEY, {
      contentRef,
      role: computed(() => props.role),
      triggerId,
      isUsingKeyboard,
      onItemEnter,
      onItemLeave,
      handleClose
    });
    provide(DROPDOWN_INSTANCE_INJECTION_KEY, {
      instance: _instance,
      dropdownSize,
      handleClick,
      commandHandler,
      trigger: toRef(props, "trigger"),
      hideOnClick: toRef(props, "hideOnClick")
    });
    const handlerMainButtonClick = (event) => {
      emit("click", event);
    };
    return {
      t,
      ns,
      scrollbar,
      wrapStyle,
      dropdownTriggerKls,
      dropdownSize,
      triggerId,
      currentTabId,
      handleCurrentTabIdChange,
      handlerMainButtonClick,
      handleClose,
      handleOpen,
      handleBeforeShowTooltip,
      handleShowTooltip,
      handleBeforeHideTooltip,
      popperRef,
      contentRef,
      triggeringElementRef,
      referenceElementRef
    };
  }
});
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_roving_focus_group = resolveComponent("el-roving-focus-group");
  const _component_el_scrollbar = resolveComponent("el-scrollbar");
  const _component_el_only_child = resolveComponent("el-only-child");
  const _component_el_tooltip = resolveComponent("el-tooltip");
  const _component_el_button = resolveComponent("el-button");
  const _component_arrow_down = resolveComponent("arrow-down");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_button_group = resolveComponent("el-button-group");
  return openBlock(), createElementBlock("div", { class: normalizeClass([_ctx.ns.b(), _ctx.ns.is("disabled", _ctx.disabled)]) }, [createVNode(_component_el_tooltip, {
    ref: "popperRef",
    role: _ctx.role,
    effect: _ctx.effect,
    "fallback-placements": ["bottom", "top"],
    "popper-options": _ctx.popperOptions,
    "gpu-acceleration": false,
    placement: _ctx.placement,
    "popper-class": [_ctx.ns.e("popper"), _ctx.popperClass],
    "popper-style": _ctx.popperStyle,
    trigger: _ctx.trigger,
    "trigger-keys": _ctx.triggerKeys,
    "trigger-target-el": _ctx.contentRef,
    "show-arrow": _ctx.showArrow,
    "show-after": _ctx.trigger === "hover" ? _ctx.showTimeout : 0,
    "hide-after": _ctx.trigger === "hover" ? _ctx.hideTimeout : 0,
    "virtual-ref": _ctx.virtualRef ?? _ctx.triggeringElementRef,
    "virtual-triggering": _ctx.virtualTriggering || _ctx.splitButton,
    disabled: _ctx.disabled,
    transition: `${_ctx.ns.namespace.value}-zoom-in-top`,
    teleported: _ctx.teleported,
    "append-to": _ctx.appendTo,
    pure: "",
    "focus-on-target": "",
    persistent: _ctx.persistent,
    onBeforeShow: _ctx.handleBeforeShowTooltip,
    onShow: _ctx.handleShowTooltip,
    onBeforeHide: _ctx.handleBeforeHideTooltip
  }, createSlots({
    content: withCtx(() => [createVNode(_component_el_scrollbar, {
      ref: "scrollbar",
      "wrap-style": _ctx.wrapStyle,
      tag: "div",
      "view-class": _ctx.ns.e("list")
    }, {
      default: withCtx(() => [createVNode(_component_el_roving_focus_group, {
        loop: _ctx.loop,
        "current-tab-id": _ctx.currentTabId,
        orientation: "horizontal",
        onCurrentTabIdChange: _ctx.handleCurrentTabIdChange
      }, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "dropdown")]),
        _: 3
      }, 8, [
        "loop",
        "current-tab-id",
        "onCurrentTabIdChange"
      ])]),
      _: 3
    }, 8, ["wrap-style", "view-class"])]),
    _: 2
  }, [!_ctx.splitButton ? {
    name: "default",
    fn: withCtx(() => [createVNode(_component_el_only_child, {
      id: _ctx.triggerId,
      ref: "triggeringElementRef",
      role: "button",
      tabindex: _ctx.tabindex
    }, {
      default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
      _: 3
    }, 8, ["id", "tabindex"])]),
    key: "0"
  } : void 0]), 1032, [
    "role",
    "effect",
    "popper-options",
    "placement",
    "popper-class",
    "popper-style",
    "trigger",
    "trigger-keys",
    "trigger-target-el",
    "show-arrow",
    "show-after",
    "hide-after",
    "virtual-ref",
    "virtual-triggering",
    "disabled",
    "transition",
    "teleported",
    "append-to",
    "persistent",
    "onBeforeShow",
    "onShow",
    "onBeforeHide"
  ]), _ctx.splitButton ? (openBlock(), createBlock(_component_el_button_group, { key: 0 }, {
    default: withCtx(() => [createVNode(_component_el_button, mergeProps({ ref: "referenceElementRef" }, _ctx.buttonProps, {
      size: _ctx.dropdownSize,
      type: _ctx.type,
      disabled: _ctx.disabled,
      tabindex: _ctx.tabindex,
      onClick: _ctx.handlerMainButtonClick
    }), {
      default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
      _: 3
    }, 16, [
      "size",
      "type",
      "disabled",
      "tabindex",
      "onClick"
    ]), createVNode(_component_el_button, mergeProps({
      id: _ctx.triggerId,
      ref: "triggeringElementRef"
    }, _ctx.buttonProps, {
      role: "button",
      size: _ctx.dropdownSize,
      type: _ctx.type,
      class: _ctx.ns.e("caret-button"),
      disabled: _ctx.disabled,
      tabindex: _ctx.tabindex,
      "aria-label": _ctx.t("el.dropdown.toggleDropdown")
    }), {
      default: withCtx(() => [createVNode(_component_el_icon, { class: normalizeClass(_ctx.ns.e("icon")) }, {
        default: withCtx(() => [createVNode(_component_arrow_down)]),
        _: 1
      }, 8, ["class"])]),
      _: 1
    }, 16, [
      "id",
      "size",
      "type",
      "class",
      "disabled",
      "tabindex",
      "aria-label"
    ])]),
    _: 3
  })) : createCommentVNode("v-if", true)], 2);
}
var dropdown_default = /* @__PURE__ */ _plugin_vue_export_helper_default(dropdown_vue_vue_type_script_lang_default, [["render", _sfc_render$3]]);
var dropdown_item_impl_vue_vue_type_script_lang_default = defineComponent({
  name: "DropdownItemImpl",
  components: { ElIcon },
  props: dropdownItemProps,
  emits: [
    "pointermove",
    "pointerleave",
    "click",
    "clickimpl"
  ],
  setup(_, { emit }) {
    const ns = useNamespace("dropdown");
    const { role: menuRole } = inject(DROPDOWN_INJECTION_KEY, void 0);
    const { collectionItemRef: rovingFocusCollectionItemRef } = inject(COLLECTION_ITEM_INJECTION_KEY, void 0);
    const { rovingFocusGroupItemRef, tabIndex, handleFocus, handleKeydown: handleItemKeydown, handleMousedown } = inject(ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY, void 0);
    const itemRef = composeRefs(rovingFocusCollectionItemRef, rovingFocusGroupItemRef);
    const role = computed(() => {
      if (menuRole.value === "menu") return "menuitem";
      else if (menuRole.value === "navigation") return "link";
      return "button";
    });
    const handleKeydown = composeEventHandlers((e) => {
      const code = getEventCode(e);
      if ([
        EVENT_CODE.enter,
        EVENT_CODE.numpadEnter,
        EVENT_CODE.space
      ].includes(code)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        emit("clickimpl", e);
        return true;
      }
    }, handleItemKeydown);
    return {
      ns,
      itemRef,
      dataset: { [COLLECTION_ITEM_SIGN]: "" },
      role,
      tabIndex,
      handleFocus,
      handleKeydown,
      handleMousedown
    };
  }
});
const _hoisted_1$1 = [
  "aria-disabled",
  "tabindex",
  "role"
];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = resolveComponent("el-icon");
  return openBlock(), createElementBlock(Fragment, null, [_ctx.divided ? (openBlock(), createElementBlock("li", {
    key: 0,
    role: "separator",
    class: normalizeClass(_ctx.ns.bem("menu", "item", "divided"))
  }, null, 2)) : createCommentVNode("v-if", true), createElementVNode("li", mergeProps({ ref: _ctx.itemRef }, {
    ..._ctx.dataset,
    ..._ctx.$attrs
  }, {
    "aria-disabled": _ctx.disabled,
    class: [_ctx.ns.be("menu", "item"), _ctx.ns.is("disabled", _ctx.disabled)],
    tabindex: _ctx.tabIndex,
    role: _ctx.role,
    onClick: _cache[0] || (_cache[0] = (e) => _ctx.$emit("clickimpl", e)),
    onFocus: _cache[1] || (_cache[1] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
    onKeydown: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args), ["self"])),
    onMousedown: _cache[3] || (_cache[3] = (...args) => _ctx.handleMousedown && _ctx.handleMousedown(...args)),
    onPointermove: _cache[4] || (_cache[4] = (e) => _ctx.$emit("pointermove", e)),
    onPointerleave: _cache[5] || (_cache[5] = (e) => _ctx.$emit("pointerleave", e))
  }), [_ctx.icon || _ctx.$slots.icon ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
    default: withCtx(() => [renderSlot(_ctx.$slots, "icon", {}, () => [(openBlock(), createBlock(resolveDynamicComponent(_ctx.icon)))])]),
    _: 3
  })) : createCommentVNode("v-if", true), renderSlot(_ctx.$slots, "default")], 16, _hoisted_1$1)], 64);
}
var dropdown_item_impl_default = /* @__PURE__ */ _plugin_vue_export_helper_default(dropdown_item_impl_vue_vue_type_script_lang_default, [["render", _sfc_render$2]]);
const useDropdown = () => {
  const elDropdown = inject(DROPDOWN_INSTANCE_INJECTION_KEY, {});
  return {
    elDropdown,
    _elDropdownSize: computed(() => elDropdown?.dropdownSize)
  };
};
var dropdown_item_vue_vue_type_script_lang_default = defineComponent({
  name: "ElDropdownItem",
  components: {
    ElRovingFocusItem: roving_focus_item_default,
    ElDropdownItemImpl: dropdown_item_impl_default
  },
  inheritAttrs: false,
  props: dropdownItemProps,
  emits: [
    "pointermove",
    "pointerleave",
    "click"
  ],
  setup(props, { emit, attrs }) {
    const { elDropdown } = useDropdown();
    const _instance = getCurrentInstance();
    const { onItemEnter, onItemLeave } = inject(DROPDOWN_INJECTION_KEY, void 0);
    const handlePointerMove = composeEventHandlers((e) => {
      emit("pointermove", e);
      return e.defaultPrevented;
    }, whenMouse((e) => {
      if (props.disabled) {
        onItemLeave(e);
        return;
      }
      const target = e.currentTarget;
      if (target === (void 0).activeElement || target.contains((void 0).activeElement)) return;
      onItemEnter(e);
      if (!e.defaultPrevented) target?.focus({ preventScroll: true });
    }));
    const handlePointerLeave = composeEventHandlers((e) => {
      emit("pointerleave", e);
      return e.defaultPrevented;
    }, whenMouse(onItemLeave));
    return {
      handleClick: composeEventHandlers((e) => {
        if (props.disabled) return;
        emit("click", e);
        return e.type !== "keydown" && e.defaultPrevented;
      }, (e) => {
        if (props.disabled) {
          e.stopImmediatePropagation();
          return;
        }
        if (elDropdown?.hideOnClick?.value) elDropdown.handleClick?.();
        elDropdown.commandHandler?.(props.command, _instance, e);
      }),
      handlePointerMove,
      handlePointerLeave,
      propsAndAttrs: computed(() => ({
        ...props,
        ...attrs
      }))
    };
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_dropdown_item_impl = resolveComponent("el-dropdown-item-impl");
  const _component_el_roving_focus_item = resolveComponent("el-roving-focus-item");
  return openBlock(), createBlock(_component_el_roving_focus_item, { focusable: !_ctx.disabled }, {
    default: withCtx(() => [createVNode(_component_el_dropdown_item_impl, mergeProps(_ctx.propsAndAttrs, {
      onPointerleave: _ctx.handlePointerLeave,
      onPointermove: _ctx.handlePointerMove,
      onClickimpl: _ctx.handleClick
    }), createSlots({
      default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
      _: 2
    }, [_ctx.$slots.icon ? {
      name: "icon",
      fn: withCtx(() => [renderSlot(_ctx.$slots, "icon")]),
      key: "0"
    } : void 0]), 1040, [
      "onPointerleave",
      "onPointermove",
      "onClickimpl"
    ])]),
    _: 3
  }, 8, ["focusable"]);
}
var dropdown_item_default = /* @__PURE__ */ _plugin_vue_export_helper_default(dropdown_item_vue_vue_type_script_lang_default, [["render", _sfc_render$1]]);
var dropdown_menu_vue_vue_type_script_lang_default = defineComponent({
  name: "ElDropdownMenu",
  props: dropdownMenuProps,
  setup(props) {
    const ns = useNamespace("dropdown");
    const { _elDropdownSize } = useDropdown();
    const size = _elDropdownSize.value;
    const { contentRef, role, triggerId, isUsingKeyboard, handleClose } = inject(DROPDOWN_INJECTION_KEY, void 0);
    const { rovingFocusGroupRef, rovingFocusGroupRootStyle, onBlur, onFocus, onKeydown, onMousedown } = inject(ROVING_FOCUS_GROUP_INJECTION_KEY, void 0);
    const { collectionRef: rovingFocusGroupCollectionRef } = inject(COLLECTION_INJECTION_KEY, void 0);
    const dropdownKls = computed(() => {
      return [ns.b("menu"), ns.bm("menu", size?.value)];
    });
    const dropdownListWrapperRef = composeRefs(contentRef, rovingFocusGroupRef, rovingFocusGroupCollectionRef);
    const handleKeydown = composeEventHandlers((e) => {
      props.onKeydown?.(e);
    }, (e) => {
      const { currentTarget, target } = e;
      const code = getEventCode(e);
      if (currentTarget.contains(target)) ;
      if (EVENT_CODE.tab === code) return handleClose();
      onKeydown(e);
    });
    function handleFocus(e) {
      isUsingKeyboard.value && onFocus(e);
    }
    return {
      size,
      rovingFocusGroupRootStyle,
      dropdownKls,
      role,
      triggerId,
      dropdownListWrapperRef,
      handleKeydown,
      onBlur,
      handleFocus,
      onMousedown
    };
  }
});
const _hoisted_1 = ["role", "aria-labelledby"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("ul", {
    ref: _ctx.dropdownListWrapperRef,
    class: normalizeClass(_ctx.dropdownKls),
    style: normalizeStyle(_ctx.rovingFocusGroupRootStyle),
    tabindex: -1,
    role: _ctx.role,
    "aria-labelledby": _ctx.triggerId,
    onFocusin: _cache[0] || (_cache[0] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
    onFocusout: _cache[1] || (_cache[1] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
    onKeydown: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args), ["self"])),
    onMousedown: _cache[3] || (_cache[3] = withModifiers((...args) => _ctx.onMousedown && _ctx.onMousedown(...args), ["self"]))
  }, [renderSlot(_ctx.$slots, "default")], 46, _hoisted_1);
}
var dropdown_menu_default = /* @__PURE__ */ _plugin_vue_export_helper_default(dropdown_menu_vue_vue_type_script_lang_default, [["render", _sfc_render]]);
const ElDropdown = withInstall(dropdown_default, {
  DropdownItem: dropdown_item_default,
  DropdownMenu: dropdown_menu_default
});
const ElDropdownItem = withNoopInstall(dropdown_item_default);
withNoopInstall(dropdown_menu_default);
const MENU_INJECTION_KEY = "rootMenu";
const SUB_MENU_INJECTION_KEY = "subMenu:";
function useMenu(instance, currentIndex) {
  const indexPath = computed(() => {
    let parent = instance.parent;
    const path = [currentIndex.value];
    while (parent.type.name !== "ElMenu") {
      if (parent.props.index) path.unshift(parent.props.index);
      parent = parent.parent;
    }
    return path;
  });
  return {
    parentMenu: computed(() => {
      let parent = instance.parent;
      while (parent && !["ElMenu", "ElSubMenu"].includes(parent.type.name)) parent = parent.parent;
      return parent;
    }),
    indexPath
  };
}
function useMenuColor(props) {
  return computed(() => {
    const color = props.backgroundColor;
    return color ? new TinyColor(color).shade(20).toString() : "";
  });
}
const useMenuCssVar = (props, level) => {
  const ns = useNamespace("menu");
  return computed(() => ns.cssVarBlock({
    "text-color": props.textColor || "",
    "hover-text-color": props.textColor || "",
    "bg-color": props.backgroundColor || "",
    "hover-bg-color": useMenuColor(props).value || "",
    "active-color": props.activeTextColor || "",
    level: `${level}`
  }));
};
const subMenuProps = buildProps({
  /**
  * @description unique identification
  */
  index: {
    type: String,
    required: true
  },
  /**
  * @description timeout before showing a sub-menu(inherit `show-timeout` of the menu by default.)
  */
  showTimeout: Number,
  /**
  * @description timeout before hiding a sub-menu(inherit `hide-timeout` of the menu by default.)
  */
  hideTimeout: Number,
  /**
  * @description custom class name for the popup menu
  */
  popperClass: String,
  /**
  * @description custom style for the popup menu
  */
  popperStyle: { type: definePropType([String, Object]) },
  /**
  * @description whether the sub-menu is disabled
  */
  disabled: Boolean,
  /**
  * @description whether popup menu is teleported to the body
  */
  teleported: {
    type: Boolean,
    default: void 0
  },
  /**
  * @description offset of the popper (overrides the `popper` of menu)
  */
  popperOffset: Number,
  /**
  * @description Icon when menu are expanded and submenu are closed, `expand-close-icon` and `expand-open-icon` need to be passed together to take effect
  */
  expandCloseIcon: { type: iconPropType },
  /**
  * @description Icon when menu are expanded and submenu are opened, `expand-open-icon` and `expand-close-icon` need to be passed together to take effect
  */
  expandOpenIcon: { type: iconPropType },
  /**
  * @description Icon when menu are collapsed and submenu are closed, `collapse-close-icon` and `collapse-open-icon` need to be passed together to take effect
  */
  collapseCloseIcon: { type: iconPropType },
  /**
  * @description Icon when menu are collapsed and submenu are opened, `collapse-open-icon` and `collapse-close-icon` need to be passed together to take effect
  */
  collapseOpenIcon: { type: iconPropType }
});
const COMPONENT_NAME$1 = "ElSubMenu";
var sub_menu_default = defineComponent({
  name: COMPONENT_NAME$1,
  props: subMenuProps,
  setup(props, { slots, expose }) {
    const instance = getCurrentInstance();
    const { indexPath, parentMenu } = useMenu(instance, computed(() => props.index));
    const nsMenu = useNamespace("menu");
    const nsSubMenu = useNamespace("sub-menu");
    const rootMenu = inject(MENU_INJECTION_KEY);
    if (!rootMenu) throwError(COMPONENT_NAME$1, "can not inject root menu");
    const subMenu = inject(`${SUB_MENU_INJECTION_KEY}${parentMenu.value.uid}`);
    if (!subMenu) throwError(COMPONENT_NAME$1, "can not inject sub menu");
    const items = ref({});
    const subMenus = ref({});
    let timeout;
    const mouseInChild = ref(false);
    const verticalTitleRef = ref();
    const vPopper = ref();
    const isFirstLevel = computed(() => subMenu.level === 0);
    const currentPlacement = computed(() => mode.value === "horizontal" && isFirstLevel.value ? "bottom-start" : "right-start");
    const subMenuTitleIcon = computed(() => {
      if (mode.value === "horizontal" && isFirstLevel.value || mode.value === "vertical" && !rootMenu.props.collapse) {
        if (props.expandCloseIcon && props.expandOpenIcon) return opened.value ? props.expandOpenIcon : props.expandCloseIcon;
        return arrow_down_default;
      } else {
        if (props.collapseCloseIcon && props.collapseOpenIcon) return opened.value ? props.collapseOpenIcon : props.collapseCloseIcon;
        return arrow_right_default;
      }
    });
    const appendToBody = computed(() => {
      const value = props.teleported;
      return isUndefined(value) ? isFirstLevel.value : value;
    });
    const menuTransitionName = computed(() => rootMenu.props.collapse ? `${nsMenu.namespace.value}-zoom-in-left` : `${nsMenu.namespace.value}-zoom-in-top`);
    const fallbackPlacements = computed(() => mode.value === "horizontal" && isFirstLevel.value ? [
      "bottom-start",
      "bottom-end",
      "top-start",
      "top-end",
      "right-start",
      "left-start"
    ] : [
      "right-start",
      "right",
      "right-end",
      "left-start",
      "bottom-start",
      "bottom-end",
      "top-start",
      "top-end"
    ]);
    const opened = computed(() => rootMenu.openedMenus.includes(props.index));
    const active = computed(() => [...Object.values(items.value), ...Object.values(subMenus.value)].some(({ active: active2 }) => active2));
    const mode = computed(() => rootMenu.props.mode);
    const persistent = computed(() => rootMenu.props.persistent);
    reactive({
      index: props.index,
      indexPath,
      active
    });
    const ulStyle = useMenuCssVar(rootMenu.props, subMenu.level + 1);
    const subMenuPopperOffset = computed(() => props.popperOffset ?? rootMenu.props.popperOffset);
    const subMenuPopperClass = computed(() => props.popperClass ?? rootMenu.props.popperClass);
    const subMenuPopperStyle = computed(() => props.popperStyle ?? rootMenu.props.popperStyle);
    const subMenuShowTimeout = computed(() => props.showTimeout ?? rootMenu.props.showTimeout);
    const subMenuHideTimeout = computed(() => props.hideTimeout ?? rootMenu.props.hideTimeout);
    const doDestroy = () => vPopper.value?.popperRef?.popperInstanceRef?.destroy();
    const handleCollapseToggle = (value) => {
      if (!value) doDestroy();
    };
    const handleClick = () => {
      if (rootMenu.props.menuTrigger === "hover" && rootMenu.props.mode === "horizontal" || rootMenu.props.collapse && rootMenu.props.mode === "vertical" || props.disabled) return;
      rootMenu.handleSubMenuClick({
        index: props.index,
        indexPath: indexPath.value,
        active: active.value
      });
    };
    const handleMouseenter = (event, showTimeout = subMenuShowTimeout.value) => {
      if (event.type === "focus") return;
      if (rootMenu.props.menuTrigger === "click" && rootMenu.props.mode === "horizontal" || !rootMenu.props.collapse && rootMenu.props.mode === "vertical" || props.disabled) {
        subMenu.mouseInChild.value = true;
        return;
      }
      subMenu.mouseInChild.value = true;
      timeout?.();
      ({ stop: timeout } = useTimeoutFn(() => {
        rootMenu.openMenu(props.index, indexPath.value);
      }, showTimeout));
      if (appendToBody.value) parentMenu.value.vnode.el?.dispatchEvent(new MouseEvent("mouseenter"));
      if (event.type === "mouseenter" && event.target) nextTick(() => {
        focusElement(event.target, { preventScroll: true });
      });
    };
    const handleMouseleave = (deepDispatch = false) => {
      if (rootMenu.props.menuTrigger === "click" && rootMenu.props.mode === "horizontal" || !rootMenu.props.collapse && rootMenu.props.mode === "vertical") {
        subMenu.mouseInChild.value = false;
        return;
      }
      timeout?.();
      subMenu.mouseInChild.value = false;
      ({ stop: timeout } = useTimeoutFn(() => !mouseInChild.value && rootMenu.closeMenu(props.index, indexPath.value), subMenuHideTimeout.value));
      if (appendToBody.value && deepDispatch) subMenu.handleMouseleave?.(true);
    };
    watch(() => rootMenu.props.collapse, (value) => handleCollapseToggle(Boolean(value)));
    {
      const addSubMenu = (item) => {
        subMenus.value[item.index] = item;
      };
      const removeSubMenu = (item) => {
        delete subMenus.value[item.index];
      };
      provide(`${SUB_MENU_INJECTION_KEY}${instance.uid}`, {
        addSubMenu,
        removeSubMenu,
        handleMouseleave,
        mouseInChild,
        level: subMenu.level + 1
      });
    }
    expose({ opened });
    return () => {
      const titleTag = [slots.title?.(), h(ElIcon, {
        class: nsSubMenu.e("icon-arrow"),
        style: { transform: opened.value ? props.expandCloseIcon && props.expandOpenIcon || props.collapseCloseIcon && props.collapseOpenIcon && rootMenu.props.collapse ? "none" : "rotateZ(180deg)" : "none" }
      }, { default: () => isString(subMenuTitleIcon.value) ? h(instance.appContext.components[subMenuTitleIcon.value]) : h(subMenuTitleIcon.value) })];
      const child = rootMenu.isMenuPopup ? h(ElTooltip, {
        ref: vPopper,
        visible: opened.value,
        effect: "light",
        pure: true,
        offset: subMenuPopperOffset.value,
        showArrow: false,
        persistent: persistent.value,
        popperClass: subMenuPopperClass.value,
        popperStyle: subMenuPopperStyle.value,
        placement: currentPlacement.value,
        teleported: appendToBody.value,
        fallbackPlacements: fallbackPlacements.value,
        transition: menuTransitionName.value,
        gpuAcceleration: false
      }, {
        content: () => h("div", {
          class: [
            nsMenu.m(mode.value),
            nsMenu.m("popup-container"),
            subMenuPopperClass.value
          ],
          onMouseenter: (evt) => handleMouseenter(evt, 100),
          onMouseleave: () => handleMouseleave(true),
          onFocus: (evt) => handleMouseenter(evt, 100)
        }, [h("ul", {
          class: [
            nsMenu.b(),
            nsMenu.m("popup"),
            nsMenu.m(`popup-${currentPlacement.value}`)
          ],
          style: ulStyle.value
        }, [slots.default?.()])]),
        default: () => h("div", {
          class: nsSubMenu.e("title"),
          onClick: handleClick
        }, titleTag)
      }) : h(Fragment, {}, [h("div", {
        class: nsSubMenu.e("title"),
        ref: verticalTitleRef,
        onClick: handleClick
      }, titleTag), h(ElCollapseTransition, {}, { default: () => withDirectives(h("ul", {
        role: "menu",
        class: [nsMenu.b(), nsMenu.m("inline")],
        style: ulStyle.value
      }, [slots.default?.()]), [[vShow, opened.value]]) })]);
      return h("li", {
        class: [
          nsSubMenu.b(),
          nsSubMenu.is("active", active.value),
          nsSubMenu.is("opened", opened.value),
          nsSubMenu.is("disabled", props.disabled)
        ],
        role: "menuitem",
        ariaHaspopup: true,
        ariaExpanded: opened.value,
        onMouseenter: handleMouseenter,
        onMouseleave: () => handleMouseleave(),
        onFocus: handleMouseenter
      }, [child]);
    };
  }
});
var menu_collapse_transition_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElMenuCollapseTransition",
  __name: "menu-collapse-transition",
  setup(__props) {
    const ns = useNamespace("menu");
    const listeners = {
      onBeforeEnter: (el) => el.style.opacity = "0.2",
      onEnter(el, done) {
        addClass(el, `${ns.namespace.value}-opacity-transition`);
        el.style.opacity = "1";
        done();
      },
      onAfterEnter(el) {
        removeClass(el, `${ns.namespace.value}-opacity-transition`);
        el.style.opacity = "";
      },
      onBeforeLeave(el) {
        if (!el.dataset) el.dataset = {};
        if (hasClass(el, ns.m("collapse"))) {
          removeClass(el, ns.m("collapse"));
          el.dataset.oldOverflow = el.style.overflow;
          el.dataset.scrollWidth = el.clientWidth.toString();
          addClass(el, ns.m("collapse"));
        } else {
          addClass(el, ns.m("collapse"));
          el.dataset.oldOverflow = el.style.overflow;
          el.dataset.scrollWidth = el.clientWidth.toString();
          removeClass(el, ns.m("collapse"));
        }
        el.style.width = `${el.scrollWidth}px`;
        el.style.overflow = "hidden";
      },
      onLeave(el) {
        addClass(el, "horizontal-collapse-transition");
        el.style.width = `${el.dataset.scrollWidth}px`;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, mergeProps({ mode: "out-in" }, listeners), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var menu_collapse_transition_default = menu_collapse_transition_vue_vue_type_script_setup_true_lang_default;
const menuProps = buildProps({
  /**
  * @description menu display mode
  */
  mode: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "vertical"
  },
  /**
  * @description index of active menu on page load
  */
  defaultActive: {
    type: String,
    default: ""
  },
  /**
  * @description array that contains indexes of currently active sub-menus
  */
  defaultOpeneds: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  /**
  * @description whether only one sub-menu can be active
  */
  uniqueOpened: Boolean,
  /**
  * @description whether `vue-router` mode is activated. If true, index will be used as 'path' to activate the route action. Use with `default-active` to set the active item on load.
  */
  router: Boolean,
  /**
  * @description how sub-menus are triggered, only works when `mode` is 'horizontal'
  */
  menuTrigger: {
    type: String,
    values: ["hover", "click"],
    default: "hover"
  },
  /**
  * @description whether the menu is collapsed (available only in vertical mode)
  */
  collapse: Boolean,
  /**
  * @description background color of Menu (hex format) (deprecated, use `--bg-color` instead)
  * @deprecated use `--bg-color` instead
  */
  backgroundColor: String,
  /**
  * @description text color of Menu (hex format) (deprecated, use `--text-color` instead)
  * @deprecated use `--text-color` instead
  */
  textColor: String,
  /**
  * @description text color of currently active menu item (hex format) (deprecated, use `--active-color` instead)
  * @deprecated use `--active-color` instead
  */
  activeTextColor: String,
  /**
  * @description optional, whether menu is collapsed when clicking outside
  */
  closeOnClickOutside: Boolean,
  /**
  * @description whether to enable the collapse transition
  */
  collapseTransition: {
    type: Boolean,
    default: true
  },
  /**
  * @description whether the menu is ellipsis (available only in horizontal mode)
  */
  ellipsis: {
    type: Boolean,
    default: true
  },
  /**
  * @description offset of the popper (effective for all submenus)
  */
  popperOffset: {
    type: Number,
    default: 6
  },
  /**
  * @description custom ellipsis icon (available only in horizontal mode and ellipsis is true)
  */
  ellipsisIcon: {
    type: iconPropType,
    default: () => more_default
  },
  /**
  * @description Tooltip theme, built-in theme: `dark` / `light` when menu is collapsed
  */
  popperEffect: {
    type: definePropType(String),
    default: "dark"
  },
  /**
  * @description custom class name for all popup menus
  */
  popperClass: String,
  /**
  * @description custom style for all popup menus
  */
  popperStyle: { type: definePropType([String, Object]) },
  /**
  * @description control timeout for all menus before showing
  */
  showTimeout: {
    type: Number,
    default: 300
  },
  /**
  * @description control timeout for all menus before hiding
  */
  hideTimeout: {
    type: Number,
    default: 300
  },
  /**
  * @description when menu inactive and `persistent` is `false` , dropdown menu will be destroyed
  */
  persistent: {
    type: Boolean,
    default: true
  }
});
const checkIndexPath = (indexPath) => isArray(indexPath) && indexPath.every((path) => isString(path));
const menuEmits = {
  close: (index, indexPath) => isString(index) && checkIndexPath(indexPath),
  open: (index, indexPath) => isString(index) && checkIndexPath(indexPath),
  select: (index, indexPath, item, routerResult) => isString(index) && checkIndexPath(indexPath) && isObject(item) && (isUndefined(routerResult) || routerResult instanceof Promise)
};
const DEFAULT_MORE_ITEM_WIDTH = 64;
var menu_default = defineComponent({
  name: "ElMenu",
  props: menuProps,
  emits: menuEmits,
  setup(props, { emit, slots, expose }) {
    const instance = getCurrentInstance();
    const router = instance.appContext.config.globalProperties.$router;
    const menu = ref();
    const subMenu = ref();
    const nsMenu = useNamespace("menu");
    const nsSubMenu = useNamespace("sub-menu");
    let moreItemWidth = DEFAULT_MORE_ITEM_WIDTH;
    const sliceIndex = ref(-1);
    const openedMenus = ref(props.defaultOpeneds && !props.collapse ? props.defaultOpeneds.slice(0) : []);
    const activeIndex = ref(props.defaultActive);
    const items = ref({});
    const subMenus = ref({});
    const isMenuPopup = computed(() => props.mode === "horizontal" || props.mode === "vertical" && props.collapse);
    const initMenu = () => {
      const activeItem = activeIndex.value && items.value[activeIndex.value];
      if (!activeItem || props.mode === "horizontal" || props.collapse) return;
      activeItem.indexPath.forEach((index) => {
        const subMenu2 = subMenus.value[index];
        subMenu2 && openMenu(index, subMenu2.indexPath);
      });
    };
    const openMenu = (index, indexPath) => {
      if (openedMenus.value.includes(index)) return;
      if (props.uniqueOpened) openedMenus.value = openedMenus.value.filter((index2) => indexPath.includes(index2));
      openedMenus.value.push(index);
      emit("open", index, indexPath);
    };
    const close = (index) => {
      const i = openedMenus.value.indexOf(index);
      if (i !== -1) openedMenus.value.splice(i, 1);
    };
    const closeMenu = (index, indexPath) => {
      close(index);
      emit("close", index, indexPath);
    };
    const handleSubMenuClick = ({ index, indexPath }) => {
      openedMenus.value.includes(index) ? closeMenu(index, indexPath) : openMenu(index, indexPath);
    };
    const handleMenuItemClick = (menuItem) => {
      if (props.mode === "horizontal" || props.collapse) openedMenus.value = [];
      const { index, indexPath } = menuItem;
      if (isNil(index) || isNil(indexPath)) return;
      if (props.router && router) {
        const route = menuItem.route || index;
        const routerResult = router.push(route).then((res) => {
          if (!res) activeIndex.value = index;
          return res;
        });
        emit("select", index, indexPath, {
          index,
          indexPath,
          route
        }, routerResult);
      } else {
        activeIndex.value = index;
        emit("select", index, indexPath, {
          index,
          indexPath
        });
      }
    };
    const updateActiveIndex = (val) => {
      const itemsInData = items.value;
      activeIndex.value = (itemsInData[val] || activeIndex.value && itemsInData[activeIndex.value] || itemsInData[props.defaultActive])?.index ?? val;
    };
    const calcMenuItemWidth = (menuItem) => {
      const computedStyle = getComputedStyle(menuItem);
      const marginLeft = Number.parseInt(computedStyle.marginLeft, 10);
      const marginRight = Number.parseInt(computedStyle.marginRight, 10);
      return menuItem.offsetWidth + marginLeft + marginRight || 0;
    };
    const calcSliceIndex = () => {
      if (!menu.value) return -1;
      const items2 = Array.from(menu.value.childNodes).filter((item) => item.nodeName !== "#comment" && (item.nodeName !== "#text" || item.nodeValue));
      const computedMenuStyle = getComputedStyle(menu.value);
      const paddingLeft = Number.parseInt(computedMenuStyle.paddingLeft, 10);
      const paddingRight = Number.parseInt(computedMenuStyle.paddingRight, 10);
      const menuWidth = menu.value.clientWidth - paddingLeft - paddingRight;
      let calcWidth = 0;
      let sliceIndex2 = 0;
      items2.forEach((item, index) => {
        calcWidth += calcMenuItemWidth(item);
        if (calcWidth <= menuWidth - moreItemWidth) sliceIndex2 = index + 1;
      });
      return sliceIndex2 === items2.length ? -1 : sliceIndex2;
    };
    const getIndexPath = (index) => subMenus.value[index].indexPath;
    const debounce = (fn, wait = 33.34) => {
      let timer;
      return () => {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
          fn();
        }, wait);
      };
    };
    let isFirstTimeRender = true;
    const handleResize = () => {
      const el = unrefElement(subMenu);
      if (el) moreItemWidth = calcMenuItemWidth(el) || DEFAULT_MORE_ITEM_WIDTH;
      if (sliceIndex.value === calcSliceIndex()) return;
      const callback = () => {
        sliceIndex.value = -1;
        nextTick(() => {
          sliceIndex.value = calcSliceIndex();
        });
      };
      isFirstTimeRender ? callback() : debounce(callback)();
      isFirstTimeRender = false;
    };
    watch(() => props.defaultActive, (currentActive) => {
      if (!items.value[currentActive]) activeIndex.value = "";
      updateActiveIndex(currentActive);
    });
    watch(() => props.collapse, (value) => {
      if (value) openedMenus.value = [];
    });
    watch(items.value, initMenu);
    let resizeStopper;
    watchEffect(() => {
      if (props.mode === "horizontal" && props.ellipsis) resizeStopper = useResizeObserver(menu, handleResize).stop;
      else resizeStopper?.();
    });
    const mouseInChild = ref(false);
    {
      const addSubMenu = (item) => {
        subMenus.value[item.index] = item;
      };
      const removeSubMenu = (item) => {
        delete subMenus.value[item.index];
      };
      const addMenuItem = (item) => {
        items.value[item.index] = item;
      };
      const removeMenuItem = (item) => {
        delete items.value[item.index];
      };
      provide(MENU_INJECTION_KEY, reactive({
        props,
        openedMenus,
        items,
        subMenus,
        activeIndex,
        isMenuPopup,
        addMenuItem,
        removeMenuItem,
        addSubMenu,
        removeSubMenu,
        openMenu,
        closeMenu,
        handleMenuItemClick,
        handleSubMenuClick
      }));
      provide(`${SUB_MENU_INJECTION_KEY}${instance.uid}`, {
        addSubMenu,
        removeSubMenu,
        mouseInChild,
        level: 0
      });
    }
    {
      const open = (index) => {
        const { indexPath } = subMenus.value[index];
        indexPath.forEach((i) => openMenu(i, indexPath));
      };
      expose({
        open,
        close,
        updateActiveIndex,
        handleResize
      });
    }
    const ulStyle = useMenuCssVar(props, 0);
    return () => {
      let slot = slots.default?.() ?? [];
      const vShowMore = [];
      if (props.mode === "horizontal" && menu.value) {
        const originalSlot = flattedChildren(slot).filter((vnode) => {
          return vnode?.shapeFlag !== 8;
        });
        const slotDefault = sliceIndex.value === -1 ? originalSlot : originalSlot.slice(0, sliceIndex.value);
        const slotMore = sliceIndex.value === -1 ? [] : originalSlot.slice(sliceIndex.value);
        if (slotMore?.length && props.ellipsis) {
          slot = slotDefault;
          vShowMore.push(h(sub_menu_default, {
            ref: subMenu,
            index: "sub-menu-more",
            class: nsSubMenu.e("hide-arrow"),
            popperOffset: props.popperOffset
          }, {
            title: () => h(ElIcon, { class: nsSubMenu.e("icon-more") }, { default: () => h(props.ellipsisIcon) }),
            default: () => slotMore
          }));
        }
      }
      const directives = props.closeOnClickOutside ? [[ClickOutside, () => {
        if (!openedMenus.value.length) return;
        if (!mouseInChild.value) {
          openedMenus.value.forEach((openedMenu) => emit("close", openedMenu, getIndexPath(openedMenu)));
          openedMenus.value = [];
        }
      }]] : [];
      const vMenu = withDirectives(h("ul", {
        key: String(props.collapse),
        role: "menubar",
        ref: menu,
        style: ulStyle.value,
        class: {
          [nsMenu.b()]: true,
          [nsMenu.m(props.mode)]: true,
          [nsMenu.m("collapse")]: props.collapse
        }
      }, [...slot, ...vShowMore]), directives);
      if (props.collapseTransition && props.mode === "vertical") return h(menu_collapse_transition_default, () => vMenu);
      return vMenu;
    };
  }
});
const menuItemProps = buildProps({
  /**
  * @description unique identification
  */
  index: {
    type: String,
    required: true
  },
  /**
  * @description Vue Router object
  */
  route: { type: definePropType([String, Object]) },
  /**
  * @description whether disabled
  */
  disabled: Boolean
});
const menuItemEmits = { click: (item) => isString(item.index) && isArray(item.indexPath) };
const menuItemGroupProps = {
  /**
  * @description group title
  */
  title: String
};
const COMPONENT_NAME = "ElMenuItem";
var menu_item_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: COMPONENT_NAME,
  __name: "menu-item",
  props: menuItemProps,
  emits: menuItemEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const instance = getCurrentInstance();
    const rootMenu = inject(MENU_INJECTION_KEY);
    const nsMenu = useNamespace("menu");
    const nsMenuItem = useNamespace("menu-item");
    if (!rootMenu) throwError(COMPONENT_NAME, "can not inject root menu");
    const { parentMenu, indexPath } = useMenu(instance, toRef(props, "index"));
    const subMenu = inject(`${SUB_MENU_INJECTION_KEY}${parentMenu.value.uid}`);
    if (!subMenu) throwError(COMPONENT_NAME, "can not inject sub menu");
    const active = computed(() => props.index === rootMenu.activeIndex);
    const item = reactive({
      index: props.index,
      indexPath,
      active
    });
    const handleClick = () => {
      if (!props.disabled) {
        rootMenu.handleMenuItemClick({
          index: props.index,
          indexPath: indexPath.value,
          route: props.route
        });
        emit("click", item);
      }
    };
    __expose({
      parentMenu,
      rootMenu,
      active,
      nsMenu,
      nsMenuItem,
      handleClick
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("li", {
        class: normalizeClass([
          unref(nsMenuItem).b(),
          unref(nsMenuItem).is("active", active.value),
          unref(nsMenuItem).is("disabled", __props.disabled)
        ]),
        role: "menuitem",
        tabindex: "-1",
        onClick: handleClick
      }, [unref(parentMenu).type.name === "ElMenu" && unref(rootMenu).props.collapse && _ctx.$slots.title ? (openBlock(), createBlock(unref(ElTooltip), {
        key: 0,
        effect: unref(rootMenu).props.popperEffect,
        placement: "right",
        "fallback-placements": ["left"],
        "popper-class": unref(rootMenu).props.popperClass,
        "popper-style": unref(rootMenu).props.popperStyle,
        persistent: unref(rootMenu).props.persistent,
        "focus-on-target": ""
      }, {
        content: withCtx(() => [renderSlot(_ctx.$slots, "title")]),
        default: withCtx(() => [createElementVNode("div", { class: normalizeClass(unref(nsMenu).be("tooltip", "trigger")) }, [renderSlot(_ctx.$slots, "default")], 2)]),
        _: 3
      }, 8, [
        "effect",
        "popper-class",
        "popper-style",
        "persistent"
      ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [renderSlot(_ctx.$slots, "default"), renderSlot(_ctx.$slots, "title")], 64))], 2);
    };
  }
});
var menu_item_default = menu_item_vue_vue_type_script_setup_true_lang_default;
var menu_item_group_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElMenuItemGroup",
  __name: "menu-item-group",
  props: menuItemGroupProps,
  setup(__props) {
    const ns = useNamespace("menu-item-group");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("li", { class: normalizeClass(unref(ns).b()) }, [createElementVNode("div", { class: normalizeClass(unref(ns).e("title")) }, [!_ctx.$slots.title ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(__props.title), 1)], 64)) : renderSlot(_ctx.$slots, "title", { key: 1 })], 2), createElementVNode("ul", null, [renderSlot(_ctx.$slots, "default")])], 2);
    };
  }
});
var menu_item_group_default = menu_item_group_vue_vue_type_script_setup_true_lang_default;
const ElMenu = withInstall(menu_default, {
  MenuItem: menu_item_default,
  MenuItemGroup: menu_item_group_default,
  SubMenu: sub_menu_default
});
const ElMenuItem = withNoopInstall(menu_item_default);
withNoopInstall(menu_item_group_default);
withNoopInstall(sub_menu_default);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const { username, role, logout, changePassword } = useAuth();
    const route = useRoute();
    const pageTitleMap = {
      "/home": "仪表盘",
      "/articles": "文章管理",
      "/articles/create": "创建文章",
      "/categories": "分类管理",
      "/tags": "标签管理",
      "/comments": "评论管理",
      "/media": "媒体管理",
      "/user": "用户管理",
      "/setting": "站点设置",
      "/logs": "操作日志"
    };
    const currentTitle = computed(() => {
      const path = route.path;
      if (pageTitleMap[path]) return pageTitleMap[path];
      if (path.startsWith("/articles/edit/")) return "编辑文章";
      return "系统管理";
    });
    const dialogVisible = ref(false);
    const passwordForm = ref({ oldPassword: "", newPassword: "", confirmPassword: "" });
    const passwordLoading = ref(false);
    function openDialog() {
      passwordForm.value = { oldPassword: "", newPassword: "", confirmPassword: "" };
      dialogVisible.value = true;
    }
    async function handleChangePassword() {
      if (!passwordForm.value.oldPassword || !passwordForm.value.newPassword) {
        ElMessage.warning("请填写完整信息");
        return;
      }
      if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
        ElMessage.warning("两次输入的密码不一致");
        return;
      }
      passwordLoading.value = true;
      try {
        await changePassword({
          oldPassword: passwordForm.value.oldPassword,
          newPassword: passwordForm.value.newPassword
        });
        ElMessage.success("密码修改成功");
        dialogVisible.value = false;
      } catch (e) {
      } finally {
        passwordLoading.value = false;
      }
    }
    function handleCommand(command) {
      (void 0).activeElement?.blur?.();
      if (command === "setting") {
        openDialog();
      } else if (command === "logout") {
        logout();
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_header = ElHeader;
      const _component_el_dropdown = ElDropdown;
      const _component_el_avatar = ElAvatar;
      const _component_el_icon = ElIcon;
      const _component_el_dropdown_item = ElDropdownItem;
      const _component_el_dialog = ElDialog;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_tag = ElTag;
      const _component_el_divider = ElDivider;
      const _component_el_button = ElButton;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_el_header, { class: "admin-header" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="header-left" data-v-3a922d8a${_scopeId}><span class="header-title" data-v-3a922d8a${_scopeId}>${ssrInterpolate(unref(currentTitle))}</span></div><div class="header-right" data-v-3a922d8a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_dropdown, {
              trigger: "click",
              onCommand: handleCommand
            }, {
              dropdown: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_dropdown_item, { command: "setting" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`个人设置`);
                      } else {
                        return [
                          createTextVNode("个人设置")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_dropdown_item, { command: "logout" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`退出登录`);
                      } else {
                        return [
                          createTextVNode("退出登录")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_dropdown_item, { command: "setting" }, {
                      default: withCtx(() => [
                        createTextVNode("个人设置")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_dropdown_item, { command: "logout" }, {
                      default: withCtx(() => [
                        createTextVNode("退出登录")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="user-info" data-v-3a922d8a${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_avatar, {
                    size: 32,
                    class: "user-avatar"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(username)?.charAt(0)?.toUpperCase())}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(username)?.charAt(0)?.toUpperCase()), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<span class="username" data-v-3a922d8a${_scopeId2}>${ssrInterpolate(unref(username))}</span>`);
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(arrow_down_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(arrow_down_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</span>`);
                } else {
                  return [
                    createVNode("span", { class: "user-info" }, [
                      createVNode(_component_el_avatar, {
                        size: 32,
                        class: "user-avatar"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(username)?.charAt(0)?.toUpperCase()), 1)
                        ]),
                        _: 1
                      }),
                      createVNode("span", { class: "username" }, toDisplayString(unref(username)), 1),
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(arrow_down_default))
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "header-left" }, [
                createVNode("span", { class: "header-title" }, toDisplayString(unref(currentTitle)), 1)
              ]),
              createVNode("div", { class: "header-right" }, [
                createVNode(_component_el_dropdown, {
                  trigger: "click",
                  onCommand: handleCommand
                }, {
                  dropdown: withCtx(() => [
                    createVNode(_component_el_dropdown_item, { command: "setting" }, {
                      default: withCtx(() => [
                        createTextVNode("个人设置")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_dropdown_item, { command: "logout" }, {
                      default: withCtx(() => [
                        createTextVNode("退出登录")
                      ]),
                      _: 1
                    })
                  ]),
                  default: withCtx(() => [
                    createVNode("span", { class: "user-info" }, [
                      createVNode(_component_el_avatar, {
                        size: 32,
                        class: "user-avatar"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(username)?.charAt(0)?.toUpperCase()), 1)
                        ]),
                        _: 1
                      }),
                      createVNode("span", { class: "username" }, toDisplayString(unref(username)), 1),
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(arrow_down_default))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: dialogVisible.value,
        "onUpdate:modelValue": ($event) => dialogVisible.value = $event,
        title: "个人设置",
        width: "420px"
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
              loading: passwordLoading.value,
              onClick: handleChangePassword
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`确认修改`);
                } else {
                  return [
                    createTextVNode("确认修改")
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
                loading: passwordLoading.value,
                onClick: handleChangePassword
              }, {
                default: withCtx(() => [
                  createTextVNode("确认修改")
                ]),
                _: 1
              }, 8, ["loading"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_form, {
              "label-position": "top",
              onSubmit: handleChangePassword
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "用户名" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          "model-value": unref(username),
                          disabled: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            "model-value": unref(username),
                            disabled: ""
                          }, null, 8, ["model-value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "角色" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_tag, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(role))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(role)), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_tag, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(role)), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_divider, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "原密码" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: passwordForm.value.oldPassword,
                          "onUpdate:modelValue": ($event) => passwordForm.value.oldPassword = $event,
                          type: "password",
                          placeholder: "请输入原密码",
                          "show-password": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: passwordForm.value.oldPassword,
                            "onUpdate:modelValue": ($event) => passwordForm.value.oldPassword = $event,
                            type: "password",
                            placeholder: "请输入原密码",
                            "show-password": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "新密码" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: passwordForm.value.newPassword,
                          "onUpdate:modelValue": ($event) => passwordForm.value.newPassword = $event,
                          type: "password",
                          placeholder: "请输入新密码",
                          "show-password": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: passwordForm.value.newPassword,
                            "onUpdate:modelValue": ($event) => passwordForm.value.newPassword = $event,
                            type: "password",
                            placeholder: "请输入新密码",
                            "show-password": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "确认密码" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: passwordForm.value.confirmPassword,
                          "onUpdate:modelValue": ($event) => passwordForm.value.confirmPassword = $event,
                          type: "password",
                          placeholder: "请再次输入新密码",
                          "show-password": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: passwordForm.value.confirmPassword,
                            "onUpdate:modelValue": ($event) => passwordForm.value.confirmPassword = $event,
                            type: "password",
                            placeholder: "请再次输入新密码",
                            "show-password": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, { label: "用户名" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          "model-value": unref(username),
                          disabled: ""
                        }, null, 8, ["model-value"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "角色" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_tag, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(role)), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_divider),
                    createVNode(_component_el_form_item, { label: "原密码" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: passwordForm.value.oldPassword,
                          "onUpdate:modelValue": ($event) => passwordForm.value.oldPassword = $event,
                          type: "password",
                          placeholder: "请输入原密码",
                          "show-password": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "新密码" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: passwordForm.value.newPassword,
                          "onUpdate:modelValue": ($event) => passwordForm.value.newPassword = $event,
                          type: "password",
                          placeholder: "请输入新密码",
                          "show-password": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "确认密码" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: passwordForm.value.confirmPassword,
                          "onUpdate:modelValue": ($event) => passwordForm.value.confirmPassword = $event,
                          type: "password",
                          placeholder: "请再次输入新密码",
                          "show-password": ""
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
                "label-position": "top",
                onSubmit: withModifiers(handleChangePassword, ["prevent"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, { label: "用户名" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        "model-value": unref(username),
                        disabled: ""
                      }, null, 8, ["model-value"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "角色" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_tag, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(role)), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_divider),
                  createVNode(_component_el_form_item, { label: "原密码" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: passwordForm.value.oldPassword,
                        "onUpdate:modelValue": ($event) => passwordForm.value.oldPassword = $event,
                        type: "password",
                        placeholder: "请输入原密码",
                        "show-password": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "新密码" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: passwordForm.value.newPassword,
                        "onUpdate:modelValue": ($event) => passwordForm.value.newPassword = $event,
                        type: "password",
                        placeholder: "请输入新密码",
                        "show-password": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "确认密码" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: passwordForm.value.confirmPassword,
                        "onUpdate:modelValue": ($event) => passwordForm.value.confirmPassword = $event,
                        type: "password",
                        placeholder: "请再次输入新密码",
                        "show-password": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-3a922d8a"]]), { __name: "Header" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Menu",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { role } = useAuth();
    const isAdmin = computed(() => role.value === "SUPERADMIN" || role.value === "ADMIN");
    const isNotGuest = computed(() => role.value !== "GUEST");
    const isSuperAdmin = computed(() => role.value === "SUPERADMIN");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_menu = ElMenu;
      const _component_el_menu_item = ElMenuItem;
      const _component_el_icon = ElIcon;
      const _component_el_divider = ElDivider;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "menu-container" }, _attrs))} data-v-cf2c9ab0><div class="menu-logo" data-v-cf2c9ab0><span class="logo-icon" data-v-cf2c9ab0>📝</span><span class="logo-text" data-v-cf2c9ab0>CodeBlog</span></div>`);
      _push(ssrRenderComponent(_component_el_menu, {
        router: true,
        "default-active": unref(route).path,
        "background-color": "#1e1e2d",
        "text-color": "#a2a3b7",
        "active-text-color": "#fff",
        class: "side-menu"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_menu_item, { index: "/home" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(home_filled_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(home_filled_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<span data-v-cf2c9ab0${_scopeId2}>仪表盘</span>`);
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(home_filled_default))
                      ]),
                      _: 1
                    }),
                    createVNode("span", null, "仪表盘")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_menu_item, { index: "/articles" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(document_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(document_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<span data-v-cf2c9ab0${_scopeId2}>文章管理</span>`);
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(document_default))
                      ]),
                      _: 1
                    }),
                    createVNode("span", null, "文章管理")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_menu_item, { index: "/categories" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(folder_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(folder_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<span data-v-cf2c9ab0${_scopeId2}>分类管理</span>`);
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(folder_default))
                      ]),
                      _: 1
                    }),
                    createVNode("span", null, "分类管理")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_menu_item, { index: "/tags" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(price_tag_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(price_tag_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<span data-v-cf2c9ab0${_scopeId2}>标签管理</span>`);
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(price_tag_default))
                      ]),
                      _: 1
                    }),
                    createVNode("span", null, "标签管理")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (isAdmin.value) {
              _push2(ssrRenderComponent(_component_el_menu_item, { index: "/comments" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_icon, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(chat_dot_round_default), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(chat_dot_round_default))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<span data-v-cf2c9ab0${_scopeId2}>评论管理</span>`);
                  } else {
                    return [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(chat_dot_round_default))
                        ]),
                        _: 1
                      }),
                      createVNode("span", null, "评论管理")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (isNotGuest.value) {
              _push2(ssrRenderComponent(_component_el_menu_item, { index: "/media" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_icon, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(picture_default), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(picture_default))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<span data-v-cf2c9ab0${_scopeId2}>媒体管理</span>`);
                  } else {
                    return [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(picture_default))
                        ]),
                        _: 1
                      }),
                      createVNode("span", null, "媒体管理")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (isAdmin.value) {
              _push2(ssrRenderComponent(_component_el_menu_item, { index: "/user" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_icon, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(user_default), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(user_default))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<span data-v-cf2c9ab0${_scopeId2}>用户管理</span>`);
                  } else {
                    return [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(user_default))
                        ]),
                        _: 1
                      }),
                      createVNode("span", null, "用户管理")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (isSuperAdmin.value) {
              _push2(ssrRenderComponent(_component_el_menu_item, { index: "/setting" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_icon, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(setting_default), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(setting_default))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<span data-v-cf2c9ab0${_scopeId2}>站点设置</span>`);
                  } else {
                    return [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(setting_default))
                        ]),
                        _: 1
                      }),
                      createVNode("span", null, "站点设置")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (isAdmin.value) {
              _push2(ssrRenderComponent(_component_el_menu_item, { index: "/logs" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_icon, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(list_default), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(list_default))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<span data-v-cf2c9ab0${_scopeId2}>操作日志</span>`);
                  } else {
                    return [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(list_default))
                        ]),
                        _: 1
                      }),
                      createVNode("span", null, "操作日志")
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
              createVNode(_component_el_menu_item, { index: "/home" }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(home_filled_default))
                    ]),
                    _: 1
                  }),
                  createVNode("span", null, "仪表盘")
                ]),
                _: 1
              }),
              createVNode(_component_el_menu_item, { index: "/articles" }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(document_default))
                    ]),
                    _: 1
                  }),
                  createVNode("span", null, "文章管理")
                ]),
                _: 1
              }),
              createVNode(_component_el_menu_item, { index: "/categories" }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(folder_default))
                    ]),
                    _: 1
                  }),
                  createVNode("span", null, "分类管理")
                ]),
                _: 1
              }),
              createVNode(_component_el_menu_item, { index: "/tags" }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(price_tag_default))
                    ]),
                    _: 1
                  }),
                  createVNode("span", null, "标签管理")
                ]),
                _: 1
              }),
              isAdmin.value ? (openBlock(), createBlock(_component_el_menu_item, {
                key: 0,
                index: "/comments"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(chat_dot_round_default))
                    ]),
                    _: 1
                  }),
                  createVNode("span", null, "评论管理")
                ]),
                _: 1
              })) : createCommentVNode("", true),
              isNotGuest.value ? (openBlock(), createBlock(_component_el_menu_item, {
                key: 1,
                index: "/media"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(picture_default))
                    ]),
                    _: 1
                  }),
                  createVNode("span", null, "媒体管理")
                ]),
                _: 1
              })) : createCommentVNode("", true),
              isAdmin.value ? (openBlock(), createBlock(_component_el_menu_item, {
                key: 2,
                index: "/user"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(user_default))
                    ]),
                    _: 1
                  }),
                  createVNode("span", null, "用户管理")
                ]),
                _: 1
              })) : createCommentVNode("", true),
              isSuperAdmin.value ? (openBlock(), createBlock(_component_el_menu_item, {
                key: 3,
                index: "/setting"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(setting_default))
                    ]),
                    _: 1
                  }),
                  createVNode("span", null, "站点设置")
                ]),
                _: 1
              })) : createCommentVNode("", true),
              isAdmin.value ? (openBlock(), createBlock(_component_el_menu_item, {
                key: 4,
                index: "/logs"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(list_default))
                    ]),
                    _: 1
                  }),
                  createVNode("span", null, "操作日志")
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="menu-footer" data-v-cf2c9ab0>`);
      _push(ssrRenderComponent(_component_el_divider, { style: { "margin": "8px 16px", "border-color": "#2a2a3d" } }, null, _parent));
      _push(`<div class="back-to-site" data-v-cf2c9ab0>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(view_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(view_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span data-v-cf2c9ab0>返回博客</span></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Menu.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-cf2c9ab0"]]), { __name: "Menu" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Header = __nuxt_component_0;
  const _component_Menu = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-layout" }, _attrs))} data-v-d220b62c>`);
  _push(ssrRenderComponent(_component_Header, null, null, _parent));
  _push(`<div class="admin-body" data-v-d220b62c>`);
  _push(ssrRenderComponent(_component_Menu, null, null, _parent));
  _push(`<main class="admin-content" data-v-d220b62c><div class="content-inner" data-v-d220b62c>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></main></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-d220b62c"]]);

export { _default as default };
//# sourceMappingURL=default-DbF0nNDp.mjs.map
