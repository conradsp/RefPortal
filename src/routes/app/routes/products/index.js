module.exports = {
  path: 'products',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/products'),
        require('./routes/product'),
      ]);
    });
  }
};
