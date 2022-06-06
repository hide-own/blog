import { createPinia } from "pinia";
import pinaPluginPersist from "pinia-plugin-persist";

const store = createPinia();
store.use(pinaPluginPersist);

export default store;
