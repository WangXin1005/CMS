import { isArray, hasOwn, camelize } from '@vue/shared';
import { s as isElement, f as debugWarn } from './server.mjs';
import { isVNode } from 'vue';
import { isClient } from '@vueuse/core';

const SCOPE = "utils/vue/vnode";
const getNormalizedProps = (node) => {
  if (!isVNode(node)) {
    debugWarn(SCOPE, "[getNormalizedProps] must be a VNode");
    return {};
  }
  const raw = node.props || {};
  const type = (isVNode(node.type) ? node.type.props : void 0) || {};
  const props = {};
  Object.keys(type).forEach((key) => {
    if (hasOwn(type[key], "default")) props[key] = type[key].default;
  });
  Object.keys(raw).forEach((key) => {
    props[camelize(key)] = raw[key];
  });
  return props;
};
const flattedChildren = (children) => {
  const vNodes = isArray(children) ? children : [children];
  const result = [];
  vNodes.forEach((child) => {
    if (isArray(child)) result.push(...flattedChildren(child));
    else if (isVNode(child) && child.component?.subTree) result.push(child, ...flattedChildren(child.component.subTree));
    else if (isVNode(child) && isArray(child.children)) result.push(...flattedChildren(child.children));
    else if (isVNode(child) && child.shapeFlag === 2) result.push(...flattedChildren(child.type()));
    else result.push(child);
  });
  return result;
};
const nodeList = /* @__PURE__ */ new Map();
if (isClient) {
  let startClick;
  (void 0).addEventListener("mousedown", (e) => startClick = e);
  (void 0).addEventListener("mouseup", (e) => {
    if (startClick) {
      for (const handlers of nodeList.values()) for (const { documentHandler } of handlers) documentHandler(e, startClick);
      startClick = void 0;
    }
  });
}
function createDocumentHandler(el, binding) {
  let excludes = [];
  if (isArray(binding.arg)) excludes = binding.arg;
  else if (isElement(binding.arg)) excludes.push(binding.arg);
  return function(mouseup, mousedown) {
    const popperRef = binding.instance.popperRef;
    const mouseUpTarget = mouseup.target;
    const mouseDownTarget = mousedown?.target;
    const isBound = !binding || !binding.instance;
    const isTargetExists = !mouseUpTarget || !mouseDownTarget;
    const isContainedByEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget);
    const isSelf = el === mouseUpTarget;
    const isTargetExcluded = excludes.length && excludes.some((item) => item?.contains(mouseUpTarget)) || excludes.length && excludes.includes(mouseDownTarget);
    const isContainedByPopper = popperRef && (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget));
    if (isBound || isTargetExists || isContainedByEl || isSelf || isTargetExcluded || isContainedByPopper) return;
    binding.value(mouseup, mousedown);
  };
}
const ClickOutside = {
  beforeMount(el, binding) {
    if (!nodeList.has(el)) nodeList.set(el, []);
    nodeList.get(el).push({
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    });
  },
  updated(el, binding) {
    if (!nodeList.has(el)) nodeList.set(el, []);
    const handlers = nodeList.get(el);
    const oldHandlerIndex = handlers.findIndex((item) => item.bindingFn === binding.oldValue);
    const newHandler = {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    };
    if (oldHandlerIndex >= 0) handlers.splice(oldHandlerIndex, 1, newHandler);
    else handlers.push(newHandler);
  },
  unmounted(el) {
    nodeList.delete(el);
  }
};

export { ClickOutside as C, flattedChildren as f, getNormalizedProps as g };
//# sourceMappingURL=index3.mjs.map
