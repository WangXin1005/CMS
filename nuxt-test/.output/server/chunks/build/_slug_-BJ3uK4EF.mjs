import { E as ElButton } from './el-button-D6yHhR7A.mjs';
import { E as ElTag } from './index-BeMPG4FX.mjs';
import { E as ElDivider } from './el-divider-Q3VSkgAk.mjs';
import { E as ElInput } from './el-input-mx3aTNK2.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-rdY85wNa.mjs';
import { E as ElSkeleton, a as ElSkeletonItem } from './el-skeleton-DTRjR6_O.mjs';
import { E as ElMessage } from './request-BS6DhAWT.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, d as useRoute, u as useRouter } from './server.mjs';
import { u as useComment } from './useComment-DVDHPkzm.mjs';
import { u as useAuth } from './useAuth-BPTRPnVU.mjs';
import { s as sanitizeHtml } from './sanitize-CMFdLwh2.mjs';
import '@ctrl/tinycolor';
import 'lodash-unified';
import '@vueuse/core';
import '@vue/shared';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import './cookie-BrXVhyN0.mjs';
import 'isomorphic-dompurify';

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
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-ac26c31f"]]), { __name: "CommentSection" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const article = ref(null);
    const loading = ref(true);
    const categories = ref([]);
    const tags = ref([]);
    computed(() => route.params.slug);
    const formattedDate = computed(() => {
      if (!article.value?.createdAt) return "";
      return (article.value.createdAt || "").replace("T", " ").slice(0, 16);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_tag = ElTag;
      const _component_el_divider = ElDivider;
      const _component_CommentSection = __nuxt_component_3;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      if (!loading.value && article.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-detail-layout" }, _attrs))} data-v-e1ddbbe7><div class="detail-main" data-v-e1ddbbe7><div class="back-bar" data-v-e1ddbbe7>`);
        _push(ssrRenderComponent(_component_el_button, {
          size: "small",
          class: "back-btn",
          onClick: ($event) => unref(router).back()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg viewBox="0 0 24 24" width="14" height="14" style="${ssrRenderStyle({ "margin-right": "2px" })}" data-v-e1ddbbe7${_scopeId}><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" data-v-e1ddbbe7${_scopeId}></path></svg> 返回 `);
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
        _push(`</div><div class="article-header" data-v-e1ddbbe7><h1 class="article-title" data-v-e1ddbbe7>${ssrInterpolate(article.value.title)}</h1><div class="article-meta" data-v-e1ddbbe7><span data-v-e1ddbbe7>👤 ${ssrInterpolate(article.value.author?.username)}</span><span data-v-e1ddbbe7>📅 ${ssrInterpolate(formattedDate.value)}</span><span data-v-e1ddbbe7>👁 ${ssrInterpolate(article.value.viewCount)} 次阅读</span>`);
        if (article.value.category) {
          _push(ssrRenderComponent(_component_el_tag, {
            size: "small",
            type: "primary",
            effect: "plain"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(article.value.category.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(article.value.category.name), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (article.value.coverImage) {
          _push(`<div class="article-cover" data-v-e1ddbbe7><img${ssrRenderAttr("src", article.value.coverImage)}${ssrRenderAttr("alt", article.value.title)} data-v-e1ddbbe7></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="article-content" data-v-e1ddbbe7>${unref(sanitizeHtml)(article.value.content) ?? ""}</div>`);
        if (article.value.tags?.length) {
          _push(`<div class="article-tags" data-v-e1ddbbe7><!--[-->`);
          ssrRenderList(article.value.tags, (tag) => {
            _push(ssrRenderComponent(_component_el_tag, {
              key: tag.id,
              size: "small",
              effect: "plain",
              class: "tag-item"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` #${ssrInterpolate(tag.name)}`);
                } else {
                  return [
                    createTextVNode(" #" + toDisplayString(tag.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_el_divider, null, null, _parent));
        _push(ssrRenderComponent(_component_CommentSection, {
          "article-id": article.value.id
        }, null, _parent));
        _push(`</div><aside class="detail-sidebar" data-v-e1ddbbe7><div class="widget" data-v-e1ddbbe7><h3 class="widget-title" data-v-e1ddbbe7>📂 分类</h3>`);
        if (categories.value.length) {
          _push(`<ul class="category-list" data-v-e1ddbbe7><!--[-->`);
          ssrRenderList(categories.value, (cat) => {
            _push(`<li data-v-e1ddbbe7>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/?categoryId=${cat.id}`,
              class: "cat-link"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(cat.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(cat.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<p class="empty-hint" data-v-e1ddbbe7>暂无分类</p>`);
        }
        _push(`</div><div class="widget" data-v-e1ddbbe7><h3 class="widget-title" data-v-e1ddbbe7>🏷️ 标签</h3>`);
        if (tags.value.length) {
          _push(`<div class="tag-cloud" data-v-e1ddbbe7><!--[-->`);
          ssrRenderList(tags.value, (tag) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: tag.id,
              to: `/?tagId=${tag.id}`,
              class: "sidebar-tag-item"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(tag.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(tag.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<p class="empty-hint" data-v-e1ddbbe7>暂无标签</p>`);
        }
        _push(`</div></aside></div>`);
      } else if (loading.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "detail-loading" }, _attrs))} data-v-e1ddbbe7>`);
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
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e1ddbbe7"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-BJ3uK4EF.mjs.map
