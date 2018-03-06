import React, { Component } from 'react';
import { string, bool, shape, func } from 'prop-types';
import { TextInput, Icon, ButtonsGroup } from 'watson-react-components';

export default class Collapsed extends Component {
  static propTypes = {
    onQueryChange: func.isRequired,
    query: shape({
      text: string,
      emotion: string,
      enabled: bool,
    }).isRequired,
  }

  state = {
    query: Object.assign({}, this.props.query, {
      enabled: this.props.query.text.length > 0,
    })
  }

  state = {
    emotion: null,
    query: Object.assign({}, this.props.query, {
      enabled: this.props.query.text.length > 0,
    }),
    emotionButtons: [
      {
        value: 'none',
        id: 'rb-0',
        text: 'No Filter',
        selected: true
      },
      {
        value: 'joy',
        id: 'rb-1',
        text: 'Joy'
      },
      {
        value: 'anger',
        id: 'rb-2',
        text: 'Anger'
      },
      {
        value: 'fear',
        id: 'rb-3',
        text: 'Fear'
      },
      {
        value: 'sadness',
        id: 'rb-4',
        text: 'Sadness'
      },
    ],
  }

  onEmotionChange = () => {
    this.props.onQueryChange({
      text: this.state.query.text,
      emotion: this.state.emotion
    });
  }

  buttonState = () => (this.state.query.enabled ?
    ('query--date-buttons-container') :
    ('query--date-buttons-disabled query--date-buttons-container'))

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
        text: this.state.query.text,
        emotion: this.state.emotion
      });
    }
  }

  handleSearchClick = () => {
    if (this.state.query && this.state.query.text.match(/[^\s]+/)) {
      this.props.onQueryChange({
        text: this.state.query.text,
        emotion: this.state.emotion
      });
    }
  }

  emotionButtonChanged = (e) => {
    let newEmotion;
    const newButtonState = this.state.emotionButtons.map((item) => {
      const newItem = Object.assign({}, item, {
        selected: item.value === e.target.value,
      });
      if (newItem.selected) {
        newEmotion = newItem.value;
      }
      return newItem;
    });
    this.setState({
      emotion: newEmotion,
      emotionButtons: newButtonState
    }, this.onEmotionChange);
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
            <div className={this.buttonState()}>
              <ButtonsGroup
                type="radio"
                name="radio-buttons"
                onChange={this.emotionButtonChanged}
                buttons={this.state.emotionButtons}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
