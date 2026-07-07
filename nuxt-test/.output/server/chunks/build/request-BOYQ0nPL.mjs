import axios from 'axios';
import { defineComponent, openBlock, createElementBlock, createElementVNode, ref, markRaw, watch, renderSlot, shallowReactive, warn, computed, mergeProps, unref, provide, reactive, toRef, normalizeClass, createBlock, resolveDynamicComponent, withCtx, Fragment, createCommentVNode, useSlots, inject, toRefs, createVNode, normalizeStyle, createTextVNode, toDisplayString, TransitionGroup, useAttrs as useAttrs$1, shallowRef, nextTick, withModifiers, Transition, getCurrentInstance, isVNode, Text, render, withDirectives, vShow, isRef } from 'vue';
import { h as useNamespace, o as useId, m as isBoolean, g as debugWarn, i as isNumber, l as namespaceContextKey, z as zIndexContextKey, f as isStringNumber, t as throwError, p as isElement, j as useZIndex, k as defaultInitialZIndex } from './server.mjs';
import { NOOP, isArray, hasOwn, isObject, isFunction, isString, camelize } from '@vue/shared';
import { fromPairs, isPlainObject, castArray, pick, isNil, set, get, cloneDeep, isEqual } from 'lodash-unified';
import { isClient, refDebounced, useResizeObserver, useEventListener, useTimeoutFn } from '@vueuse/core';
import AsyncValidator from 'async-validator';
import { TinyColor } from '@ctrl/tinycolor';

const isFirefox = () => isClient && /firefox/i.test((void 0).navigator.userAgent);
const isAndroid = () => isClient && /android/i.test((void 0).navigator.userAgent);
const withPropsDefaultsSetter = (target) => {
  const _p = target.props;
  const props = isArray(_p) ? fromPairs(_p.map((key) => [key, {}])) : _p;
  target.setPropsDefaults = (defaults) => {
    if (!props) return;
    for (const [key, value] of Object.entries(defaults)) {
      const prop = props[key];
      if (!hasOwn(props, key)) continue;
      if (isPlainObject(prop)) {
        props[key] = {
          ...prop,
          default: value
        };
        continue;
      }
      props[key] = {
        type: prop,
        default: value
      };
    }
    target.props = props;
  };
};
const withInstall = (main, extra) => {
  main.install = (app) => {
    for (const comp of [main, ...Object.values(extra ?? {})]) app.component(comp.name, comp);
  };
  if (extra) for (const [key, comp] of Object.entries(extra)) main[key] = comp;
  withPropsDefaultsSetter(main);
  return main;
};
const withInstallFunction = (fn, name) => {
  fn.install = (app) => {
    fn._context = app._context;
    app.config.globalProperties[name] = fn;
  };
  return fn;
};
const withNoopInstall = (component) => {
  component.install = NOOP;
  withPropsDefaultsSetter(component);
  return component;
};
const keysOf = (arr) => Object.keys(arr);
const entriesOf = (arr) => Object.entries(arr);
const getProp = (obj, path, defaultValue) => {
  return {
    get value() {
      return get(obj, path, defaultValue);
    },
    set value(val) {
      set(obj, path, val);
    }
  };
};
const epPropKey = "__epPropKey";
const definePropType = (val) => val;
const isEpProp = (val) => isObject(val) && !!val["__epPropKey"];
const buildProp = (prop, key) => {
  if (!isObject(prop) || isEpProp(prop)) return prop;
  const { values, required, default: defaultValue, type, validator } = prop;
  const epProp = {
    type,
    required: !!required,
    validator: values || validator ? (val) => {
      let valid = false;
      let allowedValues = [];
      if (values) {
        allowedValues = Array.from(values);
        if (hasOwn(prop, "default")) allowedValues.push(defaultValue);
        valid ||= allowedValues.includes(val);
      }
      if (validator) valid ||= validator(val);
      if (!valid && allowedValues.length > 0) {
        const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(", ");
        warn(`Invalid prop: validation failed${key ? ` for prop "${key}"` : ""}. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`);
      }
      return valid;
    } : void 0,
    [epPropKey]: true
  };
  if (hasOwn(prop, "default")) epProp.default = defaultValue;
  return epProp;
};
const buildProps = (props) => fromPairs(Object.entries(props).map(([key, option]) => [key, buildProp(option, key)]));
var _sfc_main6 = /* @__PURE__ */ defineComponent({
  name: "ArrowDown",
  __name: "arrow-down",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M831.872 340.864 512 652.672 192.128 340.864a30.59 30.59 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.59 30.59 0 0 0-42.752 0z"
      })
    ]));
  }
}), arrow_down_default = _sfc_main6;
var _sfc_main8 = /* @__PURE__ */ defineComponent({
  name: "ArrowLeft",
  __name: "arrow-left",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.59 30.59 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.59 30.59 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0"
      })
    ]));
  }
}), arrow_left_default = _sfc_main8;
var _sfc_main10 = /* @__PURE__ */ defineComponent({
  name: "ArrowRight",
  __name: "arrow-right",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M340.864 149.312a30.59 30.59 0 0 0 0 42.752L652.736 512 340.864 831.872a30.59 30.59 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
      })
    ]));
  }
}), arrow_right_default = _sfc_main10;
var _sfc_main12 = /* @__PURE__ */ defineComponent({
  name: "ArrowUp",
  __name: "arrow-up",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0"
      })
    ]));
  }
}), arrow_up_default = _sfc_main12;
var _sfc_main37 = /* @__PURE__ */ defineComponent({
  name: "ChatDotRound",
  __name: "chat-dot-round",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m174.72 855.68 135.296-45.12 23.68 11.84C388.096 849.536 448.576 864 512 864c211.84 0 384-166.784 384-352S723.84 160 512 160 128 326.784 128 512c0 69.12 24.96 139.264 70.848 199.232l22.08 28.8-46.272 115.584zm-45.248 82.56A32 32 0 0 1 89.6 896l58.368-145.92C94.72 680.32 64 596.864 64 512 64 299.904 256 96 512 96s448 203.904 448 416-192 416-448 416a461.06 461.06 0 0 1-206.912-48.384l-175.616 58.56z"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 563.2a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4m192 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4m-384 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4"
      })
    ]));
  }
}), chat_dot_round_default = _sfc_main37;
var _sfc_main43 = /* @__PURE__ */ defineComponent({
  name: "Check",
  __name: "check",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
      })
    ]));
  }
}), check_default = _sfc_main43;
var _sfc_main49 = /* @__PURE__ */ defineComponent({
  name: "CircleCheck",
  __name: "circle-check",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752z"
      })
    ]));
  }
}), circle_check_default = _sfc_main49;
var _sfc_main50 = /* @__PURE__ */ defineComponent({
  name: "CircleCloseFilled",
  __name: "circle-close-filled",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336z"
      })
    ]));
  }
}), circle_close_filled_default = _sfc_main50;
var _sfc_main51 = /* @__PURE__ */ defineComponent({
  name: "CircleClose",
  __name: "circle-close",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248z"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
      })
    ]));
  }
}), circle_close_default = _sfc_main51;
var _sfc_main56 = /* @__PURE__ */ defineComponent({
  name: "Close",
  __name: "close",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
      })
    ]));
  }
}), close_default = _sfc_main56;
var _sfc_main72 = /* @__PURE__ */ defineComponent({
  name: "DArrowLeft",
  __name: "d-arrow-left",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M529.408 149.376a29.12 29.12 0 0 1 41.728 0 30.59 30.59 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.59 30.59 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672zm256 0a29.12 29.12 0 0 1 41.728 0 30.59 30.59 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.59 30.59 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672z"
      })
    ]));
  }
}), d_arrow_left_default = _sfc_main72;
var _sfc_main73 = /* @__PURE__ */ defineComponent({
  name: "DArrowRight",
  __name: "d-arrow-right",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M452.864 149.312a29.12 29.12 0 0 1 41.728.064L826.24 489.664a32 32 0 0 1 0 44.672L494.592 874.624a29.12 29.12 0 0 1-41.728 0 30.59 30.59 0 0 1 0-42.752L764.736 512 452.864 192a30.59 30.59 0 0 1 0-42.688m-256 0a29.12 29.12 0 0 1 41.728.064L570.24 489.664a32 32 0 0 1 0 44.672L238.592 874.624a29.12 29.12 0 0 1-41.728 0 30.59 30.59 0 0 1 0-42.752L508.736 512 196.864 192a30.59 30.59 0 0 1 0-42.688"
      })
    ]));
  }
}), d_arrow_right_default = _sfc_main73;
var _sfc_main80 = /* @__PURE__ */ defineComponent({
  name: "Delete",
  __name: "delete",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32"
      })
    ]));
  }
}), delete_default = _sfc_main80;
var _sfc_main90 = /* @__PURE__ */ defineComponent({
  name: "Document",
  __name: "document",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M832 384H576V128H192v768h640zm-26.496-64L640 154.496V320zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32m160 448h384v64H320zm0-192h160v64H320zm0 384h384v64H320z"
      })
    ]));
  }
}), document_default = _sfc_main90;
var _sfc_main113 = /* @__PURE__ */ defineComponent({
  name: "Folder",
  __name: "folder",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M128 192v640h768V320H485.76L357.504 192zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32"
      })
    ]));
  }
}), folder_default = _sfc_main113;
var _sfc_main118 = /* @__PURE__ */ defineComponent({
  name: "FullScreen",
  __name: "full-screen",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64z"
      })
    ]));
  }
}), full_screen_default = _sfc_main118;
var _sfc_main133 = /* @__PURE__ */ defineComponent({
  name: "Hide",
  __name: "hide",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M876.8 156.8c0-9.6-3.2-16-9.6-22.4s-12.8-9.6-22.4-9.6-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176S0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4s3.2 16 9.6 22.4 12.8 9.6 22.4 9.6 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4m-646.4 528Q115.2 579.2 76.8 512q43.2-72 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4m140.8-96Q352 555.2 352 512c0-44.8 16-83.2 48-112s67.2-48 112-48c28.8 0 54.4 6.4 73.6 19.2zM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6q-43.2 72-153.6 172.8c-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176S1024 528 1024 512s-48.001-73.6-134.401-176"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112s-67.2 48-112 48"
      })
    ]));
  }
}), hide_default = _sfc_main133;
var _sfc_main135 = /* @__PURE__ */ defineComponent({
  name: "HomeFilled",
  __name: "home-filled",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 128 128 447.936V896h255.936V640H640v256h255.936V447.936z"
      })
    ]));
  }
}), home_filled_default = _sfc_main135;
var _sfc_main143 = /* @__PURE__ */ defineComponent({
  name: "InfoFilled",
  __name: "info-filled",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64m67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344M590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.99 12.99 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"
      })
    ]));
  }
}), info_filled_default = _sfc_main143;
var _sfc_main149 = /* @__PURE__ */ defineComponent({
  name: "List",
  __name: "list",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M704 192h160v736H160V192h160v64h384zM288 512h448v-64H288zm0 256h448v-64H288zm96-576V96h256v96z"
      })
    ]));
  }
}), list_default = _sfc_main149;
var _sfc_main150 = /* @__PURE__ */ defineComponent({
  name: "Loading",
  __name: "loading",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248m452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248M828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0"
      })
    ]));
  }
}), loading_default = _sfc_main150;
var _sfc_main154 = /* @__PURE__ */ defineComponent({
  name: "Lock",
  __name: "lock",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M224 448a32 32 0 0 0-32 32v384a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V480a32 32 0 0 0-32-32zm0-64h576a96 96 0 0 1 96 96v384a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V480a96 96 0 0 1 96-96"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 544a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V576a32 32 0 0 1 32-32m192-160v-64a192 192 0 1 0-384 0v64zM512 64a256 256 0 0 1 256 256v128H256V320A256 256 0 0 1 512 64"
      })
    ]));
  }
}), lock_default = _sfc_main154;
var _sfc_main165 = /* @__PURE__ */ defineComponent({
  name: "Message",
  __name: "message",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M128 224v512a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V224zm0-64h768a64 64 0 0 1 64 64v512a128 128 0 0 1-128 128H192A128 128 0 0 1 64 736V224a64 64 0 0 1 64-64"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M904 224 656.512 506.88a192 192 0 0 1-289.024 0L120 224zm-698.944 0 210.56 240.704a128 128 0 0 0 192.704 0L818.944 224z"
      })
    ]));
  }
}), message_default$1 = _sfc_main165;
var _sfc_main174 = /* @__PURE__ */ defineComponent({
  name: "MoreFilled",
  __name: "more-filled",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224"
      })
    ]));
  }
}), more_filled_default = _sfc_main174;
var _sfc_main175 = /* @__PURE__ */ defineComponent({
  name: "More",
  __name: "more",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M176 416a112 112 0 1 0 0 224 112 112 0 0 0 0-224m0 64a48 48 0 1 1 0 96 48 48 0 0 1 0-96m336-64a112 112 0 1 1 0 224 112 112 0 0 1 0-224m0 64a48 48 0 1 0 0 96 48 48 0 0 0 0-96m336-64a112 112 0 1 1 0 224 112 112 0 0 1 0-224m0 64a48 48 0 1 0 0 96 48 48 0 0 0 0-96"
      })
    ]));
  }
}), more_default = _sfc_main175;
var _sfc_main195 = /* @__PURE__ */ defineComponent({
  name: "PictureFilled",
  __name: "picture-filled",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M96 896a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h832a32 32 0 0 1 32 32v704a32 32 0 0 1-32 32zm315.52-228.48-68.928-68.928a32 32 0 0 0-45.248 0L128 768.064h778.688l-242.112-290.56a32 32 0 0 0-49.216 0L458.752 665.408a32 32 0 0 1-47.232 2.112M256 384a96 96 0 1 0 192.064-.064A96 96 0 0 0 256 384"
      })
    ]));
  }
}), picture_filled_default = _sfc_main195;
var _sfc_main197 = /* @__PURE__ */ defineComponent({
  name: "Picture",
  __name: "picture",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M160 160v704h704V160zm-32-64h768a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H128a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M384 288q64 0 64 64t-64 64-64-64 64-64M185.408 876.992l-50.816-38.912L350.72 556.032a96 96 0 0 1 134.592-17.856l1.856 1.472 122.88 99.136a32 32 0 0 0 44.992-4.864l216-269.888 49.92 39.936-215.808 269.824-.256.32a96 96 0 0 1-135.04 14.464l-122.88-99.072-.64-.512a32 32 0 0 0-44.8 5.952z"
      })
    ]));
  }
}), picture_default = _sfc_main197;
var _sfc_main201 = /* @__PURE__ */ defineComponent({
  name: "Plus",
  __name: "plus",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"
      })
    ]));
  }
}), plus_default = _sfc_main201;
var _sfc_main207 = /* @__PURE__ */ defineComponent({
  name: "PriceTag",
  __name: "price-tag",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M224 318.336V896h576V318.336L552.512 115.84a64 64 0 0 0-81.024 0zM593.024 66.304l259.2 212.096A32 32 0 0 1 864 303.168V928a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V303.168a32 32 0 0 1 11.712-24.768l259.2-212.096a128 128 0 0 1 162.112 0"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 448a64 64 0 1 0 0-128 64 64 0 0 0 0 128m0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256"
      })
    ]));
  }
}), price_tag_default = _sfc_main207;
var _sfc_main212 = /* @__PURE__ */ defineComponent({
  name: "Rank",
  __name: "rank",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m186.496 544 41.408 41.344a32 32 0 1 1-45.248 45.312l-96-96a32 32 0 0 1 0-45.312l96-96a32 32 0 1 1 45.248 45.312L186.496 480h290.816V186.432l-41.472 41.472a32 32 0 1 1-45.248-45.184l96-96.128a32 32 0 0 1 45.312 0l96 96.064a32 32 0 0 1-45.248 45.184l-41.344-41.28V480H832l-41.344-41.344a32 32 0 0 1 45.248-45.312l96 96a32 32 0 0 1 0 45.312l-96 96a32 32 0 0 1-45.248-45.312L832 544H541.312v293.44l41.344-41.28a32 32 0 1 1 45.248 45.248l-96 96a32 32 0 0 1-45.312 0l-96-96a32 32 0 1 1 45.312-45.248l41.408 41.408V544z"
      })
    ]));
  }
}), rank_default = _sfc_main212;
var _sfc_main215 = /* @__PURE__ */ defineComponent({
  name: "RefreshLeft",
  __name: "refresh-left",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M289.088 296.704h92.992a32 32 0 0 1 0 64H232.96a32 32 0 0 1-32-32V179.712a32 32 0 0 1 64 0v50.56a384 384 0 0 1 643.84 282.88 384 384 0 0 1-383.936 384 384 384 0 0 1-384-384h64a320 320 0 1 0 640 0 320 320 0 0 0-555.712-216.448z"
      })
    ]));
  }
}), refresh_left_default = _sfc_main215;
var _sfc_main216 = /* @__PURE__ */ defineComponent({
  name: "RefreshRight",
  __name: "refresh-right",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88"
      })
    ]));
  }
}), refresh_right_default = _sfc_main216;
var _sfc_main222 = /* @__PURE__ */ defineComponent({
  name: "ScaleToOriginal",
  __name: "scale-to-original",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M813.176 180.706a60.235 60.235 0 0 1 60.236 60.235v481.883a60.235 60.235 0 0 1-60.236 60.235H210.824a60.235 60.235 0 0 1-60.236-60.235V240.94a60.235 60.235 0 0 1 60.236-60.235h602.352zm0-60.235H210.824A120.47 120.47 0 0 0 90.353 240.94v481.883a120.47 120.47 0 0 0 120.47 120.47h602.353a120.47 120.47 0 0 0 120.471-120.47V240.94a120.47 120.47 0 0 0-120.47-120.47zm-120.47 180.705a30.12 30.12 0 0 0-30.118 30.118v301.177a30.118 30.118 0 0 0 60.236 0V331.294a30.12 30.12 0 0 0-30.118-30.118m-361.412 0a30.12 30.12 0 0 0-30.118 30.118v301.177a30.118 30.118 0 1 0 60.236 0V331.294a30.12 30.12 0 0 0-30.118-30.118M512 361.412a30.12 30.12 0 0 0-30.118 30.117v30.118a30.118 30.118 0 0 0 60.236 0V391.53A30.12 30.12 0 0 0 512 361.412M512 512a30.12 30.12 0 0 0-30.118 30.118v30.117a30.118 30.118 0 0 0 60.236 0v-30.117A30.12 30.12 0 0 0 512 512"
      })
    ]));
  }
}), scale_to_original_default = _sfc_main222;
var _sfc_main225 = /* @__PURE__ */ defineComponent({
  name: "Search",
  __name: "search",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704"
      })
    ]));
  }
}), search_default = _sfc_main225;
var _sfc_main231 = /* @__PURE__ */ defineComponent({
  name: "Setting",
  __name: "setting",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357 357 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a352 352 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357 357 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294 294 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293 293 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294 294 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288 288 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293 293 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a288 288 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384m0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256"
      })
    ]));
  }
}), setting_default = _sfc_main231;
var _sfc_main249 = /* @__PURE__ */ defineComponent({
  name: "SuccessFilled",
  __name: "success-filled",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"
      })
    ]));
  }
}), success_filled_default = _sfc_main249;
var _sfc_main277 = /* @__PURE__ */ defineComponent({
  name: "User",
  __name: "user",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384m0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512m320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0"
      })
    ]));
  }
}), user_default = _sfc_main277;
var _sfc_main283 = /* @__PURE__ */ defineComponent({
  name: "View",
  __name: "view",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288m0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448m0 64a160.19 160.19 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160"
      })
    ]));
  }
}), view_default = _sfc_main283;
var _sfc_main287 = /* @__PURE__ */ defineComponent({
  name: "WarningFilled",
  __name: "warning-filled",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 192a58.43 58.43 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.43 58.43 0 0 0 512 256m0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4"
      })
    ]));
  }
}), warning_filled_default = _sfc_main287;
var _sfc_main292 = /* @__PURE__ */ defineComponent({
  name: "ZoomIn",
  __name: "zoom-in",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704m-32-384v-96a32 32 0 0 1 64 0v96h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64z"
      })
    ]));
  }
}), zoom_in_default = _sfc_main292;
var _sfc_main293 = /* @__PURE__ */ defineComponent({
  name: "ZoomOut",
  __name: "zoom-out",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704M352 448h256a32 32 0 0 1 0 64H352a32 32 0 0 1 0-64"
      })
    ]));
  }
}), zoom_out_default = _sfc_main293;
const iconPropType = definePropType([
  String,
  Object,
  Function
]);
const CloseComponents = { Close: close_default };
const TypeComponents = {
  Close: close_default,
  SuccessFilled: success_filled_default,
  InfoFilled: info_filled_default,
  WarningFilled: warning_filled_default,
  CircleCloseFilled: circle_close_filled_default
};
const TypeComponentsMap = {
  primary: info_filled_default,
  success: success_filled_default,
  warning: warning_filled_default,
  error: circle_close_filled_default,
  info: info_filled_default
};
const ValidateComponentsMap = {
  validating: loading_default,
  success: circle_check_default,
  error: circle_close_default
};
const componentSizes = [
  "",
  "default",
  "small",
  "large"
];
const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: false
});
const SIZE_INJECTION_KEY = /* @__PURE__ */ Symbol("size");
const useGlobalSize = () => {
  const injectedSize = inject(SIZE_INJECTION_KEY, {});
  return computed(() => {
    return unref(injectedSize.size) || "";
  });
};
const buttonTypes = [
  "default",
  "primary",
  "success",
  "warning",
  "info",
  "danger",
  "text",
  ""
];
const buttonNativeTypes = [
  "button",
  "submit",
  "reset"
];
const buttonProps = buildProps({
  /**
  * @description button size
  */
  size: useSizeProp,
  /**
  * @description disable the button
  */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
  * @description button type
  */
  type: {
    type: String,
    values: buttonTypes,
    default: ""
  },
  /**
  * @description icon component
  */
  icon: { type: iconPropType },
  /**
  * @description native button type
  */
  nativeType: {
    type: String,
    values: buttonNativeTypes,
    default: "button"
  },
  /**
  * @description determine whether it's loading
  */
  loading: Boolean,
  /**
  * @description customize loading icon component
  */
  loadingIcon: {
    type: iconPropType,
    default: () => loading_default
  },
  /**
  * @description determine whether it's a plain button
  */
  plain: {
    type: Boolean,
    default: void 0
  },
  /**
  * @description determine whether it's a text button
  */
  text: {
    type: Boolean,
    default: void 0
  },
  /**
  * @description determine whether it's a link button
  */
  link: Boolean,
  /**
  * @description determine whether the text button background color is always on
  */
  bg: Boolean,
  /**
  * @description native button autofocus
  */
  autofocus: Boolean,
  /**
  * @description determine whether it's a round button
  */
  round: {
    type: Boolean,
    default: void 0
  },
  /**
  * @description determine whether it's a circle button
  */
  circle: Boolean,
  /**
  * @description determine whether it's a dashed button
  */
  dashed: {
    type: Boolean,
    default: void 0
  },
  /**
  * @description custom button color, automatically calculate `hover` and `active` color
  */
  color: String,
  /**
  * @description dark mode, which automatically converts `color` to dark mode colors
  */
  dark: Boolean,
  /**
  * @description automatically insert a space between two chinese characters
  */
  autoInsertSpace: {
    type: Boolean,
    default: void 0
  },
  /**
  * @description custom element tag
  */
  tag: {
    type: definePropType([String, Object]),
    default: "button"
  }
});
const buttonEmits = { click: (evt) => evt instanceof MouseEvent };
const buttonGroupContextKey = /* @__PURE__ */ Symbol("buttonGroupContextKey");
const iconProps = buildProps({
  /**
  * @description SVG icon size, size x size
  */
  size: { type: definePropType([Number, String]) },
  /**
  * @description SVG tag's fill attribute
  */
  color: { type: String }
});
const FOCUSABLE_ELEMENT_SELECTORS = `a[href],button:not([disabled]),button:not([hidden]),:not([tabindex="-1"]),input:not([disabled]),input:not([type="hidden"]),select:not([disabled]),textarea:not([disabled])`;
const isShadowRoot = (e) => {
  if (typeof ShadowRoot === "undefined") return false;
  return e instanceof ShadowRoot;
};
const isHTMLElement = (e) => {
  if (typeof Element === "undefined") return false;
  return e instanceof Element;
};
const isVisible = (element) => {
  return getComputedStyle(element).position === "fixed" ? false : element.offsetParent !== null;
};
const obtainAllFocusableElements = (element) => {
  return Array.from(element.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS)).filter((item) => isFocusable(item) && isVisible(item));
};
const isFocusable = (element) => {
  if (element.tabIndex > 0 || element.tabIndex === 0 && element.getAttribute("tabIndex") !== null) return true;
  if (element.tabIndex < 0 || element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true") return false;
  switch (element.nodeName) {
    case "A":
      return !!element.href && element.rel !== "ignore";
    case "INPUT":
      return !(element.type === "hidden" || element.type === "file");
    case "BUTTON":
    case "SELECT":
    case "TEXTAREA":
      return true;
    default:
      return false;
  }
};
const focusElement = (el, options) => {
  if (!el || !el.focus) return;
  let cleanup = false;
  if (isHTMLElement(el) && !isFocusable(el) && !el.getAttribute("tabindex")) {
    el.setAttribute("tabindex", "-1");
    cleanup = true;
  }
  el.focus(options);
  if (isHTMLElement(el) && cleanup) el.removeAttribute("tabindex");
};
const SCOPE$2 = "utils/dom/style";
const classNameToArray = (cls = "") => cls.split(" ").filter((item) => !!item.trim());
const hasClass = (el, cls) => {
  if (!el || !cls) return false;
  if (cls.includes(" ")) throw new Error("className should not contain space.");
  return el.classList.contains(cls);
};
const addClass = (el, cls) => {
  if (!el || !cls.trim()) return;
  el.classList.add(...classNameToArray(cls));
};
const removeClass = (el, cls) => {
  if (!el || !cls.trim()) return;
  el.classList.remove(...classNameToArray(cls));
};
const getStyle = (element, styleName) => {
  if (!isClient || !element || !styleName || isShadowRoot(element)) return "";
  let key = camelize(styleName);
  if (key === "float") key = "cssFloat";
  try {
    const style = element.style[key];
    if (style) return style;
    const computed2 = (void 0).defaultView?.getComputedStyle(element, "");
    return computed2 ? computed2[key] : "";
  } catch {
    return element.style[key];
  }
};
function addUnit(value, defaultUnit = "px") {
  if (!value && value !== 0) return "";
  if (isNumber(value) || isStringNumber(value)) return `${value}${defaultUnit}`;
  else if (isString(value)) return value;
  debugWarn(SCOPE$2, "binding value must be a string or number");
}
var icon_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElIcon",
  inheritAttrs: false,
  __name: "icon",
  props: iconProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("icon");
    const style = computed(() => {
      const { size, color } = props;
      const fontSize = addUnit(size);
      if (!fontSize && !color) return {};
      return {
        fontSize,
        "--color": color
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("i", mergeProps({
        class: unref(ns).b(),
        style: style.value
      }, _ctx.$attrs), [renderSlot(_ctx.$slots, "default")], 16);
    };
  }
});
var icon_default = icon_vue_vue_type_script_setup_true_lang_default;
const ElIcon = withInstall(icon_default);
const useDeprecated = ({ from, replacement, scope, version, ref: ref2, type = "API" }, condition) => {
  watch(() => unref(condition), (val) => {
    if (val) debugWarn(scope, `[${type}] ${from} is about to be deprecated in version ${version}, please use ${replacement} instead.
For more detail, please visit: ${ref2}
`);
  }, { immediate: true });
};
const useProp = (name) => {
  const vm = getCurrentInstance();
  return computed(() => vm?.proxy?.$props?.[name]);
};
const formContextKey = /* @__PURE__ */ Symbol("formContextKey");
const formItemContextKey = /* @__PURE__ */ Symbol("formItemContextKey");
const useFormSize = (fallback, ignore = {}) => {
  const emptyRef = ref(void 0);
  const size = ignore.prop ? emptyRef : useProp("size");
  const globalConfig2 = ignore.global ? emptyRef : useGlobalSize();
  const form = ignore.form ? { size: void 0 } : inject(formContextKey, void 0);
  const formItem = ignore.formItem ? { size: void 0 } : inject(formItemContextKey, void 0);
  return computed(() => size.value || unref(fallback) || formItem?.size || form?.size || globalConfig2.value || "");
};
const useFormDisabled = (fallback) => {
  const disabled = useProp("disabled");
  const form = inject(formContextKey, void 0);
  return computed(() => {
    return disabled.value ?? unref(fallback) ?? form?.disabled ?? false;
  });
};
const useFormItem = () => {
  return {
    form: inject(formContextKey, void 0),
    formItem: inject(formItemContextKey, void 0)
  };
};
const useFormItemInputId = (props, { formItemContext, disableIdGeneration, disableIdManagement }) => {
  if (!disableIdGeneration) disableIdGeneration = ref(false);
  if (!disableIdManagement) disableIdManagement = ref(false);
  getCurrentInstance();
  const inputId = ref();
  const isLabeledByFormItem = computed(() => {
    return !!(!(props.label || props.ariaLabel) && formItemContext && formItemContext.inputIds && formItemContext.inputIds?.length <= 1);
  });
  return {
    isLabeledByFormItem,
    inputId
  };
};
var en_default = {
  name: "en",
  el: {
    breadcrumb: { label: "Breadcrumb" },
    colorpicker: {
      confirm: "OK",
      clear: "Clear",
      defaultLabel: "color picker",
      description: "current color is {color}. press enter to select a new color.",
      alphaLabel: "pick alpha value",
      alphaDescription: "alpha {alpha}, current color is {color}",
      hueLabel: "pick hue value",
      hueDescription: "hue {hue}, current color is {color}",
      svLabel: "pick saturation and brightness value",
      svDescription: "saturation {saturation}, brightness {brightness}, current color is {color}",
      predefineDescription: "select {value} as the color"
    },
    datepicker: {
      now: "Now",
      today: "Today",
      cancel: "Cancel",
      clear: "Clear",
      confirm: "OK",
      dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      selectedDate: "Selected date",
      selectDate: "Select date",
      selectTime: "Select time",
      startDate: "Start Date",
      startTime: "Start Time",
      endDate: "End Date",
      endTime: "End Time",
      prevYear: "Previous Year",
      nextYear: "Next Year",
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      year: "",
      month1: "January",
      month2: "February",
      month3: "March",
      month4: "April",
      month5: "May",
      month6: "June",
      month7: "July",
      month8: "August",
      month9: "September",
      month10: "October",
      month11: "November",
      month12: "December",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat"
      },
      weeksFull: {
        sun: "Sunday",
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday"
      },
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec"
      }
    },
    inputNumber: {
      decrease: "decrease number",
      increase: "increase number"
    },
    select: {
      loading: "Loading",
      noMatch: "No matching data",
      noData: "No data",
      placeholder: "Select"
    },
    mention: { loading: "Loading" },
    dropdown: { toggleDropdown: "Toggle Dropdown" },
    cascader: {
      noMatch: "No matching data",
      loading: "Loading",
      placeholder: "Select",
      noData: "No data"
    },
    pagination: {
      goto: "Go to",
      pagesize: "/page",
      total: "Total {total}",
      pageClassifier: "",
      page: "Page",
      prev: "Go to previous page",
      next: "Go to next page",
      currentPage: "page {pager}",
      prevPages: "Previous {pager} pages",
      nextPages: "Next {pager} pages",
      deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
    },
    dialog: { close: "Close this dialog" },
    drawer: { close: "Close this dialog" },
    messagebox: {
      title: "Message",
      confirm: "OK",
      cancel: "Cancel",
      error: "Illegal input",
      close: "Close this dialog"
    },
    upload: {
      deleteTip: "press delete to remove",
      delete: "Delete",
      preview: "Preview",
      continue: "Continue"
    },
    slider: {
      defaultLabel: "slider between {min} and {max}",
      defaultRangeStartLabel: "pick start value",
      defaultRangeEndLabel: "pick end value"
    },
    table: {
      emptyText: "No Data",
      confirmFilter: "Confirm",
      resetFilter: "Reset",
      clearFilter: "All",
      sumText: "Sum",
      selectAllLabel: "Select all rows",
      selectRowLabel: "Select this row",
      expandRowLabel: "Expand this row",
      collapseRowLabel: "Collapse this row",
      sortLabel: "Sort by {column}",
      filterLabel: "Filter by {column}"
    },
    tag: { close: "Close this tag" },
    tour: {
      next: "Next",
      previous: "Previous",
      finish: "Finish",
      close: "Close this dialog"
    },
    tree: { emptyText: "No Data" },
    transfer: {
      noMatch: "No matching data",
      noData: "No data",
      titles: ["List 1", "List 2"],
      filterPlaceholder: "Enter keyword",
      noCheckedFormat: "{total} items",
      hasCheckedFormat: "{checked}/{total} checked"
    },
    image: { error: "FAILED" },
    pageHeader: { title: "Back" },
    popconfirm: {
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    },
    carousel: {
      leftArrow: "Carousel arrow left",
      rightArrow: "Carousel arrow right",
      indicator: "Carousel switch to index {index}"
    },
    inputOTP: {
      groupLabel: "OTP Input",
      defaultLabel: "Please enter OTP character {index}"
    }
  }
};
const buildTranslator = (locale) => (path, option) => translate(path, option, unref(locale));
const translate = (path, option, locale) => get(locale, path, path).replace(/\{(\w+)\}/g, (_, key) => `${option?.[key] ?? `{${key}}`}`);
const buildLocaleContext = (locale) => {
  return {
    lang: computed(() => unref(locale).name),
    locale: isRef(locale) ? locale : ref(locale),
    t: buildTranslator(locale)
  };
};
const localeContextKey = /* @__PURE__ */ Symbol("localeContextKey");
const useLocale = (localeOverrides) => {
  const locale = localeOverrides || inject(localeContextKey, ref());
  return buildLocaleContext(computed(() => locale.value || en_default));
};
const emptyValuesContextKey = /* @__PURE__ */ Symbol("emptyValuesContextKey");
const SCOPE$1 = "use-empty-values";
const DEFAULT_EMPTY_VALUES = [
  "",
  void 0,
  null
];
const useEmptyValuesProps = buildProps({
  /**
  * @description empty values supported by the component
  */
  emptyValues: Array,
  /**
  * @description return value when cleared, if you want to set `undefined`, use `() => undefined`
  */
  valueOnClear: {
    type: definePropType([
      String,
      Number,
      Boolean,
      Function
    ]),
    default: void 0,
    validator: (val) => {
      val = isFunction(val) ? val() : val;
      if (isArray(val)) return val.every((item) => !item);
      return !val;
    }
  }
});
const useEmptyValues = (props, defaultValue) => {
  const config = getCurrentInstance() ? inject(emptyValuesContextKey, ref({})) : ref({});
  const emptyValues = computed(() => props.emptyValues || config.value.emptyValues || DEFAULT_EMPTY_VALUES);
  const valueOnClear = computed(() => {
    if (isFunction(props.valueOnClear)) return props.valueOnClear();
    else if (props.valueOnClear !== void 0) return props.valueOnClear;
    else if (isFunction(config.value.valueOnClear)) return config.value.valueOnClear();
    else if (config.value.valueOnClear !== void 0) return config.value.valueOnClear;
    return void 0;
  });
  const isEmptyValue = (value) => {
    let result = true;
    if (isArray(value)) result = emptyValues.value.some((emptyValue) => {
      return isEqual(value, emptyValue);
    });
    else result = emptyValues.value.includes(value);
    return result;
  };
  if (!isEmptyValue(valueOnClear.value)) debugWarn(SCOPE$1, "value-on-clear should be a value of empty-values");
  return {
    emptyValues,
    valueOnClear,
    isEmptyValue
  };
};
const configProviderContextKey = /* @__PURE__ */ Symbol();
const globalConfig = ref();
function useGlobalConfig(key, defaultValue = void 0) {
  const config = getCurrentInstance() ? inject(configProviderContextKey, globalConfig) : globalConfig;
  if (key) return computed(() => config.value?.[key] ?? defaultValue);
  else return config;
}
function useGlobalComponentSettings(block, sizeFallback) {
  const config = useGlobalConfig();
  const ns = useNamespace(block, computed(() => config.value?.namespace || "el"));
  const locale = useLocale(computed(() => config.value?.locale));
  const zIndex = useZIndex(computed(() => {
    const zIndex2 = config.value?.zIndex;
    return isNil(zIndex2) || Number.isNaN(zIndex2) ? defaultInitialZIndex : zIndex2;
  }));
  const size = computed(() => unref(sizeFallback) || config.value?.size || "");
  provideGlobalConfig(computed(() => unref(config) || {}));
  return {
    ns,
    locale,
    zIndex,
    size
  };
}
const provideGlobalConfig = (config, app, global = false) => {
  const inSetup = !!getCurrentInstance();
  const oldConfig = inSetup ? useGlobalConfig() : void 0;
  const provideFn = inSetup ? provide : void 0;
  if (!provideFn) {
    debugWarn("provideGlobalConfig", "provideGlobalConfig() can only be used inside setup().");
    return;
  }
  const context = computed(() => {
    const cfg = unref(config);
    if (!oldConfig?.value) return cfg;
    return mergeConfig(oldConfig.value, cfg);
  });
  provideFn(configProviderContextKey, context);
  provideFn(localeContextKey, computed(() => context.value.locale));
  provideFn(namespaceContextKey, computed(() => context.value.namespace));
  provideFn(zIndexContextKey, computed(() => context.value.zIndex));
  provideFn(SIZE_INJECTION_KEY, { size: computed(() => context.value.size || "") });
  provideFn(emptyValuesContextKey, computed(() => ({
    emptyValues: context.value.emptyValues,
    valueOnClear: context.value.valueOnClear
  })));
  if (global || !globalConfig.value) globalConfig.value = context.value;
  return context;
};
const mergeConfig = (a, b) => {
  const keys = [.../* @__PURE__ */ new Set([...keysOf(a), ...keysOf(b)])];
  const obj = {};
  for (const key of keys) obj[key] = b[key] !== void 0 ? b[key] : a[key];
  return obj;
};
const useButton = (props, emit) => {
  useDeprecated({
    from: "type.text",
    replacement: "link",
    version: "3.0.0",
    scope: "props",
    ref: "https://element-plus.org/en-US/component/button.html#button-attributes"
  }, computed(() => props.type === "text"));
  const buttonGroupContext = inject(buttonGroupContextKey, void 0);
  const globalConfig2 = useGlobalConfig("button");
  const { form } = useFormItem();
  const _size = useFormSize(computed(() => buttonGroupContext?.size));
  const _disabled = useFormDisabled();
  const _ref = ref();
  const slots = useSlots();
  const _type = computed(() => props.type || buttonGroupContext?.type || globalConfig2.value?.type || "");
  const autoInsertSpace = computed(() => props.autoInsertSpace ?? globalConfig2.value?.autoInsertSpace ?? false);
  const _plain = computed(() => props.plain ?? globalConfig2.value?.plain ?? false);
  const _round = computed(() => props.round ?? globalConfig2.value?.round ?? false);
  const _text = computed(() => props.text ?? globalConfig2.value?.text ?? false);
  const _dashed = computed(() => props.dashed ?? globalConfig2.value?.dashed ?? false);
  const _props = computed(() => {
    if (props.tag === "button") return {
      ariaDisabled: _disabled.value || props.loading,
      disabled: _disabled.value || props.loading,
      autofocus: props.autofocus,
      type: props.nativeType
    };
    return {};
  });
  const shouldAddSpace = computed(() => {
    const defaultSlot = slots.default?.();
    if (autoInsertSpace.value && defaultSlot?.length === 1) {
      const slot = defaultSlot[0];
      if (slot?.type === Text) {
        const text = slot.children;
        return new RegExp("^\\p{Unified_Ideograph}{2}$", "u").test(text.trim());
      }
    }
    return false;
  });
  const handleClick = (evt) => {
    if (_disabled.value || props.loading) {
      evt.stopPropagation();
      return;
    }
    if (props.nativeType === "reset") form?.resetFields();
    emit("click", evt);
  };
  return {
    _disabled,
    _size,
    _type,
    _ref,
    _props,
    _plain,
    _round,
    _text,
    _dashed,
    shouldAddSpace,
    handleClick
  };
};
function darken(color, amount = 20) {
  return color.mix("#141414", amount).toString();
}
function useButtonCustomStyle(props) {
  const _disabled = useFormDisabled();
  const ns = useNamespace("button");
  return computed(() => {
    let styles = {};
    let buttonColor = props.color;
    if (buttonColor) {
      const match = buttonColor.match(/var\((.*?)\)/);
      if (match) buttonColor = (void 0).getComputedStyle((void 0).document.documentElement).getPropertyValue(match[1]);
      const color = new TinyColor(buttonColor);
      const activeBgColor = props.dark ? color.tint(20).toString() : darken(color, 20);
      if (props.plain) {
        styles = ns.cssVarBlock({
          "bg-color": props.dark ? darken(color, 90) : color.tint(90).toString(),
          "text-color": buttonColor,
          "border-color": props.dark ? darken(color, 50) : color.tint(50).toString(),
          "hover-text-color": `var(${ns.cssVarName("color-white")})`,
          "hover-bg-color": buttonColor,
          "hover-border-color": buttonColor,
          "active-bg-color": activeBgColor,
          "active-text-color": `var(${ns.cssVarName("color-white")})`,
          "active-border-color": activeBgColor
        });
        if (_disabled.value) {
          styles[ns.cssVarBlockName("disabled-bg-color")] = props.dark ? darken(color, 90) : color.tint(90).toString();
          styles[ns.cssVarBlockName("disabled-text-color")] = props.dark ? darken(color, 50) : color.tint(50).toString();
          styles[ns.cssVarBlockName("disabled-border-color")] = props.dark ? darken(color, 80) : color.tint(80).toString();
        }
      } else if (props.link || props.text) {
        const hoverColor = props.dark ? darken(color, 30) : color.tint(30).toString();
        styles = ns.cssVarBlock({
          "text-color": buttonColor,
          "hover-text-color": hoverColor,
          "active-text-color": activeBgColor
        });
        if (props.link) {
          styles[ns.cssVarBlockName("hover-link-text-color")] = hoverColor;
          styles[ns.cssVarBlockName("active-color")] = activeBgColor;
        }
        if (_disabled.value) {
          const disabledColor = props.dark ? darken(color, 50) : color.tint(50).toString();
          styles[ns.cssVarBlockName("disabled-bg-color")] = "transparent";
          styles[ns.cssVarBlockName("disabled-text-color")] = disabledColor;
          styles[ns.cssVarBlockName("disabled-border-color")] = "transparent";
        }
      } else {
        const hoverBgColor = props.dark ? darken(color, 30) : color.tint(30).toString();
        const textColor = color.isDark() ? `var(${ns.cssVarName("color-white")})` : `var(${ns.cssVarName("color-black")})`;
        styles = ns.cssVarBlock({
          "bg-color": buttonColor,
          "text-color": textColor,
          "border-color": buttonColor,
          "hover-bg-color": hoverBgColor,
          "hover-text-color": textColor,
          "hover-border-color": hoverBgColor,
          "active-bg-color": activeBgColor,
          "active-border-color": activeBgColor
        });
        if (_disabled.value) {
          const disabledButtonColor = props.dark ? darken(color, 50) : color.tint(50).toString();
          styles[ns.cssVarBlockName("disabled-bg-color")] = disabledButtonColor;
          styles[ns.cssVarBlockName("disabled-text-color")] = props.dark ? "rgba(255, 255, 255, 0.5)" : `var(${ns.cssVarName("color-white")})`;
          styles[ns.cssVarBlockName("disabled-border-color")] = disabledButtonColor;
        }
      }
    }
    return styles;
  });
}
var button_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElButton",
  __name: "button",
  props: buttonProps,
  emits: buttonEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const buttonStyle = useButtonCustomStyle(props);
    const ns = useNamespace("button");
    const { _ref, _size, _type, _disabled, _props, _plain, _round, _text, _dashed, shouldAddSpace, handleClick } = useButton(props, emit);
    const buttonKls = computed(() => [
      ns.b(),
      ns.m(_type.value),
      ns.m(_size.value),
      ns.is("disabled", _disabled.value),
      ns.is("loading", props.loading),
      ns.is("plain", _plain.value),
      ns.is("round", _round.value),
      ns.is("circle", props.circle),
      ns.is("text", _text.value),
      ns.is("dashed", _dashed.value),
      ns.is("link", props.link),
      ns.is("has-bg", props.bg)
    ]);
    __expose({
      /** @description button html element */
      ref: _ref,
      /** @description button size */
      size: _size,
      /** @description button type */
      type: _type,
      /** @description button disabled */
      disabled: _disabled,
      /** @description whether adding space */
      shouldAddSpace
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(__props.tag), mergeProps({
        ref_key: "_ref",
        ref: _ref
      }, unref(_props), {
        class: buttonKls.value,
        style: unref(buttonStyle),
        onClick: unref(handleClick)
      }), {
        default: withCtx(() => [__props.loading ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [_ctx.$slots.loading ? renderSlot(_ctx.$slots, "loading", { key: 0 }) : (openBlock(), createBlock(unref(ElIcon), {
          key: 1,
          class: normalizeClass(unref(ns).is("loading"))
        }, {
          default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.loadingIcon)))]),
          _: 1
        }, 8, ["class"]))], 64)) : __props.icon || _ctx.$slots.icon ? (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
          default: withCtx(() => [__props.icon ? (openBlock(), createBlock(resolveDynamicComponent(__props.icon), { key: 0 })) : renderSlot(_ctx.$slots, "icon", { key: 1 })]),
          _: 3
        })) : createCommentVNode("v-if", true), _ctx.$slots.default ? (openBlock(), createElementBlock("span", {
          key: 2,
          class: normalizeClass({ [unref(ns).em("text", "expand")]: unref(shouldAddSpace) })
        }, [renderSlot(_ctx.$slots, "default")], 2)) : createCommentVNode("v-if", true)]),
        _: 3
      }, 16, [
        "class",
        "style",
        "onClick"
      ]);
    };
  }
});
var button_default = button_vue_vue_type_script_setup_true_lang_default;
const buttonGroupProps = {
  /**
  * @description control the size of buttons in this button-group
  */
  size: buttonProps.size,
  /**
  * @description control the type of buttons in this button-group
  */
  type: buttonProps.type,
  /**
  * @description display direction
  */
  direction: {
    type: definePropType(String),
    values: ["horizontal", "vertical"],
    default: "horizontal"
  }
};
var button_group_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElButtonGroup",
  __name: "button-group",
  props: buttonGroupProps,
  setup(__props) {
    const props = __props;
    provide(buttonGroupContextKey, reactive({
      size: toRef(props, "size"),
      type: toRef(props, "type")
    }));
    const ns = useNamespace("button");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", { class: normalizeClass([unref(ns).b("group"), unref(ns).bm("group", props.direction)]) }, [renderSlot(_ctx.$slots, "default")], 2);
    };
  }
});
var button_group_default = button_group_vue_vue_type_script_setup_true_lang_default;
const ElButton = withInstall(button_default, { ButtonGroup: button_group_default });
const ElButtonGroup = withNoopInstall(button_group_default);
const formMetaProps = buildProps({
  /**
  * @description Control the size of components in this form.
  */
  size: {
    type: String,
    values: componentSizes
  },
  /**
  * @description Whether to disable all components in this form. If set to `true`, it will override the `disabled` prop of the inner component.
  */
  disabled: Boolean
});
const formProps = buildProps({
  ...formMetaProps,
  /**
  * @description Data of form component.
  */
  model: Object,
  /**
  * @description Validation rules of form.
  */
  rules: { type: definePropType(Object) },
  /**
  * @description Position of label. If set to `'left'` or `'right'`, `label-width` prop is also required.
  */
  labelPosition: {
    type: String,
    values: [
      "left",
      "right",
      "top"
    ],
    default: "right"
  },
  /**
  * @description Position of asterisk.
  */
  requireAsteriskPosition: {
    type: String,
    values: ["left", "right"],
    default: "left"
  },
  /**
  * @description Width of label, e.g. `'50px'`. All its direct child form items will inherit this value. `auto` is supported.
  */
  labelWidth: {
    type: [String, Number],
    default: ""
  },
  /**
  * @description Suffix of the label.
  */
  labelSuffix: {
    type: String,
    default: ""
  },
  /**
  * @description Whether the form is inline.
  */
  inline: Boolean,
  /**
  * @description Whether to display the error message inline with the form item.
  */
  inlineMessage: Boolean,
  /**
  * @description Whether to display an icon indicating the validation result.
  */
  statusIcon: Boolean,
  /**
  * @description Whether to show the error message.
  */
  showMessage: {
    type: Boolean,
    default: true
  },
  /**
  * @description Whether to trigger validation when the `rules` prop is changed.
  */
  validateOnRuleChange: {
    type: Boolean,
    default: true
  },
  /**
  * @description Whether to hide required fields should have a red asterisk (star) beside their labels.
  */
  hideRequiredAsterisk: Boolean,
  /**
  * @description When validation fails, scroll to the first error form entry.
  */
  scrollToError: Boolean,
  /**
  * @description When validation fails, it scrolls to the first error item based on the scrollIntoView option.
  */
  scrollIntoViewOptions: {
    type: definePropType([Object, Boolean]),
    default: true
  }
});
const formEmits = { validate: (prop, isValid, message2) => (isArray(prop) || isString(prop)) && isBoolean(isValid) && isString(message2) };
const SCOPE = "ElForm";
function useFormLabelWidth() {
  const potentialLabelWidthArr = ref([]);
  const autoLabelWidth = computed(() => {
    if (!potentialLabelWidthArr.value.length) return "0";
    const max = Math.max(...potentialLabelWidthArr.value);
    return max ? `${max}px` : "";
  });
  function getLabelWidthIndex(width) {
    const index = potentialLabelWidthArr.value.indexOf(width);
    if (index === -1 && autoLabelWidth.value === "0") debugWarn(SCOPE, `unexpected width ${width}`);
    return index;
  }
  function registerLabelWidth(val, oldVal) {
    if (val && oldVal) {
      const index = getLabelWidthIndex(oldVal);
      potentialLabelWidthArr.value.splice(index, 1, val);
    } else if (val) potentialLabelWidthArr.value.push(val);
  }
  function deregisterLabelWidth(val) {
    const index = getLabelWidthIndex(val);
    if (index > -1) potentialLabelWidthArr.value.splice(index, 1);
  }
  return {
    autoLabelWidth,
    registerLabelWidth,
    deregisterLabelWidth
  };
}
const filterFields = (fields, props) => {
  const normalized = castArray(props).map((prop) => isArray(prop) ? prop.join(".") : prop);
  return normalized.length > 0 ? fields.filter((field) => field.propString && normalized.includes(field.propString)) : fields;
};
const COMPONENT_NAME$2 = "ElForm";
var form_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: COMPONENT_NAME$2,
  __name: "form",
  props: formProps,
  emits: formEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const formRef = ref();
    const fields = reactive([]);
    const initialValues = /* @__PURE__ */ new Map();
    const formSize = useFormSize();
    const ns = useNamespace("form");
    const formClasses = computed(() => {
      const { labelPosition, inline } = props;
      return [
        ns.b(),
        ns.m(formSize.value || "default"),
        {
          [ns.m(`label-${labelPosition}`)]: labelPosition,
          [ns.m("inline")]: inline
        }
      ];
    });
    const getField = (prop) => {
      return filterFields(fields, [prop])[0];
    };
    const addField = (field) => {
      if (!fields.includes(field)) fields.push(field);
      if (field.propString) if (initialValues.has(field.propString)) field.setInitialValue(initialValues.get(field.propString));
      else initialValues.set(field.propString, cloneDeep(field.fieldValue));
    };
    const removeField = (field, oldPropString) => {
      if (oldPropString) {
        initialValues.delete(oldPropString);
        return;
      }
      const idx = fields.indexOf(field);
      if (idx > -1) {
        fields.splice(idx, 1);
        if (field.propString) initialValues.set(field.propString, cloneDeep(field.getInitialValue()));
      }
    };
    const setInitialValues = (initModel) => {
      if (!props.model) {
        debugWarn(COMPONENT_NAME$2, "model is required for setInitialValues to work.");
        return;
      }
      if (!initModel) {
        debugWarn(COMPONENT_NAME$2, "initModel is required for setInitialValues to work.");
        return;
      }
      for (const key of initialValues.keys()) initialValues.set(key, cloneDeep(getProp(initModel, key).value));
      fields.forEach((field) => {
        if (field.prop) field.setInitialValue(getProp(initModel, field.prop).value);
      });
    };
    const resetFields = (properties = []) => {
      if (!props.model) {
        debugWarn(COMPONENT_NAME$2, "model is required for resetFields to work.");
        return;
      }
      filterFields(fields, properties).forEach((field) => field.resetField());
      const activePropStrings = new Set(fields.map((f) => f.propString).filter(Boolean));
      const propsToCheck = properties.length > 0 ? castArray(properties).map((p) => isArray(p) ? p.join(".") : p) : [...initialValues.keys()];
      for (const propString of propsToCheck) if (!activePropStrings.has(propString) && initialValues.has(propString)) getProp(props.model, propString).value = cloneDeep(initialValues.get(propString));
    };
    const clearValidate = (props2 = []) => {
      filterFields(fields, props2).forEach((field) => field.clearValidate());
    };
    const isValidatable = computed(() => {
      const hasModel = !!props.model;
      if (!hasModel) debugWarn(COMPONENT_NAME$2, "model is required for validate to work.");
      return hasModel;
    });
    const obtainValidateFields = (props2) => {
      if (fields.length === 0) return [];
      const filteredFields = filterFields(fields, props2);
      if (!filteredFields.length) {
        debugWarn(COMPONENT_NAME$2, "please pass correct props!");
        return [];
      }
      return filteredFields;
    };
    const validate = async (callback) => validateField(void 0, callback);
    const doValidateField = async (props2 = []) => {
      if (!isValidatable.value) return false;
      const fields2 = obtainValidateFields(props2);
      if (fields2.length === 0) return true;
      let validationErrors = {};
      for (const field of fields2) try {
        await field.validate("");
        if (field.validateState === "error" && !field.error) field.resetField();
      } catch (fields3) {
        validationErrors = {
          ...validationErrors,
          ...fields3
        };
      }
      if (Object.keys(validationErrors).length === 0) return true;
      return Promise.reject(validationErrors);
    };
    const validateField = async (modelProps = [], callback) => {
      let result = false;
      const shouldThrow = !isFunction(callback);
      try {
        result = await doValidateField(modelProps);
        if (result === true) await callback?.(result);
        return result;
      } catch (e) {
        if (e instanceof Error) throw e;
        const invalidFields = e;
        if (props.scrollToError) {
          if (formRef.value) formRef.value.querySelector(`.${ns.b()}-item.is-error`)?.scrollIntoView(props.scrollIntoViewOptions);
        }
        !result && await callback?.(false, invalidFields);
        return shouldThrow && Promise.reject(invalidFields);
      }
    };
    const scrollToField = (prop) => {
      const field = getField(prop);
      if (field) field.$el?.scrollIntoView(props.scrollIntoViewOptions);
    };
    watch(() => props.rules, () => {
      if (props.validateOnRuleChange) validate().catch(NOOP);
    }, {
      deep: true,
      flush: "post"
    });
    provide(formContextKey, reactive({
      ...toRefs(props),
      emit,
      resetFields,
      clearValidate,
      validateField,
      getField,
      addField,
      removeField,
      setInitialValues,
      ...useFormLabelWidth()
    }));
    __expose({
      /**
      * @description Validate the whole form. Receives a callback or returns `Promise`.
      */
      validate,
      /**
      * @description Validate specified fields.
      */
      validateField,
      /**
      * @description Reset specified fields and remove validation result.
      */
      resetFields,
      /**
      * @description Clear validation message for specified fields.
      */
      clearValidate,
      /**
      * @description Scroll to the specified fields.
      */
      scrollToField,
      /**
      * @description Get a field context.
      */
      getField,
      /**
      * @description All fields context.
      */
      fields,
      /**
      * @description Set initial values for form fields. When `resetFields` is called, fields will reset to these values.
      */
      setInitialValues
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("form", {
        ref_key: "formRef",
        ref: formRef,
        class: normalizeClass(formClasses.value)
      }, [renderSlot(_ctx.$slots, "default")], 2);
    };
  }
});
var form_default = form_vue_vue_type_script_setup_true_lang_default;
const formItemValidateStates = [
  "",
  "error",
  "validating",
  "success"
];
const formItemProps = buildProps({
  /**
  * @description Label text.
  */
  label: String,
  /**
  * @description Width of label, e.g. `'50px'`. `'auto'` is supported.
  */
  labelWidth: { type: [String, Number] },
  /**
  * @description Position of label. If set to `'left'` or `'right'`, `label-width` prop is also required. The default is extend from `form label-position`.
  */
  labelPosition: {
    type: String,
    values: [
      "left",
      "right",
      "top",
      ""
    ],
    default: ""
  },
  /**
  * @description  A key of `model`. It could be an array of property paths (e.g `['a', 'b', '0']`). In the use of `validate` and `resetFields` method, the attribute is required.
  */
  prop: { type: definePropType([String, Array]) },
  /**
  * @description Whether the field is required or not, will be determined by validation rules if omitted.
  */
  required: {
    type: Boolean,
    default: void 0
  },
  /**
  * @description Validation rules of form, see the [following table](#formitemrule), more advanced usage at [async-validator](https://github.com/yiminghe/async-validator).
  */
  rules: { type: definePropType([Object, Array]) },
  /**
  * @description Field error message, set its value and the field will validate error and show this message immediately.
  */
  error: String,
  /**
  * @description Validation state of formItem.
  */
  validateStatus: {
    type: String,
    values: formItemValidateStates
  },
  /**
  * @description Same as for in native label.
  */
  for: String,
  /**
  * @description Inline style validate message.
  */
  inlineMessage: {
    type: Boolean,
    default: void 0
  },
  /**
  * @description Whether to show the error message.
  */
  showMessage: {
    type: Boolean,
    default: true
  },
  /**
  * @description Control the size of components in this form-item.
  */
  size: {
    type: String,
    values: componentSizes
  }
});
const COMPONENT_NAME$1 = "ElLabelWrap";
var form_label_wrap_default = /* @__PURE__ */ defineComponent({
  name: COMPONENT_NAME$1,
  props: {
    isAutoWidth: Boolean,
    updateAll: Boolean
  },
  setup(props, { slots }) {
    const formContext = inject(formContextKey, void 0);
    const formItemContext = inject(formItemContextKey);
    if (!formItemContext) throwError(COMPONENT_NAME$1, "usage: <el-form-item><label-wrap /></el-form-item>");
    const ns = useNamespace("form");
    const el = ref();
    const computedWidth = ref(0);
    const getLabelWidth = () => {
      if (el.value?.firstElementChild) {
        const width = (void 0).getComputedStyle(el.value.firstElementChild).width;
        return Math.ceil(Number.parseFloat(width));
      } else return 0;
    };
    const updateLabelWidth = (action = "update") => {
      nextTick(() => {
        if (slots.default && props.isAutoWidth) {
          if (action === "update") computedWidth.value = getLabelWidth();
          else if (action === "remove") formContext?.deregisterLabelWidth(computedWidth.value);
        }
      });
    };
    const updateLabelWidthFn = () => updateLabelWidth("update");
    watch(computedWidth, (val, oldVal) => {
      if (props.updateAll) formContext?.registerLabelWidth(val, oldVal);
    });
    useResizeObserver(computed(() => el.value?.firstElementChild ?? null), updateLabelWidthFn);
    return () => {
      if (!slots) return null;
      const { isAutoWidth } = props;
      if (isAutoWidth) {
        const autoLabelWidth = formContext?.autoLabelWidth;
        const hasLabel = formItemContext?.hasLabel;
        const style = {};
        if (hasLabel && autoLabelWidth && autoLabelWidth !== "auto") {
          const marginWidth = Math.max(0, Number.parseInt(autoLabelWidth, 10) - computedWidth.value);
          const marginPosition = (formItemContext.labelPosition || formContext.labelPosition) === "left" ? "marginRight" : "marginLeft";
          if (marginWidth) style[marginPosition] = `${marginWidth}px`;
        }
        return createVNode("div", {
          "ref": el,
          "class": [ns.be("item", "label-wrap")],
          "style": style
        }, [slots.default?.()]);
      } else return createVNode(Fragment, { "ref": el }, [slots.default?.()]);
    };
  }
});
const _hoisted_1$2 = ["role", "aria-labelledby"];
var form_item_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElFormItem",
  __name: "form-item",
  props: formItemProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const slots = useSlots();
    const formContext = inject(formContextKey, void 0);
    const parentFormItemContext = inject(formItemContextKey, void 0);
    const _size = useFormSize(void 0, { formItem: false });
    const ns = useNamespace("form-item");
    const labelId = useId().value;
    const inputIds = ref([]);
    const validateState = ref("");
    const validateStateDebounced = refDebounced(validateState, 100);
    const validateMessage = ref("");
    const formItemRef = ref();
    let initialValue = void 0;
    let isResettingField = false;
    const labelPosition = computed(() => props.labelPosition || formContext?.labelPosition);
    const labelStyle = computed(() => {
      if (labelPosition.value === "top") return {};
      return { width: addUnit(props.labelWidth ?? formContext?.labelWidth) };
    });
    const contentStyle = computed(() => {
      if (labelPosition.value === "top" || formContext?.inline) return {};
      if (!props.label && !props.labelWidth && isNested) return {};
      const labelWidth = addUnit(props.labelWidth ?? formContext?.labelWidth);
      if (!props.label && !slots.label) return { marginLeft: labelWidth };
      return {};
    });
    const formItemClasses = computed(() => [
      ns.b(),
      ns.m(_size.value),
      ns.is("error", validateState.value === "error"),
      ns.is("validating", validateState.value === "validating"),
      ns.is("success", validateState.value === "success"),
      ns.is("required", isRequired.value || props.required),
      ns.is("no-asterisk", formContext?.hideRequiredAsterisk),
      formContext?.requireAsteriskPosition === "right" ? "asterisk-right" : "asterisk-left",
      {
        [ns.m("feedback")]: formContext?.statusIcon,
        [ns.m(`label-${labelPosition.value}`)]: labelPosition.value
      }
    ]);
    const _inlineMessage = computed(() => isBoolean(props.inlineMessage) ? props.inlineMessage : formContext?.inlineMessage || false);
    const validateClasses = computed(() => [ns.e("error"), { [ns.em("error", "inline")]: _inlineMessage.value }]);
    const propString = computed(() => {
      if (!props.prop) return "";
      return isArray(props.prop) ? props.prop.join(".") : props.prop;
    });
    const hasLabel = computed(() => {
      return !!(props.label || slots.label);
    });
    const labelFor = computed(() => {
      return props.for ?? (inputIds.value.length === 1 ? inputIds.value[0] : void 0);
    });
    const isGroup = computed(() => {
      return !labelFor.value && hasLabel.value;
    });
    const isNested = !!parentFormItemContext;
    const fieldValue = computed(() => {
      const model = formContext?.model;
      if (!model || !props.prop) return;
      return getProp(model, props.prop).value;
    });
    const normalizedRules = computed(() => {
      const { required } = props;
      const rules = [];
      if (props.rules) rules.push(...castArray(props.rules));
      const formRules = formContext?.rules;
      if (formRules && props.prop) {
        const _rules = getProp(formRules, props.prop).value;
        if (_rules) rules.push(...castArray(_rules));
      }
      if (required !== void 0) {
        const requiredRules = rules.map((rule, i) => [rule, i]).filter(([rule]) => "required" in rule);
        if (requiredRules.length > 0) for (const [rule, i] of requiredRules) {
          if (rule.required === required) continue;
          rules[i] = {
            ...rule,
            required
          };
        }
        else rules.push({ required });
      }
      return rules;
    });
    const validateEnabled = computed(() => normalizedRules.value.length > 0);
    const getFilteredRule = (trigger) => {
      return normalizedRules.value.filter((rule) => {
        if (!rule.trigger || !trigger) return true;
        if (isArray(rule.trigger)) return rule.trigger.includes(trigger);
        else return rule.trigger === trigger;
      }).map(({ trigger: trigger2, ...rule }) => rule);
    };
    const isRequired = computed(() => normalizedRules.value.some((rule) => rule.required));
    const shouldShowError = computed(() => validateStateDebounced.value === "error" && props.showMessage && (formContext?.showMessage ?? true));
    const currentLabel = computed(() => `${props.label || ""}${formContext?.labelSuffix || ""}`);
    const setValidationState = (state) => {
      validateState.value = state;
    };
    const onValidationFailed = (error) => {
      const { errors, fields } = error;
      if (!errors || !fields) console.error(error);
      setValidationState("error");
      validateMessage.value = errors ? errors?.[0]?.message ?? `${props.prop} is required` : "";
      formContext?.emit("validate", props.prop, false, validateMessage.value);
    };
    const onValidationSucceeded = () => {
      setValidationState("success");
      formContext?.emit("validate", props.prop, true, "");
    };
    const doValidate = async (rules) => {
      const modelName = propString.value;
      return new AsyncValidator({ [modelName]: rules }).validate({ [modelName]: fieldValue.value }, { firstFields: true }).then(() => {
        onValidationSucceeded();
        return true;
      }).catch((err) => {
        onValidationFailed(err);
        return Promise.reject(err);
      });
    };
    const validate = async (trigger, callback) => {
      if (isResettingField || !props.prop) return false;
      const hasCallback = isFunction(callback);
      if (!validateEnabled.value) {
        callback?.(false);
        return false;
      }
      const rules = getFilteredRule(trigger);
      if (rules.length === 0) {
        callback?.(true);
        return true;
      }
      setValidationState("validating");
      return doValidate(rules).then(() => {
        callback?.(true);
        return true;
      }).catch((err) => {
        const { fields } = err;
        callback?.(false, fields);
        return hasCallback ? false : Promise.reject(fields);
      });
    };
    const clearValidate = () => {
      setValidationState("");
      validateMessage.value = "";
      isResettingField = false;
    };
    const resetField = async () => {
      const model = formContext?.model;
      if (!model || !props.prop) return;
      const computedValue = getProp(model, props.prop);
      isResettingField = true;
      computedValue.value = cloneDeep(initialValue);
      await nextTick();
      clearValidate();
      isResettingField = false;
    };
    const addInputId = (id) => {
      if (!inputIds.value.includes(id)) inputIds.value.push(id);
    };
    const removeInputId = (id) => {
      inputIds.value = inputIds.value.filter((listId) => listId !== id);
    };
    const setInitialValue = (value) => {
      initialValue = cloneDeep(value);
    };
    const getInitialValue = () => initialValue;
    watch(() => props.error, (val) => {
      validateMessage.value = val || "";
      setValidationState(val ? "error" : "");
    }, { immediate: true });
    watch(() => props.validateStatus, (val) => setValidationState(val || ""));
    const context = reactive({
      ...toRefs(props),
      $el: formItemRef,
      size: _size,
      validateMessage,
      validateState,
      labelId,
      inputIds,
      isGroup,
      hasLabel,
      fieldValue,
      addInputId,
      removeInputId,
      resetField,
      clearValidate,
      validate,
      propString,
      setInitialValue,
      getInitialValue
    });
    provide(formItemContextKey, context);
    watch(propString, (newPropString, oldPropString) => {
      if (!formContext || !oldPropString) return;
      formContext.removeField(context, oldPropString);
      if (newPropString) {
        setInitialValue(fieldValue.value);
        formContext.addField(context);
      }
    });
    __expose({
      /**
      * @description Form item size.
      */
      size: _size,
      /**
      * @description Validation message.
      */
      validateMessage,
      /**
      * @description Validation state.
      */
      validateState,
      /**
      * @description Validate form item.
      */
      validate,
      /**
      * @description Remove validation status of the field.
      */
      clearValidate,
      /**
      * @description Reset current field and remove validation result.
      */
      resetField,
      /**
      * @description Set initial value for this field. When `resetField` is called, the field will reset to this value.
      */
      setInitialValue
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "formItemRef",
        ref: formItemRef,
        class: normalizeClass(formItemClasses.value),
        role: isGroup.value ? "group" : void 0,
        "aria-labelledby": isGroup.value ? unref(labelId) : void 0
      }, [createVNode(unref(form_label_wrap_default), {
        "is-auto-width": labelStyle.value.width === "auto",
        "update-all": unref(formContext)?.labelWidth === "auto"
      }, {
        default: withCtx(() => [!!(__props.label || _ctx.$slots.label) ? (openBlock(), createBlock(resolveDynamicComponent(labelFor.value ? "label" : "div"), {
          key: 0,
          id: unref(labelId),
          for: labelFor.value,
          class: normalizeClass(unref(ns).e("label")),
          style: normalizeStyle(labelStyle.value)
        }, {
          default: withCtx(() => [renderSlot(_ctx.$slots, "label", { label: currentLabel.value }, () => [createTextVNode(toDisplayString(currentLabel.value), 1)])]),
          _: 3
        }, 8, [
          "id",
          "for",
          "class",
          "style"
        ])) : createCommentVNode("v-if", true)]),
        _: 3
      }, 8, ["is-auto-width", "update-all"]), createElementVNode("div", {
        class: normalizeClass(unref(ns).e("content")),
        style: normalizeStyle(contentStyle.value)
      }, [renderSlot(_ctx.$slots, "default"), createVNode(TransitionGroup, { name: `${unref(ns).namespace.value}-zoom-in-top` }, {
        default: withCtx(() => [shouldShowError.value ? renderSlot(_ctx.$slots, "error", {
          key: 0,
          error: validateMessage.value
        }, () => [createElementVNode("div", { class: normalizeClass(validateClasses.value) }, toDisplayString(validateMessage.value), 3)]) : createCommentVNode("v-if", true)]),
        _: 3
      }, 8, ["name"])], 6)], 10, _hoisted_1$2);
    };
  }
});
var form_item_default = form_item_vue_vue_type_script_setup_true_lang_default;
const ElForm = withInstall(form_default, { FormItem: form_item_default });
const ElFormItem = withNoopInstall(form_item_default);
const UPDATE_MODEL_EVENT = "update:modelValue";
const CHANGE_EVENT = "change";
const INPUT_EVENT = "input";
const mutable = (val) => val;
const ariaProps = buildProps({
  /**
  * @description native `aria-label` attribute
  */
  ariaLabel: String,
  /**
  * @description native `aria-orientation` attribute
  */
  ariaOrientation: {
    type: String,
    values: [
      "horizontal",
      "vertical",
      "undefined"
    ]
  },
  /**
  * @description native `aria-controls` attribute
  */
  ariaControls: String
});
const useAriaProps = (arias) => {
  return pick(ariaProps, arias);
};
const inputProps = buildProps({
  /**
  * @description native input id
  */
  id: {
    type: String,
    default: void 0
  },
  /**
  * @description input box size
  */
  size: useSizeProp,
  /**
  * @description whether to disable
  */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
  * @description binding value
  */
  modelValue: {
    type: definePropType([
      String,
      Number,
      Object
    ]),
    default: ""
  },
  /**
  * @description v-model modifiers, reference [Vue modifiers](https://vuejs.org/guide/essentials/forms.html#modifiers)
  */
  modelModifiers: {
    type: definePropType(Object),
    default: () => ({})
  },
  /**
  * @description same as `maxlength` in native input
  */
  maxlength: { type: [String, Number] },
  /**
  * @description same as `minlength` in native input
  */
  minlength: { type: [String, Number] },
  /**
  * @description type of input, see more in [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types)
  */
  type: {
    type: definePropType(String),
    default: "text"
  },
  /**
  * @description control the resizability
  */
  resize: {
    type: String,
    values: [
      "none",
      "both",
      "horizontal",
      "vertical"
    ]
  },
  /**
  * @description whether textarea has an adaptive height
  */
  autosize: {
    type: definePropType([Boolean, Object]),
    default: false
  },
  /**
  * @description native input autocomplete
  */
  autocomplete: {
    type: definePropType(String),
    default: "off"
  },
  /**
  * @description format content
  */
  formatter: { type: Function },
  /**
  * @description parse content
  */
  parser: { type: Function },
  /**
  * @description placeholder
  */
  placeholder: { type: String },
  /**
  * @description native input form
  */
  form: { type: String },
  /**
  * @description native input readonly
  */
  readonly: Boolean,
  /**
  * @description whether to show clear button
  */
  clearable: Boolean,
  /**
  * @description custom clear icon component
  */
  clearIcon: {
    type: iconPropType,
    default: circle_close_default
  },
  /**
  * @description toggleable password input
  */
  showPassword: Boolean,
  /**
  * @description word count
  */
  showWordLimit: Boolean,
  /**
  * @description word count position, valid when `show-word-limit` is true
  */
  wordLimitPosition: {
    type: String,
    values: ["inside", "outside"],
    default: "inside"
  },
  /**
  * @description suffix icon
  */
  suffixIcon: { type: iconPropType },
  /**
  * @description prefix icon
  */
  prefixIcon: { type: iconPropType },
  /**
  * @description container role, internal properties provided for use by the picker component
  */
  containerRole: {
    type: String,
    default: void 0
  },
  /**
  * @description input tabindex
  */
  tabindex: {
    type: [String, Number],
    default: 0
  },
  /**
  * @description whether to trigger form validation
  */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /**
  * @description input or textarea element style
  */
  inputStyle: {
    type: definePropType([
      Object,
      Array,
      String,
      Boolean
    ]),
    default: () => mutable({})
  },
  /**
  * @description Count graphemes of input value. If it's set, native maxlength and minlength won't be used.
  */
  countGraphemes: { type: definePropType(Function) },
  /**
  * @description native input autofocus
  */
  autofocus: Boolean,
  rows: {
    type: Number,
    default: 2
  },
  ...useAriaProps(["ariaLabel"]),
  /**
  * @description native input mode for virtual keyboards
  */
  inputmode: {
    type: definePropType(String),
    default: void 0
  },
  /**
  * @description same as `name` in native input
  */
  name: String
});
const inputEmits = {
  [UPDATE_MODEL_EVENT]: (value) => isString(value),
  input: (value) => isString(value),
  change: (value, evt) => isString(value) && (evt instanceof Event || evt === void 0),
  focus: (evt) => evt instanceof FocusEvent,
  blur: (evt) => evt instanceof FocusEvent,
  clear: (evt) => evt === void 0 || evt instanceof MouseEvent,
  mouseleave: (evt) => evt instanceof MouseEvent,
  mouseenter: (evt) => evt instanceof MouseEvent,
  keydown: (evt) => evt instanceof Event,
  compositionstart: (evt) => evt instanceof CompositionEvent,
  compositionupdate: (evt) => evt instanceof CompositionEvent,
  compositionend: (evt) => evt instanceof CompositionEvent
};
({
  clearIcon: markRaw(circle_close_default)
});
const rAF = (fn) => isClient ? (void 0).requestAnimationFrame(fn) : setTimeout(fn, 16);
const cAF = (handle) => isClient ? (void 0).cancelAnimationFrame(handle) : clearTimeout(handle);
const DEFAULT_EXCLUDE_KEYS = ["class", "style"];
const LISTENER_PREFIX = /^on[A-Z]/;
const useAttrs = (params = {}) => {
  const { excludeListeners = false, excludeKeys } = params;
  const allExcludeKeys = computed(() => {
    return (excludeKeys?.value || []).concat(DEFAULT_EXCLUDE_KEYS);
  });
  const instance = getCurrentInstance();
  if (!instance) {
    debugWarn("use-attrs", "getCurrentInstance() returned null. useAttrs() must be called at the top of a setup function");
    return computed(() => ({}));
  }
  return computed(() => fromPairs(Object.entries(instance.proxy?.$attrs).filter(([key]) => !allExcludeKeys.value.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key)))));
};
function useCursor(input) {
  let selectionInfo;
  function recordCursor() {
    if (input.value == void 0) return;
    const { selectionStart, selectionEnd, value } = input.value;
    if (selectionStart == null || selectionEnd == null) return;
    selectionInfo = {
      selectionStart,
      selectionEnd,
      value,
      beforeTxt: value.slice(0, Math.max(0, selectionStart)),
      afterTxt: value.slice(Math.max(0, selectionEnd))
    };
  }
  function setCursor() {
    if (input.value == void 0 || selectionInfo == void 0) return;
    const { value } = input.value;
    const { beforeTxt, afterTxt, selectionStart } = selectionInfo;
    if (beforeTxt == void 0 || afterTxt == void 0 || selectionStart == void 0) return;
    let startPos = value.length;
    if (value.endsWith(afterTxt)) startPos = value.length - afterTxt.length;
    else if (value.startsWith(beforeTxt)) startPos = beforeTxt.length;
    else {
      const beforeLastChar = beforeTxt[selectionStart - 1];
      const newIndex = value.indexOf(beforeLastChar, selectionStart - 1);
      if (newIndex !== -1) startPos = newIndex + 1;
    }
    input.value.setSelectionRange(startPos, startPos);
  }
  return [recordCursor, setCursor];
}
function useFocusController(target, { disabled, beforeFocus, afterFocus, beforeBlur, afterBlur } = {}) {
  const { emit } = getCurrentInstance();
  const wrapperRef = shallowRef();
  const isFocused = ref(false);
  const handleFocus = (event) => {
    const cancelFocus = isFunction(beforeFocus) ? beforeFocus(event) : false;
    if (unref(disabled) || isFocused.value || cancelFocus) return;
    isFocused.value = true;
    emit("focus", event);
    afterFocus?.();
  };
  const handleBlur = (event) => {
    const cancelBlur = isFunction(beforeBlur) ? beforeBlur(event) : false;
    if (unref(disabled) || event.relatedTarget && wrapperRef.value?.contains(event.relatedTarget) || cancelBlur) return;
    isFocused.value = false;
    emit("blur", event);
    afterBlur?.();
  };
  const handleClick = (event) => {
    if (unref(disabled) || isFocusable(event.target) || wrapperRef.value?.contains((void 0).activeElement) && wrapperRef.value !== (void 0).activeElement) return;
    target.value?.focus();
  };
  watch([wrapperRef, () => unref(disabled)], ([el, disabled2]) => {
    if (!el) return;
    if (disabled2) el.removeAttribute("tabindex");
    else el.setAttribute("tabindex", "-1");
  });
  useEventListener(wrapperRef, "focus", handleFocus, true);
  useEventListener(wrapperRef, "blur", handleBlur, true);
  useEventListener(wrapperRef, "click", handleClick, true);
  return {
    isFocused,
    /** Avoid using wrapperRef and handleFocus/handleBlur together */
    wrapperRef,
    handleFocus,
    handleBlur
  };
}
function useComposition({ afterComposition, emit }) {
  const isComposing = ref(false);
  const handleCompositionStart = (event) => {
    emit?.("compositionstart", event);
    isComposing.value = true;
  };
  const handleCompositionUpdate = (event) => {
    emit?.("compositionupdate", event);
    isComposing.value = true;
  };
  const handleCompositionEnd = (event) => {
    emit?.("compositionend", event);
    if (isComposing.value) {
      isComposing.value = false;
      nextTick(() => afterComposition(event));
    }
  };
  const handleComposition = (event) => {
    event.type === "compositionend" ? handleCompositionEnd(event) : handleCompositionUpdate(event);
  };
  return {
    isComposing,
    handleComposition,
    handleCompositionStart,
    handleCompositionUpdate,
    handleCompositionEnd
  };
}
let hiddenTextarea = void 0;
const HIDDEN_STYLE = {
  height: "0",
  visibility: "hidden",
  overflow: isFirefox() ? "" : "hidden",
  position: "absolute",
  "z-index": "-1000",
  top: "0",
  right: "0"
};
const CONTEXT_STYLE = [
  "letter-spacing",
  "line-height",
  "padding-top",
  "padding-bottom",
  "font-family",
  "font-weight",
  "font-size",
  "text-rendering",
  "text-transform",
  "width",
  "text-indent",
  "padding-left",
  "padding-right",
  "border-width",
  "box-sizing",
  "word-break"
];
const looseToNumber = (val) => {
  const n = Number.parseFloat(val);
  return Number.isNaN(n) ? val : n;
};
function calculateNodeStyling(targetElement) {
  const style = (void 0).getComputedStyle(targetElement);
  const boxSizing = style.getPropertyValue("box-sizing");
  const paddingSize = Number.parseFloat(style.getPropertyValue("padding-bottom")) + Number.parseFloat(style.getPropertyValue("padding-top"));
  const borderSize = Number.parseFloat(style.getPropertyValue("border-bottom-width")) + Number.parseFloat(style.getPropertyValue("border-top-width"));
  return {
    contextStyle: CONTEXT_STYLE.map((name) => [name, style.getPropertyValue(name)]),
    paddingSize,
    borderSize,
    boxSizing
  };
}
function calcTextareaHeight(targetElement, minRows = 1, maxRows) {
  if (!hiddenTextarea) {
    hiddenTextarea = (void 0).createElement("textarea");
    let hostNode = (void 0).body;
    if (!isFirefox() && targetElement.parentNode) hostNode = targetElement.parentNode;
    hostNode.appendChild(hiddenTextarea);
  }
  const { paddingSize, borderSize, boxSizing, contextStyle } = calculateNodeStyling(targetElement);
  contextStyle.forEach(([key, value]) => hiddenTextarea?.style.setProperty(key, value));
  Object.entries(HIDDEN_STYLE).forEach(([key, value]) => hiddenTextarea?.style.setProperty(key, value, "important"));
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || "";
  let height = hiddenTextarea.scrollHeight;
  const result = {};
  if (boxSizing === "border-box") height = height + borderSize;
  else if (boxSizing === "content-box") height = height - paddingSize;
  hiddenTextarea.value = "";
  const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
  if (isNumber(minRows)) {
    let minHeight = singleRowHeight * minRows;
    if (boxSizing === "border-box") minHeight = minHeight + paddingSize + borderSize;
    height = Math.max(minHeight, height);
    result.minHeight = `${minHeight}px`;
  }
  if (isNumber(maxRows)) {
    let maxHeight = singleRowHeight * maxRows;
    if (boxSizing === "border-box") maxHeight = maxHeight + paddingSize + borderSize;
    height = Math.min(maxHeight, height);
  }
  result.height = `${height}px`;
  hiddenTextarea.parentNode?.removeChild(hiddenTextarea);
  hiddenTextarea = void 0;
  return result;
}
const _hoisted_1$1 = [
  "id",
  "name",
  "minlength",
  "maxlength",
  "type",
  "disabled",
  "readonly",
  "autocomplete",
  "tabindex",
  "aria-label",
  "placeholder",
  "form",
  "autofocus",
  "role",
  "inputmode"
];
const _hoisted_2$1 = [
  "id",
  "name",
  "minlength",
  "maxlength",
  "tabindex",
  "disabled",
  "readonly",
  "autocomplete",
  "aria-label",
  "placeholder",
  "form",
  "autofocus",
  "rows",
  "role",
  "inputmode"
];
const COMPONENT_NAME = "ElInput";
var input_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: COMPONENT_NAME,
  inheritAttrs: false,
  __name: "input",
  props: inputProps,
  emits: inputEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const rawAttrs = useAttrs$1();
    const slots = useSlots();
    const containerKls = computed(() => [
      props.type === "textarea" ? nsTextarea.b() : nsInput.b(),
      nsInput.m(inputSize.value),
      nsInput.is("disabled", inputDisabled.value),
      nsInput.is("exceed", inputExceed.value),
      {
        [nsInput.b("group")]: slots.prepend || slots.append,
        [nsInput.m("prefix")]: slots.prefix || props.prefixIcon,
        [nsInput.m("suffix")]: slots.suffix || props.suffixIcon || props.clearable || props.showPassword,
        [nsInput.bm("suffix", "password-clear")]: showClear.value && showPwdVisible.value,
        [nsInput.b("hidden")]: props.type === "hidden"
      },
      rawAttrs.class
    ]);
    const wrapperKls = computed(() => [nsInput.e("wrapper"), nsInput.is("focus", isFocused.value)]);
    const attrs = useAttrs();
    const maxlength = computed(() => props.maxlength?.toString());
    const { form: elForm, formItem: elFormItem } = useFormItem();
    const { inputId } = useFormItemInputId(props, { formItemContext: elFormItem });
    const inputSize = useFormSize();
    const inputDisabled = useFormDisabled();
    const nsInput = useNamespace("input");
    const nsTextarea = useNamespace("textarea");
    const input = shallowRef();
    const textarea = shallowRef();
    const hovering = ref(false);
    const passwordVisible = ref(false);
    const countStyle = ref();
    const clearIconStyle = ref();
    const textareaCalcStyle = shallowRef(props.inputStyle);
    const saveValue = ref("");
    const textareaHeight = ref();
    const _ref = computed(() => input.value || textarea.value);
    const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(_ref, {
      disabled: inputDisabled,
      afterBlur() {
        if (props.validateEvent) elFormItem?.validate?.("blur").catch(NOOP);
      }
    });
    const needStatusIcon = computed(() => elForm?.statusIcon ?? false);
    const validateState = computed(() => elFormItem?.validateState || "");
    const validateIcon = computed(() => validateState.value && ValidateComponentsMap[validateState.value]);
    const passwordIcon = computed(() => passwordVisible.value ? view_default : hide_default);
    const containerStyle = computed(() => [rawAttrs.style]);
    const textareaStyle = computed(() => [
      props.inputStyle,
      textareaCalcStyle.value,
      { resize: props.resize },
      textareaHeight.value ? { height: textareaHeight.value } : void 0
    ]);
    const nativeInputValue = computed(() => isNil(props.modelValue) ? "" : String(props.modelValue));
    const renderClear = computed(() => props.clearable && !inputDisabled.value && !props.readonly);
    const showClear = computed(() => renderClear.value && !!nativeInputValue.value && (isFocused.value || hovering.value));
    const showPwdVisible = computed(() => props.showPassword && !inputDisabled.value && !!nativeInputValue.value);
    const isWordLimitVisible = computed(() => props.showWordLimit && !!maxlength.value && (props.type === "text" || props.type === "textarea") && !inputDisabled.value && !props.readonly && !props.showPassword);
    const textLength = computed(() => {
      if (props.countGraphemes && props.showWordLimit) return props.countGraphemes(nativeInputValue.value);
      return nativeInputValue.value.length;
    });
    const inputExceed = computed(() => !!isWordLimitVisible.value && textLength.value > Number(maxlength.value));
    const suffixVisible = computed(() => !!slots.suffix || !!props.suffixIcon || props.clearable || props.showPassword || isWordLimitVisible.value || !!validateState.value && needStatusIcon.value);
    const hasModelModifiers = computed(() => !!Object.keys(props.modelModifiers).length);
    const [recordCursor, setCursor] = useCursor(input);
    let rAFId;
    useResizeObserver(textarea, (entries) => {
      onceInitSizeTextarea();
      if (!isWordLimitVisible.value && !renderClear.value || props.resize !== "both" && props.resize !== "horizontal") return;
      const { width } = entries[0].target.getBoundingClientRect();
      const updateStyle = () => {
        rAFId = void 0;
        countStyle.value = {
          /** right: 100% - (width - right(10)) */
          right: `calc(100% - ${width - 10}px)`
        };
        clearIconStyle.value = {
          /** right: 100% - (width - right(11)) */
          right: `calc(100% - ${width - 11}px)`
        };
      };
      rAFId && cAF(rAFId);
      rAFId = rAF(updateStyle);
    });
    const resizeTextarea = () => {
      const { type, autosize } = props;
      if (!isClient || type !== "textarea" || !textarea.value) return;
      if (autosize) {
        const minRows = isObject(autosize) ? autosize.minRows : void 0;
        const maxRows = isObject(autosize) ? autosize.maxRows : void 0;
        const textareaStyle2 = calcTextareaHeight(textarea.value, minRows, maxRows);
        textareaCalcStyle.value = {
          overflowY: "hidden",
          ...textareaStyle2
        };
        nextTick(() => {
          textarea.value.offsetHeight;
          textareaCalcStyle.value = textareaStyle2;
        });
      } else textareaCalcStyle.value = { minHeight: calcTextareaHeight(textarea.value).minHeight };
    };
    const createOnceInitResize = (resizeTextarea2) => {
      let isInit = false;
      return () => {
        if (isInit || !props.autosize) {
          if (props.resize !== "none") setTimeout(() => {
            textareaHeight.value = textarea.value?.style.height;
          });
          return;
        }
        if (!(textarea.value?.offsetParent === null)) {
          setTimeout(resizeTextarea2);
          isInit = true;
        }
      };
    };
    const onceInitSizeTextarea = createOnceInitResize(resizeTextarea);
    const setNativeInputValue = () => {
      const input2 = _ref.value;
      const formatterValue = props.formatter ? props.formatter(nativeInputValue.value) : nativeInputValue.value;
      if (!input2 || input2.value === formatterValue || props.type === "file") return;
      input2.value = formatterValue;
    };
    const formatValue = (value) => {
      const { trim, number } = props.modelModifiers;
      if (trim) value = value.trim();
      if (number) value = `${looseToNumber(value)}`;
      if (props.formatter && props.parser) value = props.parser(value);
      return value;
    };
    const handleInput = async (event) => {
      if (isComposing.value) return;
      const { lazy } = props.modelModifiers;
      let { value } = event.target;
      let shouldForceNativeUpdate = false;
      if (lazy) {
        emit(INPUT_EVENT, value);
        return;
      }
      value = formatValue(value);
      if (props.countGraphemes && maxlength.value != null) {
        const limit = Number(maxlength.value);
        const graphemes = props.countGraphemes(value);
        const saveGraphemes = props.countGraphemes(saveValue.value);
        if (graphemes > limit && graphemes > saveGraphemes) if (saveGraphemes > limit) {
          value = saveValue.value;
          shouldForceNativeUpdate = true;
        } else {
          const prevValue = saveValue.value;
          const nextValue = value;
          let prefixLen = 0;
          while (prefixLen < prevValue.length && prefixLen < nextValue.length && prevValue[prefixLen] === nextValue[prefixLen]) prefixLen++;
          let prevSuffixIndex = prevValue.length;
          let nextSuffixIndex = nextValue.length;
          while (prevSuffixIndex > prefixLen && nextSuffixIndex > prefixLen && prevValue[prevSuffixIndex - 1] === nextValue[nextSuffixIndex - 1]) {
            prevSuffixIndex--;
            nextSuffixIndex--;
          }
          const before = nextValue.slice(0, prefixLen);
          const removed = prevValue.slice(prefixLen, prevSuffixIndex);
          const inserted = nextValue.slice(prefixLen, nextSuffixIndex);
          const after = nextValue.slice(nextSuffixIndex);
          const baseCount = saveGraphemes - props.countGraphemes(removed);
          const availableInserted = Math.max(0, limit - baseCount);
          let acceptedInserted = "";
          if (availableInserted > 0) if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
            const segmenter = new Intl.Segmenter(void 0, { granularity: "grapheme" });
            for (const { segment } of segmenter.segment(inserted)) {
              const candidate = acceptedInserted + segment;
              if (props.countGraphemes(candidate) > availableInserted) break;
              acceptedInserted = candidate;
            }
          } else for (const char of Array.from(inserted)) {
            const candidate = acceptedInserted + char;
            if (props.countGraphemes(candidate) > availableInserted) break;
            acceptedInserted = candidate;
          }
          value = before + acceptedInserted + after;
          shouldForceNativeUpdate = true;
        }
      }
      if (String(value) === nativeInputValue.value) {
        if (props.formatter || shouldForceNativeUpdate) {
          const target = event.target;
          const blockedValue = target.value;
          const selectionStart = target.selectionStart;
          const selectionEnd = target.selectionEnd;
          setNativeInputValue();
          if (shouldForceNativeUpdate && _ref.value && selectionStart != null && selectionEnd != null) {
            const restoredValue = _ref.value.value;
            const afterTxt = blockedValue.slice(Math.max(0, selectionEnd));
            let caretPos = Math.min(selectionStart, restoredValue.length);
            if (afterTxt && restoredValue.endsWith(afterTxt)) caretPos = restoredValue.length - afterTxt.length;
            _ref.value.setSelectionRange(caretPos, caretPos);
          }
        }
        return;
      }
      saveValue.value = value;
      recordCursor();
      emit(UPDATE_MODEL_EVENT, value);
      emit(INPUT_EVENT, value);
      await nextTick();
      if (props.formatter && props.parser || !hasModelModifiers.value) setNativeInputValue();
      setCursor();
    };
    const handleChange = async (event) => {
      let { value } = event.target;
      value = formatValue(value);
      if (props.modelModifiers.lazy) emit(UPDATE_MODEL_EVENT, value);
      emit(CHANGE_EVENT, value, event);
      await nextTick();
      setNativeInputValue();
    };
    const { isComposing, handleCompositionStart, handleCompositionUpdate, handleCompositionEnd } = useComposition({
      emit,
      afterComposition: handleInput
    });
    const handlePasswordVisible = () => {
      passwordVisible.value = !passwordVisible.value;
    };
    const focus = () => _ref.value?.focus();
    const blur = () => _ref.value?.blur();
    const handleMouseLeave = (evt) => {
      hovering.value = false;
      emit("mouseleave", evt);
    };
    const handleMouseEnter = (evt) => {
      hovering.value = true;
      emit("mouseenter", evt);
    };
    const handleKeydown = (evt) => {
      emit("keydown", evt);
    };
    const select = () => {
      _ref.value?.select();
    };
    const clear = (evt) => {
      emit(UPDATE_MODEL_EVENT, "");
      emit(CHANGE_EVENT, "");
      emit("clear", evt);
      emit(INPUT_EVENT, "");
    };
    watch(() => props.modelValue, () => {
      nextTick(() => {
        resizeTextarea();
        if (props.autosize) textareaHeight.value = void 0;
      });
      if (props.validateEvent) elFormItem?.validate?.("change").catch(NOOP);
    });
    watch(() => nativeInputValue.value, (val) => {
      saveValue.value = val;
    }, { immediate: true });
    watch(nativeInputValue, (newValue) => {
      if (!_ref.value) return;
      const { trim, number } = props.modelModifiers;
      const elValue = _ref.value.value;
      const displayValue = (number || props.type === "number") && !/^0\d/.test(elValue) ? `${looseToNumber(elValue)}` : elValue;
      if (displayValue === newValue) return;
      if ((void 0).activeElement === _ref.value && _ref.value.type !== "range") {
        if (trim && displayValue.trim() === newValue) return;
      }
      setNativeInputValue();
    });
    watch(() => props.type, async () => {
      await nextTick();
      setNativeInputValue();
      resizeTextarea();
    });
    __expose({
      /** @description HTML input element */
      input,
      /** @description HTML textarea element */
      textarea,
      /** @description HTML element, input or textarea */
      ref: _ref,
      /** @description style of textarea. */
      textareaStyle,
      /** @description from props (used on unit test) */
      autosize: toRef(props, "autosize"),
      /** @description is input composing */
      isComposing,
      /** @description whether the password is visible */
      passwordVisible,
      /** @description HTML input element native method */
      focus,
      /** @description HTML input element native method */
      blur,
      /** @description HTML input element native method */
      select,
      /** @description clear input value */
      clear,
      /** @description resize textarea. */
      resizeTextarea
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([containerKls.value, {
          [unref(nsInput).bm("group", "append")]: _ctx.$slots.append,
          [unref(nsInput).bm("group", "prepend")]: _ctx.$slots.prepend
        }]),
        style: normalizeStyle(containerStyle.value),
        onMouseenter: handleMouseEnter,
        onMouseleave: handleMouseLeave
      }, [createCommentVNode(" input "), __props.type !== "textarea" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        createCommentVNode(" prepend slot "),
        _ctx.$slots.prepend ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(nsInput).be("group", "prepend"))
        }, [renderSlot(_ctx.$slots, "prepend")], 2)) : createCommentVNode("v-if", true),
        createElementVNode("div", {
          ref_key: "wrapperRef",
          ref: wrapperRef,
          class: normalizeClass(wrapperKls.value)
        }, [
          createCommentVNode(" prefix slot "),
          _ctx.$slots.prefix || __props.prefixIcon ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: normalizeClass(unref(nsInput).e("prefix"))
          }, [createElementVNode("span", { class: normalizeClass(unref(nsInput).e("prefix-inner")) }, [renderSlot(_ctx.$slots, "prefix"), __props.prefixIcon ? (openBlock(), createBlock(unref(ElIcon), {
            key: 0,
            class: normalizeClass(unref(nsInput).e("icon"))
          }, {
            default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.prefixIcon)))]),
            _: 1
          }, 8, ["class"])) : createCommentVNode("v-if", true)], 2)], 2)) : createCommentVNode("v-if", true),
          createElementVNode("input", mergeProps({
            id: unref(inputId),
            ref_key: "input",
            ref: input,
            class: unref(nsInput).e("inner")
          }, unref(attrs), {
            name: __props.name,
            minlength: __props.countGraphemes ? void 0 : __props.minlength,
            maxlength: __props.countGraphemes ? void 0 : maxlength.value,
            type: __props.showPassword ? passwordVisible.value ? "text" : "password" : __props.type,
            disabled: unref(inputDisabled),
            readonly: __props.readonly,
            autocomplete: __props.autocomplete,
            tabindex: __props.tabindex,
            "aria-label": __props.ariaLabel,
            placeholder: __props.placeholder,
            style: __props.inputStyle,
            form: __props.form,
            autofocus: __props.autofocus,
            role: __props.containerRole,
            inputmode: __props.inputmode,
            onCompositionstart: _cache[0] || (_cache[0] = (...args) => unref(handleCompositionStart) && unref(handleCompositionStart)(...args)),
            onCompositionupdate: _cache[1] || (_cache[1] = (...args) => unref(handleCompositionUpdate) && unref(handleCompositionUpdate)(...args)),
            onCompositionend: _cache[2] || (_cache[2] = (...args) => unref(handleCompositionEnd) && unref(handleCompositionEnd)(...args)),
            onInput: handleInput,
            onChange: handleChange,
            onKeydown: handleKeydown
          }), null, 16, _hoisted_1$1),
          createCommentVNode(" suffix slot "),
          suffixVisible.value ? (openBlock(), createElementBlock("span", {
            key: 1,
            class: normalizeClass(unref(nsInput).e("suffix"))
          }, [createElementVNode("span", { class: normalizeClass(unref(nsInput).e("suffix-inner")) }, [
            renderClear.value ? (openBlock(), createBlock(unref(ElIcon), {
              key: 0,
              class: normalizeClass([unref(nsInput).e("icon"), unref(nsInput).e("clear")]),
              style: normalizeStyle({ visibility: showClear.value ? "visible" : "hidden" }),
              onMousedown: withModifiers(unref(NOOP), ["prevent"]),
              onClick: clear
            }, {
              default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.clearIcon)))]),
              _: 1
            }, 8, [
              "class",
              "style",
              "onMousedown"
            ])) : createCommentVNode("v-if", true),
            !showClear.value || !showPwdVisible.value || !isWordLimitVisible.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [renderSlot(_ctx.$slots, "suffix"), __props.suffixIcon ? (openBlock(), createBlock(unref(ElIcon), {
              key: 0,
              class: normalizeClass(unref(nsInput).e("icon"))
            }, {
              default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.suffixIcon)))]),
              _: 1
            }, 8, ["class"])) : createCommentVNode("v-if", true)], 64)) : createCommentVNode("v-if", true),
            showPwdVisible.value ? (openBlock(), createBlock(unref(ElIcon), {
              key: 2,
              class: normalizeClass([unref(nsInput).e("icon"), unref(nsInput).e("password")]),
              onClick: handlePasswordVisible,
              onMousedown: withModifiers(unref(NOOP), ["prevent"]),
              onMouseup: withModifiers(unref(NOOP), ["prevent"])
            }, {
              default: withCtx(() => [renderSlot(_ctx.$slots, "password-icon", { visible: passwordVisible.value }, () => [(openBlock(), createBlock(resolveDynamicComponent(passwordIcon.value)))])]),
              _: 3
            }, 8, [
              "class",
              "onMousedown",
              "onMouseup"
            ])) : createCommentVNode("v-if", true),
            isWordLimitVisible.value ? (openBlock(), createElementBlock("span", {
              key: 3,
              class: normalizeClass([unref(nsInput).e("count"), unref(nsInput).is("outside", __props.wordLimitPosition === "outside")])
            }, [createElementVNode("span", { class: normalizeClass(unref(nsInput).e("count-inner")) }, toDisplayString(textLength.value) + " / " + toDisplayString(maxlength.value), 3)], 2)) : createCommentVNode("v-if", true),
            validateState.value && validateIcon.value && needStatusIcon.value ? (openBlock(), createBlock(unref(ElIcon), {
              key: 4,
              class: normalizeClass([
                unref(nsInput).e("icon"),
                unref(nsInput).e("validateIcon"),
                unref(nsInput).is("loading", validateState.value === "validating")
              ])
            }, {
              default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(validateIcon.value)))]),
              _: 1
            }, 8, ["class"])) : createCommentVNode("v-if", true)
          ], 2)], 2)) : createCommentVNode("v-if", true)
        ], 2),
        createCommentVNode(" append slot "),
        _ctx.$slots.append ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(unref(nsInput).be("group", "append"))
        }, [renderSlot(_ctx.$slots, "append")], 2)) : createCommentVNode("v-if", true)
      ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        createCommentVNode(" textarea "),
        createElementVNode("textarea", mergeProps({
          id: unref(inputId),
          ref_key: "textarea",
          ref: textarea,
          class: [
            unref(nsTextarea).e("inner"),
            unref(nsInput).is("focus", unref(isFocused)),
            unref(nsTextarea).is("clearable", __props.clearable)
          ]
        }, unref(attrs), {
          name: __props.name,
          minlength: __props.countGraphemes ? void 0 : __props.minlength,
          maxlength: __props.countGraphemes ? void 0 : maxlength.value,
          tabindex: __props.tabindex,
          disabled: unref(inputDisabled),
          readonly: __props.readonly,
          autocomplete: __props.autocomplete,
          style: textareaStyle.value,
          "aria-label": __props.ariaLabel,
          placeholder: __props.placeholder,
          form: __props.form,
          autofocus: __props.autofocus,
          rows: __props.rows,
          role: __props.containerRole,
          inputmode: __props.inputmode,
          onCompositionstart: _cache[3] || (_cache[3] = (...args) => unref(handleCompositionStart) && unref(handleCompositionStart)(...args)),
          onCompositionupdate: _cache[4] || (_cache[4] = (...args) => unref(handleCompositionUpdate) && unref(handleCompositionUpdate)(...args)),
          onCompositionend: _cache[5] || (_cache[5] = (...args) => unref(handleCompositionEnd) && unref(handleCompositionEnd)(...args)),
          onInput: handleInput,
          onFocus: _cache[6] || (_cache[6] = (...args) => unref(handleFocus) && unref(handleFocus)(...args)),
          onBlur: _cache[7] || (_cache[7] = (...args) => unref(handleBlur) && unref(handleBlur)(...args)),
          onChange: handleChange,
          onKeydown: handleKeydown
        }), null, 16, _hoisted_2$1),
        showClear.value ? (openBlock(), createBlock(unref(ElIcon), {
          key: 0,
          class: normalizeClass([unref(nsTextarea).e("icon"), unref(nsTextarea).e("clear")]),
          style: normalizeStyle(clearIconStyle.value),
          onMousedown: withModifiers(unref(NOOP), ["prevent"]),
          onClick: clear
        }, {
          default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.clearIcon)))]),
          _: 1
        }, 8, [
          "class",
          "style",
          "onMousedown"
        ])) : createCommentVNode("v-if", true),
        isWordLimitVisible.value ? (openBlock(), createElementBlock("span", {
          key: 1,
          style: normalizeStyle(countStyle.value),
          class: normalizeClass([unref(nsInput).e("count"), unref(nsInput).is("outside", __props.wordLimitPosition === "outside")])
        }, toDisplayString(textLength.value) + " / " + toDisplayString(maxlength.value), 7)) : createCommentVNode("v-if", true)
      ], 64))], 38);
    };
  }
});
var input_default = input_vue_vue_type_script_setup_true_lang_default;
const ElInput = withInstall(input_default);
const EVENT_CODE = {
  tab: "Tab",
  enter: "Enter",
  space: "Space",
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
  esc: "Escape",
  delete: "Delete",
  backspace: "Backspace",
  numpadEnter: "NumpadEnter",
  pageUp: "PageUp",
  pageDown: "PageDown",
  home: "Home",
  end: "End"
};
const composeEventHandlers = (theirsHandler, oursHandler, { checkForDefaultPrevented = true } = {}) => {
  const handleEvent = (event) => {
    const shouldPrevent = theirsHandler?.(event);
    if (checkForDefaultPrevented === false || !shouldPrevent) return oursHandler?.(event);
  };
  return handleEvent;
};
const whenMouse = (handler) => {
  return (e) => e.pointerType === "mouse" ? handler(e) : void 0;
};
const getEventCode = (event) => {
  if (event.code && event.code !== "Unidentified") return event.code;
  const key = getEventKey(event);
  if (key) {
    if (Object.values(EVENT_CODE).includes(key)) return key;
    switch (key) {
      case " ":
        return EVENT_CODE.space;
      default:
        return "";
    }
  }
  return "";
};
const getEventKey = (event) => {
  let key = event.key && event.key !== "Unidentified" ? event.key : "";
  if (!key && event.type === "keyup" && isAndroid()) {
    const target = event.target;
    key = target.value.charAt(target.selectionStart - 1);
  }
  return key;
};
const badgeProps = buildProps({
  /**
  * @description display value.
  */
  value: {
    type: [String, Number],
    default: ""
  },
  /**
  * @description maximum value, shows `{max}+` when exceeded. Only works if value is a number.
  */
  max: {
    type: Number,
    default: 99
  },
  /**
  * @description if a little dot is displayed.
  */
  isDot: Boolean,
  /**
  * @description hidden badge.
  */
  hidden: Boolean,
  /**
  * @description badge type.
  */
  type: {
    type: String,
    values: [
      "primary",
      "success",
      "warning",
      "info",
      "danger"
    ],
    default: "danger"
  },
  /**
  * @description whether to show badge when value is zero.
  */
  showZero: {
    type: Boolean,
    default: true
  },
  /**
  * @description customize dot background color
  */
  color: String,
  /**
  * @description CSS style of badge
  */
  badgeStyle: {
    type: definePropType([
      String,
      Object,
      Array,
      Boolean
    ]),
    default: void 0
  },
  /**
  * @description set offset of the badge
  */
  offset: {
    type: definePropType(Array),
    default: () => [0, 0]
  },
  /**
  * @description custom class name of badge
  */
  badgeClass: { type: String }
});
var badge_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElBadge",
  __name: "badge",
  props: badgeProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const ns = useNamespace("badge");
    const content = computed(() => {
      if (props.isDot) return "";
      if (isNumber(props.value) && isNumber(props.max)) return props.max < props.value ? `${props.max}+` : `${props.value}`;
      return `${props.value}`;
    });
    const style = computed(() => {
      return [{
        backgroundColor: props.color,
        marginRight: addUnit(-props.offset[0]),
        marginTop: addUnit(props.offset[1])
      }, props.badgeStyle ?? {}];
    });
    __expose({
      /** @description badge content */
      content
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", { class: normalizeClass(unref(ns).b()) }, [renderSlot(_ctx.$slots, "default"), createVNode(Transition, { name: `${unref(ns).namespace.value}-zoom-in-center` }, {
        default: withCtx(() => [!__props.hidden && (content.value || __props.isDot || _ctx.$slots.content) ? (openBlock(), createElementBlock("sup", {
          key: 0,
          class: normalizeClass([
            unref(ns).e("content"),
            unref(ns).em("content", __props.type),
            unref(ns).is("fixed", !!_ctx.$slots.default),
            unref(ns).is("dot", __props.isDot),
            unref(ns).is("hide-zero", !__props.showZero && __props.value === 0),
            __props.badgeClass
          ]),
          style: normalizeStyle(style.value)
        }, [renderSlot(_ctx.$slots, "content", { value: content.value }, () => [createTextVNode(toDisplayString(content.value), 1)])], 6)) : createCommentVNode("v-if", true)]),
        _: 3
      }, 8, ["name"])], 2);
    };
  }
});
var badge_default = badge_vue_vue_type_script_setup_true_lang_default;
const ElBadge = withInstall(badge_default);
const configProviderProps = buildProps({
  /**
  * @description Controlling if the users want a11y features
  */
  a11y: {
    type: Boolean,
    default: true
  },
  /**
  * @description Locale Object
  */
  locale: { type: definePropType(Object) },
  /**
  * @description global component size
  */
  size: useSizeProp,
  /**
  * @description button related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#button-attribute)
  */
  button: { type: definePropType(Object) },
  /**
  * @description card related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#card-attribute)
  */
  card: { type: definePropType(Object) },
  /**
  * @description dialog related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#dialog-attribute)
  */
  dialog: { type: definePropType(Object) },
  /**
  * @description link related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#link-attribute)
  */
  link: { type: definePropType(Object) },
  /**
  * @description features at experimental stage to be added, all features are default to be set to false, [see the following table](https://element-plus.org/en-US/component/config-provider.html#experimental-features)                                                                            | ^[object]
  */
  experimentalFeatures: { type: definePropType(Object) },
  /**
  * @description Controls if we should handle keyboard navigation
  */
  keyboardNavigation: {
    type: Boolean,
    default: true
  },
  /**
  * @description message related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#message-attribute)
  */
  message: { type: definePropType(Object) },
  /**
  * @description global Initial zIndex
  */
  zIndex: Number,
  /**
  * @description global component className prefix (cooperated with [$namespace](https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/mixins/config.scss#L1)) | ^[string]
  */
  namespace: {
    type: String,
    default: "el"
  },
  /**
  * @description table related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#table-attribute)
  */
  table: { type: definePropType(Object) },
  ...useEmptyValuesProps
});
const messageConfig = { placement: "top" };
defineComponent({
  name: "ElConfigProvider",
  props: configProviderProps,
  setup(props, { slots }) {
    const config = provideGlobalConfig(props);
    watch(() => props.message, (val) => {
      Object.assign(messageConfig, config?.value?.message ?? {}, val ?? {});
    }, {
      immediate: true,
      deep: true
    });
    return () => renderSlot(slots, "default", { config: config?.value });
  }
});
const messageTypes = [
  "primary",
  "success",
  "info",
  "warning",
  "error"
];
const messagePlacement = [
  "top",
  "top-left",
  "top-right",
  "bottom",
  "bottom-left",
  "bottom-right"
];
const messageDefaults = mutable({
  customClass: "",
  dangerouslyUseHTMLString: false,
  duration: 3e3,
  icon: void 0,
  id: "",
  message: "",
  onClose: void 0,
  showClose: false,
  type: "info",
  plain: false,
  offset: 16,
  placement: void 0,
  zIndex: 0,
  grouping: false,
  repeatNum: 1,
  appendTo: isClient ? (void 0).body : void 0
});
const messageProps = buildProps({
  /**
  * @description custom class name for Message
  */
  customClass: {
    type: String,
    default: messageDefaults.customClass
  },
  /**
  * @description whether `message` is treated as HTML string
  */
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: messageDefaults.dangerouslyUseHTMLString
  },
  /**
  * @description display duration, millisecond. If set to 0, it will not turn off automatically
  */
  duration: {
    type: Number,
    default: messageDefaults.duration
  },
  /**
  * @description custom icon component, overrides `type`
  */
  icon: {
    type: iconPropType,
    default: messageDefaults.icon
  },
  /**
  * @description message dom id
  */
  id: {
    type: String,
    default: messageDefaults.id
  },
  /**
  * @description message text
  */
  message: {
    type: definePropType([
      String,
      Object,
      Function
    ]),
    default: messageDefaults.message
  },
  /**
  * @description callback function when closed with the message instance as the parameter
  */
  onClose: {
    type: definePropType(Function),
    default: messageDefaults.onClose
  },
  /**
  * @description whether to show a close button
  */
  showClose: {
    type: Boolean,
    default: messageDefaults.showClose
  },
  /**
  * @description message type
  */
  type: {
    type: String,
    values: messageTypes,
    default: messageDefaults.type
  },
  /**
  * @description whether message is plain
  */
  plain: {
    type: Boolean,
    default: messageDefaults.plain
  },
  /**
  * @description set the distance to the top of viewport
  */
  offset: {
    type: Number,
    default: messageDefaults.offset
  },
  /**
  * @description message placement position
  */
  placement: {
    type: String,
    values: messagePlacement,
    default: messageDefaults.placement
  },
  /**
  * @description message element zIndex value
  */
  zIndex: {
    type: Number,
    default: messageDefaults.zIndex
  },
  /**
  * @description merge messages with the same content, type of VNode message is not supported
  */
  grouping: {
    type: Boolean,
    default: messageDefaults.grouping
  },
  /**
  * @description The number of repetitions, similar to badge, is used as the initial number when used with `grouping`
  */
  repeatNum: {
    type: Number,
    default: messageDefaults.repeatNum
  }
});
const messageEmits = { destroy: () => true };
const placementInstances = shallowReactive({});
const getOrCreatePlacementInstances = (placement) => {
  if (!placementInstances[placement]) placementInstances[placement] = shallowReactive([]);
  return placementInstances[placement];
};
const getInstance = (id, placement) => {
  const instances = placementInstances[placement] || [];
  const idx = instances.findIndex((instance) => instance.id === id);
  const current = instances[idx];
  let prev;
  if (idx > 0) prev = instances[idx - 1];
  return {
    current,
    prev
  };
};
const getLastOffset = (id, placement) => {
  const { prev } = getInstance(id, placement);
  if (!prev) return 0;
  return prev.vm.exposed.bottom.value;
};
const getOffsetOrSpace = (id, offset, placement) => {
  return (placementInstances[placement] || []).findIndex((instance) => instance.id === id) > 0 ? 16 : offset;
};
const _hoisted_1 = ["id"];
const _hoisted_2 = ["innerHTML"];
var message_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElMessage",
  __name: "message",
  props: messageProps,
  emits: messageEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const { Close } = TypeComponents;
    const props = __props;
    const emit = __emit;
    const isStartTransition = ref(false);
    const { ns, zIndex } = useGlobalComponentSettings("message");
    const { currentZIndex, nextZIndex } = zIndex;
    const messageRef = ref();
    const visible = ref(false);
    const height = ref(0);
    let stopTimer = void 0;
    const badgeType = computed(() => props.type ? props.type === "error" ? "danger" : props.type : "info");
    const typeClass = computed(() => {
      const type = props.type;
      return { [ns.bm("icon", type)]: type && TypeComponentsMap[type] };
    });
    const iconComponent = computed(() => props.icon || TypeComponentsMap[props.type] || "");
    const placement = computed(() => props.placement || "top");
    const lastOffset = computed(() => getLastOffset(props.id, placement.value));
    const offset = computed(() => {
      return Math.max(getOffsetOrSpace(props.id, props.offset, placement.value) + lastOffset.value, props.offset);
    });
    const bottom = computed(() => height.value + offset.value);
    const horizontalClass = computed(() => {
      if (placement.value.includes("left")) return ns.is("left");
      if (placement.value.includes("right")) return ns.is("right");
      return ns.is("center");
    });
    const verticalProperty = computed(() => placement.value.startsWith("top") ? "top" : "bottom");
    const customStyle = computed(() => ({
      [verticalProperty.value]: `${offset.value}px`,
      zIndex: currentZIndex.value
    }));
    function startTimer() {
      if (props.duration === 0) return;
      ({ stop: stopTimer } = useTimeoutFn(() => {
        close();
      }, props.duration));
    }
    function clearTimer() {
      stopTimer?.();
    }
    function close() {
      visible.value = false;
      nextTick(() => {
        if (!isStartTransition.value) {
          props.onClose?.();
          emit("destroy");
        }
      });
    }
    function keydown(event) {
      if (getEventCode(event) === EVENT_CODE.esc) close();
    }
    watch(() => props.repeatNum, () => {
      clearTimer();
      startTimer();
    });
    useEventListener(void 0, "keydown", keydown);
    useResizeObserver(messageRef, () => {
      height.value = messageRef.value.getBoundingClientRect().height;
    });
    __expose({
      visible,
      bottom,
      close
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: unref(ns).b("fade"),
        onBeforeEnter: _cache[0] || (_cache[0] = ($event) => isStartTransition.value = true),
        onBeforeLeave: __props.onClose,
        onAfterLeave: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("destroy")),
        persisted: ""
      }, {
        default: withCtx(() => [withDirectives(createElementVNode("div", {
          id: __props.id,
          ref_key: "messageRef",
          ref: messageRef,
          class: normalizeClass([
            unref(ns).b(),
            { [unref(ns).m(__props.type)]: __props.type },
            unref(ns).is("closable", __props.showClose),
            unref(ns).is("plain", __props.plain),
            unref(ns).is("bottom", verticalProperty.value === "bottom"),
            horizontalClass.value,
            __props.customClass
          ]),
          style: normalizeStyle(customStyle.value),
          role: "alert",
          onMouseenter: clearTimer,
          onMouseleave: startTimer
        }, [
          __props.repeatNum > 1 ? (openBlock(), createBlock(unref(ElBadge), {
            key: 0,
            value: __props.repeatNum,
            type: badgeType.value,
            class: normalizeClass(unref(ns).e("badge"))
          }, null, 8, [
            "value",
            "type",
            "class"
          ])) : createCommentVNode("v-if", true),
          iconComponent.value ? (openBlock(), createBlock(unref(ElIcon), {
            key: 1,
            class: normalizeClass([unref(ns).e("icon"), typeClass.value])
          }, {
            default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(iconComponent.value)))]),
            _: 1
          }, 8, ["class"])) : createCommentVNode("v-if", true),
          !__props.dangerouslyUseHTMLString || _ctx.$slots.default ? (openBlock(), createElementBlock("p", {
            key: 2,
            class: normalizeClass(unref(ns).e("content"))
          }, [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(toDisplayString(__props.message), 1)])], 2)) : (openBlock(), createElementBlock(Fragment, { key: 3 }, [createCommentVNode(" Caution here, message could've been compromised, never use user's input as message "), createElementVNode("p", {
            class: normalizeClass(unref(ns).e("content")),
            innerHTML: __props.message
          }, null, 10, _hoisted_2)], 2112)),
          __props.showClose ? (openBlock(), createBlock(unref(ElIcon), {
            key: 4,
            class: normalizeClass(unref(ns).e("closeBtn")),
            onClick: withModifiers(close, ["stop"])
          }, {
            default: withCtx(() => [createVNode(unref(Close))]),
            _: 1
          }, 8, ["class"])) : createCommentVNode("v-if", true)
        ], 46, _hoisted_1), [[vShow, visible.value]])]),
        _: 3
      }, 8, ["name", "onBeforeLeave"]);
    };
  }
});
var message_default = message_vue_vue_type_script_setup_true_lang_default;
let seed = 1;
const normalizeAppendTo = (normalized) => {
  if (!normalized.appendTo) normalized.appendTo = (void 0).body;
  else if (isString(normalized.appendTo)) {
    let appendTo = (void 0).querySelector(normalized.appendTo);
    if (!isElement(appendTo)) {
      debugWarn("ElMessage", "the appendTo option is not an HTMLElement. Falling back to document.body.");
      appendTo = (void 0).body;
    }
    normalized.appendTo = appendTo;
  }
};
const normalizePlacement = (normalized) => {
  if (!normalized.placement && isString(messageConfig.placement) && messageConfig.placement) normalized.placement = messageConfig.placement;
  if (!normalized.placement) normalized.placement = "top";
  if (!messagePlacement.includes(normalized.placement)) {
    debugWarn("ElMessage", `Invalid placement: ${normalized.placement}. Falling back to 'top'.`);
    normalized.placement = "top";
  }
};
const normalizeOptions = (params) => {
  const options = !params || isString(params) || isVNode(params) || isFunction(params) ? { message: params } : params;
  const normalized = {
    ...messageDefaults,
    ...options
  };
  normalizeAppendTo(normalized);
  normalizePlacement(normalized);
  if (isBoolean(messageConfig.grouping) && !normalized.grouping) normalized.grouping = messageConfig.grouping;
  if (isNumber(messageConfig.duration) && normalized.duration === 3e3) normalized.duration = messageConfig.duration;
  if (isNumber(messageConfig.offset) && normalized.offset === 16) normalized.offset = messageConfig.offset;
  if (isBoolean(messageConfig.showClose) && !normalized.showClose) normalized.showClose = messageConfig.showClose;
  if (isBoolean(messageConfig.plain) && !normalized.plain) normalized.plain = messageConfig.plain;
  return normalized;
};
const closeMessage = (instance) => {
  const instances = placementInstances[instance.props.placement || "top"];
  const idx = instances.indexOf(instance);
  if (idx === -1) return;
  instances.splice(idx, 1);
  const { handler } = instance;
  handler.close();
};
const createMessage = ({ appendTo, ...options }, context) => {
  const id = `message_${seed++}`;
  const userOnClose = options.onClose;
  const container = (void 0).createElement("div");
  const props = {
    ...options,
    id,
    onClose: () => {
      userOnClose?.();
      closeMessage(instance);
    },
    onDestroy: () => {
      render(null, container);
    }
  };
  const vnode = createVNode(message_default, props, isFunction(props.message) || isVNode(props.message) ? { default: isFunction(props.message) ? props.message : () => props.message } : null);
  vnode.appContext = context || message._context;
  render(vnode, container);
  appendTo.appendChild(container.firstElementChild);
  const vm = vnode.component;
  const instance = {
    id,
    vnode,
    vm,
    handler: { close: () => {
      vm.exposed.close();
    } },
    props: vnode.component.props
  };
  return instance;
};
const message = (options = {}, context) => {
  if (!isClient) return { close: () => void 0 };
  const normalized = normalizeOptions(options);
  const instances = getOrCreatePlacementInstances(normalized.placement || "top");
  if (normalized.grouping && instances.length) {
    const instance2 = instances.find(({ vnode: vm }) => vm.props?.message === normalized.message);
    if (instance2) {
      instance2.props.repeatNum += 1;
      instance2.props.type = normalized.type;
      return instance2.handler;
    }
  }
  if (isNumber(messageConfig.max) && instances.length >= messageConfig.max) return { close: () => void 0 };
  const instance = createMessage(normalized, context);
  instances.push(instance);
  return instance.handler;
};
messageTypes.forEach((type) => {
  message[type] = (options = {}, appContext) => {
    return message({
      ...normalizeOptions(options),
      type
    }, appContext);
  };
});
function closeAll(type) {
  for (const placement in placementInstances) if (hasOwn(placementInstances, placement)) {
    const instances = [...placementInstances[placement]];
    for (const instance of instances) if (!type || type === instance.props.type) instance.handler.close();
  }
}
function closeAllByPlacement(placement) {
  if (!placementInstances[placement]) return;
  [...placementInstances[placement]].forEach((instance) => instance.handler.close());
}
message.closeAll = closeAll;
message.closeAllByPlacement = closeAllByPlacement;
message._context = null;
const ElMessage = withInstallFunction(message, "$message");
const request = axios.create({
  baseURL: "/api",
  timeout: 5e3,
  withCredentials: true
});
request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.message) {
      ElMessage.error(error.response.data.message);
    }
    if (error.response?.status === 401) {
      const url = error.config?.url || "";
      if (!url.includes("/users/check") && !url.includes("/users/init") && !url.includes("/auth/register")) {
        (void 0).location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export { TypeComponents as $, message_default$1 as A, lock_default as B, CHANGE_EVENT as C, useLocale as D, ElButton as E, useAttrs as F, document_default as G, circle_check_default as H, INPUT_EVENT as I, check_default as J, close_default as K, zoom_in_default as L, delete_default as M, entriesOf as N, scale_to_original_default as O, full_screen_default as P, arrow_left_default as Q, arrow_right_default as R, zoom_out_default as S, refresh_left_default as T, UPDATE_MODEL_EVENT as U, refresh_right_default as V, warning_filled_default as W, circle_close_default as X, keysOf as Y, search_default as Z, componentSizes as _, ElForm as a, useGlobalComponentSettings as a0, TypeComponentsMap as a1, obtainAllFocusableElements as a2, getEventCode as a3, EVENT_CODE as a4, addClass as a5, removeClass as a6, rAF as a7, getProp as a8, arrow_up_default as a9, whenMouse as aA, CloseComponents as aB, formItemContextKey as aC, buildProp as aD, isShadowRoot as aE, arrow_down_default as aa, hasClass as ab, getStyle as ac, formContextKey as ad, picture_filled_default as ae, useGlobalSize as af, d_arrow_left_default as ag, more_filled_default as ah, d_arrow_right_default as ai, isFocusable as aj, useEmptyValuesProps as ak, useEmptyValues as al, useComposition as am, useFocusController as an, ValidateComponentsMap as ao, home_filled_default as ap, folder_default as aq, price_tag_default as ar, chat_dot_round_default as as, picture_default as at, setting_default as au, list_default as av, view_default as aw, composeEventHandlers as ax, more_default as ay, focusElement as az, ElFormItem as b, ElInput as c, ElMessage as d, ElButtonGroup as e, ElIcon as f, useFormSize as g, useFormItemInputId as h, useFormDisabled as i, addUnit as j, buildProps as k, loading_default as l, iconPropType as m, useAriaProps as n, definePropType as o, plus_default as p, request as q, rank_default as r, withNoopInstall as s, useSizeProp as t, useFormItem as u, useDeprecated as v, withInstall as w, useGlobalConfig as x, mutable as y, user_default as z };
//# sourceMappingURL=request-BOYQ0nPL.mjs.map
