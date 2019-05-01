<template>
  <div>
    <div v-for="note in notes">
      {{ note.title }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'List',
    data() {
      return {
        notes: []
      }
    },
    methods: {
      async fetchNotes () {
        const response = await fetch('https://localhost:3000');
        const json = await response.json();

        this.notes = json;
      }
    },
    mounted () {
      this.fetchNotes();
    }
  }
</script>

<style scoped>

</style>
