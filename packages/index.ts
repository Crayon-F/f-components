import { App } from "vue";
import elButton from "./button";
import elIcon from "./icon";
import elButtonGroup from "./button-group";
import elInput from "./input";

const components = [elButton, elIcon, elButtonGroup, elInput];
const install = (app: App): void => {
  components.map((component) => app.component(component.name, component));
};

export { elButton };
export default {
  install,
};
