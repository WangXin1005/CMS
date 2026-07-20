import { _ as __nuxt_component_0 } from './nuxt-link-rdY85wNa.mjs';
import { aH as __nuxt_component_1 } from './request-CHJHyar9.mjs';
import { defineComponent, ref, computed, provide, mergeProps, withCtx, createVNode, openBlock, createBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-BdUe2u1P.mjs';
import { u as useHead } from './composables-WyO_4ZCR.mjs';
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
import 'axios';
import '@vue/shared';
import 'lodash-unified';
import '@vueuse/core';
import '@ctrl/tinycolor';
import '@popperjs/core';
import './ssr-1ZCkBfDH.mjs';
import './cookie-CqLf-Dw-.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "public",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const siteLogo = ref("");
    const siteName = ref("CodeBlog");
    const siteDesc = ref("基于 Nuxt + Spring Boot 构建的博客 CMS 系统");
    const icpNumber = ref("蒙ICP备2026006795号-1");
    const siteSettings = computed(() => ({
      siteName: siteName.value,
      siteLogo: siteLogo.value,
      icpNumber: icpNumber.value
    }));
    provide("siteSettings", siteSettings);
    useHead({
      title: computed(() => siteName.value),
      meta: [{ name: "description", content: computed(() => siteDesc.value) }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "public-layout" }, _attrs))} data-v-08b66d2e><header class="public-header" data-v-08b66d2e><div class="header-inner" data-v-08b66d2e>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "logo"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="logo-icon" data-v-08b66d2e${_scopeId}>`);
            if (siteLogo.value) {
              _push2(`<img${ssrRenderAttr("src", siteLogo.value)} class="logo-img" alt="logo" data-v-08b66d2e${_scopeId}>`);
            } else {
              _push2(`<span class="logo-emoji" data-v-08b66d2e${_scopeId}>📝</span>`);
            }
            _push2(`</span><span class="logo-text" data-v-08b66d2e${_scopeId}>${ssrInterpolate(siteName.value)}</span>`);
          } else {
            return [
              createVNode("span", { class: "logo-icon" }, [
                siteLogo.value ? (openBlock(), createBlock("img", {
                  key: 0,
                  src: siteLogo.value,
                  class: "logo-img",
                  alt: "logo"
                }, null, 8, ["src"])) : (openBlock(), createBlock("span", {
                  key: 1,
                  class: "logo-emoji"
                }, "📝"))
              ]),
              createVNode("span", { class: "logo-text" }, toDisplayString(siteName.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="nav-links" data-v-08b66d2e>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</nav></div></header><main class="main-area" data-v-08b66d2e>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="blog-footer" data-v-08b66d2e><p data-v-08b66d2e>© 2026 ${ssrInterpolate(siteName.value)}. Powered by Nuxt &amp; Spring Boot.</p>`);
      if (icpNumber.value) {
        _push(`<p class="icp-text" data-v-08b66d2e>${ssrInterpolate(icpNumber.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/public.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _public = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-08b66d2e"]]);

export { _public as default };
//# sourceMappingURL=public-CbIJLJkr.mjs.map
