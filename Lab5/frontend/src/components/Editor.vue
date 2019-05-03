<template>
  <div class="editor">
    <h1>Editor</h1>
    <textarea v-model="markdown" v-on:input="onChange"></textarea>
    <button class="remove" v-bind:class="{hidden: !id}" v-on:click="remove">Remove</button>
    <button class="save" v-on:click="save">Save</button>
  </div>
</template>

<script>
  import feathersClient from '../FeathersClient';
  import marked from 'marked';

  export default {
    name: 'Editor',
    data() {
      return {
        markdown: '',
        id: undefined
      }
    },
    methods: {
      onChange() {
        this.$emit('change', this.markdown);
      },
      async save() {
        const title = this.extractTitle();
        const service = await feathersClient.app.service('notes');

        if (this.id) {
          await service.update(this.id, {title, markdown: this.markdown});
        } else {
          const created = await service.create({id: this.id, title, markdown: this.markdown});

          this.id = created._id;
        }

        this.$emit('saved', this.id);
      },
      async remove() {
        if (!this.id) {
          return;
        }

        await feathersClient.app.service('notes').remove(this.id);

        this.$emit('removed');
      },
      extractTitle() {
        const lines = this.markdown.split('\n');
        const headingRegexp = /^ {0,3}#{1,6} .*/;

        let heading = lines.find(line => {
          if (line.match(headingRegexp)) {
            return true;
          }
        })

        if (heading) {
          heading = heading.replace(/#/gi, '');
          return heading.trim();
        }

        const firstLine = marked(lines[0], {sanitize: true});
        const p = document.createElement('p');

        p.innerHTML = firstLine;

        return p.textContent;
      },
      async select(id) {
        if (!id) {
          this.id = undefined;
          this.markdown = '';

        } else {

          const note = await feathersClient.app.service('notes').get(id);

          this.id = note._id;
          this.markdown = note.markdown;
        }

        this.onChange();
      }
    }
  }
</script>

<style scoped>
  .hidden {
    display: none;
  }

  h1 {
    border-bottom: #000 1px solid;
  }

  .editor {
    padding: 0 10px;
    position: relative;
  }

  textarea {
    width: 100%;
    max-width: 100%;
    min-height: 600px;
    margin: 0;
    box-sizing: border-box;
    outline: none;
    border: 0;
    font-size: 16px;
  }

  button {
    position: absolute;
    top : 25px;
    width: 70px;
    height: 30px;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }

  button.save {
    right: 10px;
    background: #070526;
  }

  button.remove {
    right: 90px;
    background: #f00;
  }
</style>
