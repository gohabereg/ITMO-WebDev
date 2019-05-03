<template>
  <div class="container">
    <h1>Notes</h1>
    <div
      v-for="note in notes"
      v-bind:key="note._id"
      class="option"
      v-bind:class="{selected: selected === note._id}"
      v-on:click="() => selectNote(note._id)"
    >
      {{ note.title }}
    </div>
    <div class="option" v-on:click="addNote">
      + Add note
    </div>
  </div>
</template>

<script>
  import feathersClient from '../FeathersClient';

  export default {
    name: 'List',
    data() {
      return {
        notes: [],
        selected: undefined
      }
    },
    methods: {
      async fetchNotes (selectedId) {
        const notes = await feathersClient.app.service('notes').find();

        this.notes = notes.data;

        this.selected = selectedId;
      },
      selectNote(id) {
        this.selected = id;
        this.$emit('selected', id);
      },
      addNote() {
        this.selected = undefined;
        this.$emit('selected', null);
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

  .option.selected {
    color: #f00;
  }
</style>
