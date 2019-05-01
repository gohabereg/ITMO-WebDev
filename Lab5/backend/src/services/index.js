const notes = require('./notes/notes.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(notes);
};
