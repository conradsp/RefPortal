module.exports = {
  path: 'form',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/sell'),
        require('./routes/transfer')
      ]);
    });
  }
};
