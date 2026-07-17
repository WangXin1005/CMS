import { b as ElIcon, H as arrow_left_default, a1 as arrow_down_default, af as ElMenu, ag as ElMenuItem, ah as home_filled_default, v as document_default, ai as folder_default, aj as price_tag_default, ak as chat_dot_round_default, al as picture_default, k as user_default, am as setting_default, an as list_default, g as withNoopInstall, w as withInstall, E as ElMessage, d as buildProps, i as iconPropType, Q as componentSizes, e as definePropType, $ as useTooltipContentProps, ao as roleTypes, ap as useTooltipTriggerProps, W as EVENT_CODE, aq as composeEventHandlers, V as getEventCode, ar as OnlyChild, a as ElTooltip, t as useLocale, c as addUnit, as as whenMouse, q as flattedChildren, _ as _plugin_vue_export_helper_default } from './request-D_zzMMA3.mjs';
import { _ as _export_sfc, d as useRoute, j as isNumber, h as useId, g as useNamespace } from './server.mjs';
import { mergeProps, defineComponent, computed, ref, withCtx, unref, createVNode, createTextVNode, toDisplayString, withModifiers, openBlock, createBlock, createCommentVNode, inject, provide, toRef, readonly, watch, getCurrentInstance, useSSRContext, reactive, isVNode, cloneVNode, createElementBlock, normalizeStyle, normalizeClass, resolveDynamicComponent, renderSlot, useSlots, nextTick, resolveComponent, normalizeProps, guardReactiveProps, Fragment, createElementVNode, createSlots } from 'vue';
import { _ as __nuxt_component_0$1 } from './nuxt-link-rdY85wNa.mjs';
import { castArray } from 'lodash-unified';
import { E as ElButton, b as useFormSize } from './el-button-Ci-hQSxb.mjs';
import { E as ElScrollbar } from './el-scrollbar-DaqqO3rh.mjs';
import { useEventListener } from '@vueuse/core';
import { E as ElDialog, c as composeRefs } from './el-dialog-BYYfQCZn.mjs';
import { isString } from '@vue/shared';
import { placements } from '@popperjs/core';
import { E as ElForm, a as ElFormItem } from './el-form-item-CcZ4_kPm.mjs';
import { E as ElInput } from './el-input-BZXamVjT.mjs';
import { E as ElTag } from './index-Dn6mtLLY.mjs';
import { E as ElDivider } from './el-divider-TX88hCsp.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-Ln_QZRNp.mjs';
import 'axios';
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
import './ssr-1ZCkBfDH.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import './el-overlay-CUgtZWoK.mjs';
import './scroll-BmPP54RD.mjs';
import 'async-validator';
import './cookie-CqLf-Dw-.mjs';

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
    const size = computed(() => {
      var _a;
      return (_a = props.size) != null ? _a : avatarGroupContext == null ? void 0 : avatarGroupContext.size;
    });
    const shape = computed(() => {
      var _a, _b;
      return (_b = (_a = props.shape) != null ? _a : avatarGroupContext == null ? void 0 : avatarGroupContext.shape) != null ? _b : "circle";
    });
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
      var _a, _b;
      const avatars = flattedChildren((_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _b : []);
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
          content: () => createVNode("div", { "class": ns.e("collapse-avatars") }, [hiddenAvatars.map((node, idx) => {
            var _a2;
            return isVNode(node) ? cloneVNode(node, { key: (_a2 = node.key) != null ? _a2 : idx }) : node;
          })])
        }));
      }
      return createVNode("div", { "class": ns.b() }, [visibleAvatars]);
    };
  }
});
const ElAvatar = withInstall(avatar_default, { AvatarGroup: avatar_group_default });
withNoopInstall(avatar_group_default);
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
    var _a;
    const currentTabbedId = ref((_a = props.currentTabId || props.defaultCurrentTabId) != null ? _a : null);
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
      var _a2;
      (_a2 = props.onMousedown) == null ? void 0 : _a2.call(props, e);
    }, () => {
      isClickFocus.value = true;
    });
    const onFocus = composeEventHandlers((e) => {
      var _a2;
      (_a2 = props.onFocus) == null ? void 0 : _a2.call(props, e);
    }, (e) => {
      const isKeyboardFocus = !unref(isClickFocus);
      const { target, currentTarget } = e;
      if (target === currentTarget && isKeyboardFocus && !unref(isBackingOut)) {
        const entryFocusEvt = new Event(ENTRY_FOCUS_EVT, EVT_OPTS);
        currentTarget == null ? void 0 : currentTarget.dispatchEvent(entryFocusEvt);
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
      var _a2;
      (_a2 = props.onBlur) == null ? void 0 : _a2.call(props, e);
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
      currentTabbedId.value = val != null ? val : null;
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
      var _a;
      (_a = popperRef.value) == null ? void 0 : _a.onClose(void 0, 0);
    }
    function handleClose() {
      var _a;
      (_a = popperRef.value) == null ? void 0 : _a.onClose();
    }
    function handleOpen() {
      var _a;
      (_a = popperRef.value) == null ? void 0 : _a.onOpen();
    }
    const dropdownSize = useFormSize();
    function commandHandler(...args) {
      emit("command", ...args);
    }
    function onItemEnter() {
    }
    function onItemLeave() {
      const contentEl = unref(contentRef);
      trigger.value.includes("hover") && (contentEl == null ? void 0 : contentEl.focus({ preventScroll: true }));
      currentTabId.value = null;
    }
    function handleCurrentTabIdChange(id) {
      currentTabId.value = id;
    }
    function handleBeforeShowTooltip() {
      emit("visible-change", true);
    }
    function handleShowTooltip(event) {
      var _a;
      isUsingKeyboard.value = (event == null ? void 0 : event.type) === "keydown";
      (_a = contentRef.value) == null ? void 0 : _a.focus();
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
  var _a;
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
    "virtual-ref": (_a = _ctx.virtualRef) != null ? _a : _ctx.triggeringElementRef,
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
    _elDropdownSize: computed(() => elDropdown == null ? void 0 : elDropdown.dropdownSize)
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
      if (!e.defaultPrevented) target == null ? void 0 : target.focus({ preventScroll: true });
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
        var _a, _b, _c;
        if (props.disabled) {
          e.stopImmediatePropagation();
          return;
        }
        if ((_a = elDropdown == null ? void 0 : elDropdown.hideOnClick) == null ? void 0 : _a.value) (_b = elDropdown.handleClick) == null ? void 0 : _b.call(elDropdown);
        (_c = elDropdown.commandHandler) == null ? void 0 : _c.call(elDropdown, props.command, _instance, e);
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
      return [ns.b("menu"), ns.bm("menu", size == null ? void 0 : size.value)];
    });
    const dropdownListWrapperRef = composeRefs(contentRef, rovingFocusGroupRef, rovingFocusGroupCollectionRef);
    const handleKeydown = composeEventHandlers((e) => {
      var _a;
      (_a = props.onKeydown) == null ? void 0 : _a.call(props, e);
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
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const { username, role, logout, changePassword } = useAuth();
    const route = useRoute();
    const breadcrumbMap = {
      "/home": "\u4EEA\u8868\u76D8",
      "/articles": "\u6587\u7AE0\u7BA1\u7406",
      "/categories": "\u5206\u7C7B\u7BA1\u7406",
      "/tags": "\u6807\u7B7E\u7BA1\u7406",
      "/comments": "\u8BC4\u8BBA\u7BA1\u7406",
      "/media": "\u5A92\u4F53\u7BA1\u7406",
      "/users": "\u7528\u6237\u7BA1\u7406",
      "/settings": "\u7AD9\u70B9\u8BBE\u7F6E",
      "/logs": "\u64CD\u4F5C\u65E5\u5FD7"
    };
    computed(() => {
      const path = route.path;
      const items = [{ name: "\u9996\u9875", path: "/" }];
      if (path === "/") return items;
      if (path === "/home") {
        items.push({ name: "\u4EEA\u8868\u76D8", path: "" });
        return items;
      }
      if (path.startsWith("/articles/create")) {
        items.push({ name: "\u6587\u7AE0\u7BA1\u7406", path: "/articles" });
        items.push({ name: "\u521B\u5EFA\u6587\u7AE0", path: "" });
        return items;
      }
      const label = breadcrumbMap[path];
      if (label) items.push({ name: label, path: "" });
      return items;
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
        ElMessage.warning("\u8BF7\u586B\u5199\u5B8C\u6574\u4FE1\u606F");
        return;
      }
      if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
        ElMessage.warning("\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4");
        return;
      }
      passwordLoading.value = true;
      try {
        await changePassword({
          oldPassword: passwordForm.value.oldPassword,
          newPassword: passwordForm.value.newPassword
        });
        ElMessage.success("\u5BC6\u7801\u4FEE\u6539\u6210\u529F");
        dialogVisible.value = false;
      } catch (e) {
      } finally {
        passwordLoading.value = false;
      }
    }
    function handleCommand(command) {
      var _a, _b;
      (_b = (_a = (void 0).activeElement) == null ? void 0 : _a.blur) == null ? void 0 : _b.call(_a);
      if (command === "setting") {
        openDialog();
      } else if (command === "logout") {
        logout();
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_header = ElHeader;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_el_icon = ElIcon;
      const _component_el_dropdown = ElDropdown;
      const _component_el_avatar = ElAvatar;
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
            _push2(`<div class="header-left" data-v-38be4280${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/",
              class: "back-blog-btn"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_icon, { class: "back-icon" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(arrow_left_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(arrow_left_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<span data-v-38be4280${_scopeId2}>\u8FD4 \u56DE \u535A \u5BA2</span>`);
                } else {
                  return [
                    createVNode(_component_el_icon, { class: "back-icon" }, {
                      default: withCtx(() => [
                        createVNode(unref(arrow_left_default))
                      ]),
                      _: 1
                    }),
                    createVNode("span", null, "\u8FD4 \u56DE \u535A \u5BA2")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="header-right" data-v-38be4280${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_dropdown, {
              trigger: "click",
              onCommand: handleCommand
            }, {
              dropdown: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_dropdown_item, { command: "setting" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u4E2A\u4EBA\u8BBE\u7F6E`);
                      } else {
                        return [
                          createTextVNode("\u4E2A\u4EBA\u8BBE\u7F6E")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_dropdown_item, { command: "logout" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`\u9000\u51FA\u767B\u5F55`);
                      } else {
                        return [
                          createTextVNode("\u9000\u51FA\u767B\u5F55")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_dropdown_item, { command: "setting" }, {
                      default: withCtx(() => [
                        createTextVNode("\u4E2A\u4EBA\u8BBE\u7F6E")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_dropdown_item, { command: "logout" }, {
                      default: withCtx(() => [
                        createTextVNode("\u9000\u51FA\u767B\u5F55")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="user-info" data-v-38be4280${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_avatar, {
                    size: 32,
                    class: "user-avatar"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a, _b, _c, _d;
                      if (_push4) {
                        _push4(`${ssrInterpolate((_b = (_a = unref(username)) == null ? void 0 : _a.charAt(0)) == null ? void 0 : _b.toUpperCase())}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString((_d = (_c = unref(username)) == null ? void 0 : _c.charAt(0)) == null ? void 0 : _d.toUpperCase()), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<span class="username" data-v-38be4280${_scopeId2}>${ssrInterpolate(unref(username))}</span>`);
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
                        default: withCtx(() => {
                          var _a, _b;
                          return [
                            createTextVNode(toDisplayString((_b = (_a = unref(username)) == null ? void 0 : _a.charAt(0)) == null ? void 0 : _b.toUpperCase()), 1)
                          ];
                        }),
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
                createVNode(_component_NuxtLink, {
                  to: "/",
                  class: "back-blog-btn"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon, { class: "back-icon" }, {
                      default: withCtx(() => [
                        createVNode(unref(arrow_left_default))
                      ]),
                      _: 1
                    }),
                    createVNode("span", null, "\u8FD4 \u56DE \u535A \u5BA2")
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "header-right" }, [
                createVNode(_component_el_dropdown, {
                  trigger: "click",
                  onCommand: handleCommand
                }, {
                  dropdown: withCtx(() => [
                    createVNode(_component_el_dropdown_item, { command: "setting" }, {
                      default: withCtx(() => [
                        createTextVNode("\u4E2A\u4EBA\u8BBE\u7F6E")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_dropdown_item, { command: "logout" }, {
                      default: withCtx(() => [
                        createTextVNode("\u9000\u51FA\u767B\u5F55")
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
                        default: withCtx(() => {
                          var _a, _b;
                          return [
                            createTextVNode(toDisplayString((_b = (_a = unref(username)) == null ? void 0 : _a.charAt(0)) == null ? void 0 : _b.toUpperCase()), 1)
                          ];
                        }),
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
        title: "\u4E2A\u4EBA\u8BBE\u7F6E",
        width: "420px"
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
              loading: passwordLoading.value,
              onClick: handleChangePassword
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u786E\u8BA4\u4FEE\u6539`);
                } else {
                  return [
                    createTextVNode("\u786E\u8BA4\u4FEE\u6539")
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
                loading: passwordLoading.value,
                onClick: handleChangePassword
              }, {
                default: withCtx(() => [
                  createTextVNode("\u786E\u8BA4\u4FEE\u6539")
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
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u7528\u6237\u540D" }, {
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
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u89D2\u8272" }, {
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
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u539F\u5BC6\u7801" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: passwordForm.value.oldPassword,
                          "onUpdate:modelValue": ($event) => passwordForm.value.oldPassword = $event,
                          type: "password",
                          placeholder: "\u8BF7\u8F93\u5165\u539F\u5BC6\u7801",
                          "show-password": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: passwordForm.value.oldPassword,
                            "onUpdate:modelValue": ($event) => passwordForm.value.oldPassword = $event,
                            type: "password",
                            placeholder: "\u8BF7\u8F93\u5165\u539F\u5BC6\u7801",
                            "show-password": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u65B0\u5BC6\u7801" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: passwordForm.value.newPassword,
                          "onUpdate:modelValue": ($event) => passwordForm.value.newPassword = $event,
                          type: "password",
                          placeholder: "\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801",
                          "show-password": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: passwordForm.value.newPassword,
                            "onUpdate:modelValue": ($event) => passwordForm.value.newPassword = $event,
                            type: "password",
                            placeholder: "\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801",
                            "show-password": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "\u786E\u8BA4\u5BC6\u7801" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: passwordForm.value.confirmPassword,
                          "onUpdate:modelValue": ($event) => passwordForm.value.confirmPassword = $event,
                          type: "password",
                          placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u65B0\u5BC6\u7801",
                          "show-password": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: passwordForm.value.confirmPassword,
                            "onUpdate:modelValue": ($event) => passwordForm.value.confirmPassword = $event,
                            type: "password",
                            placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u65B0\u5BC6\u7801",
                            "show-password": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, { label: "\u7528\u6237\u540D" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          "model-value": unref(username),
                          disabled: ""
                        }, null, 8, ["model-value"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u89D2\u8272" }, {
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
                    createVNode(_component_el_form_item, { label: "\u539F\u5BC6\u7801" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: passwordForm.value.oldPassword,
                          "onUpdate:modelValue": ($event) => passwordForm.value.oldPassword = $event,
                          type: "password",
                          placeholder: "\u8BF7\u8F93\u5165\u539F\u5BC6\u7801",
                          "show-password": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u65B0\u5BC6\u7801" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: passwordForm.value.newPassword,
                          "onUpdate:modelValue": ($event) => passwordForm.value.newPassword = $event,
                          type: "password",
                          placeholder: "\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801",
                          "show-password": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "\u786E\u8BA4\u5BC6\u7801" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: passwordForm.value.confirmPassword,
                          "onUpdate:modelValue": ($event) => passwordForm.value.confirmPassword = $event,
                          type: "password",
                          placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u65B0\u5BC6\u7801",
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
                  createVNode(_component_el_form_item, { label: "\u7528\u6237\u540D" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        "model-value": unref(username),
                        disabled: ""
                      }, null, 8, ["model-value"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u89D2\u8272" }, {
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
                  createVNode(_component_el_form_item, { label: "\u539F\u5BC6\u7801" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: passwordForm.value.oldPassword,
                        "onUpdate:modelValue": ($event) => passwordForm.value.oldPassword = $event,
                        type: "password",
                        placeholder: "\u8BF7\u8F93\u5165\u539F\u5BC6\u7801",
                        "show-password": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u65B0\u5BC6\u7801" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: passwordForm.value.newPassword,
                        "onUpdate:modelValue": ($event) => passwordForm.value.newPassword = $event,
                        type: "password",
                        placeholder: "\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801",
                        "show-password": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u786E\u8BA4\u5BC6\u7801" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: passwordForm.value.confirmPassword,
                        "onUpdate:modelValue": ($event) => passwordForm.value.confirmPassword = $event,
                        type: "password",
                        placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u65B0\u5BC6\u7801",
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
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-38be4280"]]), { __name: "Header" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Menu",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const siteLogo = ref("");
    const siteName = ref("CodeBlog");
    const { role } = useAuth();
    const isAdmin = computed(() => role.value === "SUPERADMIN" || role.value === "ADMIN");
    const isNotGuest = computed(() => role.value !== "GUEST");
    const isSuperAdmin = computed(() => role.value === "SUPERADMIN");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_menu = ElMenu;
      const _component_el_menu_item = ElMenuItem;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "menu-container" }, _attrs))} data-v-66d8b4f9><div class="menu-logo" data-v-66d8b4f9><span class="logo-icon" data-v-66d8b4f9>`);
      if (siteLogo.value) {
        _push(`<img${ssrRenderAttr("src", siteLogo.value)} class="logo-img" alt="logo" data-v-66d8b4f9>`);
      } else {
        _push(`<span class="logo-emoji" data-v-66d8b4f9>\u{1F4DD}</span>`);
      }
      _push(`</span><span class="logo-text" data-v-66d8b4f9>${ssrInterpolate(siteName.value)}</span></div>`);
      _push(ssrRenderComponent(_component_el_menu, {
        router: true,
        "default-active": unref(route).path,
        "background-color": "#1e1e2d",
        "text-color": "#a2a3b7",
        "active-text-color": "#fff",
        class: "side-menu",
        style: { "width": "100%", "border-right": "none" }
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
                  _push3(`<span data-v-66d8b4f9${_scopeId2}>\u4EEA\u8868\u76D8</span>`);
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(home_filled_default))
                      ]),
                      _: 1
                    }),
                    createVNode("span", null, "\u4EEA\u8868\u76D8")
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
                  _push3(`<span data-v-66d8b4f9${_scopeId2}>\u6587\u7AE0\u7BA1\u7406</span>`);
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(document_default))
                      ]),
                      _: 1
                    }),
                    createVNode("span", null, "\u6587\u7AE0\u7BA1\u7406")
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
                  _push3(`<span data-v-66d8b4f9${_scopeId2}>\u5206\u7C7B\u7BA1\u7406</span>`);
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(folder_default))
                      ]),
                      _: 1
                    }),
                    createVNode("span", null, "\u5206\u7C7B\u7BA1\u7406")
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
                  _push3(`<span data-v-66d8b4f9${_scopeId2}>\u6807\u7B7E\u7BA1\u7406</span>`);
                } else {
                  return [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(unref(price_tag_default))
                      ]),
                      _: 1
                    }),
                    createVNode("span", null, "\u6807\u7B7E\u7BA1\u7406")
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
                    _push3(`<span data-v-66d8b4f9${_scopeId2}>\u8BC4\u8BBA\u7BA1\u7406</span>`);
                  } else {
                    return [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(chat_dot_round_default))
                        ]),
                        _: 1
                      }),
                      createVNode("span", null, "\u8BC4\u8BBA\u7BA1\u7406")
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
                    _push3(`<span data-v-66d8b4f9${_scopeId2}>\u5A92\u4F53\u7BA1\u7406</span>`);
                  } else {
                    return [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(picture_default))
                        ]),
                        _: 1
                      }),
                      createVNode("span", null, "\u5A92\u4F53\u7BA1\u7406")
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
                    _push3(`<span data-v-66d8b4f9${_scopeId2}>\u7528\u6237\u7BA1\u7406</span>`);
                  } else {
                    return [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(user_default))
                        ]),
                        _: 1
                      }),
                      createVNode("span", null, "\u7528\u6237\u7BA1\u7406")
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
                    _push3(`<span data-v-66d8b4f9${_scopeId2}>\u7AD9\u70B9\u8BBE\u7F6E</span>`);
                  } else {
                    return [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(setting_default))
                        ]),
                        _: 1
                      }),
                      createVNode("span", null, "\u7AD9\u70B9\u8BBE\u7F6E")
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
                    _push3(`<span data-v-66d8b4f9${_scopeId2}>\u64CD\u4F5C\u65E5\u5FD7</span>`);
                  } else {
                    return [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(unref(list_default))
                        ]),
                        _: 1
                      }),
                      createVNode("span", null, "\u64CD\u4F5C\u65E5\u5FD7")
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
                  createVNode("span", null, "\u4EEA\u8868\u76D8")
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
                  createVNode("span", null, "\u6587\u7AE0\u7BA1\u7406")
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
                  createVNode("span", null, "\u5206\u7C7B\u7BA1\u7406")
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
                  createVNode("span", null, "\u6807\u7B7E\u7BA1\u7406")
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
                  createVNode("span", null, "\u8BC4\u8BBA\u7BA1\u7406")
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
                  createVNode("span", null, "\u5A92\u4F53\u7BA1\u7406")
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
                  createVNode("span", null, "\u7528\u6237\u7BA1\u7406")
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
                  createVNode("span", null, "\u7AD9\u70B9\u8BBE\u7F6E")
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
                  createVNode("span", null, "\u64CD\u4F5C\u65E5\u5FD7")
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Menu.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-66d8b4f9"]]), { __name: "Menu" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Header = __nuxt_component_0;
  const _component_Menu = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-layout" }, _attrs))} data-v-7539a92f>`);
  _push(ssrRenderComponent(_component_Header, null, null, _parent));
  _push(`<div class="admin-body" data-v-7539a92f>`);
  _push(ssrRenderComponent(_component_Menu, null, null, _parent));
  _push(`<main class="admin-content" data-v-7539a92f><div class="content-inner" data-v-7539a92f>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></main></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-7539a92f"]]);

export { _default as default };
//# sourceMappingURL=default-BU-bHSqb.mjs.map
