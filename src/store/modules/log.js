const state = {
  log: []
};

const mutations = {
  PUSH_TO_LOG(state, payload) {
    state.log.push(payload);
  },
  CLEAR_LOG(state) {
    state.log = [];
  }
};

const actions = {
  pushToLog({ commit }, payload) {
    commit('PUSH_TO_LOG', payload);
  },
  clearLog({ commit }) {
    commit('CLEAR_LOG');
  }
};

const getters = {
  log: state => state.log
};

export default {
  state,
  mutations,
  actions,
  getters
};
