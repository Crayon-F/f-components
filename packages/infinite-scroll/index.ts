const attributes = {
  delay: {
    type: Number,
    default: 100,
  },
  distance: {
    type: Number,
    default: 100,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  immediate: {
    type: Boolean,
    default: true,
  },
};

function getScrollOptions(el: any, instance: any) {
  return Object.entries(attributes).reduce((acm, [name, option]) => {
    const { type, default: defaultVal } = option;
    const attrVal = el.getAttribute(`infinite-scroll-${name}`);

    let value = instance[attrVal] ?? attrVal ?? defaultVal;
    value = value === "fasle" ? false : value;
    value = type(value);
    acm[name] = Number.isNaN(value) ? defaultVal : value;
    return acm;
  }, {});
}
const getScrollContainer = function (el: any) {
  let parent = el;
  while (parent) {
    // 如果一直向上找，找到根节点，直接返回window
    if ([window, document, document.documentElement].includes(parent)) {
      return window;
    }
    // 如果当前的parent有overflow属性
    const overflow = getComputedStyle(parent)["overflow"];
    // overflow属性的值是scroll|auto|overlay中的一个，将其parent返回
    if (overflow.match(/(scroll|auto|overlay)/)) {
      return parent;
    }

    parent = parent.parentNode;
  }
};
import { App } from "vue";
export default (app: App) => {
  app.directive("infinite-scroll", {
    mounted(el, bindings) {
      const { instance, value: cb } = bindings;
      // 获取用户的属性 || 默认的属性
      const options = getScrollOptions(el, instance);
      // 1.获取container，也就是带有overflow样式的dom
      const container = getScrollContainer(el);
      if (container !== window) {
        console.log(container);
      }
    },
    unmounted() {
      console.log("指令卸载");
    },
  });
};
