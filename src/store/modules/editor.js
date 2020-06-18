const state = {
  editor: {}
};

const mutations = {
  UPDATE_EDITOR(state, payload) {
    state.editor = payload;
  }
};

const actions = {
  updateEditor({ commit }, payload) {
    commit('UPDATE_EDITOR', payload);
  }
};

const getters = {
  editor: state => state.editor
};

export default {
  state,
  mutations,
  actions,
  getters
};
