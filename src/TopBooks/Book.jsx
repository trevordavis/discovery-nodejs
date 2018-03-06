import React from 'react';
import { string, number } from 'prop-types';

function Story({ title, author, score, url }) {
  return (
    <div className="story">
      <a
        className="story--title base--a results--a"
        title={title}
        rel="noopener noreferrer"
        href={url}
        target="_blank"
      >
        {title}
      </a>
      <div className="story--source-and-score">
        <span className="story--score base--p">
          <span>{ author }</span>
        </span>
      </div>
      <div className="story--date">
        { score }
      </div>
    </div>
  );
}

Story.propTypes = {
  title: string.isRequired,
  author: string.isRequired,
  score: number.isRequired,
  url: string.isRequired
};

Story.defaultProps = {
  author: 'Author Unknown',
};

export default Story;
