module.exports = function (options = {}) {
  return function cors(req, res, next) {
    console.log('cors middleware is running');

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');

    next();
  };
};
