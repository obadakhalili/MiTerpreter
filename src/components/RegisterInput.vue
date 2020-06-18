<template>
  <b-row class='mt-2'>
    <b-col cols="10">
      <b-form-input
      @blur="update($event.target)"
      :value="value"
      :disabled="register == 'zero' ? true : false"
      type="number"
      placeholder="Enter Value">
      </b-form-input>
    </b-col>
    <b-col cols="2" class="text-center">{{ register }}</b-col>
  </b-row>  
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Input',
  props: ['category', 'register', 'value'],
  methods: {
    ...mapActions(['updateRegister', 'pushToLog']),
    update(el) {
      if (/^[-+]?[0-9]+$/.test(el.value)) {
        if (el.value < -4294967295 || el.value > 4294967295) {
          this.pushToLog({
            details: 'Immediate value is outside of range in registers at register ' + this.register,
            timestamp: new Date().toLocaleString().substr(-11)
          });
          el.value = '';
        } else {
          this.updateRegister({ category: this.category, register: this.register, value: Number(el.value) });
        }
      } else {
        el.value = '';
      }
    }
  }
};
</script>
