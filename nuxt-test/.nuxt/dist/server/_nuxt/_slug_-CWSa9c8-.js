import { E as ElButton } from "./el-button-Ci-hQSxb.js";
import { E as ElDivider } from "./el-divider-TX88hCsp.js";
import { E as ElInput } from "./el-input-BZXamVjT.js";
import { _ as __nuxt_component_0 } from "./nuxt-link-rdY85wNa.js";
import { E as ElSkeleton, a as ElSkeletonItem } from "./el-skeleton-DV5oBZRd.js";
import { E as ElMessage } from "./request-D_zzMMA3.js";
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext, inject, openBlock, createBlock } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { d as useRoute, _ as _export_sfc, u as useRouter } from "../server.mjs";
import "dayjs";
import { u as useComment } from "./useComment-DkkcI_2K.js";
import { u as useAuth } from "./useAuth-Ln_QZRNp.js";
import { s as sanitizeHtml } from "./sanitize-CMFdLwh2.js";
import "@ctrl/tinycolor";
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
import "D:/projects/nuxtProject/nuxt-test/node_modules/ufo/dist/index.mjs";
import "D:/projects/nuxtProject/nuxt-test/node_modules/defu/dist/defu.mjs";
import "axios";
import "@popperjs/core";
import "D:/projects/nuxtProject/nuxt-test/node_modules/perfect-debounce/dist/index.mjs";
import "D:/projects/nuxtProject/nuxt-test/node_modules/@nuxt/nitro-server/dist/runtime/h3-compat.mjs";
import "D:/projects/nuxtProject/nuxt-test/node_modules/ohash/dist/index.mjs";
import "./ssr-1ZCkBfDH.js";
import "D:/projects/nuxtProject/nuxt-test/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "D:/projects/nuxtProject/nuxt-test/node_modules/ofetch/dist/node.mjs";
import "D:/projects/nuxtProject/nuxt-test/node_modules/hookable/dist/index.mjs";
import "D:/projects/nuxtProject/nuxt-test/node_modules/unctx/dist/index.mjs";
import "vue-router";
import "./cookie-CqLf-Dw-.js";
import "D:/projects/nuxtProject/nuxt-test/node_modules/cookie-es/dist/index.mjs";
import "isomorphic-dompurify";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CommentSection",
  __ssrInlineRender: true,
  props: {
    articleId: {}
  },
  setup(__props) {
    const route = useRoute();
    const loginUrl = computed(() => `/login?redirect=${encodeURIComponent(route.fullPath)}`);
    const props = __props;
    const { getArticleComments, submit } = useComment();
    const { isLoggedIn } = useAuth();
    const comments = ref([]);
    const loading = ref(true);
    const newComment = ref("");
    const submitting = ref(false);
    async function loadComments() {
      loading.value = true;
      try {
        const res = await getArticleComments(props.articleId);
        comments.value = Array.isArray(res) ? res : [];
      } catch {
        comments.value = [];
      } finally {
        loading.value = false;
      }
    }
    async function handleSubmit() {
      if (!newComment.value.trim()) return;
      submitting.value = true;
      try {
        await submit({ content: newComment.value.trim(), articleId: props.articleId });
        ElMessage.success("评论提交成功，等待审核");
        newComment.value = "";
        await loadComments();
      } catch {
      } finally {
        submitting.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_el_divider = ElDivider;
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "comment-section" }, _attrs))} data-v-ac26c31f><h3 class="comment-title" data-v-ac26c31f>💬 评论 (${ssrInterpolate(comments.value.length)})</h3>`);
      if (unref(isLoggedIn)) {
        _push(`<div class="comment-form" data-v-ac26c31f>`);
        _push(ssrRenderComponent(_component_el_input, {
          modelValue: newComment.value,
          "onUpdate:modelValue": ($event) => newComment.value = $event,
          type: "textarea",
          rows: 3,
          placeholder: "写下你的评论...",
          maxlength: "1000",
          "show-word-limit": ""
        }, null, _parent));
        _push(`<div class="form-actions" data-v-ac26c31f>`);
        _push(ssrRenderComponent(_component_el_button, {
          type: "primary",
          loading: submitting.value,
          disabled: !newComment.value.trim(),
          onClick: handleSubmit
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 提交评论 `);
            } else {
              return [
                createTextVNode(" 提交评论 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div class="login-hint" data-v-ac26c31f><p data-v-ac26c31f>请 `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: loginUrl.value,
          class: "login-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`登录`);
            } else {
              return [
                createTextVNode("登录")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(` 后发表评论</p></div>`);
      }
      _push(ssrRenderComponent(_component_el_divider, null, null, _parent));
      if (loading.value) {
        _push(`<div class="comments-loading" data-v-ac26c31f>`);
        _push(ssrRenderComponent(_component_el_skeleton, { count: 2 }, {
          template: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_skeleton_item, {
                variant: "text",
                style: { "width": "30%" }
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_skeleton_item, {
                variant: "text",
                style: { "width": "100%" }
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_skeleton_item, {
                  variant: "text",
                  style: { "width": "30%" }
                }),
                createVNode(_component_el_skeleton_item, {
                  variant: "text",
                  style: { "width": "100%" }
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (comments.value.length === 0) {
        _push(`<div class="comments-empty" data-v-ac26c31f>暂无评论</div>`);
      } else {
        _push(`<div class="comments-list" data-v-ac26c31f><!--[-->`);
        ssrRenderList(comments.value, (comment) => {
          _push(`<div class="comment-item" data-v-ac26c31f><div class="comment-header" data-v-ac26c31f><strong data-v-ac26c31f>${ssrInterpolate(comment.author?.username || "匿名")}</strong><span class="comment-date" data-v-ac26c31f>${ssrInterpolate((comment.createdAt || "").replace("T", " ").slice(0, 16))}</span></div><p class="comment-content" data-v-ac26c31f>${ssrInterpolate(comment.content)}</p></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CommentSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-ac26c31f"]]), { __name: "CommentSection" });
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
      const _component_el_divider = ElDivider;
      const _component_CommentSection = __nuxt_component_2;
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      if (!loading.value && article.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-detail-layout" }, _attrs))} data-v-712dea6d><div class="detail-main" data-v-712dea6d><div class="back-bar" data-v-712dea6d>`);
        _push(ssrRenderComponent(_component_el_button, {
          size: "small",
          class: "back-btn",
          onClick: ($event) => unref(router).back()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg viewBox="0 0 24 24" width="14" height="14" style="${ssrRenderStyle({ "margin-right": "2px" })}" data-v-712dea6d${_scopeId}><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" data-v-712dea6d${_scopeId}></path></svg> 返回 `);
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
        _push(`</div><div class="article-header" data-v-712dea6d><h1 class="article-title" data-v-712dea6d>${ssrInterpolate(article.value.title)}</h1><div class="article-meta" data-v-712dea6d><span data-v-712dea6d>👤 ${ssrInterpolate(article.value.author?.username)}</span><span data-v-712dea6d>📅 ${ssrInterpolate(formattedDate.value)}</span><span data-v-712dea6d>👁 ${ssrInterpolate(article.value.viewCount)} 次阅读</span></div></div>`);
        if (article.value.coverImage) {
          _push(`<div class="article-cover" data-v-712dea6d><img${ssrRenderAttr("src", article.value.coverImage)}${ssrRenderAttr("alt", article.value.title)} data-v-712dea6d></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="article-content" data-v-712dea6d>${unref(sanitizeHtml)(article.value.content) ?? ""}</div>`);
        _push(ssrRenderComponent(_component_el_divider, null, null, _parent));
        _push(ssrRenderComponent(_component_CommentSection, {
          "article-id": article.value.id
        }, null, _parent));
        _push(`</div></div>`);
      } else if (loading.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "detail-loading" }, _attrs))} data-v-712dea6d>`);
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
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-712dea6d"]]);
export {
  _slug_ as default
};
//# sourceMappingURL=_slug_-CWSa9c8-.js.map
