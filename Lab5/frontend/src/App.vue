<template>
  <div id="app">
    <Editor v-on:change="onChange"/>
    <Preview v-bind:markdown="markdown" />
  </div>
</template>

<script>
import Editor from './components/Editor'
import Preview from './components/Preview'

export default {
  name: 'App',
  components: {
    Preview,
    Editor
  },
  data() {
    return {
      markdown: ''
    };
  },
  methods: {
    onChange(value) {
      this.markdown = value;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
