import React, { Component } from 'react';
import { Icon, Alert } from 'watson-react-components';
import { fields } from './fields';
import Query from './Query/index';
import TopEntities from './TopEntities/index';
import TopStories from './TopStories/index';
import AnomalyDetection from './AnomalyDetection/index';
import SentimentAnalysis from './SentimentAnalysis/index';
import MentionsAndSentiments from './MentionsAndSentiments/index';
import NoResults from './NoResults/index';

const hasResults = entities =>
  entities.aggregations && entities.aggregations.length > 0 &&
  entities.aggregations[0].field === fields.title_entity_text;

const parseQueryResults = (data) => {
  const parsedData = {
    results: data.results, // Top Results
    entities: {}, // Topic cloud
    sentiments: [], // Sentiment by source
    sentiment: [], // Overall sentiment
    mentions: null, // Mentions and Sentiments
    anomalyData: null, // Anomaly data
  };

  data.results.forEach((result) => {
    let title = result.extracted_metadata.title;
    let sentiment_label = result.enriched_text.sentiment.document.label;
    let sentiment_score = result.enriched_text.sentiment.document.score;
    parsedData.sentiments.push({title: title, sentiment_label: sentiment_label, sentiment_score: sentiment_score});
  });

  data.aggregations.forEach((aggregation) => {
    // sentiments by source
    // if (aggregation.type === 'term' && aggregation.field === fields.host) {
    //   parsedData.sentiments = aggregation;
    // }
    // Overall sentiment
    if (aggregation.type === 'term' && aggregation.field === fields.text_document_sentiment_type) {
      parsedData.sentiment = aggregation;
    }

    // if (aggregation.type === 'term' && aggregation.field === fields.title_concept_text) {
    //   parsedData.entities.topics = aggregation.results;
    // }

    // // Mentions and sentiments
    // if (aggregation.type === 'filter' &&
    //   'aggregations' in aggregation &&
    //   aggregation.aggregations[0].field === fields.title_entity_text) {
    //   parsedData.mentions = aggregation;
    // }

    // if (aggregation.type === 'nested' && aggregation.path === fields.title_entity) {
    //   const entities = aggregation.aggregations;
    //   if (entities && entities.length > 0 && hasResults(entities[0])) {
    //     if (entities[0].match === `${fields.title_entity_type}:Company`) {
    //       parsedData.entities.companies = entities[0].aggregations[0].results;
    //     }
    //     if (entities[0].match === `${fields.title_entity_type}:Person`) {
    //       parsedData.entities.people = entities[0].aggregations[0].results;
    //     }
    //   }
    // }

    // if (aggregation.type === 'timeslice' && aggregation.anomaly) {
    //   parsedData.anomalyData = aggregation.results;
    // }
  });

  return parsedData;
};

export default class Demo extends Component {
  state = {
    query: null,
    error: null,
    data: null,
    loading: false,
  }

  handleQueryChange = (query) => {
    this.fetchNewData(query);
  }
  /**
   * Call the query API every time the query change.
   */
  fetchNewData = (query) => {
    console.log(query);
    this.setState({ query, loading: true, error: null, data: null });
    var xmlhttp = null;
    var response = null;
    var responseThis = this;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }

    var baseUrl = "https://gateway.watsonplatform.net/discovery/api/v1/environments/2d733f0f-ffcd-4b29-ac16-41f677a0732d/collections/ce6bb4be-278f-49c8-9927-0c5dfb530b6e/query?version=2017-11-07";
    var url = baseUrl + query.text + "&count=5" + "&aggregation=term%28enriched_text.sentiment.document.label%2Ccount%3A5%29";
    console.log(url);

    xmlhttp.onreadystatechange=function()
    {
      if (xmlhttp.readyState===4 && xmlhttp.status===200)
      {
        response = JSON.parse(xmlhttp.responseText);
        console.log(response);
        responseThis.setState({ loading: false, data: parseQueryResults(response) });
      }
    }

    xmlhttp.open("GET", url, true, "15806e2f-d3c0-4bab-8637-142a21ddf8e8", "DPvn4KmxC1RO");
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.withCredentials = true;
    xmlhttp.send();   

    // scroll to the loading bar
    window.scrollTo(100, 344);
  }

  render() {
    return (
      <div className="demo-container--div">
        <Query onQueryChange={this.handleQueryChange} query={this.state.query} />
        {
          this.state.loading &&
            (
              <div className="results">
                <div className="loader--container">
                  <Icon type="loader" size="large" />
                </div>
              </div>
            )
        }
        {
          this.state.error && (
            <div className="error--container">
              <Alert type="error" color="red">
                <p className="base--p">
                  { this.state.error.error }
                </p>
              </Alert>
            </div>
          )
        }
        {
          !this.state.error &&
          !this.state.loading &&
          this.state.data &&
          this.state.data.results.length > 0
            ?
            (
              <div className="results">
                <div className="_container _container_large">
                  <div className="row">
                    <div className="results--panel-1">
                      <TopStories
                        query={this.state.query}
                        stories={this.state.data.results}
                        onShowCode={this.toggleTopResults}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="results--panel-3">
                      <SentimentAnalysis
                        query={this.state.query}
                        sentiments={this.state.data.sentiments}
                        sentiment={this.state.data.sentiment}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
            : !this.state.loading && this.state.data && (
              <NoResults query={this.state.query} />
            )
        }
      </div>
    );
  }
}
