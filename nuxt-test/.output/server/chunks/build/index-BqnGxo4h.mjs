import { E as ElInput } from './el-input-C8Qdx2zF.mjs';
import { E as ElSkeleton, a as ElSkeletonItem } from './el-skeleton-DvyBcMSn.mjs';
import { E as ElEmpty } from './el-empty-_RVDKu4W.mjs';
import { E as ElButton } from './el-button-BuxDcLYk.mjs';
import { E as ElTag } from './index-BZGW5Ml4.mjs';
import { P as search_default, E as ElMessage } from './request-BADReGqm.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, createCommentVNode, toDisplayString, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, n as navigateTo } from './server.mjs';
import { E as ElPagination } from './el-pagination-hfIdUDra.mjs';
import { u as useArticle } from './useArticle-D7LfIsfs.mjs';
import '@vueuse/core';
import '@vue/shared';
import 'lodash-unified';
import '@ctrl/tinycolor';
import 'axios';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import './el-select-z4Iicrnn.mjs';
import './el-scrollbar-DQd5UWQa.mjs';
import './scroll-Buiolb8O.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ArticleCard",
  __ssrInlineRender: true,
  props: {
    article: {}
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const imageError = ref(false);
    const formattedDate = computed(
      () => (props.article.createdAt || "").replace("T", " ").slice(0, 16) ?? ""
    );
    const displaySummary = computed(() => {
      if (props.article.summary) return props.article.summary;
      if (props.article.content) {
        const text = props.article.content.replace(/<[^>]*>/g, "").trim();
        return text.length > 120 ? text.slice(0, 120) + "..." : text;
      }
      return "";
    });
    const coverUrl = computed(() => props.article.coverImage ?? "");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_tag = ElTag;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-card" }, _attrs))} data-v-eb654dfd><div class="card-cover" data-v-eb654dfd>`);
      if (coverUrl.value && !imageError.value) {
        _push(`<img${ssrRenderAttr("src", coverUrl.value)}${ssrRenderAttr("alt", __props.article.title)} class="cover-image" data-v-eb654dfd>`);
      } else {
        _push(`<div class="cover-placeholder" style="${ssrRenderStyle({
          background: `linear-gradient(135deg, hsl(${__props.article.id * 137 % 360}, 70%, 60%), hsl(${(__props.article.id * 137 + 60) % 360}, 70%, 40%))`
        })}" data-v-eb654dfd><span class="placeholder-text" data-v-eb654dfd>${ssrInterpolate(__props.article.title.charAt(0))}</span></div>`);
      }
      _push(`</div><div class="card-body" data-v-eb654dfd><div class="card-meta" data-v-eb654dfd>`);
      if (__props.article.category) {
        _push(ssrRenderComponent(_component_el_tag, {
          size: "small",
          effect: "dark",
          class: "category-tag"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.article.category.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.article.category.name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="date" data-v-eb654dfd>${ssrInterpolate(formattedDate.value)}</span></div><h3 class="card-title" data-v-eb654dfd>${ssrInterpolate(__props.article.title)}</h3><p class="card-summary" data-v-eb654dfd>${ssrInterpolate(displaySummary.value)}</p><div class="card-footer" data-v-eb654dfd><span class="author" data-v-eb654dfd>👤 ${ssrInterpolate(__props.article.author.username)}</span><span class="views" data-v-eb654dfd>👁 ${ssrInterpolate(__props.article.viewCount)}</span></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ArticleCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-eb654dfd"]]), { __name: "ArticleCard" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { getPublished } = useArticle();
    const articles = ref([]);
    const loading = ref(true);
    const total = ref(0);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const searchKeyword = ref("");
    const activeCategoryId = ref(null);
    const activeTagId = ref(null);
    const categories = ref([]);
    const tags = ref([]);
    async function loadArticles() {
      loading.value = true;
      try {
        const res = await getPublished(currentPage.value, pageSize.value, {
          categoryId: activeCategoryId.value ?? void 0,
          tagId: activeTagId.value ?? void 0,
          keyword: searchKeyword.value || void 0
        });
        articles.value = res.content;
        total.value = res.totalElements;
      } catch {
        ElMessage.error("加载文章失败，请稍后重试");
        articles.value = [];
        total.value = 0;
      } finally {
        loading.value = false;
      }
    }
    function handleSearch() {
      currentPage.value = 1;
      loadArticles();
    }
    function selectTag(tagId) {
      activeTagId.value = activeTagId.value === tagId ? null : tagId;
      activeCategoryId.value = null;
      currentPage.value = 1;
      loadArticles();
    }
    function navigateToArticle(slug) {
      navigateTo("/article/" + slug);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_input = ElInput;
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      const _component_el_empty = ElEmpty;
      const _component_el_button = ElButton;
      const _component_ArticleCard = __nuxt_component_5;
      const _component_el_pagination = ElPagination;
      const _component_el_tag = ElTag;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "blog-layout" }, _attrs))} data-v-c1a2143f><div class="main-content" data-v-c1a2143f><div class="search-bar" data-v-c1a2143f>`);
      _push(ssrRenderComponent(_component_el_input, {
        modelValue: searchKeyword.value,
        "onUpdate:modelValue": ($event) => searchKeyword.value = $event,
        placeholder: "搜索文章...",
        clearable: "",
        "prefix-icon": unref(search_default),
        size: "large",
        onClear: handleSearch,
        onKeyup: handleSearch
      }, null, _parent));
      _push(`</div>`);
      if (loading.value) {
        _push(`<div class="skeleton-grid" data-v-c1a2143f><!--[-->`);
        ssrRenderList(4, (i) => {
          _push(ssrRenderComponent(_component_el_skeleton, {
            key: i,
            count: 1,
            style: { "--el-skeleton-color": "#f0f0f0" }
          }, {
            template: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div style="${ssrRenderStyle({ "padding": "0" })}" data-v-c1a2143f${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_skeleton_item, {
                  variant: "image",
                  style: { "width": "100%", "height": "180px", "border-radius": "8px 8px 0 0" }
                }, null, _parent2, _scopeId));
                _push2(`<div style="${ssrRenderStyle({ "padding": "14px" })}" data-v-c1a2143f${_scopeId}>`);
                _push2(ssrRenderComponent(_component_el_skeleton_item, {
                  variant: "text",
                  style: { "width": "40%" }
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_skeleton_item, {
                  variant: "h3",
                  style: { "width": "80%", "margin-top": "8px" }
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_skeleton_item, {
                  variant: "text",
                  style: { "width": "60%", "margin-top": "8px" }
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_skeleton_item, {
                  variant: "text",
                  style: { "width": "30%", "margin-top": "8px" }
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                return [
                  createVNode("div", { style: { "padding": "0" } }, [
                    createVNode(_component_el_skeleton_item, {
                      variant: "image",
                      style: { "width": "100%", "height": "180px", "border-radius": "8px 8px 0 0" }
                    }),
                    createVNode("div", { style: { "padding": "14px" } }, [
                      createVNode(_component_el_skeleton_item, {
                        variant: "text",
                        style: { "width": "40%" }
                      }),
                      createVNode(_component_el_skeleton_item, {
                        variant: "h3",
                        style: { "width": "80%", "margin-top": "8px" }
                      }),
                      createVNode(_component_el_skeleton_item, {
                        variant: "text",
                        style: { "width": "60%", "margin-top": "8px" }
                      }),
                      createVNode(_component_el_skeleton_item, {
                        variant: "text",
                        style: { "width": "30%", "margin-top": "8px" }
                      })
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (articles.value.length === 0) {
        _push(ssrRenderComponent(_component_el_empty, { description: "暂无文章" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (activeCategoryId.value || activeTagId.value || searchKeyword.value) {
                _push2(ssrRenderComponent(_component_el_button, {
                  type: "primary",
                  onClick: () => {
                    activeCategoryId.value = null;
                    activeTagId.value = null;
                    searchKeyword.value = "";
                    handleSearch();
                  }
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` 清空筛选条件 `);
                    } else {
                      return [
                        createTextVNode(" 清空筛选条件 ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                activeCategoryId.value || activeTagId.value || searchKeyword.value ? (openBlock(), createBlock(_component_el_button, {
                  key: 0,
                  type: "primary",
                  onClick: () => {
                    activeCategoryId.value = null;
                    activeTagId.value = null;
                    searchKeyword.value = "";
                    handleSearch();
                  }
                }, {
                  default: withCtx(() => [
                    createTextVNode(" 清空筛选条件 ")
                  ]),
                  _: 1
                }, 8, ["onClick"])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="article-grid" data-v-c1a2143f><!--[-->`);
        ssrRenderList(articles.value, (article) => {
          _push(ssrRenderComponent(_component_ArticleCard, {
            key: article.id,
            article,
            onClick: ($event) => navigateToArticle(article.slug)
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      if (total.value > pageSize.value) {
        _push(`<div class="pagination-wrapper" data-v-c1a2143f>`);
        _push(ssrRenderComponent(_component_el_pagination, {
          "current-page": currentPage.value,
          "onUpdate:currentPage": ($event) => currentPage.value = $event,
          "page-size": pageSize.value,
          total: total.value,
          layout: "prev, pager, next, jumper, total",
          "hide-on-single-page": false,
          background: "",
          onCurrentChange: loadArticles
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><aside class="sidebar" data-v-c1a2143f><div class="widget" data-v-c1a2143f><h3 class="widget-title" data-v-c1a2143f>📂 分类</h3>`);
      if (categories.value.length) {
        _push(`<ul class="category-list" data-v-c1a2143f><!--[-->`);
        ssrRenderList(categories.value, (cat) => {
          _push(`<li class="${ssrRenderClass({ active: activeCategoryId.value === cat.id })}" data-v-c1a2143f>${ssrInterpolate(cat.name)}</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<p class="empty-hint" data-v-c1a2143f>暂无分类</p>`);
      }
      _push(`</div><div class="widget" data-v-c1a2143f><h3 class="widget-title" data-v-c1a2143f>🏷️ 标签</h3>`);
      if (tags.value.length) {
        _push(`<div class="tag-cloud" data-v-c1a2143f><!--[-->`);
        ssrRenderList(tags.value, (tag) => {
          _push(ssrRenderComponent(_component_el_tag, {
            key: tag.id,
            type: activeTagId.value === tag.id ? "primary" : void 0,
            effect: activeTagId.value === tag.id ? "dark" : void 0,
            class: "tag-item",
            onClick: ($event) => selectTag(tag.id)
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
        _push(`<p class="empty-hint" data-v-c1a2143f>暂无标签</p>`);
      }
      _push(`</div></aside></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c1a2143f"]]);

export { index as default };
//# sourceMappingURL=index-BqnGxo4h.mjs.map
