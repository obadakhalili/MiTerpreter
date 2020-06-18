function initializeRegisters() {
  const registers = {};
  for (let letter of ['t', 's']) {
    registers[letter] = {};
    for (let n = 0; n < 8; n++) {
      registers[letter][letter + n] = null;
    }
  }
  registers.other = {};
  registers.other.hi = registers.other.lo = null;
  registers.other.zero = 0;
  return registers;
}

const state = { registers: initializeRegisters() };

const mutations = {
  UPDATE_REGISTER(state, { category, register, value }) {
    state.registers[category][register] = value;
  },
  UPDATE_REGISTERS(state, payload) {
    for (let register in payload) {
      if (register[0] == 't') {
        state.registers.t[register] = payload[register];
      } else if (register[0] == 's') {
        state.registers.s[register] = payload[register];
      } else {
        state.registers.other[register] = payload[register];
      }
    }
  },
  RESET_REGISTERS(state, payload) {
    state.registers = payload;
  }
};

const actions = {
  updateRegister({ commit }, payload) {
    commit('UPDATE_REGISTER', payload);
  },
  updateRegisters({ commit }, payload) {
    commit('UPDATE_REGISTERS', payload);
  },
  resetRegisters({ commit }) {
    commit('RESET_REGISTERS', initializeRegisters());
  }
};

const getters = {
  registers: state => state.registers
};

export default {
  state,
  mutations,
  actions,
  getters
};
