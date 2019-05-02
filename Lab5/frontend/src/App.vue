<template>
  <div id="app">
    <List ref="list" class="column" />
    <Editor class="column" v-on:change="onChange" v-on:save="onSave"/>
    <Preview class="column" v-bind:markdown="markdown" />
  </div>
</template>

<script>
import Editor from './components/Editor';
import Preview from './components/Preview';
import List from './components/List';

export default {
  name: 'App',
  components: {
    Preview,
    Editor,
    List
  },
  data() {
    return {
      markdown: ''
    };
  },
  methods: {
    onChange(value) {
      this.markdown = value;
    },
    onSave() {
    this.$refs.list.fetchNotes();
    }
  }
}
</script>

<style>
  body {
    margin: 0;
  }

  #app {
    display: flex;
    flex-flow: row;
  }

  .column {
    flex-basis: 33.3%;
    max-width: 33.3%;
    height: 100vh;
    max-height: 100vh;
  }
</style>
