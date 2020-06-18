import editor from './modules/editor.js';
import registers from './modules/registers.js';
import memory from './modules/memory.js';
import log from './modules/log.js';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    editor,
    registers,
    memory,
    log
  }
});
