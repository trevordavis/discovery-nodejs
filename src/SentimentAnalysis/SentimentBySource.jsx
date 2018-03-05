import React from 'react';
import { string, shape, arrayOf } from 'prop-types';
import SentimentChart from './SentimentChart';

function SentimentBySource({ sentiments }) {
  return (
    <div className="sentiment--sources-section">
      <div className="sentiment--sources">
        <div className="sentiment--sources-table">
          {
            sentiments.map(source =>
              (<div key={source.title} className="sentiment--source">
                <div
                  className="sentiment--source-cell sentiment--source-name"
                >
                  { source.title }
                </div>
                <div
                  className="sentiment--source-cell sentiment--source-summary"
                >
                  { source.sentiment_label } { source.sentiment_score }
                </div>
              </div>),
            )
          }
        </div>
      </div>
    </div>
  );
}

SentimentBySource.propTypes = {
  sentiments: arrayOf(shape({
    title: string.isRequired,
    label: string.isRequired,
    score: string.isRequired
  })).isRequired,
};

export default SentimentBySource;
