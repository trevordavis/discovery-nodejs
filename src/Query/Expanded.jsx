import React, { Component } from 'react';
import { func } from 'prop-types';
import moment from 'moment';

import { TextInput, Icon } from 'watson-react-components';

export default class QueryExpanded extends Component {
  static propTypes = {
    onQueryChange: func.isRequired,
  }

  state = {
    query: null,
  }

  handleInputChange = (event) => {
    this.setState({
      query: {
        text: event.target.value
      },
    });
  }

  handleKeyPress = (event) => {
    console.log(this.state.query);
    if (event.key === 'Enter' && event.target.value.match(/[^\s]+/)) {
      this.props.onQueryChange({text: "&natural_language_query=" + this.state.query.text.replace(" ", "%")});
    }
  }

  handleSearchClick = () => {
    console.log(this.state.query);
    if (this.state.query && this.state.query.text.match(/[^\s]+/)) {
      this.props.onQueryChange({text: "&natural_language_query=" + this.state.query.text.replace(" ", "%")});
    }
  }

  render() {
    return (
      <section className="_full-width-row query">
        <div className="row query--row _container _container_x-large">
          <div className="query--left">
            <div className="query--search-container">
              <TextInput
                placeholder="What would you like to read about?"
                onKeyPress={this.handleKeyPress}
                onInput={this.handleInputChange}
                defaultValue={this.state.query ? this.state.query.text : null}
              />
              <button
                type="button"
                onClick={this.handleSearchClick}
                className="query--icon-container"
              >
                <Icon type="search" size="regular" fill="#ffffff" />
              </button>
            </div>
          </div>
          <div className="query--right">
            <p className="base--p query--query-description">
              Quickly find great reads in the Watson Book Catalogue data collection
              of top rated books from Project Gutenberg. Easily filter your results by:
            </p>
            <ul className="base--ul query--query-list">
              <li className="base--li query--query-list-item">Books about the content that interests you</li>
              <li className="base--li query--query-list-item">Common entities (people and locations) mentioned in those books</li>
              <li className="base--li query--query-list-item">Trend of sentiments in your Project Gutenberg results, with other book sites coming soon!</li>
            </ul>
            <p className="base--p query--query-description">
              Project Gutenberg has a lot more to offer. Check it out <a href="http://www.gutenberg.org">here</a>.
            </p>
          </div>
        </div>
      </section>
    );
  }
}
