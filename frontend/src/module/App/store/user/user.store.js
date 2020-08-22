import { userService } from "@/module/App/service";
import Vue from "vue";

const state = {
  usersAllState: []
};

const getters = {
  usersAllGetters(state) {
    return state.usersAllState;
  }
};

const actions = {
  async usersAllActions({ commit }) {
    const response = await userService.usersAll();
    commit("usersAllMutations", response.data);

    return response;
  },

  // eslint-disable-next-line no-unused-vars
  async usersUpdateActions({ commit }, payload) {
    let id = payload.id;
    let attributes = { state: payload.attributes };
    return await userService.usersUpdate(id, attributes);
  }
};

const mutations = {
  usersAllMutations(state, response) {
    Vue.set(state, "usersAllState", response);
  }
};

export const userStore = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
