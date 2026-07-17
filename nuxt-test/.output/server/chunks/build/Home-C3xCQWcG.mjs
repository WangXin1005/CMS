import { a as ElTooltip, w as withInstall, j as useGlobalConfig, d as buildProps, e as definePropType } from './request-D_zzMMA3.mjs';
import { _ as _export_sfc, n as navigateTo, g as useNamespace } from './server.mjs';
import { defineComponent, computed, ref, mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, withDirectives, openBlock, createBlock, createCommentVNode, Fragment, renderList, unref, createElementBlock, normalizeClass, renderSlot, createElementVNode, normalizeStyle, useSSRContext } from 'vue';
import { E as ElRow, a as ElCol } from './el-col-BipMgEek.mjs';
import { E as ElEmpty } from './el-empty-D8Qxcdwo.mjs';
import { E as ElTag } from './index-Dn6mtLLY.mjs';
import { E as ElDialog } from './el-dialog-BYYfQCZn.mjs';
import { E as ElDivider } from './el-divider-TX88hCsp.mjs';
import { E as ElButton } from './el-button-Ci-hQSxb.mjs';
import { v as vLoading } from './el-loading-CylbHp3O.mjs';
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { s as sanitizeHtml } from './sanitize-CMFdLwh2.mjs';
import { u as useArticle } from './useArticle-DF5LBJ9f.mjs';
import { u as useAuth } from './useAuth-Ln_QZRNp.mjs';
import 'axios';
import '@vue/shared';
import 'lodash-unified';
import '@vueuse/core';
import '@popperjs/core';
import '@ctrl/tinycolor';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import './el-overlay-CUgtZWoK.mjs';
import './scroll-BmPP54RD.mjs';
import 'isomorphic-dompurify';
import './cookie-CqLf-Dw-.mjs';

const cardProps = buildProps({
  /**
  * @description title of the card. Also accepts a DOM passed by `slot#header`
  */
  header: {
    type: String,
    default: ""
  },
  /**
  * @description content of footer. Also accepts a DOM passed by `slot#footer`
  */
  footer: {
    type: String,
    default: ""
  },
  /**
  * @description CSS style of card body
  */
  bodyStyle: {
    type: definePropType([
      String,
      Object,
      Array,
      Boolean
    ]),
    default: ""
  },
  /**
  * @description custom class name of card footer
  */
  headerClass: String,
  /**
  * @description custom class name of card body
  */
  bodyClass: String,
  /**
  * @description custom class name of card footer
  */
  footerClass: String,
  /**
  * @description when to show card shadows
  */
  shadow: {
    type: String,
    values: [
      "always",
      "hover",
      "never"
    ],
    default: void 0
  }
});
var card_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElCard",
  __name: "card",
  props: cardProps,
  setup(__props) {
    const globalConfig = useGlobalConfig("card");
    const ns = useNamespace("card");
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("div", { class: normalizeClass([unref(ns).b(), unref(ns).is(`${__props.shadow || ((_a = unref(globalConfig)) == null ? void 0 : _a.shadow) || "always"}-shadow`)]) }, [
        _ctx.$slots.header || __props.header ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass([unref(ns).e("header"), __props.headerClass])
        }, [renderSlot(_ctx.$slots, "header", {}, () => [createTextVNode(toDisplayString(__props.header), 1)])], 2)) : createCommentVNode("v-if", true),
        createElementVNode("div", {
          class: normalizeClass([unref(ns).e("body"), __props.bodyClass]),
          style: normalizeStyle(__props.bodyStyle)
        }, [renderSlot(_ctx.$slots, "default")], 6),
        _ctx.$slots.footer || __props.footer ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass([unref(ns).e("footer"), __props.footerClass])
        }, [renderSlot(_ctx.$slots, "footer", {}, () => [createTextVNode(toDisplayString(__props.footer), 1)])], 2)) : createCommentVNode("v-if", true)
      ], 2);
    };
  }
});
var card_default = card_vue_vue_type_script_setup_true_lang_default;
const ElCard = withInstall(card_default);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Home",
  __ssrInlineRender: true,
  setup(__props) {
    const { getById, getBySlug } = useArticle();
    const { role, username: currentUsername } = useAuth();
    const isAdmin = computed(() => role.value === "ADMIN" || role.value === "SUPERADMIN");
    const isGuest = computed(() => role.value === "GUEST");
    const roleLevel = { SUPERADMIN: 3, ADMIN: 2, USER: 1, GUEST: 0 };
    function canEditPreview() {
      var _a, _b, _c, _d;
      if (isGuest.value) return false;
      if (role.value === "SUPERADMIN") return true;
      const authorName = (_b = (_a = dialogArticle.value) == null ? void 0 : _a.author) == null ? void 0 : _b.username;
      if (authorName === currentUsername.value) return true;
      const authorRole = ((_d = (_c = dialogArticle.value) == null ? void 0 : _c.author) == null ? void 0 : _d.role) || "";
      if (role.value === "ADMIN") return roleLevel[authorRole] <= 1;
      return false;
    }
    const canEditArticle = computed(() => canEditPreview());
    const canClick = computed(() => true);
    const dialogVisible = ref(false);
    const dialogArticle = ref(null);
    const stats = ref({ totalArticles: 0, totalCategories: 0, totalTags: 0, totalComments: 0 });
    const recentArticles = ref([]);
    const statsLoading = ref(true);
    const articlesLoading = ref(true);
    function goCreate() {
      return navigateTo("/articles/create");
    }
    function goArticleList() {
      return navigateTo("/articles");
    }
    function goComments() {
      return navigateTo("/comments");
    }
    function handlePreviewEdit() {
      dialogVisible.value = false;
      navigateTo("/articles/edit/" + dialogArticle.value.id);
    }
    async function viewArticle(item) {
      try {
        const full = isAdmin.value ? await getById(item.id) : await getBySlug(item.slug);
        dialogArticle.value = full;
      } catch {
        dialogArticle.value = item;
      }
      dialogVisible.value = true;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_tooltip = ElTooltip;
      const _component_el_card = ElCard;
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      const _component_el_empty = ElEmpty;
      const _component_el_tag = ElTag;
      const _component_el_dialog = ElDialog;
      const _component_el_divider = ElDivider;
      const _component_el_button = ElButton;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-page-wrapper" }, _attrs))} data-v-4fd74f5b><div data-v-4fd74f5b><div class="page-header" data-v-4fd74f5b><h2 data-v-4fd74f5b>\u4EEA\u8868\u76D8</h2></div><div${ssrRenderAttrs(mergeProps({ class: "stats-grid" }, ssrGetDirectiveProps(_ctx, _directive_loading, statsLoading.value)))} data-v-4fd74f5b>`);
      _push(ssrRenderComponent(_component_el_tooltip, {
        content: "\u5305\u542B\u79C1\u5BC6\u6587\u7AE0",
        placement: "top"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_card, {
              class: "stat-card",
              shadow: "never"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="stat-value" style="${ssrRenderStyle({ "color": "#409eff" })}" data-v-4fd74f5b${_scopeId2}>${ssrInterpolate(stats.value.totalArticles)}</div><div class="stat-label" data-v-4fd74f5b${_scopeId2}>\u6587\u7AE0\u603B\u6570</div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: "stat-value",
                      style: { "color": "#409eff" }
                    }, toDisplayString(stats.value.totalArticles), 1),
                    createVNode("div", { class: "stat-label" }, "\u6587\u7AE0\u603B\u6570")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_card, {
                class: "stat-card",
                shadow: "never"
              }, {
                default: withCtx(() => [
                  createVNode("div", {
                    class: "stat-value",
                    style: { "color": "#409eff" }
                  }, toDisplayString(stats.value.totalArticles), 1),
                  createVNode("div", { class: "stat-label" }, "\u6587\u7AE0\u603B\u6570")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_card, {
        class: "stat-card",
        shadow: "never"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="stat-value" style="${ssrRenderStyle({ "color": "#67c23a" })}" data-v-4fd74f5b${_scopeId}>${ssrInterpolate(stats.value.totalCategories)}</div><div class="stat-label" data-v-4fd74f5b${_scopeId}>\u5206\u7C7B\u603B\u6570</div>`);
          } else {
            return [
              createVNode("div", {
                class: "stat-value",
                style: { "color": "#67c23a" }
              }, toDisplayString(stats.value.totalCategories), 1),
              createVNode("div", { class: "stat-label" }, "\u5206\u7C7B\u603B\u6570")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_card, {
        class: "stat-card",
        shadow: "never"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="stat-value" style="${ssrRenderStyle({ "color": "#e6a23c" })}" data-v-4fd74f5b${_scopeId}>${ssrInterpolate(stats.value.totalTags)}</div><div class="stat-label" data-v-4fd74f5b${_scopeId}>\u6807\u7B7E\u603B\u6570</div>`);
          } else {
            return [
              createVNode("div", {
                class: "stat-value",
                style: { "color": "#e6a23c" }
              }, toDisplayString(stats.value.totalTags), 1),
              createVNode("div", { class: "stat-label" }, "\u6807\u7B7E\u603B\u6570")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_card, {
        class: "stat-card",
        shadow: "never"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="stat-value" style="${ssrRenderStyle({ "color": "#f56c6c" })}" data-v-4fd74f5b${_scopeId}>${ssrInterpolate(stats.value.totalComments)}</div><div class="stat-label" data-v-4fd74f5b${_scopeId}>\u8BC4\u8BBA\u603B\u6570</div>`);
          } else {
            return [
              createVNode("div", {
                class: "stat-value",
                style: { "color": "#f56c6c" }
              }, toDisplayString(stats.value.totalComments), 1),
              createVNode("div", { class: "stat-label" }, "\u8BC4\u8BBA\u603B\u6570")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_el_row, { gutter: 16 }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_col, {
              span: isGuest.value ? 24 : 16
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_card, { shadow: "never" }, {
                    header: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span data-v-4fd74f5b${_scopeId3}>\u8FD1\u671F\u6587\u7AE0</span>`);
                      } else {
                        return [
                          createVNode("span", null, "\u8FD1\u671F\u6587\u7AE0")
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_loading, articlesLoading.value))} data-v-4fd74f5b${_scopeId3}>`);
                        if (!articlesLoading.value && recentArticles.value.length === 0) {
                          _push4(ssrRenderComponent(_component_el_empty, { description: "\u6682\u65E0\u6587\u7AE0" }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<!--[-->`);
                        ssrRenderList(recentArticles.value, (item, i) => {
                          _push4(`<div class="${ssrRenderClass([{ clickable: canClick.value }, "recent-item"])}" data-v-4fd74f5b${_scopeId3}><span class="recent-index" data-v-4fd74f5b${_scopeId3}>${ssrInterpolate(i + 1)}</span><span class="${ssrRenderClass([{ clickable: canClick.value }, "recent-title"])}" data-v-4fd74f5b${_scopeId3}>${ssrInterpolate(item.title)}</span><span class="recent-status" data-v-4fd74f5b${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_el_tag, {
                            type: item.status === "PUBLISHED" ? "success" : "warning",
                            size: "small",
                            effect: "dark"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(item.status === "PUBLISHED" ? "\u5DF2\u53D1\u5E03" : "\u8349\u7A3F")}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(item.status === "PUBLISHED" ? "\u5DF2\u53D1\u5E03" : "\u8349\u7A3F"), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</span><span class="recent-date" data-v-4fd74f5b${_scopeId3}>${ssrInterpolate((item.createdAt || "").replace("T", " ").slice(0, 16))}</span></div>`);
                        });
                        _push4(`<!--]--></div>`);
                      } else {
                        return [
                          withDirectives((openBlock(), createBlock("div", null, [
                            !articlesLoading.value && recentArticles.value.length === 0 ? (openBlock(), createBlock(_component_el_empty, {
                              key: 0,
                              description: "\u6682\u65E0\u6587\u7AE0"
                            })) : createCommentVNode("", true),
                            (openBlock(true), createBlock(Fragment, null, renderList(recentArticles.value, (item, i) => {
                              return openBlock(), createBlock("div", {
                                key: item.id,
                                class: ["recent-item", { clickable: canClick.value }],
                                onClick: ($event) => canClick.value && viewArticle(item)
                              }, [
                                createVNode("span", { class: "recent-index" }, toDisplayString(i + 1), 1),
                                createVNode("span", {
                                  class: ["recent-title", { clickable: canClick.value }]
                                }, toDisplayString(item.title), 3),
                                createVNode("span", { class: "recent-status" }, [
                                  createVNode(_component_el_tag, {
                                    type: item.status === "PUBLISHED" ? "success" : "warning",
                                    size: "small",
                                    effect: "dark"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.status === "PUBLISHED" ? "\u5DF2\u53D1\u5E03" : "\u8349\u7A3F"), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["type"])
                                ]),
                                createVNode("span", { class: "recent-date" }, toDisplayString((item.createdAt || "").replace("T", " ").slice(0, 16)), 1)
                              ], 10, ["onClick"]);
                            }), 128))
                          ])), [
                            [_directive_loading, articlesLoading.value]
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_card, { shadow: "never" }, {
                      header: withCtx(() => [
                        createVNode("span", null, "\u8FD1\u671F\u6587\u7AE0")
                      ]),
                      default: withCtx(() => [
                        withDirectives((openBlock(), createBlock("div", null, [
                          !articlesLoading.value && recentArticles.value.length === 0 ? (openBlock(), createBlock(_component_el_empty, {
                            key: 0,
                            description: "\u6682\u65E0\u6587\u7AE0"
                          })) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(recentArticles.value, (item, i) => {
                            return openBlock(), createBlock("div", {
                              key: item.id,
                              class: ["recent-item", { clickable: canClick.value }],
                              onClick: ($event) => canClick.value && viewArticle(item)
                            }, [
                              createVNode("span", { class: "recent-index" }, toDisplayString(i + 1), 1),
                              createVNode("span", {
                                class: ["recent-title", { clickable: canClick.value }]
                              }, toDisplayString(item.title), 3),
                              createVNode("span", { class: "recent-status" }, [
                                createVNode(_component_el_tag, {
                                  type: item.status === "PUBLISHED" ? "success" : "warning",
                                  size: "small",
                                  effect: "dark"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.status === "PUBLISHED" ? "\u5DF2\u53D1\u5E03" : "\u8349\u7A3F"), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["type"])
                              ]),
                              createVNode("span", { class: "recent-date" }, toDisplayString((item.createdAt || "").replace("T", " ").slice(0, 16)), 1)
                            ], 10, ["onClick"]);
                          }), 128))
                        ])), [
                          [_directive_loading, articlesLoading.value]
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (!isGuest.value) {
              _push2(ssrRenderComponent(_component_el_col, { span: 8 }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_card, { shadow: "never" }, {
                      header: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span data-v-4fd74f5b${_scopeId3}>\u5FEB\u6377\u64CD\u4F5C</span>`);
                        } else {
                          return [
                            createVNode("span", null, "\u5FEB\u6377\u64CD\u4F5C")
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="quick-actions" data-v-4fd74f5b${_scopeId3}><div class="quick-action-item" data-v-4fd74f5b${_scopeId3}><div class="qa-icon" data-v-4fd74f5b${_scopeId3}>\u270D\uFE0F</div><div class="qa-label" data-v-4fd74f5b${_scopeId3}>\u5199\u6587\u7AE0</div></div><div class="quick-action-item" data-v-4fd74f5b${_scopeId3}><div class="qa-icon" data-v-4fd74f5b${_scopeId3}>\u{1F4CB}</div><div class="qa-label" data-v-4fd74f5b${_scopeId3}>\u6587\u7AE0\u7BA1\u7406</div></div><div class="quick-action-item" data-v-4fd74f5b${_scopeId3}><div class="qa-icon" data-v-4fd74f5b${_scopeId3}>\u{1F4AC}</div><div class="qa-label" data-v-4fd74f5b${_scopeId3}>\u8BC4\u8BBA\u7BA1\u7406</div></div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "quick-actions" }, [
                              createVNode("div", {
                                class: "quick-action-item",
                                onClick: goCreate
                              }, [
                                createVNode("div", { class: "qa-icon" }, "\u270D\uFE0F"),
                                createVNode("div", { class: "qa-label" }, "\u5199\u6587\u7AE0")
                              ]),
                              createVNode("div", {
                                class: "quick-action-item",
                                onClick: goArticleList
                              }, [
                                createVNode("div", { class: "qa-icon" }, "\u{1F4CB}"),
                                createVNode("div", { class: "qa-label" }, "\u6587\u7AE0\u7BA1\u7406")
                              ]),
                              createVNode("div", {
                                class: "quick-action-item",
                                onClick: goComments
                              }, [
                                createVNode("div", { class: "qa-icon" }, "\u{1F4AC}"),
                                createVNode("div", { class: "qa-label" }, "\u8BC4\u8BBA\u7BA1\u7406")
                              ])
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_card, { shadow: "never" }, {
                        header: withCtx(() => [
                          createVNode("span", null, "\u5FEB\u6377\u64CD\u4F5C")
                        ]),
                        default: withCtx(() => [
                          createVNode("div", { class: "quick-actions" }, [
                            createVNode("div", {
                              class: "quick-action-item",
                              onClick: goCreate
                            }, [
                              createVNode("div", { class: "qa-icon" }, "\u270D\uFE0F"),
                              createVNode("div", { class: "qa-label" }, "\u5199\u6587\u7AE0")
                            ]),
                            createVNode("div", {
                              class: "quick-action-item",
                              onClick: goArticleList
                            }, [
                              createVNode("div", { class: "qa-icon" }, "\u{1F4CB}"),
                              createVNode("div", { class: "qa-label" }, "\u6587\u7AE0\u7BA1\u7406")
                            ]),
                            createVNode("div", {
                              class: "quick-action-item",
                              onClick: goComments
                            }, [
                              createVNode("div", { class: "qa-icon" }, "\u{1F4AC}"),
                              createVNode("div", { class: "qa-label" }, "\u8BC4\u8BBA\u7BA1\u7406")
                            ])
                          ])
                        ]),
                        _: 1
                      })
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
              createVNode(_component_el_col, {
                span: isGuest.value ? 24 : 16
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_card, { shadow: "never" }, {
                    header: withCtx(() => [
                      createVNode("span", null, "\u8FD1\u671F\u6587\u7AE0")
                    ]),
                    default: withCtx(() => [
                      withDirectives((openBlock(), createBlock("div", null, [
                        !articlesLoading.value && recentArticles.value.length === 0 ? (openBlock(), createBlock(_component_el_empty, {
                          key: 0,
                          description: "\u6682\u65E0\u6587\u7AE0"
                        })) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(recentArticles.value, (item, i) => {
                          return openBlock(), createBlock("div", {
                            key: item.id,
                            class: ["recent-item", { clickable: canClick.value }],
                            onClick: ($event) => canClick.value && viewArticle(item)
                          }, [
                            createVNode("span", { class: "recent-index" }, toDisplayString(i + 1), 1),
                            createVNode("span", {
                              class: ["recent-title", { clickable: canClick.value }]
                            }, toDisplayString(item.title), 3),
                            createVNode("span", { class: "recent-status" }, [
                              createVNode(_component_el_tag, {
                                type: item.status === "PUBLISHED" ? "success" : "warning",
                                size: "small",
                                effect: "dark"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.status === "PUBLISHED" ? "\u5DF2\u53D1\u5E03" : "\u8349\u7A3F"), 1)
                                ]),
                                _: 2
                              }, 1032, ["type"])
                            ]),
                            createVNode("span", { class: "recent-date" }, toDisplayString((item.createdAt || "").replace("T", " ").slice(0, 16)), 1)
                          ], 10, ["onClick"]);
                        }), 128))
                      ])), [
                        [_directive_loading, articlesLoading.value]
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["span"]),
              !isGuest.value ? (openBlock(), createBlock(_component_el_col, {
                key: 0,
                span: 8
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_card, { shadow: "never" }, {
                    header: withCtx(() => [
                      createVNode("span", null, "\u5FEB\u6377\u64CD\u4F5C")
                    ]),
                    default: withCtx(() => [
                      createVNode("div", { class: "quick-actions" }, [
                        createVNode("div", {
                          class: "quick-action-item",
                          onClick: goCreate
                        }, [
                          createVNode("div", { class: "qa-icon" }, "\u270D\uFE0F"),
                          createVNode("div", { class: "qa-label" }, "\u5199\u6587\u7AE0")
                        ]),
                        createVNode("div", {
                          class: "quick-action-item",
                          onClick: goArticleList
                        }, [
                          createVNode("div", { class: "qa-icon" }, "\u{1F4CB}"),
                          createVNode("div", { class: "qa-label" }, "\u6587\u7AE0\u7BA1\u7406")
                        ]),
                        createVNode("div", {
                          class: "quick-action-item",
                          onClick: goComments
                        }, [
                          createVNode("div", { class: "qa-icon" }, "\u{1F4AC}"),
                          createVNode("div", { class: "qa-label" }, "\u8BC4\u8BBA\u7BA1\u7406")
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_el_dialog, {
        modelValue: dialogVisible.value,
        "onUpdate:modelValue": ($event) => dialogVisible.value = $event,
        title: "\u6587\u7AE0\u9884\u89C8",
        width: "700px",
        top: "5vh",
        "destroy-on-close": ""
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_button, {
              onClick: ($event) => dialogVisible.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u5173\u95ED`);
                } else {
                  return [
                    createTextVNode("\u5173\u95ED")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (canEditArticle.value) {
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                onClick: handlePreviewEdit
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`\u7F16\u8F91`);
                  } else {
                    return [
                      createTextVNode("\u7F16\u8F91")
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
              createVNode(_component_el_button, {
                onClick: ($event) => dialogVisible.value = false
              }, {
                default: withCtx(() => [
                  createTextVNode("\u5173\u95ED")
                ]),
                _: 1
              }, 8, ["onClick"]),
              canEditArticle.value ? (openBlock(), createBlock(_component_el_button, {
                key: 0,
                type: "primary",
                onClick: handlePreviewEdit
              }, {
                default: withCtx(() => [
                  createTextVNode("\u7F16\u8F91")
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f;
          if (_push2) {
            if (dialogArticle.value) {
              _push2(`<!--[--><h2 style="${ssrRenderStyle({ "font-size": "20px", "margin": "0 0 12px", "color": "#1a1a1a" })}" data-v-4fd74f5b${_scopeId}>${ssrInterpolate(dialogArticle.value.title)}</h2><div style="${ssrRenderStyle({ "font-size": "13px", "color": "#999", "margin-bottom": "16px" })}" data-v-4fd74f5b${_scopeId}><span data-v-4fd74f5b${_scopeId}>\u270D ${ssrInterpolate((_a = dialogArticle.value.author) == null ? void 0 : _a.username)}</span><span style="${ssrRenderStyle({ "margin-left": "16px" })}" data-v-4fd74f5b${_scopeId}>${ssrInterpolate((dialogArticle.value.createdAt || "").replace("T", " ").slice(0, 16))}</span>`);
              if (dialogArticle.value.category) {
                _push2(ssrRenderComponent(_component_el_tag, {
                  size: "small",
                  style: { "margin-left": "12px" }
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(dialogArticle.value.category.name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(dialogArticle.value.category.name), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if ((_b = dialogArticle.value.tags) == null ? void 0 : _b.length) {
                _push2(`<div style="${ssrRenderStyle({ "margin-bottom": "12px" })}" data-v-4fd74f5b${_scopeId}><!--[-->`);
                ssrRenderList(dialogArticle.value.tags, (tag) => {
                  _push2(ssrRenderComponent(_component_el_tag, {
                    key: tag.id,
                    size: "small",
                    style: { "margin-right": "6px" }
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(tag.name)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(tag.name), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_el_divider, { style: { "margin": "12px 0" } }, null, _parent2, _scopeId));
              _push2(`<div class="article-content-render" style="${ssrRenderStyle({ "max-height": "400px", "overflow-y": "auto" })}" data-v-4fd74f5b${_scopeId}>${(_c = unref(sanitizeHtml)(dialogArticle.value.content)) != null ? _c : ""}</div><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              dialogArticle.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createVNode("h2", { style: { "font-size": "20px", "margin": "0 0 12px", "color": "#1a1a1a" } }, toDisplayString(dialogArticle.value.title), 1),
                createVNode("div", { style: { "font-size": "13px", "color": "#999", "margin-bottom": "16px" } }, [
                  createVNode("span", null, "\u270D " + toDisplayString((_d = dialogArticle.value.author) == null ? void 0 : _d.username), 1),
                  createVNode("span", { style: { "margin-left": "16px" } }, toDisplayString((dialogArticle.value.createdAt || "").replace("T", " ").slice(0, 16)), 1),
                  dialogArticle.value.category ? (openBlock(), createBlock(_component_el_tag, {
                    key: 0,
                    size: "small",
                    style: { "margin-left": "12px" }
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(dialogArticle.value.category.name), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                ((_e = dialogArticle.value.tags) == null ? void 0 : _e.length) ? (openBlock(), createBlock("div", {
                  key: 0,
                  style: { "margin-bottom": "12px" }
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(dialogArticle.value.tags, (tag) => {
                    return openBlock(), createBlock(_component_el_tag, {
                      key: tag.id,
                      size: "small",
                      style: { "margin-right": "6px" }
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(tag.name), 1)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ])) : createCommentVNode("", true),
                createVNode(_component_el_divider, { style: { "margin": "12px 0" } }),
                (openBlock(), createBlock("div", {
                  key: _ctx.previewKey + "-" + (((_f = dialogArticle.value) == null ? void 0 : _f.id) || 0),
                  class: "article-content-render",
                  style: { "max-height": "400px", "overflow-y": "auto" },
                  innerHTML: unref(sanitizeHtml)(dialogArticle.value.content)
                }, null, 8, ["innerHTML"]))
              ], 64)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4fd74f5b"]]);

export { Home as default };
//# sourceMappingURL=Home-C3xCQWcG.mjs.map
