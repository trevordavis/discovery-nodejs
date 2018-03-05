import React, { Component } from 'react';
import { string, bool, shape, func } from 'prop-types';
import moment from 'moment';
import { TextInput, Icon, ButtonsGroup } from 'watson-react-components';

export default class Collapsed extends Component {
  static propTypes = {
    onQueryChange: func.isRequired,
    query: shape({
      text: string,
      date: shape({
        from: string,
        to: string,
      }),
      enabled: bool,
    }).isRequired,
  }

  state = {
    query: Object.assign({}, this.props.query, {
      enabled: this.props.query.text.length > 0,
    })
  }

  handleInputChange = (event) => {
    const value = event.target.value;

    this.setState({
      query: {
        text: value,
        enabled: value.length > 0,
      },
    });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter' && event.target.value.match(/[^\s]+/)) {
      this.props.onQueryChange({
        text: "&natural_language_query=" + this.state.query.text.replace(" ", "%")
      });
    }
  }

  handleSearchClick = () => {
    if (this.state.query && this.state.query.text.match(/[^\s]+/)) {
      this.props.onQueryChange({
        text: "&natural_language_query=" + this.state.query.text.replace(" ", "%")
      });
    }
  }

  render() {
    return (
      <section className="_full-width-row query query_collapsed">
        <div className="_container _container_large">
          <div className="query--flex-container">
            <div className="query--text-input-container">
              <div className="query--search-container">
                <TextInput
                  onInput={this.handleInputChange}
                  onKeyPress={this.handleKeyPress}
                  defaultValue={this.state.query.text || ''}
                  placeholder="What would you like to read about?"
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
          </div>
        </div>
      </section>
    );
  }
}
