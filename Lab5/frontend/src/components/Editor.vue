<template>
    <textarea v-model="markdown" v-on:input="onChange"></textarea>
</template>

<script>
  export default {
    name: 'Editor',
    data() {
      return {
        markdown: ''
      }
    },
    methods: {
      onChange() {
        this.$emit('change', this.markdown);
      }
    }
  }
</script>

<style scoped>

</style>
