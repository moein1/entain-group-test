import Vue from "vue";
import Vuex from "vuex";
import race from "./modules/race";

Vue.use(Vuex);

export default new Vuex.Store({
  /**adding the list of the module for project
   * so we can add the new module easily using
   * this syntax
   */
  modules: {
    race,
  },
});
