import { App } from "vue";

import Upload from "./src/upload.vue";

Upload.install = (app: App): void => {
  app.component(Upload.name, Upload);
};
export default Upload;
