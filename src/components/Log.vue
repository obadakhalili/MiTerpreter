<template>
  <div class="log smt-2">
    <b-alert
    v-for="(message, index) in reversedLog"
    :key="index"
    show
    variant="danger"
    class="m-2">
      <small>{{ message.details }}</small>
      <br>
      {{ message.timestamp }}
    </b-alert>
    <h6 v-if="!log.length" class='text-center mt-2'>Everything seems fine 🕵️‍♂️</h6>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Log',
  computed: {
    ...mapGetters(['log']),
    reversedLog() {
      return this.log.reverse();
    }
  }
};
</script>

<style scoped>
.log {
  max-height: 410px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
