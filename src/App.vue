<template>
  <div id="app">
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand href="#">MiTerpreter: MIPS Interpreter</b-navbar-brand>
    </b-navbar>
    <b-container class="mt-5">
      <b-row>
        <b-col lg="8">
          <Editor />
        </b-col>
        <b-col lg="4" class="control">
          <Controllers class="mb-2" />
          <Tabs />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Editor from './components/Editor.vue';
import Controllers from './components/Controllers.vue';
import Tabs from './components/Tabs.vue';

export default {
  name: 'App',
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
