<template>
  <div class="editor">
    <h1>Editor</h1>
    <textarea v-model="markdown" v-on:input="onChange"></textarea>
    <button v-on:click="save">Save</button>
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
      }
    }
  }
</script>

<style scoped>
  h1 {
    border-bottom: #000 1px solid;
  }

  .editor {
    padding: 0 10px;
  }

  textarea {
    width: 100%;
    min-height: 500px;
    margin: 0;
    box-sizing: border-box;
    outline: none;
    border: 0;
    font-size: 16px;
  }
</style>
