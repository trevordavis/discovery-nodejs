import React, { Component } from 'react';
import { string, object, arrayOf, shape } from 'prop-types';
import WidgetHeader from '../WidgetHeader/index';
import QuerySyntax from '../QuerySyntax/index';
import queryBuilder from '../query-builder';
import Book from './Book';

export default class TopBooks extends Component {
  static propTypes = {
    books: arrayOf(object).isRequired,
    query: shape({
      text: string.isRequired,
    }).isRequired
  }

  static parseHTML(htmlString) {
    var start_index = htmlString.indexOf("https://");
    var end_index = htmlString.indexOf(".htm") + 4;
    var url = htmlString.substring(start_index, end_index);
    return url;
  }

  static widgetTitle() {
    return 'Top Books';
  }

  static widgetDescription() {
    return 'Watson Book Catalogue searches free, popular items from Project Gutenberg to find the books most relevant to your search.';
  }

  state = {
    showQuery: false,
  }

  onShowQuery = () => {
    this.setState({ showQuery: true });
  }

  onShowResults = () => {
    this.setState({ showQuery: false });
  }

  render() {
    const { books, query } = this.props;

    return (
      <div>
        {
          !this.state.showQuery
            ? (
              <div className="top-stories widget">
                <WidgetHeader
                  title={TopBooks.widgetTitle()}
                  description={TopBooks.widgetDescription()}
                  onShowQuery={this.onShowQuery}
                />
                <div className="top-stories--list">
                  {
                    books.map(item =>
                      (<Book
                        key={item.id}
                        title={(item.extracted_metadata.title || 'Untitled')}
                        author={item.extracted_metadata.author}
                        score={item.result_metadata.score}
                        url={TopBooks.parseHTML(item.html)}
                      />))
                  }
                </div>
              </div>
            )
            : (
              <QuerySyntax
                title="Top Books"
                query={queryBuilder.build(query, queryBuilder.widgetQueries.topStories)}
                response={{ results: books }}
                onGoBack={this.onShowResults}
              />
            )
        }
      </div>
    );
  }
}
