const seriesGenerator = require('./seriesGenerator');
const dataGenerator = require('./dataGenerator');

module.exports = {
  ...seriesGenerator,
  ...dataGenerator,
};
