import { b as buildProps, d as definePropType, O as picture_filled_default, w as withInstall, h as withNoopInstall } from "./request-D_zzMMA3.js";
import { j as isNumber, l as isUndefined, g as useNamespace } from "../server.mjs";
import { ref, watch, defineComponent, openBlock, createElementBlock, normalizeClass, unref, createBlock, createCommentVNode, toRef, mergeProps, Fragment, renderList, renderSlot, createVNode, normalizeProps } from "vue";
import { isObject } from "@vue/shared";
const useThrottleRender = (loading, throttle = 0) => {
  if (throttle === 0) return loading;
  const throttled = ref(isObject(throttle) && Boolean(throttle.initVal));
  let timeoutHandle = null;
  const dispatchThrottling = (timer) => {
    if (isUndefined(timer)) {
      throttled.value = loading.value;
      return;
    }
    if (timeoutHandle) clearTimeout(timeoutHandle);
    timeoutHandle = setTimeout(() => {
      throttled.value = loading.value;
    }, timer);
  };
  const dispatcher = (type) => {
    if (type === "leading") if (isNumber(throttle)) dispatchThrottling(throttle);
    else dispatchThrottling(throttle.leading);
    else if (isObject(throttle)) dispatchThrottling(throttle.trailing);
    else throttled.value = false;
  };
  watch(() => loading.value, (val) => {
    dispatcher(val ? "leading" : "trailing");
  });
  return throttled;
};
const skeletonProps = buildProps({
  /**
  * @description whether showing the animation
  */
  animated: Boolean,
  /**
  * @description how many fake items to render to the DOM
  */
  count: {
    type: Number,
    default: 1
  },
  /**
  * @description numbers of the row, only useful when no template slot were given
  */
  rows: {
    type: Number,
    default: 3
  },
  /**
  * @description whether showing the real DOM
  */
  loading: {
    type: Boolean,
    default: true
  },
  /**
  * @description rendering delay in milliseconds
  */
  throttle: { type: definePropType([Number, Object]) }
});
const skeletonItemProps = buildProps({
  /**
  * @description the current rendering skeleton type
  */
  variant: {
    type: String,
    values: [
      "circle",
      "rect",
      "h1",
      "h3",
      "text",
      "caption",
      "p",
      "image",
      "button"
    ],
    default: "text"
  }
});
var skeleton_item_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElSkeletonItem",
  __name: "skeleton-item",
  props: skeletonItemProps,
  setup(__props) {
    const ns = useNamespace("skeleton");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", { class: normalizeClass([unref(ns).e("item"), unref(ns).e(__props.variant)]) }, [__props.variant === "image" ? (openBlock(), createBlock(unref(picture_filled_default), { key: 0 })) : createCommentVNode("v-if", true)], 2);
    };
  }
});
var skeleton_item_default = skeleton_item_vue_vue_type_script_setup_true_lang_default;
var skeleton_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElSkeleton",
  __name: "skeleton",
  props: skeletonProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const ns = useNamespace("skeleton");
    const uiLoading = useThrottleRender(toRef(props, "loading"), props.throttle);
    __expose({
      /** @description loading state */
      uiLoading
    });
    return (_ctx, _cache) => {
      return unref(uiLoading) ? (openBlock(), createElementBlock("div", mergeProps({
        key: 0,
        class: [unref(ns).b(), unref(ns).is("animated", __props.animated)]
      }, _ctx.$attrs), [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.count, (i) => {
        return openBlock(), createElementBlock(Fragment, { key: i }, [unref(uiLoading) ? renderSlot(_ctx.$slots, "template", { key: i }, () => [createVNode(skeleton_item_default, {
          class: normalizeClass(unref(ns).is("first")),
          variant: "p"
        }, null, 8, ["class"]), (openBlock(true), createElementBlock(Fragment, null, renderList(__props.rows, (item) => {
          return openBlock(), createBlock(skeleton_item_default, {
            key: item,
            class: normalizeClass([unref(ns).e("paragraph"), unref(ns).is("last", item === __props.rows && __props.rows > 1)]),
            variant: "p"
          }, null, 8, ["class"]);
        }), 128))]) : createCommentVNode("v-if", true)], 64);
      }), 128))], 16)) : renderSlot(_ctx.$slots, "default", normalizeProps(mergeProps({ key: 1 }, _ctx.$attrs)));
    };
  }
});
var skeleton_default = skeleton_vue_vue_type_script_setup_true_lang_default;
const ElSkeleton = withInstall(skeleton_default, { SkeletonItem: skeleton_item_default });
const ElSkeletonItem = withNoopInstall(skeleton_item_default);
export {
  ElSkeleton as E,
  ElSkeletonItem as a
};
//# sourceMappingURL=el-skeleton-DV5oBZRd.js.map
