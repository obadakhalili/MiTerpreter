<template>
  <b-row>
    <b-col lg="8">
      <Editor />
    </b-col>
    <b-col lg="4" class="control">
      <Controllers class="mb-2" />
      <Tabs />
    </b-col>
  </b-row>
</template>

<script>
import Editor from './Editor.vue';
import Controllers from './Controllers.vue';
import Tabs from './Tabs.vue';

export default {
  name: 'Code',
  components: {
    Editor,
    Controllers,
    Tabs
  }
};
</script>

<style>
@media only screen and (max-width: 995px) {
  .control {
    margin-top: 500px;
    margin-bottom: 50px;
  }
}
</style>
