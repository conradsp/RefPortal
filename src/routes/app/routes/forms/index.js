module.exports = {
  path: 'form',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/components'),
        require('./routes/sell'),
        require('./routes/steppers'),
      ]);
    });
  }
};
