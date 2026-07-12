import { p as plus_default, w as withInstall, E as ElMessage, t as useLocale, d as buildProps, e as definePropType, b as ElIcon, v as document_default, x as circle_check_default, y as check_default, z as close_default, A as zoom_in_default, B as delete_default, m as mutable, C as entriesOf, D as scale_to_original_default, F as full_screen_default, G as focus_trap_default$1, H as arrow_left_default, I as arrow_right_default, J as zoom_out_default, K as refresh_left_default, L as refresh_right_default, M as warning_filled_default, N as circle_close_default, O as keysOf } from './request-BADReGqm.mjs';
import { E as ElButton, d as useFormDisabled } from './el-button-BuxDcLYk.mjs';
import { isArray, NOOP, isString, isPlainObject, isFunction } from '@vue/shared';
import { fromPairs, isNil, cloneDeep, isEqual, flatten, throttle } from 'lodash-unified';
import { g as useNamespace, j as isNumber, w as isElement, x as isWindow, t as throwError, f as debugWarn, o as useZIndex } from './server.mjs';
import { defineComponent, computed, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, shallowRef, provide, toRef, createElementBlock, createSlots, renderSlot, useAttrs, watch, createElementVNode, normalizeClass, Fragment, normalizeProps, guardReactiveProps, TransitionGroup, renderList, withKeys, withModifiers, normalizeStyle, nextTick, inject, markRaw, effectScope, Teleport, Transition, resolveDynamicComponent, useSSRContext } from 'vue';
import { isClient, useThrottleFn, useVModel, useIntersectionObserver, clamp, useEventListener } from '@vueuse/core';
import { u as useTableHeight, E as ElTable, a as ElTableColumn } from './useTableHeight-CZyokWcC.mjs';
import { g as getScrollContainer } from './scroll-Buiolb8O.mjs';
import { u as useAttrs$1 } from './el-input-C8Qdx2zF.mjs';
import { u as useLockscreen } from './el-overlay-nynIVbAI.mjs';
import { E as ElPagination } from './el-pagination-hfIdUDra.mjs';
import { v as vLoading } from './el-loading-MQas_7Bc.mjs';
import { E as ElMessageBox } from './el-message-box-D44zdXWK.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-BLBG5kbX.mjs';
import { u as useMedia } from './useMedia-D_i9hUMt.mjs';
import 'axios';
import '@popperjs/core';
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
import './el-scrollbar-DQd5UWQa.mjs';
import 'normalize-wheel-es';
import './el-checkbox-D4I0fXE7.mjs';
import './el-select-z4Iicrnn.mjs';
import './index-BZGW5Ml4.mjs';
import './cookie-BrXVhyN0.mjs';

const imageProps = buildProps({
  /**
  * @description when enabling preview, use this flag to control whether clicking on backdrop can exit preview mode.
  */
  hideOnClickModal: Boolean,
  /**
  * @description image source, same as native.
  */
  src: {
    type: String,
    default: ""
  },
  /**
  * @description indicate how the image should be resized to fit its container, same as [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).
  */
  fit: {
    type: String,
    values: [
      "",
      "contain",
      "cover",
      "fill",
      "none",
      "scale-down"
    ],
    default: ""
  },
  /**
  * @description Indicates how the browser should load the image, same as [native](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#loading)
  */
  loading: {
    type: String,
    values: ["eager", "lazy"]
  },
  /**
  * @description whether to use lazy load.
  */
  lazy: Boolean,
  /**
  * @description the container to add scroll listener when using lazy load.
  */
  scrollContainer: { type: definePropType([String, Object]) },
  /**
  * @description allow big image preview.
  */
  previewSrcList: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  /**
  * @description whether to append image-viewer to body. A nested parent element attribute transform should have this attribute set to `true`.
  */
  previewTeleported: Boolean,
  /**
  * @description set image preview z-index.
  */
  zIndex: { type: Number },
  /**
  * @description initial preview image index, less than the length of `url-list`.
  */
  initialIndex: {
    type: Number,
    default: 0
  },
  /**
  * @description whether the viewer preview is infinite.
  */
  infinite: {
    type: Boolean,
    default: true
  },
  /**
  * @description whether the image-viewer can be closed by pressing ESC.
  */
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  /**
  * @description the zoom rate of the image viewer zoom event
  */
  zoomRate: {
    type: Number,
    default: 1.2
  },
  /**
  * @description preview image scale.
  */
  scale: {
    type: Number,
    default: 1
  },
  /**
  * @description the min scale of the image viewer zoom event.
  */
  minScale: {
    type: Number,
    default: 0.2
  },
  /**
  * @description the max scale of the image viewer zoom event.
  */
  maxScale: {
    type: Number,
    default: 7
  },
  /**
  * @description show preview image progress content.
  */
  showProgress: Boolean,
  /**
  * @description set HTML attribute: crossorigin.
  */
  crossorigin: { type: definePropType(String) }
});
const imageEmits = {
  load: (evt) => evt instanceof Event,
  error: (evt) => evt instanceof Event,
  switch: (val) => isNumber(val),
  close: () => true,
  show: () => true
};
const imageViewerProps = buildProps({
  /**
  * @description preview link list.
  */
  urlList: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  /**
  * @description preview backdrop z-index.
  */
  zIndex: { type: Number },
  /**
  * @description the initial preview image index, less than or equal to the length of `url-list`.
  */
  initialIndex: {
    type: Number,
    default: 0
  },
  /**
  * @description whether preview is infinite.
  */
  infinite: {
    type: Boolean,
    default: true
  },
  /**
  * @description whether user can emit close event when clicking backdrop.
  */
  hideOnClickModal: Boolean,
  /**
  * @description whether to append image itself to body. A nested parent element attribute transform should have this attribute set to `true`.
  */
  teleported: Boolean,
  /**
  * @description whether the image-viewer can be closed by pressing ESC.
  */
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  /**
  * @description the zoom rate of the image viewer zoom event.
  */
  zoomRate: {
    type: Number,
    default: 1.2
  },
  /**
  * @description preview image scale.
  */
  scale: {
    type: Number,
    default: 1
  },
  /**
  * @description the min scale of the image viewer zoom event.
  */
  minScale: {
    type: Number,
    default: 0.2
  },
  /**
  * @description the max scale of the image viewer zoom event.
  */
  maxScale: {
    type: Number,
    default: 7
  },
  /**
  * @description show preview image progress content.
  */
  showProgress: Boolean,
  /**
  * @description set HTML attribute: crossorigin.
  */
  crossorigin: { type: definePropType(String) }
});
const imageViewerEmits = {
  close: () => true,
  error: (evt) => evt instanceof Event,
  switch: (index) => isNumber(index),
  rotate: (deg) => isNumber(deg)
};
const _hoisted_1$4 = ["src", "crossorigin"];
var image_viewer_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElImageViewer",
  __name: "image-viewer",
  props: imageViewerProps,
  emits: imageViewerEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const modes = {
      CONTAIN: {
        name: "contain",
        icon: markRaw(full_screen_default)
      },
      ORIGINAL: {
        name: "original",
        icon: markRaw(scale_to_original_default)
      }
    };
    const props = __props;
    const emit = __emit;
    const { t } = useLocale();
    const ns = useNamespace("image-viewer");
    const { nextZIndex } = useZIndex();
    const wrapper = ref();
    const imgRef = ref();
    const scopeEventListener = effectScope();
    const scaleClamped = computed(() => {
      const { scale, minScale, maxScale } = props;
      return clamp(scale, minScale, maxScale);
    });
    const loading = ref(true);
    const loadError = ref(false);
    const visible = ref(false);
    const activeIndex = ref(props.initialIndex);
    const mode = shallowRef(modes.CONTAIN);
    const transform = ref({
      scale: scaleClamped.value,
      deg: 0,
      offsetX: 0,
      offsetY: 0,
      enableTransition: false
    });
    const zIndex = ref(props.zIndex ?? nextZIndex());
    useLockscreen(visible, { ns });
    const isSingle = computed(() => {
      const { urlList } = props;
      return urlList.length <= 1;
    });
    const isFirst = computed(() => activeIndex.value === 0);
    const isLast = computed(() => activeIndex.value === props.urlList.length - 1);
    const currentImg = computed(() => props.urlList[activeIndex.value]);
    const arrowPrevKls = computed(() => [
      ns.e("btn"),
      ns.e("prev"),
      ns.is("disabled", !props.infinite && isFirst.value)
    ]);
    const arrowNextKls = computed(() => [
      ns.e("btn"),
      ns.e("next"),
      ns.is("disabled", !props.infinite && isLast.value)
    ]);
    const imgStyle = computed(() => {
      const { scale, deg, offsetX, offsetY, enableTransition } = transform.value;
      let translateX = offsetX / scale;
      let translateY = offsetY / scale;
      const radian = deg * Math.PI / 180;
      const cosRadian = Math.cos(radian);
      const sinRadian = Math.sin(radian);
      translateX = translateX * cosRadian + translateY * sinRadian;
      translateY = translateY * cosRadian - offsetX / scale * sinRadian;
      const style = {
        transform: `scale(${scale}) rotate(${deg}deg) translate(${translateX}px, ${translateY}px)`,
        transition: enableTransition ? "transform .3s" : ""
      };
      if (mode.value.name === modes.CONTAIN.name) style.maxWidth = style.maxHeight = "100%";
      return style;
    });
    const progress = computed(() => `${activeIndex.value + 1} / ${props.urlList.length}`);
    function hide() {
      unregisterEventListener();
      visible.value = false;
      emit("close");
    }
    function unregisterEventListener() {
      scopeEventListener.stop();
    }
    function handleImgLoad() {
      loading.value = false;
    }
    function handleImgError(e) {
      loadError.value = true;
      loading.value = false;
      emit("error", e);
      e.target.alt = t("el.image.error");
    }
    function handleMouseDown(e) {
      if (loading.value || e.button !== 0 || !wrapper.value) return;
      transform.value.enableTransition = false;
      const { offsetX, offsetY } = transform.value;
      const startX = e.pageX;
      const startY = e.pageY;
      const dragHandler = throttle((ev) => {
        transform.value = {
          ...transform.value,
          offsetX: offsetX + ev.pageX - startX,
          offsetY: offsetY + ev.pageY - startY
        };
      });
      const removeMousemove = useEventListener(void 0, "mousemove", dragHandler);
      const removeMouseup = useEventListener(void 0, "mouseup", () => {
        removeMousemove();
        removeMouseup();
      });
      e.preventDefault();
    }
    function handleTouchStart(e) {
      if (loading.value || !wrapper.value || e.touches.length !== 1) return;
      transform.value.enableTransition = false;
      const { offsetX, offsetY } = transform.value;
      const { pageX: startX, pageY: startY } = e.touches[0];
      const dragHandler = throttle((ev) => {
        const targetTouch = ev.touches[0];
        transform.value = {
          ...transform.value,
          offsetX: offsetX + targetTouch.pageX - startX,
          offsetY: offsetY + targetTouch.pageY - startY
        };
      });
      const removeTouchmove = useEventListener(void 0, "touchmove", dragHandler);
      const removeTouchend = useEventListener(void 0, "touchend", () => {
        removeTouchmove();
        removeTouchend();
      });
      e.preventDefault();
    }
    function reset() {
      transform.value = {
        scale: scaleClamped.value,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      };
    }
    function toggleMode() {
      if (loading.value || loadError.value) return;
      const modeNames = keysOf(modes);
      const modeValues = Object.values(modes);
      const currentMode = mode.value.name;
      mode.value = modes[modeNames[(modeValues.findIndex((i) => i.name === currentMode) + 1) % modeNames.length]];
      reset();
    }
    function setActiveItem(index) {
      loadError.value = false;
      const len = props.urlList.length;
      activeIndex.value = (index + len) % len;
    }
    function prev() {
      if (isFirst.value && !props.infinite) return;
      setActiveItem(activeIndex.value - 1);
    }
    function next() {
      if (isLast.value && !props.infinite) return;
      setActiveItem(activeIndex.value + 1);
    }
    function handleActions(action, options = {}) {
      if (loading.value || loadError.value) return;
      const { minScale, maxScale } = props;
      const { zoomRate, rotateDeg, enableTransition } = {
        zoomRate: props.zoomRate,
        rotateDeg: 90,
        enableTransition: true,
        ...options
      };
      switch (action) {
        case "zoomOut":
          if (transform.value.scale > minScale) transform.value.scale = Number.parseFloat((transform.value.scale / zoomRate).toFixed(3));
          break;
        case "zoomIn":
          if (transform.value.scale < maxScale) transform.value.scale = Number.parseFloat((transform.value.scale * zoomRate).toFixed(3));
          break;
        case "clockwise":
          transform.value.deg += rotateDeg;
          emit("rotate", transform.value.deg);
          break;
        case "anticlockwise":
          transform.value.deg -= rotateDeg;
          emit("rotate", transform.value.deg);
          break;
      }
      transform.value.enableTransition = enableTransition;
    }
    function onFocusoutPrevented(event) {
      if (event.detail?.focusReason === "pointer") event.preventDefault();
    }
    function onCloseRequested() {
      if (props.closeOnPressEscape) hide();
    }
    watch(() => scaleClamped.value, (val) => {
      transform.value.scale = val;
    });
    watch(currentImg, () => {
      nextTick(() => {
        if (!imgRef.value?.complete) loading.value = true;
      });
    });
    watch(activeIndex, (val) => {
      reset();
      emit("switch", val);
    });
    __expose({
      /**
      * @description manually switch image
      */
      setActiveItem
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, {
        to: "body",
        disabled: !__props.teleported
      }, [createVNode(Transition, {
        name: "viewer-fade",
        appear: ""
      }, {
        default: withCtx(() => [createElementVNode("div", {
          ref_key: "wrapper",
          ref: wrapper,
          tabindex: -1,
          class: normalizeClass(unref(ns).e("wrapper")),
          style: normalizeStyle({ zIndex: zIndex.value })
        }, [createVNode(unref(focus_trap_default$1), {
          loop: "",
          trapped: "",
          "focus-trap-el": wrapper.value,
          "focus-start-el": "container",
          onFocusoutPrevented,
          onReleaseRequested: onCloseRequested
        }, {
          default: withCtx(() => [
            createElementVNode("div", {
              class: normalizeClass(unref(ns).e("mask")),
              onClick: _cache[0] || (_cache[0] = withModifiers(($event) => __props.hideOnClickModal && hide(), ["self"]))
            }, null, 2),
            createCommentVNode(" CLOSE "),
            createElementVNode("span", {
              class: normalizeClass([unref(ns).e("btn"), unref(ns).e("close")]),
              onClick: hide
            }, [createVNode(unref(ElIcon), null, {
              default: withCtx(() => [createVNode(unref(close_default))]),
              _: 1
            })], 2),
            createCommentVNode(" ARROW "),
            !isSingle.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createElementVNode("span", {
              class: normalizeClass(arrowPrevKls.value),
              onClick: prev
            }, [createVNode(unref(ElIcon), null, {
              default: withCtx(() => [createVNode(unref(arrow_left_default))]),
              _: 1
            })], 2), createElementVNode("span", {
              class: normalizeClass(arrowNextKls.value),
              onClick: next
            }, [createVNode(unref(ElIcon), null, {
              default: withCtx(() => [createVNode(unref(arrow_right_default))]),
              _: 1
            })], 2)], 64)) : createCommentVNode("v-if", true),
            _ctx.$slots.progress || __props.showProgress ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass([unref(ns).e("btn"), unref(ns).e("progress")])
            }, [renderSlot(_ctx.$slots, "progress", {
              activeIndex: activeIndex.value,
              total: __props.urlList.length
            }, () => [createTextVNode(toDisplayString(progress.value), 1)])], 2)) : createCommentVNode("v-if", true),
            createCommentVNode(" ACTIONS "),
            createElementVNode("div", { class: normalizeClass([unref(ns).e("btn"), unref(ns).e("actions")]) }, [createElementVNode("div", { class: normalizeClass(unref(ns).e("actions__inner")) }, [renderSlot(_ctx.$slots, "toolbar", {
              actions: handleActions,
              prev,
              next,
              reset: toggleMode,
              activeIndex: activeIndex.value,
              setActiveItem
            }, () => [
              createVNode(unref(ElIcon), { onClick: _cache[1] || (_cache[1] = ($event) => handleActions("zoomOut")) }, {
                default: withCtx(() => [createVNode(unref(zoom_out_default))]),
                _: 1
              }),
              createVNode(unref(ElIcon), { onClick: _cache[2] || (_cache[2] = ($event) => handleActions("zoomIn")) }, {
                default: withCtx(() => [createVNode(unref(zoom_in_default))]),
                _: 1
              }),
              createElementVNode("i", { class: normalizeClass(unref(ns).e("actions__divider")) }, null, 2),
              createVNode(unref(ElIcon), { onClick: toggleMode }, {
                default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(mode.value.icon)))]),
                _: 1
              }),
              createElementVNode("i", { class: normalizeClass(unref(ns).e("actions__divider")) }, null, 2),
              createVNode(unref(ElIcon), { onClick: _cache[3] || (_cache[3] = ($event) => handleActions("anticlockwise")) }, {
                default: withCtx(() => [createVNode(unref(refresh_left_default))]),
                _: 1
              }),
              createVNode(unref(ElIcon), { onClick: _cache[4] || (_cache[4] = ($event) => handleActions("clockwise")) }, {
                default: withCtx(() => [createVNode(unref(refresh_right_default))]),
                _: 1
              })
            ])], 2)], 2),
            createCommentVNode(" CANVAS "),
            createElementVNode("div", { class: normalizeClass(unref(ns).e("canvas")) }, [loadError.value && _ctx.$slots["viewer-error"] ? renderSlot(_ctx.$slots, "viewer-error", {
              key: 0,
              activeIndex: activeIndex.value,
              src: currentImg.value
            }) : (openBlock(), createElementBlock("img", {
              ref_key: "imgRef",
              ref: imgRef,
              key: currentImg.value,
              src: currentImg.value,
              style: normalizeStyle(imgStyle.value),
              class: normalizeClass(unref(ns).e("img")),
              crossorigin: __props.crossorigin,
              onLoad: handleImgLoad,
              onError: handleImgError,
              onMousedown: handleMouseDown,
              onTouchstart: handleTouchStart
            }, null, 46, _hoisted_1$4))], 2),
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 8, ["focus-trap-el"])], 6)]),
        _: 3
      })], 8, ["disabled"]);
    };
  }
});
var image_viewer_default = image_viewer_vue_vue_type_script_setup_true_lang_default;
const ElImageViewer = withInstall(image_viewer_default);
const _hoisted_1$3 = [
  "src",
  "loading",
  "crossorigin"
];
const _hoisted_2$3 = { key: 0 };
var image_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElImage",
  inheritAttrs: false,
  __name: "image",
  props: imageProps,
  emits: imageEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useLocale();
    const ns = useNamespace("image");
    const rawAttrs = useAttrs();
    const containerAttrs = computed(() => {
      return fromPairs(Object.entries(rawAttrs).filter(([key]) => /^(data-|on[A-Z])/i.test(key) || ["id", "style"].includes(key)));
    });
    const imgAttrs = useAttrs$1({
      excludeListeners: true,
      excludeKeys: computed(() => {
        return Object.keys(containerAttrs.value);
      })
    });
    const imageSrc = ref();
    const hasLoadError = ref(false);
    const isLoading = ref(true);
    const showViewer = ref(false);
    const container = ref();
    const _scrollContainer = ref();
    const supportLoading = isClient && "loading" in HTMLImageElement.prototype;
    let stopScrollListener;
    const imageKls = computed(() => [
      ns.e("inner"),
      preview.value && ns.e("preview"),
      isLoading.value && ns.is("loading")
    ]);
    const imageStyle = computed(() => {
      const { fit } = props;
      if (isClient && fit) return { objectFit: fit };
      return {};
    });
    const preview = computed(() => {
      const { previewSrcList } = props;
      return isArray(previewSrcList) && previewSrcList.length > 0;
    });
    const imageIndex = computed(() => {
      const { previewSrcList, initialIndex } = props;
      let previewIndex = initialIndex;
      if (initialIndex > previewSrcList.length - 1) previewIndex = 0;
      return previewIndex;
    });
    const isManual = computed(() => {
      if (props.loading === "eager") return false;
      return !supportLoading && props.loading === "lazy" || props.lazy;
    });
    const loadImage = () => {
      if (!isClient) return;
      isLoading.value = true;
      hasLoadError.value = false;
      imageSrc.value = props.src;
    };
    function handleLoad(event) {
      isLoading.value = false;
      hasLoadError.value = false;
      emit("load", event);
    }
    function handleError(event) {
      isLoading.value = false;
      hasLoadError.value = true;
      emit("error", event);
    }
    function handleLazyLoad(isIntersecting) {
      if (isIntersecting) {
        loadImage();
        removeLazyLoadListener();
      }
    }
    const lazyLoadHandler = useThrottleFn(handleLazyLoad, 200, true);
    async function addLazyLoadListener() {
      if (!isClient) return;
      await nextTick();
      const { scrollContainer } = props;
      if (isElement(scrollContainer)) _scrollContainer.value = scrollContainer;
      else if (isString(scrollContainer) && scrollContainer !== "") _scrollContainer.value = (void 0).querySelector(scrollContainer) ?? void 0;
      else if (container.value) {
        const scrollContainer2 = getScrollContainer(container.value);
        _scrollContainer.value = isWindow(scrollContainer2) ? void 0 : scrollContainer2;
      }
      const { stop } = useIntersectionObserver(container, ([entry]) => {
        lazyLoadHandler(entry.isIntersecting);
      }, { root: _scrollContainer });
      stopScrollListener = stop;
    }
    function removeLazyLoadListener() {
      if (!isClient || !lazyLoadHandler) return;
      stopScrollListener?.();
      _scrollContainer.value = void 0;
      stopScrollListener = void 0;
    }
    function clickHandler() {
      if (!preview.value) return;
      showViewer.value = true;
      emit("show");
    }
    function closeViewer() {
      showViewer.value = false;
      emit("close");
    }
    function switchViewer(val) {
      emit("switch", val);
    }
    watch(() => props.src, () => {
      if (isManual.value) {
        isLoading.value = true;
        hasLoadError.value = false;
        removeLazyLoadListener();
        addLazyLoadListener();
      } else loadImage();
    });
    __expose({
      /** @description manually open preview */
      showPreview: clickHandler
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", mergeProps({
        ref_key: "container",
        ref: container
      }, containerAttrs.value, { class: [unref(ns).b(), _ctx.$attrs.class] }), [hasLoadError.value ? renderSlot(_ctx.$slots, "error", { key: 0 }, () => [createElementVNode("div", { class: normalizeClass(unref(ns).e("error")) }, toDisplayString(unref(t)("el.image.error")), 3)]) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [imageSrc.value !== void 0 ? (openBlock(), createElementBlock("img", mergeProps({ key: 0 }, unref(imgAttrs), {
        src: imageSrc.value,
        loading: __props.loading,
        style: imageStyle.value,
        class: imageKls.value,
        crossorigin: __props.crossorigin,
        onClick: clickHandler,
        onLoad: handleLoad,
        onError: handleError
      }), null, 16, _hoisted_1$3)) : createCommentVNode("v-if", true), isLoading.value ? (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(unref(ns).e("wrapper"))
      }, [renderSlot(_ctx.$slots, "placeholder", {}, () => [createElementVNode("div", { class: normalizeClass(unref(ns).e("placeholder")) }, null, 2)])], 2)) : createCommentVNode("v-if", true)], 64)), preview.value ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [showViewer.value ? (openBlock(), createBlock(unref(ElImageViewer), {
        key: 0,
        "z-index": __props.zIndex,
        "initial-index": imageIndex.value,
        infinite: __props.infinite,
        "zoom-rate": __props.zoomRate,
        "min-scale": __props.minScale,
        "max-scale": __props.maxScale,
        "show-progress": __props.showProgress,
        "url-list": __props.previewSrcList,
        scale: __props.scale,
        crossorigin: __props.crossorigin,
        "hide-on-click-modal": __props.hideOnClickModal,
        teleported: __props.previewTeleported,
        "close-on-press-escape": __props.closeOnPressEscape,
        onClose: closeViewer,
        onSwitch: switchViewer
      }, createSlots({
        toolbar: withCtx((toolbar) => [renderSlot(_ctx.$slots, "toolbar", normalizeProps(guardReactiveProps(toolbar)))]),
        default: withCtx(() => [_ctx.$slots.viewer ? (openBlock(), createElementBlock("div", _hoisted_2$3, [renderSlot(_ctx.$slots, "viewer")])) : createCommentVNode("v-if", true)]),
        _: 2
      }, [_ctx.$slots.progress ? {
        name: "progress",
        fn: withCtx((progress) => [renderSlot(_ctx.$slots, "progress", normalizeProps(guardReactiveProps(progress)))]),
        key: "0"
      } : void 0, _ctx.$slots["viewer-error"] ? {
        name: "viewer-error",
        fn: withCtx((viewerError) => [renderSlot(_ctx.$slots, "viewer-error", normalizeProps(guardReactiveProps(viewerError)))]),
        key: "1"
      } : void 0]), 1032, [
        "z-index",
        "initial-index",
        "infinite",
        "zoom-rate",
        "min-scale",
        "max-scale",
        "show-progress",
        "url-list",
        "scale",
        "crossorigin",
        "hide-on-click-modal",
        "teleported",
        "close-on-press-escape"
      ])) : createCommentVNode("v-if", true)], 64)) : createCommentVNode("v-if", true)], 16);
    };
  }
});
var image_default = image_vue_vue_type_script_setup_true_lang_default;
const ElImage = withInstall(image_default);
const progressProps = buildProps({
  /**
  * @description type of progress bar
  */
  type: {
    type: String,
    default: "line",
    values: [
      "line",
      "circle",
      "dashboard"
    ]
  },
  /**
  * @description percentage, required
  */
  percentage: {
    type: Number,
    default: 0,
    validator: (val) => val >= 0 && val <= 100
  },
  /**
  * @description the current status of progress bar
  */
  status: {
    type: String,
    default: "",
    values: [
      "",
      "success",
      "exception",
      "warning"
    ]
  },
  /**
  * @description set indeterminate progress
  */
  indeterminate: Boolean,
  /**
  * @description control the animation duration of indeterminate progress or striped flow progress
  */
  duration: {
    type: Number,
    default: 3
  },
  /**
  * @description the width of progress bar
  */
  strokeWidth: {
    type: Number,
    default: 6
  },
  /**
  * @description butt/circle/dashboard type shape at the end path
  */
  strokeLinecap: {
    type: definePropType(String),
    default: "round"
  },
  /**
  * @description whether to place the percentage inside progress bar, only works when `type` is 'line'
  */
  textInside: Boolean,
  /**
  * @description the canvas width of circle progress bar
  */
  width: {
    type: Number,
    default: 126
  },
  /**
  * @description whether to show percentage
  */
  showText: {
    type: Boolean,
    default: true
  },
  /**
  * @description background color of progress bar. Overrides `status` prop
  */
  color: {
    type: definePropType([
      String,
      Array,
      Function
    ]),
    default: ""
  },
  /**
  * @description stripe over the progress bar's color
  */
  striped: Boolean,
  /**
  * @description get the stripes to flow
  */
  stripedFlow: Boolean,
  /**
  * @description custom text format
  */
  format: {
    type: definePropType(Function),
    default: (percentage) => `${percentage}%`
  }
});
const _hoisted_1$2 = ["aria-valuenow"];
const _hoisted_2$2 = { viewBox: "0 0 100 100" };
const _hoisted_3$1 = [
  "d",
  "stroke",
  "stroke-linecap",
  "stroke-width"
];
const _hoisted_4$1 = [
  "d",
  "stroke",
  "opacity",
  "stroke-linecap",
  "stroke-width"
];
const _hoisted_5$1 = { key: 0 };
var progress_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElProgress",
  __name: "progress",
  props: progressProps,
  setup(__props) {
    const STATUS_COLOR_MAP = {
      success: "#13ce66",
      exception: "#ff4949",
      warning: "#e6a23c",
      default: "#20a0ff"
    };
    const props = __props;
    const ns = useNamespace("progress");
    const barStyle = computed(() => {
      const barStyle2 = {
        width: `${props.percentage}%`,
        animationDuration: `${props.duration}s`
      };
      const color = getCurrentColor(props.percentage);
      if (color.includes("gradient")) barStyle2.background = color;
      else barStyle2.backgroundColor = color;
      return barStyle2;
    });
    const relativeStrokeWidth = computed(() => (props.strokeWidth / props.width * 100).toFixed(1));
    const radius = computed(() => {
      if (["circle", "dashboard"].includes(props.type)) return Number.parseInt(`${50 - Number.parseFloat(relativeStrokeWidth.value) / 2}`, 10);
      return 0;
    });
    const trackPath = computed(() => {
      const r = radius.value;
      const isDashboard = props.type === "dashboard";
      return `
          M 50 50
          m 0 ${isDashboard ? "" : "-"}${r}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? "-" : ""}${r * 2}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? "" : "-"}${r * 2}
          `;
    });
    const perimeter = computed(() => 2 * Math.PI * radius.value);
    const rate = computed(() => props.type === "dashboard" ? 0.75 : 1);
    const strokeDashoffset = computed(() => {
      return `${ -1 * perimeter.value * (1 - rate.value) / 2}px`;
    });
    const trailPathStyle = computed(() => ({
      strokeDasharray: `${perimeter.value * rate.value}px, ${perimeter.value}px`,
      strokeDashoffset: strokeDashoffset.value
    }));
    const circlePathStyle = computed(() => ({
      strokeDasharray: `${perimeter.value * rate.value * (props.percentage / 100)}px, ${perimeter.value}px`,
      strokeDashoffset: strokeDashoffset.value,
      transition: "stroke-dasharray 0.6s ease 0s, stroke 0.6s ease, opacity ease 0.6s"
    }));
    const stroke = computed(() => {
      let ret;
      if (props.color) ret = getCurrentColor(props.percentage);
      else ret = STATUS_COLOR_MAP[props.status] || STATUS_COLOR_MAP.default;
      return ret;
    });
    const statusIcon = computed(() => {
      if (props.status === "warning") return warning_filled_default;
      if (props.type === "line") return props.status === "success" ? circle_check_default : circle_close_default;
      else return props.status === "success" ? check_default : close_default;
    });
    const progressTextSize = computed(() => {
      return props.type === "line" ? 12 + props.strokeWidth * 0.4 : props.width * 0.111111 + 2;
    });
    const content = computed(() => props.format(props.percentage));
    function getColors(color) {
      const span = 100 / color.length;
      return color.map((seriesColor, index) => {
        if (isString(seriesColor)) return {
          color: seriesColor,
          percentage: (index + 1) * span
        };
        return seriesColor;
      }).sort((a, b) => a.percentage - b.percentage);
    }
    const getCurrentColor = (percentage) => {
      const { color } = props;
      if (isFunction(color)) return color(percentage);
      else if (isString(color)) return color;
      else {
        const colors = getColors(color);
        for (const color2 of colors) if (color2.percentage > percentage) return color2.color;
        return colors[colors.length - 1]?.color;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          unref(ns).b(),
          unref(ns).m(__props.type),
          unref(ns).is(__props.status),
          {
            [unref(ns).m("without-text")]: !__props.showText,
            [unref(ns).m("text-inside")]: __props.textInside
          }
        ]),
        role: "progressbar",
        "aria-valuenow": __props.percentage,
        "aria-valuemin": "0",
        "aria-valuemax": "100"
      }, [__props.type === "line" ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(unref(ns).b("bar"))
      }, [createElementVNode("div", {
        class: normalizeClass(unref(ns).be("bar", "outer")),
        style: normalizeStyle({ height: `${__props.strokeWidth}px` })
      }, [createElementVNode("div", {
        class: normalizeClass([
          unref(ns).be("bar", "inner"),
          { [unref(ns).bem("bar", "inner", "indeterminate")]: __props.indeterminate },
          { [unref(ns).bem("bar", "inner", "striped")]: __props.striped },
          { [unref(ns).bem("bar", "inner", "striped-flow")]: __props.stripedFlow }
        ]),
        style: normalizeStyle(barStyle.value)
      }, [(__props.showText || _ctx.$slots.default) && __props.textInside ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(unref(ns).be("bar", "innerText"))
      }, [renderSlot(_ctx.$slots, "default", { percentage: __props.percentage }, () => [createElementVNode("span", null, toDisplayString(content.value), 1)])], 2)) : createCommentVNode("v-if", true)], 6)], 6)], 2)) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(unref(ns).b("circle")),
        style: normalizeStyle({
          height: `${__props.width}px`,
          width: `${__props.width}px`
        })
      }, [(openBlock(), createElementBlock("svg", _hoisted_2$2, [createElementVNode("path", {
        class: normalizeClass(unref(ns).be("circle", "track")),
        d: trackPath.value,
        stroke: `var(${unref(ns).cssVarName("fill-color-light")}, #e5e9f2)`,
        "stroke-linecap": __props.strokeLinecap,
        "stroke-width": relativeStrokeWidth.value,
        fill: "none",
        style: normalizeStyle(trailPathStyle.value)
      }, null, 14, _hoisted_3$1), createElementVNode("path", {
        class: normalizeClass(unref(ns).be("circle", "path")),
        d: trackPath.value,
        stroke: stroke.value,
        fill: "none",
        opacity: __props.percentage ? 1 : 0,
        "stroke-linecap": __props.strokeLinecap,
        "stroke-width": relativeStrokeWidth.value,
        style: normalizeStyle(circlePathStyle.value)
      }, null, 14, _hoisted_4$1)]))], 6)), (__props.showText || _ctx.$slots.default) && !__props.textInside ? (openBlock(), createElementBlock("div", {
        key: 2,
        class: normalizeClass(unref(ns).e("text")),
        style: normalizeStyle({ fontSize: `${progressTextSize.value}px` })
      }, [renderSlot(_ctx.$slots, "default", { percentage: __props.percentage }, () => [!__props.status ? (openBlock(), createElementBlock("span", _hoisted_5$1, toDisplayString(content.value), 1)) : (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
        default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(statusIcon.value)))]),
        _: 1
      }))])], 6)) : createCommentVNode("v-if", true)], 10, _hoisted_1$2);
    };
  }
});
var progress_default = progress_vue_vue_type_script_setup_true_lang_default;
const ElProgress = withInstall(progress_default);
const SCOPE$1 = "ElUpload";
var UploadAjaxError = class extends Error {
  constructor(message, status, method, url) {
    super(message);
    this.name = "UploadAjaxError";
    this.status = status;
    this.method = method;
    this.url = url;
  }
};
function getError(action, option, xhr) {
  let msg;
  if (xhr.response) msg = `${xhr.response.error || xhr.response}`;
  else if (xhr.responseText) msg = `${xhr.responseText}`;
  else msg = `fail to ${option.method} ${action} ${xhr.status}`;
  return new UploadAjaxError(msg, xhr.status, option.method, action);
}
function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) return text;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
const ajaxUpload = (option) => {
  throwError(SCOPE$1, "XMLHttpRequest is undefined");
  const xhr = new (void 0)();
  const action = option.action;
  if (xhr.upload) xhr.upload.addEventListener("progress", (evt) => {
    const progressEvt = evt;
    progressEvt.percent = evt.total > 0 ? evt.loaded / evt.total * 100 : 0;
    option.onProgress(progressEvt);
  });
  const formData = new FormData();
  if (option.data) for (const [key, value] of Object.entries(option.data)) if (isArray(value)) if (value.length === 2 && value[0] instanceof Blob && isString(value[1])) formData.append(key, value[0], value[1]);
  else value.forEach((item) => {
    formData.append(key, item);
  });
  else formData.append(key, value);
  formData.append(option.filename, option.file, option.file.name);
  xhr.addEventListener("error", () => {
    option.onError(getError(action, option, xhr));
  });
  xhr.addEventListener("load", () => {
    if (xhr.status < 200 || xhr.status >= 300) return option.onError(getError(action, option, xhr));
    option.onSuccess(getBody(xhr));
  });
  xhr.open(option.method, action, true);
  if (option.withCredentials && "withCredentials" in xhr) xhr.withCredentials = true;
  const headers = option.headers || {};
  if (headers instanceof Headers) headers.forEach((value, key) => xhr.setRequestHeader(key, value));
  else for (const [key, value] of Object.entries(headers)) {
    if (isNil(value)) continue;
    xhr.setRequestHeader(key, String(value));
  }
  xhr.send(formData);
  return xhr;
};
const uploadListTypes = [
  "text",
  "picture",
  "picture-card"
];
let fileId = 1;
const genFileId = () => Date.now() + fileId++;
const uploadBaseProps = buildProps({
  /**
  * @description request URL
  */
  action: {
    type: String,
    default: "#"
  },
  /**
  * @description request headers
  */
  headers: { type: definePropType(Object) },
  /**
  * @description set upload request method
  */
  method: {
    type: String,
    default: "post"
  },
  /**
  * @description additions options of request
  */
  data: {
    type: definePropType([
      Object,
      Function,
      Promise
    ]),
    default: () => mutable({})
  },
  /**
  * @description whether uploading multiple files is permitted
  */
  multiple: Boolean,
  /**
  * @description key name for uploaded file
  */
  name: {
    type: String,
    default: "file"
  },
  /**
  * @description whether to activate drag and drop mode
  */
  drag: Boolean,
  /**
  * @description whether cookies are sent
  */
  withCredentials: Boolean,
  /**
  * @description whether to show the uploaded file list
  */
  showFileList: {
    type: Boolean,
    default: true
  },
  /**
  * @description accepted [file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept), will not work when `thumbnail-mode === true`
  */
  accept: {
    type: String,
    default: ""
  },
  /**
  * @description default uploaded files
  */
  fileList: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  /**
  * @description whether to auto upload file
  */
  autoUpload: {
    type: Boolean,
    default: true
  },
  /**
  * @description type of file list
  */
  listType: {
    type: String,
    values: uploadListTypes,
    default: "text"
  },
  /**
  * @description override default xhr behavior, allowing you to implement your own upload-file's request
  */
  httpRequest: {
    type: definePropType(Function),
    default: ajaxUpload
  },
  /**
  * @description whether to disable upload
  */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
  * @description maximum number of uploads allowed
  */
  limit: Number,
  /**
  * @description whether to support uploading directory
  */
  directory: Boolean
});
const uploadProps = buildProps({
  ...uploadBaseProps,
  /**
  * @description hook function before uploading with the file to be uploaded as its parameter. If `false` is returned or a `Promise` is returned and then is rejected, uploading will be aborted
  */
  beforeUpload: {
    type: definePropType(Function),
    default: NOOP
  },
  /**
  * @description hook function before removing a file with the file and file list as its parameters. If `false` is returned or a `Promise` is returned and then is rejected, removing will be aborted
  */
  beforeRemove: { type: definePropType(Function) },
  /**
  * @description hook function when files are removed
  */
  onRemove: {
    type: definePropType(Function),
    default: NOOP
  },
  /**
  * @description hook function when select file or upload file success or upload file fail
  */
  onChange: {
    type: definePropType(Function),
    default: NOOP
  },
  /**
  * @description hook function when clicking the uploaded files
  */
  onPreview: {
    type: definePropType(Function),
    default: NOOP
  },
  /**
  * @description hook function when uploaded successfully
  */
  onSuccess: {
    type: definePropType(Function),
    default: NOOP
  },
  /**
  * @description hook function when some progress occurs
  */
  onProgress: {
    type: definePropType(Function),
    default: NOOP
  },
  /**
  * @description hook function when some errors occurs
  */
  onError: {
    type: definePropType(Function),
    default: NOOP
  },
  /**
  * @description hook function when limit is exceeded
  */
  onExceed: {
    type: definePropType(Function),
    default: NOOP
  },
  /**
  * @description set HTML attribute: crossorigin.
  */
  crossorigin: { type: definePropType(String) }
});
const uploadContextKey = /* @__PURE__ */ Symbol("uploadContextKey");
const uploadListProps = buildProps({
  files: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  handlePreview: {
    type: definePropType(Function),
    default: NOOP
  },
  listType: {
    type: String,
    values: uploadListTypes,
    default: "text"
  },
  /**
  * @description set HTML attribute: crossorigin.
  */
  crossorigin: { type: definePropType(String) }
});
const uploadListEmits = { remove: (file) => !!file };
const uploadContentProps = buildProps({
  ...uploadBaseProps,
  beforeUpload: {
    type: definePropType(Function),
    default: NOOP
  },
  onRemove: {
    type: definePropType(Function),
    default: NOOP
  },
  onStart: {
    type: definePropType(Function),
    default: NOOP
  },
  onSuccess: {
    type: definePropType(Function),
    default: NOOP
  },
  onProgress: {
    type: definePropType(Function),
    default: NOOP
  },
  onError: {
    type: definePropType(Function),
    default: NOOP
  },
  onExceed: {
    type: definePropType(Function),
    default: NOOP
  }
});
const uploadDraggerProps = buildProps({
  disabled: {
    type: Boolean,
    default: void 0
  },
  directory: Boolean
});
const uploadDraggerEmits = { file: (file) => isArray(file) };
const _hoisted_1$1 = [
  "tabindex",
  "aria-disabled",
  "onKeydown"
];
const _hoisted_2$1 = ["src", "crossorigin"];
const _hoisted_3 = ["onClick"];
const _hoisted_4 = ["title"];
const _hoisted_5 = ["onClick"];
const _hoisted_6 = ["onClick"];
var upload_list_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElUploadList",
  __name: "upload-list",
  props: uploadListProps,
  emits: uploadListEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useLocale();
    const nsUpload = useNamespace("upload");
    const nsIcon = useNamespace("icon");
    const nsList = useNamespace("list");
    const disabled = useFormDisabled();
    const focusing = ref(false);
    const containerKls = computed(() => [
      nsUpload.b("list"),
      nsUpload.bm("list", props.listType),
      nsUpload.is("disabled", disabled.value)
    ]);
    const handleRemove = (file) => {
      emit("remove", file);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(TransitionGroup, {
        tag: "ul",
        class: normalizeClass(containerKls.value),
        name: unref(nsList).b()
      }, {
        default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.files, (file, index) => {
          return openBlock(), createElementBlock("li", {
            key: file.uid || file.name,
            class: normalizeClass([
              unref(nsUpload).be("list", "item"),
              unref(nsUpload).is(file.status),
              { focusing: focusing.value }
            ]),
            tabindex: unref(disabled) ? void 0 : 0,
            "aria-disabled": unref(disabled),
            role: "button",
            onKeydown: withKeys(($event) => !unref(disabled) && handleRemove(file), ["delete"]),
            onFocus: _cache[0] || (_cache[0] = ($event) => focusing.value = true),
            onBlur: _cache[1] || (_cache[1] = ($event) => focusing.value = false),
            onClick: _cache[2] || (_cache[2] = ($event) => focusing.value = false)
          }, [renderSlot(_ctx.$slots, "default", {
            file,
            index
          }, () => [
            __props.listType === "picture" || file.status !== "uploading" && __props.listType === "picture-card" ? (openBlock(), createElementBlock("img", {
              key: 0,
              class: normalizeClass(unref(nsUpload).be("list", "item-thumbnail")),
              src: file.url,
              crossorigin: __props.crossorigin,
              alt: ""
            }, null, 10, _hoisted_2$1)) : createCommentVNode("v-if", true),
            file.status === "uploading" || __props.listType !== "picture-card" ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(unref(nsUpload).be("list", "item-info"))
            }, [createElementVNode("a", {
              class: normalizeClass(unref(nsUpload).be("list", "item-name")),
              onClick: withModifiers(($event) => __props.handlePreview(file), ["prevent"])
            }, [createVNode(unref(ElIcon), { class: normalizeClass(unref(nsIcon).m("document")) }, {
              default: withCtx(() => [createVNode(unref(document_default))]),
              _: 1
            }, 8, ["class"]), createElementVNode("span", {
              class: normalizeClass(unref(nsUpload).be("list", "item-file-name")),
              title: file.name
            }, toDisplayString(file.name), 11, _hoisted_4)], 10, _hoisted_3), file.status === "uploading" ? (openBlock(), createBlock(unref(ElProgress), {
              key: 0,
              type: __props.listType === "picture-card" ? "circle" : "line",
              "stroke-width": __props.listType === "picture-card" ? 6 : 2,
              percentage: Number(file.percentage),
              style: normalizeStyle(__props.listType === "picture-card" ? "" : "margin-top: 0.5rem")
            }, null, 8, [
              "type",
              "stroke-width",
              "percentage",
              "style"
            ])) : createCommentVNode("v-if", true)], 2)) : createCommentVNode("v-if", true),
            createElementVNode("label", { class: normalizeClass(unref(nsUpload).be("list", "item-status-label")) }, [__props.listType === "text" ? (openBlock(), createBlock(unref(ElIcon), {
              key: 0,
              class: normalizeClass([unref(nsIcon).m("upload-success"), unref(nsIcon).m("circle-check")])
            }, {
              default: withCtx(() => [createVNode(unref(circle_check_default))]),
              _: 1
            }, 8, ["class"])) : ["picture-card", "picture"].includes(__props.listType) ? (openBlock(), createBlock(unref(ElIcon), {
              key: 1,
              class: normalizeClass([unref(nsIcon).m("upload-success"), unref(nsIcon).m("check")])
            }, {
              default: withCtx(() => [createVNode(unref(check_default))]),
              _: 1
            }, 8, ["class"])) : createCommentVNode("v-if", true)], 2),
            !unref(disabled) ? (openBlock(), createBlock(unref(ElIcon), {
              key: 2,
              class: normalizeClass(unref(nsIcon).m("close")),
              "aria-label": unref(t)("el.upload.delete"),
              role: "button",
              tabindex: "0",
              onClick: ($event) => handleRemove(file),
              onKeydown: withKeys(withModifiers(($event) => handleRemove(file), ["prevent"]), ["enter", "space"])
            }, {
              default: withCtx(() => [createVNode(unref(close_default))]),
              _: 1
            }, 8, [
              "class",
              "aria-label",
              "onClick",
              "onKeydown"
            ])) : createCommentVNode("v-if", true),
            !unref(disabled) ? (openBlock(), createElementBlock("i", {
              key: 3,
              class: normalizeClass(unref(nsIcon).m("close-tip"))
            }, toDisplayString(unref(t)("el.upload.deleteTip")), 3)) : createCommentVNode("v-if", true),
            __props.listType === "picture-card" ? (openBlock(), createElementBlock("span", {
              key: 4,
              class: normalizeClass(unref(nsUpload).be("list", "item-actions"))
            }, [createElementVNode("span", {
              class: normalizeClass(unref(nsUpload).be("list", "item-preview")),
              onClick: ($event) => __props.handlePreview(file)
            }, [createVNode(unref(ElIcon), { class: normalizeClass(unref(nsIcon).m("zoom-in")) }, {
              default: withCtx(() => [createVNode(unref(zoom_in_default))]),
              _: 1
            }, 8, ["class"])], 10, _hoisted_5), !unref(disabled) ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass(unref(nsUpload).be("list", "item-delete")),
              onClick: ($event) => handleRemove(file)
            }, [createVNode(unref(ElIcon), { class: normalizeClass(unref(nsIcon).m("delete")) }, {
              default: withCtx(() => [createVNode(unref(delete_default))]),
              _: 1
            }, 8, ["class"])], 10, _hoisted_6)) : createCommentVNode("v-if", true)], 2)) : createCommentVNode("v-if", true)
          ])], 42, _hoisted_1$1);
        }), 128)), renderSlot(_ctx.$slots, "append")]),
        _: 3
      }, 8, ["class", "name"]);
    };
  }
});
var upload_list_default = upload_list_vue_vue_type_script_setup_true_lang_default;
const COMPONENT_NAME = "ElUploadDrag";
var upload_dragger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: COMPONENT_NAME,
  __name: "upload-dragger",
  props: uploadDraggerProps,
  emits: uploadDraggerEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    if (!inject(uploadContextKey)) throwError(COMPONENT_NAME, "usage: <el-upload><el-upload-dragger /></el-upload>");
    const ns = useNamespace("upload");
    const dragover = ref(false);
    const disabled = useFormDisabled();
    const getFile = (entry) => {
      return new Promise((resolve, reject) => entry.file(resolve, reject));
    };
    const getAllFiles = async (entry) => {
      try {
        if (entry.isFile) {
          const file = await getFile(entry);
          file.isDirectory = false;
          return [file];
        }
        if (entry.isDirectory) {
          const dirReader = entry.createReader();
          const getEntries = () => {
            return new Promise((resolve, reject) => dirReader.readEntries(resolve, reject));
          };
          const entries = [];
          let readEntries = await getEntries();
          while (readEntries.length > 0) {
            entries.push(...readEntries);
            readEntries = await getEntries();
          }
          const filePromises = entries.map((entry2) => getAllFiles(entry2).catch(() => []));
          return flatten(await Promise.all(filePromises));
        }
      } catch {
        return [];
      }
      return [];
    };
    const onDrop = async (e) => {
      if (disabled.value) return;
      dragover.value = false;
      e.stopPropagation();
      const files = Array.from(e.dataTransfer.files);
      const items = e.dataTransfer.items || [];
      if (props.directory) {
        const entries = Array.from(items).map((item) => item?.webkitGetAsEntry?.()).filter((entry) => entry);
        emit("file", flatten(await Promise.all(entries.map(getAllFiles))));
        return;
      }
      files.forEach((file, index) => {
        const entry = items[index]?.webkitGetAsEntry?.();
        if (entry) file.isDirectory = entry.isDirectory;
      });
      emit("file", files);
    };
    const onDragover = () => {
      if (!disabled.value) dragover.value = true;
    };
    const onDragleave = (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) dragover.value = false;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([unref(ns).b("dragger"), unref(ns).is("dragover", dragover.value)]),
        onDrop: withModifiers(onDrop, ["prevent"]),
        onDragover: withModifiers(onDragover, ["prevent"]),
        onDragleave: withModifiers(onDragleave, ["prevent"])
      }, [renderSlot(_ctx.$slots, "default")], 34);
    };
  }
});
var upload_dragger_default = upload_dragger_vue_vue_type_script_setup_true_lang_default;
const _hoisted_1 = [
  "tabindex",
  "aria-disabled",
  "onKeydown"
];
const _hoisted_2 = [
  "name",
  "disabled",
  "multiple",
  "accept",
  "webkitdirectory"
];
var upload_content_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElUploadContent",
  inheritAttrs: false,
  __name: "upload-content",
  props: uploadContentProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const ns = useNamespace("upload");
    const disabled = useFormDisabled();
    const requests = shallowRef({});
    const inputRef = shallowRef();
    const uploadFiles = (files) => {
      if (files.length === 0) return;
      const { autoUpload, limit, fileList, multiple, onStart, onExceed } = props;
      if (limit && fileList.length + files.length > limit) {
        onExceed(files, fileList);
        return;
      }
      if (!multiple) files = files.slice(0, 1);
      for (const file of files) {
        const rawFile = file;
        rawFile.uid = genFileId();
        onStart(rawFile);
        if (autoUpload) upload(rawFile);
      }
    };
    const upload = async (rawFile) => {
      inputRef.value.value = "";
      if (!props.beforeUpload) return doUpload(rawFile);
      let hookResult;
      let beforeData = {};
      try {
        const originData = props.data;
        const beforeUploadPromise = props.beforeUpload(rawFile);
        beforeData = isPlainObject(props.data) ? cloneDeep(props.data) : props.data;
        hookResult = await beforeUploadPromise;
        if (isPlainObject(props.data) && isEqual(originData, beforeData)) beforeData = cloneDeep(props.data);
      } catch {
        hookResult = false;
      }
      if (hookResult === false) {
        props.onRemove(rawFile);
        return;
      }
      let file = rawFile;
      if (hookResult instanceof Blob) if (hookResult instanceof File) file = hookResult;
      else file = new File([hookResult], rawFile.name, { type: rawFile.type });
      doUpload(Object.assign(file, { uid: rawFile.uid }), beforeData);
    };
    const resolveData = async (data, rawFile) => {
      if (isFunction(data)) return data(rawFile);
      return data;
    };
    const doUpload = async (rawFile, beforeData) => {
      const { headers, data, method, withCredentials, name: filename, action, onProgress, onSuccess, onError, httpRequest } = props;
      try {
        beforeData = await resolveData(beforeData ?? data, rawFile);
      } catch {
        props.onRemove(rawFile);
        return;
      }
      const { uid } = rawFile;
      const options = {
        headers: headers || {},
        withCredentials,
        file: rawFile,
        data: beforeData,
        method,
        filename,
        action,
        onProgress: (evt) => {
          onProgress(evt, rawFile);
        },
        onSuccess: (res) => {
          onSuccess(res, rawFile);
          delete requests.value[uid];
        },
        onError: (err) => {
          onError(err, rawFile);
          delete requests.value[uid];
        }
      };
      const request = httpRequest(options);
      requests.value[uid] = request;
      if (request instanceof Promise) request.then(options.onSuccess, options.onError);
    };
    const handleChange = (e) => {
      const files = e.target.files;
      if (!files) return;
      uploadFiles(Array.from(files));
    };
    const handleClick = () => {
      if (!disabled.value) {
        inputRef.value.value = "";
        inputRef.value.click();
      }
    };
    const handleKeydown = () => {
      handleClick();
    };
    const abort = (file) => {
      entriesOf(requests.value).filter(file ? ([uid]) => String(file.uid) === uid : () => true).forEach(([uid, req]) => {
        if (req instanceof void 0) req.abort();
        delete requests.value[uid];
      });
    };
    __expose({
      abort,
      upload
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          unref(ns).b(),
          unref(ns).m(__props.listType),
          unref(ns).is("drag", __props.drag),
          unref(ns).is("disabled", unref(disabled))
        ]),
        tabindex: unref(disabled) ? void 0 : 0,
        "aria-disabled": unref(disabled),
        role: "button",
        onClick: handleClick,
        onKeydown: withKeys(withModifiers(handleKeydown, ["self"]), ["enter", "space"])
      }, [__props.drag ? (openBlock(), createBlock(upload_dragger_default, {
        key: 0,
        disabled: unref(disabled),
        directory: __props.directory,
        onFile: uploadFiles
      }, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, ["disabled", "directory"])) : renderSlot(_ctx.$slots, "default", { key: 1 }), createElementVNode("input", {
        ref_key: "inputRef",
        ref: inputRef,
        class: normalizeClass(unref(ns).e("input")),
        name: __props.name,
        disabled: unref(disabled),
        multiple: __props.multiple,
        accept: __props.accept,
        webkitdirectory: __props.directory || void 0,
        type: "file",
        onChange: handleChange,
        onClick: _cache[0] || (_cache[0] = withModifiers(() => {
        }, ["stop"]))
      }, null, 42, _hoisted_2)], 42, _hoisted_1);
    };
  }
});
var upload_content_default = upload_content_vue_vue_type_script_setup_true_lang_default;
const SCOPE = "ElUpload";
const revokeFileObjectURL = (file) => {
  if (file.url?.startsWith("blob:")) URL.revokeObjectURL(file.url);
};
const useHandlers = (props, uploadRef) => {
  const uploadFiles = useVModel(props, "fileList", void 0, { passive: true });
  const getFile = (rawFile) => uploadFiles.value.find((file) => file.uid === rawFile.uid);
  function abort(file) {
    uploadRef.value?.abort(file);
  }
  function clearFiles(states = [
    "ready",
    "uploading",
    "success",
    "fail"
  ]) {
    uploadFiles.value = uploadFiles.value.filter((row) => !states.includes(row.status));
  }
  function removeFile(file) {
    uploadFiles.value = uploadFiles.value.filter((uploadFile) => uploadFile.uid !== file.uid);
  }
  const emitChange = (file) => {
    nextTick(() => props.onChange(file, uploadFiles.value));
  };
  const handleError = (err, rawFile) => {
    const file = getFile(rawFile);
    if (!file) return;
    console.error(err);
    file.status = "fail";
    removeFile(file);
    props.onError(err, file, uploadFiles.value);
    emitChange(file);
  };
  const handleProgress = (evt, rawFile) => {
    const file = getFile(rawFile);
    if (!file) return;
    props.onProgress(evt, file, uploadFiles.value);
    file.status = "uploading";
    file.percentage = Math.round(evt.percent);
  };
  const handleSuccess = (response, rawFile) => {
    const file = getFile(rawFile);
    if (!file) return;
    file.status = "success";
    file.response = response;
    props.onSuccess(response, file, uploadFiles.value);
    emitChange(file);
  };
  const handleStart = (file) => {
    if (isNil(file.uid)) file.uid = genFileId();
    const uploadFile = {
      name: file.name,
      percentage: 0,
      status: "ready",
      size: file.size,
      raw: file,
      uid: file.uid
    };
    if (props.listType === "picture-card" || props.listType === "picture") try {
      uploadFile.url = URL.createObjectURL(file);
    } catch (err) {
      debugWarn(SCOPE, err.message);
      props.onError(err, uploadFile, uploadFiles.value);
    }
    uploadFiles.value = [...uploadFiles.value, uploadFile];
    emitChange(uploadFile);
  };
  const handleRemove = async (file) => {
    const uploadFile = file instanceof File ? getFile(file) : file;
    if (!uploadFile) throwError(SCOPE, "file to be removed not found");
    const doRemove = (file2) => {
      abort(file2);
      removeFile(file2);
      props.onRemove(file2, uploadFiles.value);
      revokeFileObjectURL(file2);
    };
    if (props.beforeRemove) {
      if (await props.beforeRemove(uploadFile, uploadFiles.value) !== false) doRemove(uploadFile);
    } else doRemove(uploadFile);
  };
  function submit() {
    uploadFiles.value.filter(({ status }) => status === "ready").forEach(({ raw }) => raw && uploadRef.value?.upload(raw));
  }
  watch(() => props.listType, (val) => {
    if (val !== "picture-card" && val !== "picture") return;
    uploadFiles.value = uploadFiles.value.map((file) => {
      const { raw, url } = file;
      if (!url && raw) try {
        file.url = URL.createObjectURL(raw);
      } catch (err) {
        props.onError(err, file, uploadFiles.value);
      }
      return file;
    });
  });
  watch(uploadFiles, (files) => {
    for (const file of files) {
      file.uid ||= genFileId();
      file.status ||= "success";
    }
  }, {
    immediate: true,
    deep: true
  });
  return {
    /** @description two-way binding ref from props `fileList` */
    uploadFiles,
    abort,
    clearFiles,
    handleError,
    handleProgress,
    handleStart,
    handleSuccess,
    handleRemove,
    submit,
    revokeFileObjectURL
  };
};
var upload_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElUpload",
  __name: "upload",
  props: uploadProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const disabled = useFormDisabled();
    const uploadRef = shallowRef();
    const { abort, submit, clearFiles, uploadFiles, handleStart, handleError, handleRemove, handleSuccess, handleProgress } = useHandlers(props, uploadRef);
    const isPictureCard = computed(() => props.listType === "picture-card");
    const uploadContentProps2 = computed(() => ({
      ...props,
      fileList: uploadFiles.value,
      onStart: handleStart,
      onProgress: handleProgress,
      onSuccess: handleSuccess,
      onError: handleError,
      onRemove: handleRemove
    }));
    provide(uploadContextKey, { accept: toRef(props, "accept") });
    __expose({
      /** @description cancel upload request */
      abort,
      /** @description upload the file list manually */
      submit,
      /** @description clear the file list  */
      clearFiles,
      /** @description select the file manually */
      handleStart,
      /** @description remove the file manually */
      handleRemove
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        isPictureCard.value && __props.showFileList ? (openBlock(), createBlock(upload_list_default, {
          key: 0,
          disabled: unref(disabled),
          "list-type": __props.listType,
          files: unref(uploadFiles),
          crossorigin: __props.crossorigin,
          "handle-preview": __props.onPreview,
          onRemove: unref(handleRemove)
        }, createSlots({
          append: withCtx(() => [createVNode(upload_content_default, mergeProps({
            ref_key: "uploadRef",
            ref: uploadRef
          }, uploadContentProps2.value), {
            default: withCtx(() => [_ctx.$slots.trigger ? renderSlot(_ctx.$slots, "trigger", { key: 0 }) : createCommentVNode("v-if", true), !_ctx.$slots.trigger && _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 1 }) : createCommentVNode("v-if", true)]),
            _: 3
          }, 16)]),
          _: 2
        }, [_ctx.$slots.file ? {
          name: "default",
          fn: withCtx(({ file, index }) => [renderSlot(_ctx.$slots, "file", {
            file,
            index
          })]),
          key: "0"
        } : void 0]), 1032, [
          "disabled",
          "list-type",
          "files",
          "crossorigin",
          "handle-preview",
          "onRemove"
        ])) : createCommentVNode("v-if", true),
        !isPictureCard.value || isPictureCard.value && !__props.showFileList ? (openBlock(), createBlock(upload_content_default, mergeProps({
          key: 1,
          ref_key: "uploadRef",
          ref: uploadRef
        }, uploadContentProps2.value), {
          default: withCtx(() => [_ctx.$slots.trigger ? renderSlot(_ctx.$slots, "trigger", { key: 0 }) : createCommentVNode("v-if", true), !_ctx.$slots.trigger && _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 1 }) : createCommentVNode("v-if", true)]),
          _: 3
        }, 16)) : createCommentVNode("v-if", true),
        _ctx.$slots.trigger ? renderSlot(_ctx.$slots, "default", { key: 2 }) : createCommentVNode("v-if", true),
        renderSlot(_ctx.$slots, "tip"),
        !isPictureCard.value && __props.showFileList ? (openBlock(), createBlock(upload_list_default, {
          key: 3,
          disabled: unref(disabled),
          "list-type": __props.listType,
          files: unref(uploadFiles),
          crossorigin: __props.crossorigin,
          "handle-preview": __props.onPreview,
          onRemove: unref(handleRemove)
        }, createSlots({ _: 2 }, [_ctx.$slots.file ? {
          name: "default",
          fn: withCtx(({ file, index }) => [renderSlot(_ctx.$slots, "file", {
            file,
            index
          })]),
          key: "0"
        } : void 0]), 1032, [
          "disabled",
          "list-type",
          "files",
          "crossorigin",
          "handle-preview",
          "onRemove"
        ])) : createCommentVNode("v-if", true)
      ]);
    };
  }
});
var upload_default = upload_vue_vue_type_script_setup_true_lang_default;
const ElUpload = withInstall(upload_default);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "media",
  __ssrInlineRender: true,
  setup(__props) {
    const { role } = useAuth();
    const isAdmin = computed(() => role.value === "ADMIN" || role.value === "SUPERADMIN");
    const { upload, getList, remove } = useMedia();
    const mediaList = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(7);
    const { tableHeight } = useTableHeight(0);
    const pagedMedia = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      return mediaList.value.slice(start, start + pageSize.value);
    });
    const loading = ref(false);
    const uploadLoading = ref(false);
    function formatSize(bytes) {
      if (!bytes) return "0 B";
      if (bytes < 1024) return bytes + " B";
      if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
      return (bytes / 1048576).toFixed(1) + " MB";
    }
    async function loadData() {
      loading.value = true;
      try {
        const res = await getList();
        mediaList.value = res ?? [];
      } catch {
        mediaList.value = [];
      } finally {
        loading.value = false;
      }
    }
    async function handleUpload(file) {
      uploadLoading.value = true;
      try {
        await upload(file);
        ElMessage.success("上传成功");
        await loadData();
      } catch {
      } finally {
        uploadLoading.value = false;
      }
    }
    function beforeUpload(file) {
      const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
      if (!allowed.includes(file.type)) {
        ElMessage.error("只支持 jpg/png/gif/webp/svg 格式");
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        ElMessage.error("文件大小不能超过 10MB");
        return false;
      }
      handleUpload(file);
      return false;
    }
    async function handleDelete(id) {
      try {
        await ElMessageBox.confirm("确定删除此文件？", "确认", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" });
        await remove(id);
        ElMessage.success("删除成功");
        await loadData();
      } catch {
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_upload = ElUpload;
      const _component_el_button = ElButton;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_image = ElImage;
      const _component_el_pagination = ElPagination;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "flex": "1", "min-height": "0", "display": "flex", "flex-direction": "column" } }, _attrs))}><div class="page-header"><h2>媒体管理</h2>`);
      _push(ssrRenderComponent(_component_el_upload, {
        "show-file-list": false,
        "before-upload": beforeUpload,
        accept: "image/*"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              type: "primary",
              icon: unref(plus_default),
              loading: uploadLoading.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`上传文件`);
                } else {
                  return [
                    createTextVNode("上传文件")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_button, {
                type: "primary",
                icon: unref(plus_default),
                loading: uploadLoading.value
              }, {
                default: withCtx(() => [
                  createTextVNode("上传文件")
                ]),
                _: 1
              }, 8, ["icon", "loading"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="page-card" style="${ssrRenderStyle({ "flex": "1", "min-height": "0" })}"><div class="table-with-pagination">`);
      _push(ssrRenderComponent(_component_el_table, mergeProps({
        data: pagedMedia.value,
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
              label: "预览",
              width: "70"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_image, {
                    src: row.url,
                    style: { "width": "42px", "height": "42px", "border-radius": "6px" },
                    fit: "cover",
                    "preview-src-list": [row.url],
                    "preview-teleported": ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_image, {
                      src: row.url,
                      style: { "width": "42px", "height": "42px", "border-radius": "6px" },
                      fit: "cover",
                      "preview-src-list": [row.url],
                      "preview-teleported": ""
                    }, null, 8, ["src", "preview-src-list"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "originalName",
              label: "文件名",
              "min-width": "200",
              "show-overflow-tooltip": ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "mimeType",
              label: "类型",
              width: "100"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              label: "大小",
              width: "90"
            }, {
              default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(formatSize(row.size))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(formatSize(row.size)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_table_column, {
              prop: "uploadedBy.username",
              label: "上传者",
              width: "100"
            }, null, _parent2, _scopeId));
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
            if (isAdmin.value) {
              _push2(ssrRenderComponent(_component_el_table_column, {
                label: "操作",
                width: "100",
                fixed: "right"
              }, {
                default: withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
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
                label: "预览",
                width: "70"
              }, {
                default: withCtx(({ row }) => [
                  createVNode(_component_el_image, {
                    src: row.url,
                    style: { "width": "42px", "height": "42px", "border-radius": "6px" },
                    fit: "cover",
                    "preview-src-list": [row.url],
                    "preview-teleported": ""
                  }, null, 8, ["src", "preview-src-list"])
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "originalName",
                label: "文件名",
                "min-width": "200",
                "show-overflow-tooltip": ""
              }),
              createVNode(_component_el_table_column, {
                prop: "mimeType",
                label: "类型",
                width: "100"
              }),
              createVNode(_component_el_table_column, {
                label: "大小",
                width: "90"
              }, {
                default: withCtx(({ row }) => [
                  createTextVNode(toDisplayString(formatSize(row.size)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_el_table_column, {
                prop: "uploadedBy.username",
                label: "上传者",
                width: "100"
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
              isAdmin.value ? (openBlock(), createBlock(_component_el_table_column, {
                key: 0,
                label: "操作",
                width: "100",
                fixed: "right"
              }, {
                default: withCtx(({ row }) => [
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
        total: mediaList.value.length,
        layout: "prev, pager, next, jumper, total",
        "hide-on-single-page": false,
        background: ""
      }, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/media.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=media-B4-iOpA_.mjs.map
