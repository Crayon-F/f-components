import { App } from "vue";
import elButton from "./button";
import elIcon from "./icon";
import elButtonGroup from "./button-group";
import elInput from "./input";
import elUpload from "./upload";
import elProgress from "./progress";
import elDatePicker from "./datePicker";

const components = [
  elButton,
  elIcon,
  elButtonGroup,
  elInput,
  elUpload,
  elProgress,
  elDatePicker,
];
const install = (app: App): void => {
  components.map((component) => app.component(component.name, component));
};

export { elButton };
export default {
  install,
  elButton,
  elIcon,
  elButtonGroup,
  elInput,
  elUpload,
  elProgress,
  elDatePicker,
};
