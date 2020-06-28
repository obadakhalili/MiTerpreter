<template>
  <div>
    <RegisterInput v-for="(value, register, index) in registers[category]"
    :key="index"
    :category="category"
    :register="register"
    :value="value" />
  </div>
</template>

<script>
import RegisterInput from './RegisterInput.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Registers',
  props: ['category'],
  computed: mapGetters(['registers']),
  components: {
    RegisterInput
  }
};
</script>
