import { App } from "vue";
import elButton from "./button";
import elIcon from "./icon";
import elButtonGroup from "./button-group";

const components = [elButton, elIcon, elButtonGroup];
const install = (app: App): void => {
  components.map((component) => app.component(component.name, component));
};

export { elButton };
export default {
  install,
};
