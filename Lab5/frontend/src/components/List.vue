<template>
  <div class="container">
    <h1>Notes</h1>
    <div class="option" v-for="note in notes" v-bind:key="note._id">
      {{ note.title }}
    </div>
  </div>
</template>

<script>
  import feathersClient from '../FeathersClient';

  export default {
    name: 'List',
    data() {
      return {
        notes: []
      }
    },
    methods: {
      async fetchNotes () {
        const notes = await feathersClient.app.service('notes').find();

        console.log(notes);

        console.log(notes.data);
        this.notes = notes.data;
      }
    },
    mounted () {
      this.fetchNotes();
    }
  }
</script>

<style scoped>
  .container {
    padding: 0 15px;
    background: #070526;
    color: #fff;
  }

  h1 {
    border-bottom: #fff 1px solid;
  }

  .option {
    margin: 10px 0;
    font-size: 20px;
    cursor: pointer;
  }
</style>
