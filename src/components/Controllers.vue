<template>
  <b-button-group size='sm'>
    <b-button @click="runCode" variant="primary">Run</b-button>
    <b-button @click="resetInputs" variant="success">Reset All Inputs</b-button>
    <b-button @click="clearLog" variant="info">
      Clear Log
      <b-badge v-if="log.length" variant='light' class='ml-2'>{{ log.length }}</b-badge>
    </b-button>
  </b-button-group>
</template>

<script>
import parser from '../engine/interpreter/parser.js';
import evaluator from '../engine/interpreter/evaluator.js';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Controllers',
  computed: mapGetters(['registers', 'memory', 'log', 'editor']),
  methods: {
    ...mapActions(['updateRegisters', 'resetRegisters', 'updateMemory', 'resetMemory', 'pushToLog', 'clearLog']),
    runCode() {
      try {
        const registers = {};
        const memory = {};
        Object.assign(registers, this.registers.t, this.registers.s, this.registers.other);
        Object.assign(memory, this.memory);
        const { AST, labels } = parser(this.editor.getValue());
        evaluator(AST, labels, registers, memory);
        this.updateRegisters(registers);
        this.updateMemory(memory);
      } catch (e) {
        this.pushToLog({ details: e.message, timestamp: new Date().toLocaleString().substr(-11) });
        this.resetInputs();
      }
    },
    resetInputs() {
      this.resetRegisters();
      this.resetMemory();
    }
  }
};
</script>
