import "D:/projects/nuxtProject/nuxt-test/node_modules/@nuxt/nitro-server/dist/runtime/h3-compat.mjs";
import "vue";
import { a as useNuxtApp } from "../server.mjs";
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
function useRequestFetch() {
  return useRequestEvent()?.$fetch || globalThis.$fetch;
}
export {
  useRequestEvent as a,
  useRequestFetch as u
};
//# sourceMappingURL=ssr-1ZCkBfDH.js.map
