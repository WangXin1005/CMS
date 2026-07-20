import { E as ElButton, d as ElSkeleton, e as ElSkeletonItem } from './request-CP-lljC1.mjs';
import { defineComponent, inject, computed, ref, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { s as sanitizeHtml } from './sanitize-CMFdLwh2.mjs';
import { _ as _export_sfc, d as useRoute, u as useRouter } from './server.mjs';
import 'axios';
import '@vue/shared';
import 'lodash-unified';
import '@vueuse/core';
import '@ctrl/tinycolor';
import '@popperjs/core';
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
import 'isomorphic-dompurify';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    inject("siteSettings", computed(() => ({
      siteName: "CodeBlog",
      siteLogo: "",
      icpNumber: ""
    })));
    const route = useRoute();
    const router = useRouter();
    const article = ref(null);
    const loading = ref(true);
    computed(() => route.params.slug);
    const formattedDate = computed(() => {
      if (!article.value?.createdAt) return "";
      return (article.value.createdAt || "").replace("T", " ").slice(0, 16);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      if (!loading.value && article.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-detail-layout" }, _attrs))} data-v-1883a4f6><div class="detail-main" data-v-1883a4f6><div class="sticky-header" data-v-1883a4f6><div class="back-bar" data-v-1883a4f6>`);
        _push(ssrRenderComponent(_component_el_button, {
          size: "small",
          class: "back-btn",
          onClick: ($event) => unref(router).back()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg viewBox="0 0 24 24" width="14" height="14" style="${ssrRenderStyle({ "margin-right": "2px" })}" data-v-1883a4f6${_scopeId}><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" data-v-1883a4f6${_scopeId}></path></svg> 返回 `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  viewBox: "0 0 24 24",
                  width: "14",
                  height: "14",
                  style: { "margin-right": "2px" }
                }, [
                  createVNode("path", {
                    fill: "currentColor",
                    d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                  })
                ])),
                createTextVNode(" 返回 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="article-header" data-v-1883a4f6><h1 class="article-title" data-v-1883a4f6>${ssrInterpolate(article.value.title)}</h1><div class="article-meta" data-v-1883a4f6><span data-v-1883a4f6>👤 ${ssrInterpolate(article.value.author?.username)}</span><span data-v-1883a4f6>📅 ${ssrInterpolate(formattedDate.value)}</span><span data-v-1883a4f6>👁 ${ssrInterpolate(article.value.viewCount)} 次阅读</span></div></div></div>`);
        if (article.value.coverImage) {
          _push(`<div class="article-cover" data-v-1883a4f6><img${ssrRenderAttr("src", article.value.coverImage)}${ssrRenderAttr("alt", article.value.title)} data-v-1883a4f6></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="article-content" data-v-1883a4f6>${unref(sanitizeHtml)(article.value.content) ?? ""}</div></div></div>`);
      } else if (loading.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "detail-loading" }, _attrs))} data-v-1883a4f6>`);
        _push(ssrRenderComponent(_component_el_skeleton, { count: 1 }, {
          template: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_skeleton_item, {
                variant: "h1",
                style: { "width": "60%", "height": "32px" }
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_skeleton_item, {
                variant: "text",
                style: { "margin-top": "16px" }
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_skeleton_item, { variant: "text" }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_skeleton_item, {
                variant: "text",
                style: { "width": "40%" }
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_skeleton_item, {
                variant: "image",
                style: { "width": "100%", "height": "300px", "margin-top": "24px" }
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_skeleton_item, {
                  variant: "h1",
                  style: { "width": "60%", "height": "32px" }
                }),
                createVNode(_component_el_skeleton_item, {
                  variant: "text",
                  style: { "margin-top": "16px" }
                }),
                createVNode(_component_el_skeleton_item, { variant: "text" }),
                createVNode(_component_el_skeleton_item, {
                  variant: "text",
                  style: { "width": "40%" }
                }),
                createVNode(_component_el_skeleton_item, {
                  variant: "image",
                  style: { "width": "100%", "height": "300px", "margin-top": "24px" }
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/article/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1883a4f6"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-C23ctG9W.mjs.map
