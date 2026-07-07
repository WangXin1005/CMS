import { _ as __nuxt_component_0 } from './nuxt-link-rdY85wNa.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, shallowRef, getCurrentInstance, provide, cloneVNode, h, createElementBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-E3jONGWF.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './request-BOYQ0nPL.mjs';
import 'axios';
import '@vue/shared';
import 'lodash-unified';
import '@vueuse/core';
import 'async-validator';
import '@ctrl/tinycolor';
import './cookie-BrXVhyN0.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
const __nuxt_component_1 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "public",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "public-layout" }, _attrs))} data-v-2532f1f2><header class="public-header" data-v-2532f1f2><div class="header-inner" data-v-2532f1f2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "logo"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="logo-icon" data-v-2532f1f2${_scopeId}>📝</span><span class="logo-text" data-v-2532f1f2${_scopeId}>CodeBlog</span>`);
          } else {
            return [
              createVNode("span", { class: "logo-icon" }, "📝"),
              createVNode("span", { class: "logo-text" }, "CodeBlog")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="nav-links" data-v-2532f1f2>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</nav></div></header><main class="main-area" data-v-2532f1f2>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="public-footer" data-v-2532f1f2><p data-v-2532f1f2>© 2026 CodeBlog. Powered by Nuxt &amp; Spring Boot.</p></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/public.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _public = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2532f1f2"]]);

export { _public as default };
//# sourceMappingURL=public-x2_XrfKt.mjs.map
