const { fields } = require('./fields');
const TopBooksQuery = require('./TopBooks/query');
const TopPassagesQuery = require('./TopPassages/query');
const SentimentAnalysisQuery = require('./SentimentAnalysis/query');

module.exports = {
  widgetQueries: {
    topBooks: TopBooksQuery,
    topPassages: TopPassagesQuery,
    sentimentAnalysis: SentimentAnalysisQuery
  },
  build(query, widgetQuery) {
    const params = {
      query: `"${query.text}"`,
    };
    params.filter = `${fields.language}:(english|en)`;
    if (widgetQuery) {
      return Object.assign({}, params, widgetQuery);
    }

    params.aggregation = null;
    params.filter = null;
    // add in TopStoriesQuery since it is the only one without aggregations
    return Object.assign({}, params, TopBooksQuery);
  },
};
