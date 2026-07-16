import { D as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useCookie } from './cookie-CqLf-Dw-.mjs';
import 'vue';
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
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import '@vueuse/core';
import '@vue/shared';
import 'lodash-unified';
import './ssr-1ZCkBfDH.mjs';

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

export { auth as default };
//# sourceMappingURL=auth-BkRyoTbx.mjs.map
