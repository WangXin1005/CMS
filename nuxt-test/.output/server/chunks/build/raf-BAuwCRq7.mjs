import { isClient } from '@vueuse/core';

const UPDATE_MODEL_EVENT = "update:modelValue";
const CHANGE_EVENT = "change";
const INPUT_EVENT = "input";
const rAF = (fn) => isClient ? (void 0).requestAnimationFrame(fn) : setTimeout(fn, 16);
const cAF = (handle) => isClient ? (void 0).cancelAnimationFrame(handle) : clearTimeout(handle);

export { CHANGE_EVENT as C, INPUT_EVENT as I, UPDATE_MODEL_EVENT as U, cAF as c, rAF as r };
//# sourceMappingURL=raf-BAuwCRq7.mjs.map
