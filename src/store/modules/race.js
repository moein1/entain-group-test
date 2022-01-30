import * as types from "../types";
import moment from "moment";
const state = {
  raceList: [],
  showList: [],
};

const getters = {
  /**getting list of all the races */
  [types.GET_RACE_LIST]: (state) => {
    return state.raceList;
  },
  /**getting list of the shows in the
   * race grid
   */
  [types.GET_SHOW_LIST]: (state) => {
    return state.showList;
  },
};

const actions = {
  [types.SET_RACE]: ({ commit }, payload) => {
    commit(types.SET_RACE, payload);
  },
  [types.UPDATE_SHOW_LIST]: ({ commit }, payload) => {
    commit(types.UPDATE_SHOW_LIST, payload);
  },
};

const mutations = {
  /**saving the new list of races in the store */
  [types.SET_RACE]: (state, payload) => {
    if (!payload) return;
    for (const race of payload) {
      /**check if this is the new races should be saved in the list */
      if (!state.raceList.find((raceItem) => raceItem.race_id === race.race_id))
        state.raceList.push(race);
    }
  },
  [types.UPDATE_SHOW_LIST]: (state, payload = {}) => {
    let currenttimePlustMin = moment().add(-1, "minutes").unix();
    /**show only the races that has not started or
     * has been started less than one minutes ago
     */
    let showList = state.raceList.filter(
      (raceItem) => raceItem.advertised_start_seconds > currenttimePlustMin
    );
    /**check if we have payload for filtering category
     * we need to show just list with that category
     */
    const category_id = payload.category_id;
    if (category_id) {
      showList = showList.filter((item) => item.category_id === category_id);
    }
    /**gettig the just first  races to show
     * we get the max races to be shown
     * from the meta data of the client
     */
    state.showList = showList.slice(0, payload.counts || 5);
    for (const showItem of state.showList) {
      /**add the new property for the count down column */
      const durration = showItem.advertised_start_seconds - moment().unix();
      /**showing the duration to start for 'Started' if the race has been started */
      showItem.countDown =
        durration > 0 ? durration : payload.startedText || "Started";
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
