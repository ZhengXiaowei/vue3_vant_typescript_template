import { Module } from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

import { IRootState, ISystemState } from "@/types/store";

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default systemModule;
