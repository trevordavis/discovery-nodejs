const { fields } = require('../fields');

const returnFields = [
  fields.title,
  fields.author,
  'result_metadata.score'
].join(',');

module.exports = {
  count: 5,
  return: returnFields,
};