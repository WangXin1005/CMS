import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "D:/projects/nuxtProject/nuxt-test/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/projects/nuxtProject/nuxt-test/node_modules/hookable/dist/index.mjs";
import "D:/projects/nuxtProject/nuxt-test/node_modules/unctx/dist/index.mjs";
import "D:/projects/nuxtProject/nuxt-test/node_modules/@nuxt/nitro-server/dist/runtime/h3-compat.mjs";
import "vue-router";
import "D:/projects/nuxtProject/nuxt-test/node_modules/defu/dist/defu.mjs";
import "D:/projects/nuxtProject/nuxt-test/node_modules/ufo/dist/index.mjs";
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "blank-layout" }, _attrs))} data-v-e14a6fa7>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/blank.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const blank = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-e14a6fa7"]]);
export {
  blank as default
};
//# sourceMappingURL=blank-D0MnAPB6.js.map
