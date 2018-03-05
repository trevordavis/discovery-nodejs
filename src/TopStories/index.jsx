import React, { Component } from 'react';
import { string, object, arrayOf, shape } from 'prop-types';
import WidgetHeader from '../WidgetHeader/index';
import QuerySyntax from '../QuerySyntax/index';
import queryBuilder from '../query-builder';
import Story from './Story';
import { fields } from '../fields';

export default class TopStories extends Component {
  static propTypes = {
    stories: arrayOf(object).isRequired,
    query: shape({
      text: string.isRequired,
      date: shape({
        from: string.isRequired,
        to: string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  static parseHTML(htmlString) {
    var start_index = htmlString.indexOf("https://");
    var end_index = htmlString.indexOf(".htm") + 4;
    var url = htmlString.substring(start_index, end_index);
    console.log("printing the url");
    console.log(url);
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
    const { stories, query } = this.props;

    return (
      <div>
        {
          !this.state.showQuery
            ? (
              <div className="top-stories widget">
                <WidgetHeader
                  title={TopStories.widgetTitle()}
                  description={TopStories.widgetDescription()}
                  onShowQuery={this.onShowQuery}
                />
                <div className="top-stories--list">
                  {
                    stories.map(item =>
                      (<Story
                        key={item.id}
                        title={(item.extracted_metadata.title || 'Untitled')}
                        author={item.extracted_metadata.author}
                        score={item.result_metadata.score}
                        url={TopStories.parseHTML(item.html)}
                      />))
                  }
                </div>
              </div>
            )
            : (
              <QuerySyntax
                title="Top Stories"
                query={queryBuilder.build(query, queryBuilder.widgetQueries.topStories)}
                response={{ results: stories }}
                onGoBack={this.onShowResults}
              />
            )
        }
      </div>
    );
  }
}
