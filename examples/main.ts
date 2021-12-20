import { createApp } from "vue";
import App from "./App.vue";

import fComponents from "../packages/index";

const app = createApp(App);

app.use(fComponents);

app.mount("#app");
