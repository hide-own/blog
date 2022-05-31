import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import "./assets/css/index.less";
import "./assets/css/icon.css";
import "ant-design-vue/es/message/style/css";

import { createPinia } from "pinia";

createApp(App).use(router).use(createPinia()).mount("#app");
