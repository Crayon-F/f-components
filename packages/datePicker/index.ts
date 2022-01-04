import { App } from "vue";

import DatePicker from "./src/DatePicker.vue";

DatePicker.install = (app: App): void => {
  app.component(DatePicker.name, DatePicker);
};
export default DatePicker;
