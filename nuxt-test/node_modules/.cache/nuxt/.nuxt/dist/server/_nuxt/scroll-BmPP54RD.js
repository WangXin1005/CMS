import { N as isShadowRoot, J as getStyle } from "./request-D_zzMMA3.js";
import { isClient } from "@vueuse/core";
import { B as isWindow } from "../server.mjs";
import { r as rAF, d as cAF } from "./el-button-Ci-hQSxb.js";
import { isFunction } from "@vue/shared";
function easeInOutCubic(t, b, c, d) {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) return cc / 2 * t * t * t + b;
  return cc / 2 * ((t -= 2) * t * t + 2) + b;
}
const isScroll = (el, isVertical) => {
  if (!isClient) return false;
  const key = {
    undefined: "overflow",
    true: "overflow-y",
    false: "overflow-x"
  }[String(isVertical)];
  const overflow = getStyle(el, key);
  return [
    "scroll",
    "auto",
    "overlay"
  ].some((s) => overflow.includes(s));
};
const getScrollContainer = (el, isVertical) => {
  if (!isClient) return;
  let parent = el;
  while (parent) {
    if ([
      void 0,
      void 0,
      (void 0).documentElement
    ].includes(parent)) return void 0;
    if (isScroll(parent, isVertical)) return parent;
    if (isShadowRoot(parent)) parent = parent.host;
    else parent = parent.parentNode;
  }
  return parent;
};
let scrollBarWidth;
const getScrollBarWidth = (namespace) => {
  if (!isClient) return 0;
  if (scrollBarWidth !== void 0) return scrollBarWidth;
  const outer = (void 0).createElement("div");
  outer.className = `${namespace}-scrollbar__wrap`;
  outer.style.visibility = "hidden";
  outer.style.width = "100px";
  outer.style.position = "absolute";
  outer.style.top = "-9999px";
  (void 0).body.appendChild(outer);
  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = "scroll";
  const inner = (void 0).createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);
  const widthWithScroll = inner.offsetWidth;
  outer.parentNode?.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;
  return scrollBarWidth;
};
function scrollIntoView(container, selected) {
  if (!isClient) return;
  if (!selected) {
    container.scrollTop = 0;
    return;
  }
  const offsetParents = [];
  let pointer = selected.offsetParent;
  while (pointer !== null && container !== pointer && container.contains(pointer)) {
    offsetParents.push(pointer);
    pointer = pointer.offsetParent;
  }
  const top = selected.offsetTop + offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0);
  const bottom = top + selected.offsetHeight;
  const viewRectTop = container.scrollTop;
  const viewRectBottom = viewRectTop + container.clientHeight;
  if (top < viewRectTop) container.scrollTop = top;
  else if (bottom > viewRectBottom) container.scrollTop = bottom - container.clientHeight;
}
function animateScrollTo(container, from, to, duration, callback) {
  const startTime = Date.now();
  let handle;
  const scroll = () => {
    const time = Date.now() - startTime;
    const nextScrollTop = easeInOutCubic(time > duration ? duration : time, from, to, duration);
    if (isWindow(container)) container.scrollTo((void 0).pageXOffset, nextScrollTop);
    else container.scrollTop = nextScrollTop;
    if (time < duration) handle = rAF(scroll);
    else if (isFunction(callback)) callback();
  };
  scroll();
  return () => {
    handle && cAF(handle);
  };
}
const getScrollElement = (target, container) => {
  if (isWindow(container)) return target.ownerDocument.documentElement;
  return container;
};
const getScrollTop = (container) => {
  if (isWindow(container)) return (void 0).scrollY;
  return container.scrollTop;
};
export {
  getScrollContainer as a,
  getScrollBarWidth as g,
  scrollIntoView as s
};
//# sourceMappingURL=scroll-BmPP54RD.js.map
