import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const store = createPinia();
store.use(piniaPluginPersistedstate);
export default store;

import { defineStore } from "pinia";

export const useTestStore = defineStore("index", {
  state: () => {
    return {};
  },
  getters: {},
  actions: {},
});
