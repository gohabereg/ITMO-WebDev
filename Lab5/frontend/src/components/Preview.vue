<template>
    <div class="preview">
      <h1>Preview</h1>
      <div class="output" v-html="compiledMarkdown"></div>
    </div>
</template>

<script>
  import marked from 'marked';

  export default {
    name: 'Preview',
    props: ['markdown'],
    computed: {
      compiledMarkdown() {
        return marked(this.markdown, {sanitize: true});
      }
    }
  }
</script>

<style scoped>
  .preview {
    display: flex;
    flex-flow: column nowrap;

    padding: 0 15px;
    white-space: pre-line;
    border-left: #070526 2px solid;
  }

  h1 {
    border-bottom: #000 1px solid;
  }

  .output {
    overflow: auto;
    flex-basis: 100%;
    max-width: 100%;
  }
</style>
