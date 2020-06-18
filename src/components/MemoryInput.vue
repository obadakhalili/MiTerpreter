<template>
  <b-row class='mt-2 ml-0'>
    <b-col cols="9">
      <b-form-input
      @blur="update($event.target)"
      :value="value"
      type="number"
      placeholder="Enter Value">
      </b-form-input>
    </b-col>
    <b-col cols="3" class='text-center'>{{ paddedAddress }}</b-col>
  </b-row>  
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Input',
  props: ['address', 'value'],
  methods: {
    ...mapActions(['updateCell', 'pushToLog']),
    update(el) {
      if (/^[-+]?[0-9]+$/.test(el.value)) {
        if (el.value < -4294967295 || el.value > 4294967295) {
          this.pushToLog({
            details: 'Immediate value is outside of range in memory at cell ' + this.paddedAddress,
            timestamp: new Date().toLocaleString().substr(-11)
          });
          el.value = '';
        } else {
          this.updateCell({ address: this.address, value: Number(el.value) });
        }
      } else {
        el.value = '';
      }
    }
  },
  computed: {
    paddedAddress() {
      return String(this.address).padStart(4, '0');
    }
  }
};
</script>
