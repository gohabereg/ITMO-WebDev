const cors = require('./cors');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.use(cors());
};
