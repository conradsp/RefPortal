module.exports = {
  path: 'sell',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Sell'));
    });
  }
};
