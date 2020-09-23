import { createStore, createLogger } from "vuex";

import system from "./modules/system";

const debug = process.env.NODE_ENV !== "production";

const store = createStore({
  modules: {
    system,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

export default store;
