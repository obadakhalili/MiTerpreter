import Vue from 'vue';

function initializeMemory(size = 24) {
  const memory = {};
  for (let i = 0; i < size; i++) {
    memory[i] = null;
  }
  return memory;
}

const state = {
  memory: initializeMemory(),
  memorySize: 24
};

const mutations = {
  UPDATE_CELL(state, { address, value }) {
    state.memory[address] = value;
  },
  UPDATE_MEMORY(state, payload) {
    state.memory = payload;
  },
  RESET_MEMORY(state, payload) {
    state.memory = payload;
  },
  ADD_CELL(state) {
    Vue.set(state.memory, state.memorySize, null);
    state.memorySize++;
  }
};

const actions = {
  updateCell({ commit }, payload) {
    commit('UPDATE_CELL', payload);
  },
  updateMemory({ commit }, payload) {
    commit('UPDATE_MEMORY', payload);
  },
  resetMemory({ commit, state }) {
    commit('RESET_MEMORY', initializeMemory(state.memorySize));
  },
  addCell({ commit, state }) {
    if (state.memorySize <= 1024) {
      commit('ADD_CELL');
    }
  }
};

const getters = {
  memory: state => state.memory,
  memorySize: state => state.memorySize
};

export default {
  state,
  mutations,
  actions,
  getters
};
