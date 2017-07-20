module.exports = {
  path: 'product/:id',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Product'));
    });
  }
};
