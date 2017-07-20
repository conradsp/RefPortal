const image = require('./image');
const javascript = require('./javascript');

module.exports = ({ production = false, browser = false } = {}) => (
  [
    javascript({ production, browser }),
    image()
  ]
);
