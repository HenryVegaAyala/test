import Vue from "vue";
import Vuex from "vuex";
import AppStore from "@/module/App/store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ...AppStore
  }
});
