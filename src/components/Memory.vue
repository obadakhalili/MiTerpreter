<template>
  <div class="memory-inputs">
    <MemoryInput v-for="(cell, index) in memory"
    :key="index"
    :address="index"
    :value="cell" />
    <b-button @click="addCell" :disabled="memorySize > 1024" variant="success" class="float-right m-2">Add</b-button>
  </div>
</template>

<script>
import MemoryInput from './MemoryInput.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Memory',
  computed: {
    ...mapGetters(['memory', 'memorySize'])
  },
  methods: mapActions({ addCell: 'addCell' }),
  components: {
    MemoryInput
  }
};
</script>

<style scoped>
.memory-inputs {
  max-height: 410px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
