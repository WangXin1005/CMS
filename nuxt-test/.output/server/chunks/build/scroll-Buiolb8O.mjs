import { aw as isShadowRoot, a4 as getStyle } from './request-BADReGqm.mjs';
import { isClient } from '@vueuse/core';

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

export { getScrollBarWidth as a, getScrollContainer as g, scrollIntoView as s };
//# sourceMappingURL=scroll-Buiolb8O.mjs.map
