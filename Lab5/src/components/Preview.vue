<template>
    <div class="preview" v-html="compiledMarkdown"></div>
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
    white-space: pre-line;
  }
</style>
