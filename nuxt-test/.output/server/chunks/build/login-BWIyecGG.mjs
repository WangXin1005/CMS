import { f as ElIcon, l as loading_default, a as ElForm, b as ElFormItem, c as ElInput, z as user_default, A as message_default$1, B as lock_default, E as ElButton, d as ElMessage } from './request-BOYQ0nPL.mjs';
import { E as ElCheckbox } from './el-checkbox-DnsbqAIr.mjs';
import { defineComponent, ref, watch, mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, n as navigateTo } from './server.mjs';
import { v as validateUsername, a as validateEmail, b as validatePassword } from './email-CEn54U6N.mjs';
import { u as useAuth } from './useAuth-E3jONGWF.mjs';
import 'axios';
import '@vue/shared';
import 'lodash-unified';
import '@vueuse/core';
import 'async-validator';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import './cookie-BrXVhyN0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
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
        if (taken) initUsernameError.value = "用户名已被使用";
      }
    }
    function onInitEmailBlur() {
      initEmailError.value = validateEmail(registerForm.value.email) || "";
    }
    function onInitPasswordBlur() {
      initPasswordError.value = validatePassword(registerForm.value.password) || "";
      if (registerForm.value.confirmPassword) {
        if (registerForm.value.password !== registerForm.value.confirmPassword) {
          initPasswordError.value = "两次输入的密码不一致";
          initConfirmError.value = "两次输入的密码不一致";
        } else {
          initConfirmError.value = "";
        }
      }
    }
    function onInitConfirmBlur() {
      if (registerForm.value.confirmPassword && registerForm.value.password !== registerForm.value.confirmPassword) {
        initConfirmError.value = "两次输入的密码不一致";
        initPasswordError.value = "两次输入的密码不一致";
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
        if (taken) regUsernameError.value = "用户名已被使用";
      }
    }
    function onRegEmailBlur() {
      regEmailError.value = validateEmail(registerForm.value.email) || "";
    }
    function onRegPasswordBlur() {
      regPasswordError.value = validatePassword(registerForm.value.password) || "";
      if (registerForm.value.confirmPassword) {
        if (registerForm.value.password !== registerForm.value.confirmPassword) {
          regPasswordError.value = "两次输入的密码不一致";
          regConfirmError.value = "两次输入的密码不一致";
        } else {
          regConfirmError.value = "";
        }
      }
    }
    function onRegConfirmBlur() {
      if (registerForm.value.confirmPassword && registerForm.value.password !== registerForm.value.confirmPassword) {
        regConfirmError.value = "两次输入的密码不一致";
        regPasswordError.value = "两次输入的密码不一致";
      } else {
        regConfirmError.value = "";
        regPasswordError.value = registerForm.value.password ? validatePassword(registerForm.value.password) || "" : "";
      }
    }
    async function handleLogin() {
      if (!loginForm.value.username || !loginForm.value.password) {
        ElMessage.warning("请输入用户名和密码");
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
        ElMessage.success("登录成功");
        navigateTo("/home");
      } catch {
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
        regUsernameError.value = "用户名已被使用";
        return;
      }
      if (registerForm.value.password !== registerForm.value.confirmPassword) {
        ElMessage.warning("两次输入的密码不一致");
        return;
      }
      registerLoading.value = true;
      try {
        await registerGuest(registerForm.value);
        ElMessage.success("注册成功");
        showRegister.value = false;
      } catch {
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
        initUsernameError.value = "用户名已被使用";
        return;
      }
      if (registerForm.value.password !== registerForm.value.confirmPassword) {
        ElMessage.warning("两次输入的密码不一致");
        return;
      }
      initLoading.value = true;
      try {
        await initSuperAdmin(registerForm.value);
        ElMessage.success("超级管理员创建成功，请登录");
        mode.value = "login";
      } catch {
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-wrapper" }, _attrs))} data-v-774ee26c>`);
      if (mode.value === "checking") {
        _push(`<div class="login-card" data-v-774ee26c><div class="card-brand" data-v-774ee26c><span class="brand-icon" data-v-774ee26c>📝</span><h1 class="brand-title" data-v-774ee26c>CodeBlog</h1></div><div class="checking-area" data-v-774ee26c>`);
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
        _push(`<p data-v-774ee26c>正在检查系统状态...</p></div></div>`);
      } else if (mode.value === "init") {
        _push(`<div class="login-card" data-v-774ee26c><div class="card-brand" data-v-774ee26c><span class="brand-icon" data-v-774ee26c>🚀</span><h1 class="brand-title" data-v-774ee26c>初始化系统</h1><p class="brand-desc" data-v-774ee26c>首次使用，请创建超级管理员账号</p></div>`);
        _push(ssrRenderComponent(_component_el_form, {
          "label-position": "top",
          onSubmit: handleInit
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_form_item, {
                label: "用户名",
                error: initUsernameError.value
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: registerForm.value.username,
                      "onUpdate:modelValue": ($event) => registerForm.value.username = $event,
                      placeholder: "请输入用户名",
                      "prefix-icon": unref(user_default),
                      onBlur: onInitUsernameBlur
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: registerForm.value.username,
                        "onUpdate:modelValue": ($event) => registerForm.value.username = $event,
                        placeholder: "请输入用户名",
                        "prefix-icon": unref(user_default),
                        onBlur: onInitUsernameBlur
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_form_item, {
                label: "邮箱",
                error: initEmailError.value
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: registerForm.value.email,
                      "onUpdate:modelValue": ($event) => registerForm.value.email = $event,
                      placeholder: "请输入邮箱",
                      "prefix-icon": unref(message_default$1),
                      onBlur: onInitEmailBlur
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_input, {
                        modelValue: registerForm.value.email,
                        "onUpdate:modelValue": ($event) => registerForm.value.email = $event,
                        placeholder: "请输入邮箱",
                        "prefix-icon": unref(message_default$1),
                        onBlur: onInitEmailBlur
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_form_item, {
                label: "密码",
                error: initPasswordError.value
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: registerForm.value.password,
                      "onUpdate:modelValue": ($event) => registerForm.value.password = $event,
                      type: "password",
                      placeholder: "请输入密码",
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
                        placeholder: "请输入密码",
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
                label: "确认密码",
                error: initConfirmError.value
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_input, {
                      modelValue: registerForm.value.confirmPassword,
                      "onUpdate:modelValue": ($event) => registerForm.value.confirmPassword = $event,
                      type: "password",
                      placeholder: "请再次输入密码",
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
                        placeholder: "请再次输入密码",
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
                    _push3(` 创建超级管理员 `);
                  } else {
                    return [
                      createTextVNode(" 创建超级管理员 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_form_item, {
                  label: "用户名",
                  error: initUsernameError.value
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: registerForm.value.username,
                      "onUpdate:modelValue": ($event) => registerForm.value.username = $event,
                      placeholder: "请输入用户名",
                      "prefix-icon": unref(user_default),
                      onBlur: onInitUsernameBlur
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                  ]),
                  _: 1
                }, 8, ["error"]),
                createVNode(_component_el_form_item, {
                  label: "邮箱",
                  error: initEmailError.value
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: registerForm.value.email,
                      "onUpdate:modelValue": ($event) => registerForm.value.email = $event,
                      placeholder: "请输入邮箱",
                      "prefix-icon": unref(message_default$1),
                      onBlur: onInitEmailBlur
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                  ]),
                  _: 1
                }, 8, ["error"]),
                createVNode(_component_el_form_item, {
                  label: "密码",
                  error: initPasswordError.value
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: registerForm.value.password,
                      "onUpdate:modelValue": ($event) => registerForm.value.password = $event,
                      type: "password",
                      placeholder: "请输入密码",
                      "prefix-icon": unref(lock_default),
                      "show-password": "",
                      onBlur: onInitPasswordBlur
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                  ]),
                  _: 1
                }, 8, ["error"]),
                createVNode(_component_el_form_item, {
                  label: "确认密码",
                  error: initConfirmError.value
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: registerForm.value.confirmPassword,
                      "onUpdate:modelValue": ($event) => registerForm.value.confirmPassword = $event,
                      type: "password",
                      placeholder: "请再次输入密码",
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
                    createTextVNode(" 创建超级管理员 ")
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
        _push(`<div class="login-card" data-v-774ee26c><div class="card-brand" data-v-774ee26c><span class="brand-icon" data-v-774ee26c>📝</span><h1 class="brand-title" data-v-774ee26c>CodeBlog</h1><p class="brand-desc" data-v-774ee26c>欢迎回来，请登录您的账号</p></div>`);
        if (!showRegister.value) {
          _push(`<div data-v-774ee26c>`);
          _push(ssrRenderComponent(_component_el_form, {
            "label-position": "top",
            onSubmit: handleLogin
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_el_form_item, { label: "用户名" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: loginForm.value.username,
                        "onUpdate:modelValue": ($event) => loginForm.value.username = $event,
                        placeholder: "请输入用户名",
                        "prefix-icon": unref(user_default)
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_input, {
                          modelValue: loginForm.value.username,
                          "onUpdate:modelValue": ($event) => loginForm.value.username = $event,
                          placeholder: "请输入用户名",
                          "prefix-icon": unref(user_default)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_form_item, { label: "密码" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: loginForm.value.password,
                        "onUpdate:modelValue": ($event) => loginForm.value.password = $event,
                        type: "password",
                        placeholder: "请输入密码",
                        "prefix-icon": unref(lock_default),
                        "show-password": ""
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_input, {
                          modelValue: loginForm.value.password,
                          "onUpdate:modelValue": ($event) => loginForm.value.password = $event,
                          type: "password",
                          placeholder: "请输入密码",
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
                            _push4(`记住账号`);
                          } else {
                            return [
                              createTextVNode("记住账号")
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
                            createTextVNode("记住账号")
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
                      _push3(` 登录 `);
                    } else {
                      return [
                        createTextVNode(" 登录 ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_el_form_item, { label: "用户名" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: loginForm.value.username,
                        "onUpdate:modelValue": ($event) => loginForm.value.username = $event,
                        placeholder: "请输入用户名",
                        "prefix-icon": unref(user_default)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "密码" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: loginForm.value.password,
                        "onUpdate:modelValue": ($event) => loginForm.value.password = $event,
                        type: "password",
                        placeholder: "请输入密码",
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
                          createTextVNode("记住账号")
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
                      createTextVNode(" 登录 ")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<div class="form-footer" data-v-774ee26c>`);
          _push(ssrRenderComponent(_component_el_button, {
            link: "",
            type: "primary",
            onClick: ($event) => showRegister.value = true
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`游客注册`);
              } else {
                return [
                  createTextVNode("游客注册")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<div data-v-774ee26c>`);
          _push(ssrRenderComponent(_component_el_form, {
            "label-position": "top",
            onSubmit: handleRegister
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_el_form_item, {
                  label: "用户名",
                  error: regUsernameError.value
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: registerForm.value.username,
                        "onUpdate:modelValue": ($event) => registerForm.value.username = $event,
                        placeholder: "请输入用户名",
                        "prefix-icon": unref(user_default),
                        onBlur: onRegUsernameBlur
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_input, {
                          modelValue: registerForm.value.username,
                          "onUpdate:modelValue": ($event) => registerForm.value.username = $event,
                          placeholder: "请输入用户名",
                          "prefix-icon": unref(user_default),
                          onBlur: onRegUsernameBlur
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_form_item, {
                  label: "邮箱",
                  error: regEmailError.value
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: registerForm.value.email,
                        "onUpdate:modelValue": ($event) => registerForm.value.email = $event,
                        placeholder: "请输入邮箱",
                        "prefix-icon": unref(message_default$1),
                        onBlur: onRegEmailBlur
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_el_input, {
                          modelValue: registerForm.value.email,
                          "onUpdate:modelValue": ($event) => registerForm.value.email = $event,
                          placeholder: "请输入邮箱",
                          "prefix-icon": unref(message_default$1),
                          onBlur: onRegEmailBlur
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_form_item, {
                  label: "密码",
                  error: regPasswordError.value
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: registerForm.value.password,
                        "onUpdate:modelValue": ($event) => registerForm.value.password = $event,
                        type: "password",
                        placeholder: "请输入密码",
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
                          placeholder: "请输入密码",
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
                  label: "确认密码",
                  error: regConfirmError.value
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_el_input, {
                        modelValue: registerForm.value.confirmPassword,
                        "onUpdate:modelValue": ($event) => registerForm.value.confirmPassword = $event,
                        type: "password",
                        placeholder: "请再次输入密码",
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
                          placeholder: "请再次输入密码",
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
                      _push3(` 注册 `);
                    } else {
                      return [
                        createTextVNode(" 注册 ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_el_form_item, {
                    label: "用户名",
                    error: regUsernameError.value
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: registerForm.value.username,
                        "onUpdate:modelValue": ($event) => registerForm.value.username = $event,
                        placeholder: "请输入用户名",
                        "prefix-icon": unref(user_default),
                        onBlur: onRegUsernameBlur
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                    ]),
                    _: 1
                  }, 8, ["error"]),
                  createVNode(_component_el_form_item, {
                    label: "邮箱",
                    error: regEmailError.value
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: registerForm.value.email,
                        "onUpdate:modelValue": ($event) => registerForm.value.email = $event,
                        placeholder: "请输入邮箱",
                        "prefix-icon": unref(message_default$1),
                        onBlur: onRegEmailBlur
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                    ]),
                    _: 1
                  }, 8, ["error"]),
                  createVNode(_component_el_form_item, {
                    label: "密码",
                    error: regPasswordError.value
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: registerForm.value.password,
                        "onUpdate:modelValue": ($event) => registerForm.value.password = $event,
                        type: "password",
                        placeholder: "请输入密码",
                        "prefix-icon": unref(lock_default),
                        "show-password": "",
                        onBlur: onRegPasswordBlur
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "prefix-icon"])
                    ]),
                    _: 1
                  }, 8, ["error"]),
                  createVNode(_component_el_form_item, {
                    label: "确认密码",
                    error: regConfirmError.value
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: registerForm.value.confirmPassword,
                        "onUpdate:modelValue": ($event) => registerForm.value.confirmPassword = $event,
                        type: "password",
                        placeholder: "请再次输入密码",
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
                      createTextVNode(" 注册 ")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<div class="form-footer" data-v-774ee26c>`);
          _push(ssrRenderComponent(_component_el_button, {
            link: "",
            type: "primary",
            onClick: ($event) => showRegister.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`返回登录`);
              } else {
                return [
                  createTextVNode("返回登录")
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
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-774ee26c"]]);

export { login as default };
//# sourceMappingURL=login-BWIyecGG.mjs.map
