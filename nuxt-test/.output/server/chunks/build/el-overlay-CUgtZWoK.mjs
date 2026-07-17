import { a2 as hasClass, X as addClass, a4 as getStyle, d as buildProps, e as definePropType, c as addUnit } from './request-D_zzMMA3.mjs';
import { clamp } from 'lodash-unified';
import { defineComponent, createVNode, renderSlot, h, isRef, computed, watch, onScopeDispose, ref } from 'vue';
import { g as useNamespace, t as throwError } from './server.mjs';
import { a as getScrollBarWidth } from './scroll-BmPP54RD.mjs';
import { NOOP } from '@vue/shared';

const useDraggable = (targetRef, dragRef, draggable, overflow) => {
  const transform = {
    offsetX: 0,
    offsetY: 0
  };
  const isDragging = ref(false);
  const adjustPosition = (moveX, moveY) => {
    if (targetRef.value) {
      const { offsetX, offsetY } = transform;
      const targetRect = targetRef.value.getBoundingClientRect();
      const targetLeft = Math.max(targetRect.left, 0);
      const targetTop = Math.max(targetRect.top, 0);
      const targetWidth = targetRect.width;
      const targetHeight = targetRect.height;
      const clientWidth = (void 0).documentElement.clientWidth;
      const clientHeight = (void 0).documentElement.clientHeight;
      const minLeft = -targetLeft + offsetX;
      const minTop = -targetTop + offsetY;
      const maxLeft = clientWidth - targetLeft - targetWidth + offsetX;
      const maxTop = clientHeight - targetTop - (targetHeight < clientHeight ? targetHeight : 0) + offsetY;
      if (!(overflow == null ? void 0 : overflow.value)) {
        moveX = clamp(moveX, minLeft, maxLeft);
        moveY = clamp(moveY, minTop, maxTop);
      }
      transform.offsetX = moveX;
      transform.offsetY = moveY;
      targetRef.value.style.transform = `translate(${addUnit(moveX)}, ${addUnit(moveY)})`;
    }
  };
  const resetPosition = () => {
    transform.offsetX = 0;
    transform.offsetY = 0;
    if (targetRef.value) targetRef.value.style.transform = "";
  };
  const updatePosition = () => {
    const { offsetX, offsetY } = transform;
    adjustPosition(offsetX, offsetY);
  };
  return {
    isDragging,
    resetPosition,
    updatePosition
  };
};
const useLockscreen = (trigger, options = {}) => {
  if (!isRef(trigger)) throwError("[useLockscreen]", "You need to pass a ref param to this function");
  const ns = options.ns || useNamespace("popup");
  const hiddenCls = computed(() => ns.bm("parent", "hidden"));
  let scrollBarWidth = 0;
  let withoutHiddenClass = false;
  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    setTimeout(() => {
      return;
    }, 200);
  };
  watch(trigger, (val) => {
    if (!val) {
      cleanup();
      return;
    }
    cleaned = false;
    withoutHiddenClass = !hasClass((void 0).body, hiddenCls.value);
    if (withoutHiddenClass) {
      (void 0).body.style.width;
      addClass((void 0).body, hiddenCls.value);
    }
    scrollBarWidth = getScrollBarWidth(ns.namespace.value);
    const bodyHasOverflow = (void 0).documentElement.clientHeight < (void 0).body.scrollHeight;
    const bodyOverflowY = getStyle((void 0).body, "overflowY");
    if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === "scroll") && withoutHiddenClass) (void 0).body.style.width = `calc(100% - ${scrollBarWidth}px)`;
  });
  onScopeDispose(() => cleanup());
};
const useSameTarget = (handleClick) => {
  if (!handleClick) return {
    onClick: NOOP,
    onMousedown: NOOP,
    onMouseup: NOOP
  };
  let mousedownTarget = false;
  let mouseupTarget = false;
  const onClick = (e) => {
    if (mousedownTarget && mouseupTarget) handleClick(e);
    mousedownTarget = mouseupTarget = false;
  };
  const onMousedown = (e) => {
    mousedownTarget = e.target === e.currentTarget;
  };
  const onMouseup = (e) => {
    mouseupTarget = e.target === e.currentTarget;
  };
  return {
    onClick,
    onMousedown,
    onMouseup
  };
};
const overlayProps = buildProps({
  mask: {
    type: Boolean,
    default: true
  },
  customMaskEvent: Boolean,
  overlayClass: { type: definePropType([
    String,
    Array,
    Object
  ]) },
  zIndex: { type: definePropType([String, Number]) }
});
const overlayEmits = { click: (evt) => evt instanceof MouseEvent };
const BLOCK = "overlay";
var overlay_default = defineComponent({
  name: "ElOverlay",
  props: overlayProps,
  emits: overlayEmits,
  setup(props, { slots, emit }) {
    const ns = useNamespace(BLOCK);
    const onMaskClick = (e) => {
      emit("click", e);
    };
    const { onClick, onMousedown, onMouseup } = useSameTarget(props.customMaskEvent ? void 0 : onMaskClick);
    return () => {
      return props.mask ? createVNode("div", {
        class: [ns.b(), props.overlayClass],
        style: { zIndex: props.zIndex },
        onClick,
        onMousedown,
        onMouseup
      }, [renderSlot(slots, "default")], 14, [
        "onClick",
        "onMouseup",
        "onMousedown"
      ]) : h("div", {
        class: props.overlayClass,
        style: {
          zIndex: props.zIndex,
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
        }
      }, [renderSlot(slots, "default")]);
    };
  }
});
const ElOverlay = overlay_default;

export { ElOverlay as E, useDraggable as a, useSameTarget as b, useLockscreen as u };
//# sourceMappingURL=el-overlay-CUgtZWoK.mjs.map
