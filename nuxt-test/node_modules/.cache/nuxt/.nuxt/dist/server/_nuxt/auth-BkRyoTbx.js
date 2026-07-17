import { D as defineNuxtRouteMiddleware, n as navigateTo } from "../server.mjs";
import { u as useCookie } from "./cookie-CqLf-Dw-.js";
import "vue";
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
import "vue/server-renderer";
import "D:/projects/nuxtProject/nuxt-test/node_modules/cookie-es/dist/index.mjs";
import "D:/projects/nuxtProject/nuxt-test/node_modules/ohash/dist/index.mjs";
import "D:/projects/nuxtProject/nuxt-test/node_modules/klona/dist/index.mjs";
import "./ssr-1ZCkBfDH.js";
const auth = defineNuxtRouteMiddleware(() => {
  const token = useCookie("auth_token");
  if (!token.value) {
    return navigateTo("/login");
  }
  try {
    const parts = token.value.split(".");
    if (parts.length !== 3) {
      token.value = "";
      return navigateTo("/login");
    }
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const binary = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    const payload = JSON.parse(new TextDecoder().decode(binary));
    if (payload.exp && payload.exp * 1e3 < Date.now()) {
      token.value = "";
      return navigateTo("/login");
    }
  } catch {
    token.value = "";
    return navigateTo("/login");
  }
});
export {
  auth as default
};
//# sourceMappingURL=auth-BkRyoTbx.js.map
