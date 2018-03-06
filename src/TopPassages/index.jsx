import React, { Component } from 'react';
import { string, shape, arrayOf } from 'prop-types';
import { Tabs, Pane } from 'watson-react-components';
import WidgetHeader from '../WidgetHeader/index';
import NoContent from '../NoContent/index';

export default class TopPassages extends Component {
  static propTypes = {
    passages: arrayOf(shape({
      id: string.isRequired,
      title: string.isRequired,
      text: string.isRequired
    })).isRequired,
    query: shape({
      text: string.isRequired
    }).isRequired
  }

  static widgetTitle() {
    return 'Top Passages';
  }

  static widgetDescription() {
    return 'Book titles by themselves just aren\'t enough. Look below to see passages from your top search results!';
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
    const { passages } = this.props;
    return (
      <div>
        <div className="top-entities widget">
          <WidgetHeader
            title={TopPassages.widgetTitle()}
            description={TopPassages.widgetDescription()}
            onShowQuery={this.onShowQuery}
          />
          <Tabs selected={0}>
            <Pane label={passages[0].title}>
              {
                passages[0].text !== null
                  ? (
                    <p>{passages[0].text}</p>
                  )
                  : (
                    <NoContent
                      message={'No passages found.'}
                    />
                  )
              }
            </Pane>
            <Pane label={passages[1].title}>
              {
                passages[1].text !== null
                  ? (
                    <p>{passages[1].text}</p>
                  )
                  : (
                    <NoContent
                      message={'No passages found.'}
                    />
                  )
              }
            </Pane>
            <Pane label={passages[2].title}>
              {
                passages[2].text !== null
                  ? (
                    <p>{passages[2].text}</p>
                  )
                  : (
                    <NoContent
                      message={'No passages found.'}
                    />
                  )
              }
            </Pane>
            <Pane label={passages[3].title}>
              {
                passages[3].text !== null
                  ? (
                    <p>{passages[3].text}</p>
                  )
                  : (
                    <NoContent
                      message={'No passages found.'}
                    />
                  )
              }
            </Pane>
            <Pane label={passages[4].title}>
              {
                passages[4].text !== null
                  ? (
                    <p>{passages[4].text}</p>
                  )
                  : (
                    <NoContent
                      message={'No passages found.'}
                    />
                  )
              }
            </Pane>
          </Tabs>
        </div>
      </div>
    );
  }
}
