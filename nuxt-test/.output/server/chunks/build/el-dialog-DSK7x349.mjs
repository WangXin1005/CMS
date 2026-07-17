import { w as withInstall, c as buildProps, i as iconPropType, d as definePropType, g as useGlobalConfig, b as addUnit, n as useLocale, a as ElIcon, ah as CloseComponents } from './request-C7D5KCOD.mjs';
import { f as useDeprecated, U as UPDATE_MODEL_EVENT } from './el-button-BJk5PihZ.mjs';
import { g as useNamespace, i as isBoolean, o as useZIndex, h as useId, f as debugWarn } from './server.mjs';
import { E as ElOverlay, u as useLockscreen, b as useSameTarget, a as useDraggable } from './el-overlay-Bs80FkLO.mjs';
import { f as focus_trap_default$1, F as FOCUS_TRAP_INJECTION_KEY } from './scroll-DbhaYLWL.mjs';
import { defineComponent, useSlots, computed, ref, provide, openBlock, createBlock, Teleport, createVNode, Transition, mergeProps, unref, withCtx, withDirectives, createElementVNode, normalizeStyle, normalizeClass, createSlots, renderSlot, createCommentVNode, vShow, getCurrentInstance, watch, nextTick, inject, createElementBlock, toDisplayString, resolveDynamicComponent } from 'vue';
import { useTimeoutFn, isClient } from '@vueuse/core';
import { isObject, isArray, isFunction } from '@vue/shared';

const dialogContentProps = buildProps({
  /**
  * @description whether to align the header and footer in center
  */
  center: Boolean,
  /**
  * @description whether to align the dialog both horizontally and vertically
  */
  alignCenter: {
    type: Boolean,
    default: void 0
  },
  /**
  * @description custom close icon, default is Close
  */
  closeIcon: { type: iconPropType },
  /**
  * @description enable dragging feature for Dialog
  */
  draggable: {
    type: Boolean,
    default: void 0
  },
  /**
  * @description draggable Dialog can overflow the viewport
  */
  overflow: {
    type: Boolean,
    default: void 0
  },
  /**
  * @description whether the Dialog takes up full screen
  */
  fullscreen: Boolean,
  /**
  * @description custom class names for header wrapper
  */
  headerClass: String,
  /**
  * @description custom class names for body wrapper
  */
  bodyClass: String,
  /**
  * @description custom class names for footer wrapper
  */
  footerClass: String,
  /**
  * @description whether to show a close button
  */
  showClose: {
    type: Boolean,
    default: true
  },
  /**
  * @description title of Dialog. Can also be passed with a named slot (see the following table)
  */
  title: {
    type: String,
    default: ""
  },
  /**
  * @description header's aria-level attribute
  */
  ariaLevel: {
    type: String,
    default: "2"
  }
});
const dialogContentEmits = { close: () => true };
const dialogProps = buildProps({
  ...dialogContentProps,
  /**
  * @description whether to append Dialog itself to body. A nested Dialog should have this attribute set to `true`
  */
  appendToBody: Boolean,
  /**
  * @description which element the Dialog appends to
  */
  appendTo: {
    type: definePropType([String, Object]),
    default: "body"
  },
  /**
  * @description callback before Dialog closes, and it will prevent Dialog from closing, use done to close the dialog
  */
  beforeClose: { type: definePropType(Function) },
  /**
  * @description destroy elements in Dialog when closed
  */
  destroyOnClose: Boolean,
  /**
  * @description whether the Dialog can be closed by clicking the mask
  */
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  /**
  * @description whether the Dialog can be closed by pressing ESC
  */
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  /**
  * @description whether scroll of body is disabled while Dialog is displayed
  */
  lockScroll: {
    type: Boolean,
    default: true
  },
  /**
  * @description whether a mask is displayed
  */
  modal: {
    type: Boolean,
    default: true
  },
  /**
  * @description whether the mask is penetrable
  */
  modalPenetrable: Boolean,
  /**
  * @description the Time(milliseconds) before open
  */
  openDelay: {
    type: Number,
    default: 0
  },
  /**
  * @description the Time(milliseconds) before close
  */
  closeDelay: {
    type: Number,
    default: 0
  },
  /**
  * @description value for `margin-top` of Dialog CSS, default is 15vh
  */
  top: { type: String },
  /**
  * @description visibility of Dialog
  */
  modelValue: Boolean,
  /**
  * @description custom class names for mask
  */
  modalClass: String,
  /**
  * @description custom class names for header wrapper
  */
  headerClass: String,
  /**
  * @description custom class names for body wrapper
  */
  bodyClass: String,
  /**
  * @description custom class names for footer wrapper
  */
  footerClass: String,
  /**
  * @description width of Dialog, default is 50%
  */
  width: { type: [String, Number] },
  /**
  * @description same as z-index in native CSS, z-order of dialog
  */
  zIndex: { type: Number },
  trapFocus: Boolean,
  /**
  * @description header's aria-level attribute
  */
  headerAriaLevel: {
    type: String,
    default: "2"
  },
  /**
  * @description custom transition configuration for dialog animation, it can be a string (transition name) or an object with Vue transition props
  */
  transition: {
    type: definePropType([String, Object]),
    default: void 0
  }
});
const dialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  [UPDATE_MODEL_EVENT]: (value) => isBoolean(value),
  openAutoFocus: () => true,
  closeAutoFocus: () => true
};
const dialogInjectionKey = /* @__PURE__ */ Symbol("dialogInjectionKey");
const DEFAULT_DIALOG_TRANSITION = "dialog-fade";
const COMPONENT_NAME = "ElDialog";
const useDialog = (props, targetRef) => {
  var _a;
  const emit = getCurrentInstance().emit;
  const { nextZIndex } = useZIndex();
  let lastPosition = "";
  const titleId = useId();
  const bodyId = useId();
  const visible = ref(false);
  const closed = ref(false);
  const rendered = ref(false);
  const zIndex = ref((_a = props.zIndex) != null ? _a : nextZIndex());
  const closing = ref(false);
  let openTimer = void 0;
  let closeTimer = void 0;
  const config = useGlobalConfig();
  const namespace = computed(() => {
    var _a2, _b;
    return (_b = (_a2 = config.value) == null ? void 0 : _a2.namespace) != null ? _b : "el";
  });
  const globalConfig = computed(() => {
    var _a2;
    return (_a2 = config.value) == null ? void 0 : _a2.dialog;
  });
  const style = computed(() => {
    const style2 = {};
    const varPrefix = `--${namespace.value}-dialog`;
    if (!props.fullscreen) {
      if (props.top) style2[`${varPrefix}-margin-top`] = props.top;
      const width = addUnit(props.width);
      if (width) style2[`${varPrefix}-width`] = width;
    }
    return style2;
  });
  const _draggable = computed(() => {
    var _a2, _b, _c;
    return ((_c = (_b = props.draggable) != null ? _b : (_a2 = globalConfig.value) == null ? void 0 : _a2.draggable) != null ? _c : false) && !props.fullscreen;
  });
  const _alignCenter = computed(() => {
    var _a2, _b, _c;
    return (_c = (_b = props.alignCenter) != null ? _b : (_a2 = globalConfig.value) == null ? void 0 : _a2.alignCenter) != null ? _c : false;
  });
  const _overflow = computed(() => {
    var _a2, _b, _c;
    return (_c = (_b = props.overflow) != null ? _b : (_a2 = globalConfig.value) == null ? void 0 : _a2.overflow) != null ? _c : false;
  });
  const penetrable = computed(() => props.modalPenetrable && !props.modal && !props.fullscreen);
  const overlayDialogStyle = computed(() => {
    if (_alignCenter.value) return { display: "flex" };
    return {};
  });
  const transitionConfig = computed(() => {
    var _a2, _b, _c;
    const transition = (_c = (_b = props.transition) != null ? _b : (_a2 = globalConfig.value) == null ? void 0 : _a2.transition) != null ? _c : "dialog-fade";
    const baseConfig = {
      name: transition,
      onAfterEnter: afterEnter,
      onBeforeLeave: beforeLeave,
      onAfterLeave: afterLeave
    };
    if (isObject(transition)) {
      const config2 = { ...transition };
      const _mergeHook = (userHook, defaultHook) => {
        return (el) => {
          if (isArray(userHook)) userHook.forEach((fn) => {
            if (isFunction(fn)) fn(el);
          });
          else if (isFunction(userHook)) userHook(el);
          defaultHook();
        };
      };
      config2.onAfterEnter = _mergeHook(config2.onAfterEnter, afterEnter);
      config2.onBeforeLeave = _mergeHook(config2.onBeforeLeave, beforeLeave);
      config2.onAfterLeave = _mergeHook(config2.onAfterLeave, afterLeave);
      if (!config2.name) {
        config2.name = DEFAULT_DIALOG_TRANSITION;
        debugWarn(COMPONENT_NAME, `transition.name is missing when using object syntax, fallback to '${DEFAULT_DIALOG_TRANSITION}'`);
      }
      return config2;
    }
    return baseConfig;
  });
  function afterEnter() {
    emit("opened");
  }
  function afterLeave() {
    emit("closed");
    emit(UPDATE_MODEL_EVENT, false);
    if (props.destroyOnClose) rendered.value = false;
    closing.value = false;
  }
  function beforeLeave() {
    closing.value = true;
    emit("close");
  }
  function open() {
    closeTimer == null ? void 0 : closeTimer();
    openTimer == null ? void 0 : openTimer();
    if (props.openDelay && props.openDelay > 0) ({ stop: openTimer } = useTimeoutFn(() => doOpen(), props.openDelay));
    else doOpen();
  }
  function close() {
    openTimer == null ? void 0 : openTimer();
    closeTimer == null ? void 0 : closeTimer();
    if (props.closeDelay && props.closeDelay > 0) ({ stop: closeTimer } = useTimeoutFn(() => doClose(), props.closeDelay));
    else doClose();
  }
  function handleClose() {
    function hide(shouldCancel) {
      if (shouldCancel) return;
      closed.value = true;
      visible.value = false;
    }
    if (props.beforeClose) props.beforeClose(hide);
    else close();
  }
  function onModalClick() {
    if (props.closeOnClickModal) handleClose();
  }
  function doOpen() {
    if (!isClient) return;
    visible.value = true;
  }
  function doClose() {
    visible.value = false;
  }
  function onOpenAutoFocus() {
    emit("openAutoFocus");
  }
  function onCloseAutoFocus() {
    emit("closeAutoFocus");
  }
  function onFocusoutPrevented(event) {
    var _a2;
    if (((_a2 = event.detail) == null ? void 0 : _a2.focusReason) === "pointer") event.preventDefault();
  }
  if (props.lockScroll) useLockscreen(visible);
  function onCloseRequested() {
    if (props.closeOnPressEscape) handleClose();
  }
  function bringToFront() {
    if (!visible.value || !penetrable.value || props.zIndex !== void 0) return;
    zIndex.value = nextZIndex();
  }
  watch(() => props.zIndex, () => {
    var _a2;
    zIndex.value = (_a2 = props.zIndex) != null ? _a2 : nextZIndex();
  });
  watch(() => props.modelValue, (val) => {
    var _a2;
    if (val) {
      closed.value = false;
      closing.value = false;
      open();
      rendered.value = true;
      zIndex.value = (_a2 = props.zIndex) != null ? _a2 : nextZIndex();
      nextTick(() => {
        emit("open");
        if (targetRef.value) {
          targetRef.value.parentElement.scrollTop = 0;
          targetRef.value.parentElement.scrollLeft = 0;
          targetRef.value.scrollTop = 0;
        }
      });
    } else if (visible.value) close();
  });
  watch(() => props.fullscreen, (val) => {
    if (!targetRef.value) return;
    if (val) {
      lastPosition = targetRef.value.style.transform;
      targetRef.value.style.transform = "";
    } else targetRef.value.style.transform = lastPosition;
  });
  return {
    afterEnter,
    afterLeave,
    beforeLeave,
    handleClose,
    onModalClick,
    close,
    doClose,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onCloseRequested,
    onFocusoutPrevented,
    bringToFront,
    titleId,
    bodyId,
    closed,
    style,
    overlayDialogStyle,
    rendered,
    visible,
    zIndex,
    transitionConfig,
    _draggable,
    _alignCenter,
    _overflow,
    closing,
    penetrable
  };
};
const composeRefs = (...refs) => {
  return (el) => {
    refs.forEach((ref2) => {
      ref2.value = el;
    });
  };
};
const _hoisted_1$1 = ["aria-level"];
const _hoisted_2 = ["aria-label"];
const _hoisted_3 = ["id"];
var dialog_content_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElDialogContent",
  __name: "dialog-content",
  props: dialogContentProps,
  emits: dialogContentEmits,
  setup(__props, { expose: __expose }) {
    const { t } = useLocale();
    const { Close } = CloseComponents;
    const props = __props;
    const { dialogRef, headerRef, bodyId, ns, style } = inject(dialogInjectionKey);
    const { focusTrapRef } = inject(FOCUS_TRAP_INJECTION_KEY);
    const composedDialogRef = composeRefs(focusTrapRef, dialogRef);
    const draggable = computed(() => !!props.draggable);
    const { resetPosition, updatePosition, isDragging } = useDraggable(dialogRef, headerRef, draggable, computed(() => !!props.overflow));
    const dialogKls = computed(() => [
      ns.b(),
      ns.is("fullscreen", props.fullscreen),
      ns.is("draggable", draggable.value),
      ns.is("dragging", isDragging.value),
      ns.is("align-center", !!props.alignCenter),
      { [ns.m("center")]: props.center }
    ]);
    __expose({
      resetPosition,
      updatePosition
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref: unref(composedDialogRef),
        class: normalizeClass(dialogKls.value),
        style: normalizeStyle(unref(style)),
        tabindex: "-1"
      }, [
        createElementVNode("header", {
          ref_key: "headerRef",
          ref: headerRef,
          class: normalizeClass([
            unref(ns).e("header"),
            __props.headerClass,
            { "show-close": __props.showClose }
          ])
        }, [renderSlot(_ctx.$slots, "header", {}, () => [createElementVNode("span", {
          role: "heading",
          "aria-level": __props.ariaLevel,
          class: normalizeClass(unref(ns).e("title"))
        }, toDisplayString(__props.title), 11, _hoisted_1$1)]), __props.showClose ? (openBlock(), createElementBlock("button", {
          key: 0,
          "aria-label": unref(t)("el.dialog.close"),
          class: normalizeClass(unref(ns).e("headerbtn")),
          type: "button",
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
        }, [createVNode(unref(ElIcon), { class: normalizeClass(unref(ns).e("close")) }, {
          default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.closeIcon || unref(Close))))]),
          _: 1
        }, 8, ["class"])], 10, _hoisted_2)) : createCommentVNode("v-if", true)], 2),
        createElementVNode("div", {
          id: unref(bodyId),
          class: normalizeClass([unref(ns).e("body"), __props.bodyClass])
        }, [renderSlot(_ctx.$slots, "default")], 10, _hoisted_3),
        _ctx.$slots.footer ? (openBlock(), createElementBlock("footer", {
          key: 0,
          class: normalizeClass([unref(ns).e("footer"), __props.footerClass])
        }, [renderSlot(_ctx.$slots, "footer")], 2)) : createCommentVNode("v-if", true)
      ], 6);
    };
  }
});
var dialog_content_default = dialog_content_vue_vue_type_script_setup_true_lang_default;
const _hoisted_1 = [
  "aria-label",
  "aria-labelledby",
  "aria-describedby"
];
var dialog_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElDialog",
  inheritAttrs: false,
  __name: "dialog",
  props: dialogProps,
  emits: dialogEmits,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const slots = useSlots();
    useDeprecated({
      scope: "el-dialog",
      from: "the title slot",
      replacement: "the header slot",
      version: "3.0.0",
      ref: "https://element-plus.org/en-US/component/dialog.html#slots"
    }, computed(() => !!slots.title));
    const ns = useNamespace("dialog");
    const dialogRef = ref();
    const headerRef = ref();
    const dialogContentRef = ref();
    const { visible, titleId, bodyId, style, overlayDialogStyle, rendered, transitionConfig, zIndex, _draggable, _alignCenter, _overflow, penetrable, handleClose, onModalClick, onOpenAutoFocus, onCloseAutoFocus, onCloseRequested, onFocusoutPrevented, bringToFront, closing } = useDialog(props, dialogRef);
    provide(dialogInjectionKey, {
      dialogRef,
      headerRef,
      bodyId,
      ns,
      rendered,
      style
    });
    const overlayEvent = useSameTarget(onModalClick);
    const resetPosition = () => {
      var _a;
      (_a = dialogContentRef.value) == null ? void 0 : _a.resetPosition();
    };
    __expose({
      /** @description whether the dialog is visible */
      visible,
      dialogContentRef,
      resetPosition,
      handleClose
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, {
        to: __props.appendTo,
        disabled: __props.appendTo !== "body" ? false : !__props.appendToBody
      }, [createVNode(Transition, mergeProps(unref(transitionConfig), { persisted: "" }), {
        default: withCtx(() => {
          var _a;
          return [withDirectives(createVNode(unref(ElOverlay), {
            "custom-mask-event": "",
            mask: __props.modal,
            "overlay-class": [
              (_a = __props.modalClass) != null ? _a : "",
              `${unref(ns).namespace.value}-modal-dialog`,
              unref(ns).is("penetrable", unref(penetrable))
            ],
            "z-index": unref(zIndex)
          }, {
            default: withCtx(() => [createElementVNode("div", {
              role: "dialog",
              "aria-modal": "true",
              "aria-label": __props.title || void 0,
              "aria-labelledby": !__props.title ? unref(titleId) : void 0,
              "aria-describedby": unref(bodyId),
              class: normalizeClass([`${unref(ns).namespace.value}-overlay-dialog`, unref(ns).is("closing", unref(closing))]),
              style: normalizeStyle(unref(overlayDialogStyle)),
              onClick: _cache[0] || (_cache[0] = (...args) => unref(overlayEvent).onClick && unref(overlayEvent).onClick(...args)),
              onMousedown: _cache[1] || (_cache[1] = (...args) => unref(overlayEvent).onMousedown && unref(overlayEvent).onMousedown(...args)),
              onMouseup: _cache[2] || (_cache[2] = (...args) => unref(overlayEvent).onMouseup && unref(overlayEvent).onMouseup(...args))
            }, [createVNode(unref(focus_trap_default$1), {
              loop: "",
              trapped: unref(visible),
              "focus-start-el": "container",
              onFocusAfterTrapped: unref(onOpenAutoFocus),
              onFocusAfterReleased: unref(onCloseAutoFocus),
              onFocusoutPrevented: unref(onFocusoutPrevented),
              onReleaseRequested: unref(onCloseRequested)
            }, {
              default: withCtx(() => [unref(rendered) ? (openBlock(), createBlock(dialog_content_default, mergeProps({
                key: 0,
                ref_key: "dialogContentRef",
                ref: dialogContentRef
              }, _ctx.$attrs, {
                center: __props.center,
                "align-center": unref(_alignCenter),
                "close-icon": __props.closeIcon,
                draggable: unref(_draggable),
                overflow: unref(_overflow),
                fullscreen: __props.fullscreen,
                "header-class": __props.headerClass,
                "body-class": __props.bodyClass,
                "footer-class": __props.footerClass,
                "show-close": __props.showClose,
                title: __props.title,
                "aria-level": __props.headerAriaLevel,
                onClose: unref(handleClose),
                onMousedown: unref(bringToFront)
              }), createSlots({
                header: withCtx(() => [!_ctx.$slots.title ? renderSlot(_ctx.$slots, "header", {
                  key: 0,
                  close: unref(handleClose),
                  titleId: unref(titleId),
                  titleClass: unref(ns).e("title")
                }) : renderSlot(_ctx.$slots, "title", { key: 1 })]),
                default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
                _: 2
              }, [_ctx.$slots.footer ? {
                name: "footer",
                fn: withCtx(() => [renderSlot(_ctx.$slots, "footer")]),
                key: "0"
              } : void 0]), 1040, [
                "center",
                "align-center",
                "close-icon",
                "draggable",
                "overflow",
                "fullscreen",
                "header-class",
                "body-class",
                "footer-class",
                "show-close",
                "title",
                "aria-level",
                "onClose",
                "onMousedown"
              ])) : createCommentVNode("v-if", true)]),
              _: 3
            }, 8, [
              "trapped",
              "onFocusAfterTrapped",
              "onFocusAfterReleased",
              "onFocusoutPrevented",
              "onReleaseRequested"
            ])], 46, _hoisted_1)]),
            _: 3
          }, 8, [
            "mask",
            "overlay-class",
            "z-index"
          ]), [[vShow, unref(visible)]])];
        }),
        _: 3
      }, 16)], 8, ["to", "disabled"]);
    };
  }
});
var dialog_default = dialog_vue_vue_type_script_setup_true_lang_default;
const ElDialog = withInstall(dialog_default);

export { ElDialog as E, composeRefs as c };
//# sourceMappingURL=el-dialog-DSK7x349.mjs.map
