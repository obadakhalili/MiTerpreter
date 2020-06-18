<template>
  <div id="editor"></div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Editor',
  mounted() {
    const editor = ace.edit('editor', {
      mode: 'ace/mode/assembly_x86',
      fontSize: '16px'
    });
    this.updateEditor(editor);
  },
  methods: mapActions({ updateEditor: 'updateEditor' })
};
</script>

<style scoped>
#editor { 
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    min-height: 490.8px;
}
@media only screen and (max-width: 995px) {
  #editor {
    margin: -40px 5px 0 5px;
  }
}
</style>