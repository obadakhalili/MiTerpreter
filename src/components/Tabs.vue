<template>
  <b-tabs fill>
    <b-tab title="Registers">
      <b-tabs fill>
        <b-tab title="t-registers">
          <Registers :category="'t'" />
        </b-tab>
        <b-tab title="s-registers">
          <Registers :category="'s'" />
        </b-tab>
        <b-tab title="other">
          <Registers :category="'other'" />
        </b-tab>
      </b-tabs>
    </b-tab>
    <b-tab title="Memory">
      <div class="memory-inputs">
        <Memory />
      </div>
    </b-tab>
    <b-tab title="Log">
      <Log />
    </b-tab>
  </b-tabs>
</template>

<script>
import Registers from './Registers';
import Memory from './Memory.vue';
import Log from './Log.vue';

export default {
  name: 'Tabs',
  components: {
    Registers,
    Memory,
    Log
  }
};
</script>
