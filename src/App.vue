<template>
  <div id="app">
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand href="#">MiTerpreter: MIPS Interpreter</b-navbar-brand>
      <router-link to="/code" class="mr-3">Code</router-link>
        <router-link to="/docs">Docs</router-link>
    </b-navbar>
    <b-container class="mt-5">
      <router-view></router-view>     
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>
