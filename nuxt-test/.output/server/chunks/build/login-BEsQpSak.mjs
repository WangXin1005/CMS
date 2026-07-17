import { b as ElIcon, l as loading_default, k as user_default, n as message_default$1, o as lock_default, E as ElMessage } from './request-D_zzMMA3.mjs';
import { E as ElForm, a as ElFormItem } from './el-form-item-CcZ4_kPm.mjs';
import { E as ElInput } from './el-input-BZXamVjT.mjs';
import { E as ElButton } from './el-button-Ci-hQSxb.mjs';
import { E as ElCheckbox } from './el-checkbox-CEM_OFcg.mjs';
import { defineComponent, ref, watch, mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, d as useRoute, u as useRouter } from './server.mjs';
import { v as validateUsername, a as validateEmail, b as validatePassword } from './email-CEn54U6N.mjs';
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
import 'async-validator';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import './cookie-CqLf-Dw-.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const { login: login2, registerGuest, initSuperAdmin, checkUsername } = useAuth();
    const mode = ref("checking");
    const loginForm = ref({ username: "", password: "" });
    const registerForm = ref({ username: "", email: "", password: "", confirmPassword: "" });
    const loginLoading = ref(false);
    const registerLoading = ref(false);
    const initLoading = ref(false);
    const showRegister = ref(false);
    const rememberMe = ref(false);
    const initUsernameError = ref("");
    const initEmailError = ref("");
    const initPasswordError = ref("");
    const initConfirmError = ref("");
    const regUsernameError = ref("");
    const regEmailError = ref("");
    const regPasswordError = ref("");
    const regConfirmError = ref("");
    watch(
      () => loginForm.value.username,
      (newVal) => {
        if (rememberMe.value && newVal !== localStorage.getItem("remembered_username")) {
          rememberMe.value = false;
          localStorage.removeItem("remembered_username");
        }
      }
    );
    async function onInitUsernameBlur() {
      const err = validateUsername(registerForm.value.username);
      initUsernameError.value = err || "";
      if (!err && registerForm.value.username) {
        const taken = await checkUsername(registerForm.value.username);
        if (taken) initUsernameError.value = "\u7528\u6237\u540D\u5DF2\u88AB\u4F7F\u7528";
      }
    }
    function onInitEmailBlur() {
      initEmailError.value = validateEmail(registerForm.value.email) || "";
    }
    function onInitPasswordBlur() {
      initPasswordError.value = validatePassword(registerForm.value.password) || "";
      if (registerForm.value.confirmPassword) {
        if (registerForm.value.password !== registerForm.value.confirmPassword) {
          initPasswordError.value = "\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4";
          initConfirmError.value = "\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4";
        } else {
          initConfirmError.value = "";
        }
      }
    }
    function onInitConfirmBlur() {
      if (registerForm.value.confirmPassword && registerForm.value.password !== registerForm.value.confirmPassword) {
        initConfirmError.value = "\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4";
        initPasswordError.value = "\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4";
      } else {
        initConfirmError.value = "";
        initPasswordError.value = registerForm.value.password ? validatePassword(registerForm.value.password) || "" : "";
      }
    }
    async function onRegUsernameBlur() {
      const err = validateUsername(registerForm.value.username);
      regUsernameError.value = err || "";
      if (!err && registerForm.value.username) {
        const taken = await checkUsername(registerForm.value.username);
        if (taken) regUsernameError.value = "\u7528\u6237\u540D\u5DF2\u88AB\u4F7F\u7528";
      }
    }
    function onRegEmailBlur() {
      regEmailError.value = validateEmail(registerForm.value.email) || "";
    }
    function onRegPasswordBlur() {
      regPasswordError.value = validatePassword(registerForm.value.password) || "";
      if (registerForm.value.confirmPassword) {
        if (registerForm.value.password !== registerForm.value.confirmPassword) {
          regPasswordError.value = "\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4";
          regConfirmError.value = "\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4";
        } else {
          regConfirmError.value = "";
        }
      }
    }
    function onRegConfirmBlur() {
      if (registerForm.value.confirmPassword && registerForm.value.password !== registerForm.value.confirmPassword) {
        regConfirmError.value = "\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4";
        regPasswordError.value = "\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4";
      } else {
        regConfirmError.value = "";
        regPasswordError.value = registerForm.value.password ? validatePassword(registerForm.value.password) || "" : "";
      }
    }
    async function handleLogin() {
      if (!loginForm.value.username || !loginForm.value.password) {
        ElMessage.warning("\u8BF7\u8F93\u5165\u7528\u6237\u540D\u548C\u5BC6\u7801");
        return;
      }
      loginLoading.value = true;
      try {
        if (rememberMe.value) {
          localStorage.setItem("remembered_username", loginForm.value.username);
        } else {
          localStorage.removeItem("remembered_username");
        }
        await login2(loginForm.value);
        ElMessage.success("\u767B\u5F55\u6210\u529F");
        const redirectPath = route.query.redirect;
        router.push(redirectPath || "/home");
      } catch {
        loginLoading.value = false;
      } finally {
        loginLoading.value = false;
      }
    }
    async function handleRegister() {
      const ue = validateUsername(registerForm.value.username);
      const ee = validateEmail(registerForm.value.email);
      const pe = validatePassword(registerForm.value.password);
      regUsernameError.value = ue || "";
      regEmailError.value = ee || "";
      regPasswordError.value = pe || "";
      if (ue || ee || pe) return;
      const taken = await checkUsername(registerForm.value.username);
      if (taken) {
        regUsernameError.value = "\u7528\u6237\u540D\u5DF2\u88AB\u4F7F\u7528";
        return;
      }
      if (registerForm.value.password !== registerForm.value.confirmPassword) {
        ElMessage.warning("\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4");
        return;
      }
      registerLoading.value = true;
      try {
        await registerGuest(registerForm.value);
        ElMessage.success("\u6CE8\u518C\u6210\u529F");
        showRegister.value = false;
      } catch {
        loginLoading.value = false;
      } finally {
        registerLoading.value = false;
      }
    }
    async function handleInit() {
      const ue = validateUsername(registerForm.value.username);
      const ee = validateEmail(registerForm.value.email);
      const pe = validatePassword(registerForm.value.password);
      initUsernameError.value = ue || "";
      initEmailError.value = ee || "";
      initPasswordError.value = pe || "";
      if (ue || ee || pe) return;
      const taken = await checkUsername(registerForm.value.username);
      if (taken) {
        initUsernameError.value = "\u7528\u6237\u540D\u5DF2\u88AB\u4F7F\u7528";
        return;
      }
      if (registerForm.value.password !== registerForm.value.confirmPassword) {
        ElMessage.warning("\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4");
        return;
      }
      initLoading.value = true;
      try {
        await initSuperAdmin(registerForm.value);
        ElMessage.success("\u8D85\u7EA7\u7BA1\u7406\u5458\u521B\u5EFA\u6210\u529F\uFF0C\u8BF7\u767B\u5F55");
        mode.value = "login";
      } catch {
        loginLoading.value = false;
      } finally {
        initLoading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      const _component_el_checkbox = ElCheckbox;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-wrapper" }, _attrs))} data-v-c14e9b2b>`);
      if (mode.value === "checking") {
        _push(`<div class="login-card" data-v-c14e9b2b><div class="card-brand" data-v-c14e9b2b><span class="brand-icon" data-v-c14e9b2b>\u{1F4DD}</span><h1 class="brand-title" data-v-c14e9b2b>CodeBlog</h1></div><div class="checking-area" data-v-c14e9b2b>`);
        _push(ssrRenderComponent(_component_el_icon, {
          class: "is-loading",
          size: 32
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(loading_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(loading_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<p data-v-c14e9b2b>\u6B63\u5728\u68C0\u67E5\u7CFB\u7EDF\u72B6\u6001...</p></div></div>`);
      } else if (mode.value === "init") {
        _push(`<div class="login-card" data-v-c14e9b2b><div class="card-brand" data-v-c14e9b2b><span class="brand-icon" data-v-c14e9b2b>\u{1F680}</span><h1 class="brand-title" data-v-c14e9b2b>\u521D\u59CB\u5316\u7CFB\u7EDF</h1><p class="brand-desc" data-v-c14e9b2b>\u9996\u6B21\u4F7F\u7528\uFF0C\u8BF7\u521B\u5EFA\u8D85\u7EA7\u7BA1\u7406\u5458\u8D26\u53F7</p></div>`);
        _push(ssrRenderComponent(_component_el_form, {
          "label-position": "top",
          onSubmit: handleInit
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_form_item, {
                label: "\u7528\u6237\u540D",
                error: initUsernameError.value
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: registerForm.value.username,
                      "onUpdate:modelValue": ($event) => registerForm.value.username = $event,
                      placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
                      "prefix-icon": unref(user_default),
                      onBlur: onInitUsernameBlur
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: registerForm.value.username,
                        "onUpdate:modelValue": ($event) => registerForm.value.username = $event,
                        placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
                        "prefix-icon": unref(user_default),
                        onBlur: onInitUsernameBlur
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_form_item, {
                label: "\u90AE\u7BB1",
                error: initEmailError.value
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: registerForm.value.email,
                      "onUpdate:modelValue": ($event) => registerForm.value.email = $event,
                      placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
                      "prefix-icon": unref(message_default$1),
                      onBlur: onInitEmailBlur
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: registerForm.value.email,
                        "onUpdate:modelValue": ($event) => registerForm.value.email = $event,
                        placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
                        "prefix-icon": unref(message_default$1),
                        onBlur: onInitEmailBlur
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_form_item, {
                label: "\u5BC6\u7801",
                error: initPasswordError.value
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: registerForm.value.password,
                      "onUpdate:modelValue": ($event) => registerForm.value.password = $event,
                      type: "password",
                      placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                      "prefix-icon": unref(lock_default),
                      "show-password": "",
                      onBlur: onInitPasswordBlur
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: registerForm.value.password,
                        "onUpdate:modelValue": ($event) => registerForm.value.password = $event,
                        type: "password",
                        placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                        "prefix-icon": unref(lock_default),
                        "show-password": "",
                        onBlur: onInitPasswordBlur
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_form_item, {
                label: "\u786E\u8BA4\u5BC6\u7801",
                error: initConfirmError.value
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: registerForm.value.confirmPassword,
                      "onUpdate:modelValue": ($event) => registerForm.value.confirmPassword = $event,
                      type: "password",
                      placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801",
                      "prefix-icon": unref(lock_default),
                      "show-password": "",
                      onBlur: onInitConfirmBlur
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: registerForm.value.confirmPassword,
                        "onUpdate:modelValue": ($event) => registerForm.value.confirmPassword = $event,
                        type: "password",
                        placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801",
                        "prefix-icon": unref(lock_default),
                        "show-password": "",
                        onBlur: onInitConfirmBlur
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                size: "large",
                class: "login-btn",
                loading: initLoading.value,
                "native-type": "submit",
                block: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` \u521B\u5EFA\u8D85\u7EA7\u7BA1\u7406\u5458 `);
                  } else {
                    return [
                      createTextVNode(" \u521B\u5EFA\u8D85\u7EA7\u7BA1\u7406\u5458 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_form_item, {
                  label: "\u7528\u6237\u540D",
                  error: initUsernameError.value
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: registerForm.value.username,
                      "onUpdate:modelValue": ($event) => registerForm.value.username = $event,
                      placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
                      "prefix-icon": unref(user_default),
                      onBlur: onInitUsernameBlur
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                  ]),
                  _: 1
                }, 8, ["error"]),
                createVNode(_component_el_form_item, {
                  label: "\u90AE\u7BB1",
                  error: initEmailError.value
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: registerForm.value.email,
                      "onUpdate:modelValue": ($event) => registerForm.value.email = $event,
                      placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
                      "prefix-icon": unref(message_default$1),
                      onBlur: onInitEmailBlur
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                  ]),
                  _: 1
                }, 8, ["error"]),
                createVNode(_component_el_form_item, {
                  label: "\u5BC6\u7801",
                  error: initPasswordError.value
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: registerForm.value.password,
                      "onUpdate:modelValue": ($event) => registerForm.value.password = $event,
                      type: "password",
                      placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                      "prefix-icon": unref(lock_default),
                      "show-password": "",
                      onBlur: onInitPasswordBlur
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                  ]),
                  _: 1
                }, 8, ["error"]),
                createVNode(_component_el_form_item, {
                  label: "\u786E\u8BA4\u5BC6\u7801",
                  error: initConfirmError.value
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: registerForm.value.confirmPassword,
                      "onUpdate:modelValue": ($event) => registerForm.value.confirmPassword = $event,
                      type: "password",
                      placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801",
                      "prefix-icon": unref(lock_default),
                      "show-password": "",
                      onBlur: onInitConfirmBlur
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                  ]),
                  _: 1
                }, 8, ["error"]),
                createVNode(_component_el_button, {
                  type: "primary",
                  size: "large",
                  class: "login-btn",
                  loading: initLoading.value,
                  "native-type": "submit",
                  block: ""
                }, {
                  default: withCtx(() => [
                    createTextVNode(" \u521B\u5EFA\u8D85\u7EA7\u7BA1\u7406\u5458 ")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="login-card" data-v-c14e9b2b><div class="card-brand" data-v-c14e9b2b><span class="brand-icon" data-v-c14e9b2b>\u{1F4DD}</span><h1 class="brand-title" data-v-c14e9b2b>CodeBlog</h1><p class="brand-desc" data-v-c14e9b2b>\u6B22\u8FCE\u56DE\u6765\uFF0C\u8BF7\u767B\u5F55\u60A8\u7684\u8D26\u53F7</p></div>`);
        if (!showRegister.value) {
          _push(`<div data-v-c14e9b2b>`);
          _push(ssrRenderComponent(_component_el_form, {
            "label-position": "top",
            onSubmit: handleLogin
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_el_form_item, { label: "\u7528\u6237\u540D" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: loginForm.value.username,
                        "onUpdate:modelValue": ($event) => loginForm.value.username = $event,
                        placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
                        "prefix-icon": unref(user_default)
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_input, {
                          modelValue: loginForm.value.username,
                          "onUpdate:modelValue": ($event) => loginForm.value.username = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
                          "prefix-icon": unref(user_default)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_form_item, { label: "\u5BC6\u7801" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: loginForm.value.password,
                        "onUpdate:modelValue": ($event) => loginForm.value.password = $event,
                        type: "password",
                        placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                        "prefix-icon": unref(lock_default),
                        "show-password": ""
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_input, {
                          modelValue: loginForm.value.password,
                          "onUpdate:modelValue": ($event) => loginForm.value.password = $event,
                          type: "password",
                          placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                          "prefix-icon": unref(lock_default),
                          "show-password": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_form_item, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_checkbox, {
                        modelValue: rememberMe.value,
                        "onUpdate:modelValue": ($event) => rememberMe.value = $event,
                        class: "remember-checkbox"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`\u8BB0\u4F4F\u8D26\u53F7`);
                          } else {
                            return [
                              createTextVNode("\u8BB0\u4F4F\u8D26\u53F7")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_checkbox, {
                          modelValue: rememberMe.value,
                          "onUpdate:modelValue": ($event) => rememberMe.value = $event,
                          class: "remember-checkbox"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("\u8BB0\u4F4F\u8D26\u53F7")
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_button, {
                  type: "primary",
                  size: "large",
                  class: "login-btn",
                  loading: loginLoading.value,
                  "native-type": "submit",
                  block: ""
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` \u767B\u5F55 `);
                    } else {
                      return [
                        createTextVNode(" \u767B\u5F55 ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_el_form_item, { label: "\u7528\u6237\u540D" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: loginForm.value.username,
                        "onUpdate:modelValue": ($event) => loginForm.value.username = $event,
                        placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
                        "prefix-icon": unref(user_default)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "\u5BC6\u7801" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: loginForm.value.password,
                        "onUpdate:modelValue": ($event) => loginForm.value.password = $event,
                        type: "password",
                        placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                        "prefix-icon": unref(lock_default),
                        "show-password": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_checkbox, {
                        modelValue: rememberMe.value,
                        "onUpdate:modelValue": ($event) => rememberMe.value = $event,
                        class: "remember-checkbox"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u8BB0\u4F4F\u8D26\u53F7")
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_button, {
                    type: "primary",
                    size: "large",
                    class: "login-btn",
                    loading: loginLoading.value,
                    "native-type": "submit",
                    block: ""
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u767B\u5F55 ")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<div class="form-footer" data-v-c14e9b2b>`);
          _push(ssrRenderComponent(_component_el_button, {
            link: "",
            type: "primary",
            onClick: ($event) => showRegister.value = true
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`\u6E38\u5BA2\u6CE8\u518C`);
              } else {
                return [
                  createTextVNode("\u6E38\u5BA2\u6CE8\u518C")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<div data-v-c14e9b2b>`);
          _push(ssrRenderComponent(_component_el_form, {
            "label-position": "top",
            onSubmit: handleRegister
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_el_form_item, {
                  label: "\u7528\u6237\u540D",
                  error: regUsernameError.value
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: registerForm.value.username,
                        "onUpdate:modelValue": ($event) => registerForm.value.username = $event,
                        placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
                        "prefix-icon": unref(user_default),
                        onBlur: onRegUsernameBlur
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_input, {
                          modelValue: registerForm.value.username,
                          "onUpdate:modelValue": ($event) => registerForm.value.username = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
                          "prefix-icon": unref(user_default),
                          onBlur: onRegUsernameBlur
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_form_item, {
                  label: "\u90AE\u7BB1",
                  error: regEmailError.value
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: registerForm.value.email,
                        "onUpdate:modelValue": ($event) => registerForm.value.email = $event,
                        placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
                        "prefix-icon": unref(message_default$1),
                        onBlur: onRegEmailBlur
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_input, {
                          modelValue: registerForm.value.email,
                          "onUpdate:modelValue": ($event) => registerForm.value.email = $event,
                          placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
                          "prefix-icon": unref(message_default$1),
                          onBlur: onRegEmailBlur
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_form_item, {
                  label: "\u5BC6\u7801",
                  error: regPasswordError.value
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: registerForm.value.password,
                        "onUpdate:modelValue": ($event) => registerForm.value.password = $event,
                        type: "password",
                        placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                        "prefix-icon": unref(lock_default),
                        "show-password": "",
                        onBlur: onRegPasswordBlur
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_input, {
                          modelValue: registerForm.value.password,
                          "onUpdate:modelValue": ($event) => registerForm.value.password = $event,
                          type: "password",
                          placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                          "prefix-icon": unref(lock_default),
                          "show-password": "",
                          onBlur: onRegPasswordBlur
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_form_item, {
                  label: "\u786E\u8BA4\u5BC6\u7801",
                  error: regConfirmError.value
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: registerForm.value.confirmPassword,
                        "onUpdate:modelValue": ($event) => registerForm.value.confirmPassword = $event,
                        type: "password",
                        placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801",
                        "prefix-icon": unref(lock_default),
                        "show-password": "",
                        onBlur: onRegConfirmBlur
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_input, {
                          modelValue: registerForm.value.confirmPassword,
                          "onUpdate:modelValue": ($event) => registerForm.value.confirmPassword = $event,
                          type: "password",
                          placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801",
                          "prefix-icon": unref(lock_default),
                          "show-password": "",
                          onBlur: onRegConfirmBlur
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_button, {
                  type: "primary",
                  size: "large",
                  class: "login-btn",
                  loading: registerLoading.value,
                  "native-type": "submit",
                  block: ""
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` \u6CE8\u518C `);
                    } else {
                      return [
                        createTextVNode(" \u6CE8\u518C ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_el_form_item, {
                    label: "\u7528\u6237\u540D",
                    error: regUsernameError.value
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: registerForm.value.username,
                        "onUpdate:modelValue": ($event) => registerForm.value.username = $event,
                        placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
                        "prefix-icon": unref(user_default),
                        onBlur: onRegUsernameBlur
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                    ]),
                    _: 1
                  }, 8, ["error"]),
                  createVNode(_component_el_form_item, {
                    label: "\u90AE\u7BB1",
                    error: regEmailError.value
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: registerForm.value.email,
                        "onUpdate:modelValue": ($event) => registerForm.value.email = $event,
                        placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
                        "prefix-icon": unref(message_default$1),
                        onBlur: onRegEmailBlur
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                    ]),
                    _: 1
                  }, 8, ["error"]),
                  createVNode(_component_el_form_item, {
                    label: "\u5BC6\u7801",
                    error: regPasswordError.value
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: registerForm.value.password,
                        "onUpdate:modelValue": ($event) => registerForm.value.password = $event,
                        type: "password",
                        placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                        "prefix-icon": unref(lock_default),
                        "show-password": "",
                        onBlur: onRegPasswordBlur
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                    ]),
                    _: 1
                  }, 8, ["error"]),
                  createVNode(_component_el_form_item, {
                    label: "\u786E\u8BA4\u5BC6\u7801",
                    error: regConfirmError.value
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: registerForm.value.confirmPassword,
                        "onUpdate:modelValue": ($event) => registerForm.value.confirmPassword = $event,
                        type: "password",
                        placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801",
                        "prefix-icon": unref(lock_default),
                        "show-password": "",
                        onBlur: onRegConfirmBlur
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                    ]),
                    _: 1
                  }, 8, ["error"]),
                  createVNode(_component_el_button, {
                    type: "primary",
                    size: "large",
                    class: "login-btn",
                    loading: registerLoading.value,
                    "native-type": "submit",
                    block: ""
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u6CE8\u518C ")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<div class="form-footer" data-v-c14e9b2b>`);
          _push(ssrRenderComponent(_component_el_button, {
            link: "",
            type: "primary",
            onClick: ($event) => showRegister.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`\u8FD4\u56DE\u767B\u5F55`);
              } else {
                return [
                  createTextVNode("\u8FD4\u56DE\u767B\u5F55")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div>`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c14e9b2b"]]);

export { login as default };
//# sourceMappingURL=login-BEsQpSak.mjs.map
