import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';

export class FeathersClient {
  constructor () {
    this.app = feathers();
    this.client = rest('http://localhost:3030');

    this.app.configure(this.client.fetch(window.fetch));
  }
}

export default new FeathersClient();
