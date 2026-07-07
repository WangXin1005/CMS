import { w as withInstall, k as buildProps, o as definePropType } from './request-BOYQ0nPL.mjs';
import { h as useNamespace } from './server.mjs';
import { defineComponent, computed, openBlock, createElementBlock, normalizeStyle, normalizeClass, unref, renderSlot, createCommentVNode } from 'vue';

const dividerProps = buildProps({
  /**
  * @description Set divider's direction
  */
  direction: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "horizontal"
  },
  /**
  * @description The position of the customized content on the divider line
  */
  contentPosition: {
    type: String,
    values: [
      "left",
      "center",
      "right"
    ],
    default: "center"
  },
  /**
  * @description Set the style of divider
  */
  borderStyle: {
    type: definePropType(String),
    default: "solid"
  }
});
var divider_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElDivider",
  __name: "divider",
  props: dividerProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("divider");
    const dividerStyle = computed(() => {
      return ns.cssVar({ "border-style": props.borderStyle });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([unref(ns).b(), unref(ns).m(__props.direction)]),
        style: normalizeStyle(dividerStyle.value),
        role: "separator"
      }, [_ctx.$slots.default && __props.direction !== "vertical" ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass([unref(ns).e("text"), unref(ns).is(__props.contentPosition)])
      }, [renderSlot(_ctx.$slots, "default")], 2)) : createCommentVNode("v-if", true)], 6);
    };
  }
});
var divider_default = divider_vue_vue_type_script_setup_true_lang_default;
const ElDivider = withInstall(divider_default);

export { ElDivider as E };
//# sourceMappingURL=el-divider-wfA3JRhm.mjs.map
