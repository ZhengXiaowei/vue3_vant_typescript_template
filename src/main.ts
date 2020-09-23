import "amfe-flexible";
import "@/scss/index.scss";

import { createApp } from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

import install from "@/plugins/vant";

const app = install(createApp(App));

app.use(store).use(router);

router.isReady().then((_) => app.mount("#app"));
