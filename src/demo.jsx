import React, { Component } from 'react';
import { Icon, Alert } from 'watson-react-components';
import { fields } from './fields';
import Query from './Query/index';
import TopPassages from './TopPassages/index';
import TopBooks from './TopBooks/index';
import SentimentAnalysis from './SentimentAnalysis/index';
import NoResults from './NoResults/index';

const parseQueryResults = (data) => {
  const parsedData = {
    results: data.results, // Top Results
    passages: data.passages,
    parsablePassages: data.passages,
    passageData: [],
    sentiments: [], // Sentiment by source
    sentiment: [] // Overall sentiment
  };


  parsedData.results.forEach((result) => {

    // set variables
    let id = result.id;
    let title = result.extracted_metadata.title;
    let sentiment_label = result.enriched_text.sentiment.document.label;
    let sentiment_score = result.enriched_text.sentiment.document.score;

    // sentiments by book title
    parsedData.sentiments.push({title: title, sentiment_label: sentiment_label, sentiment_score: sentiment_score});
    
    // to extract top passages later
    parsedData.passageData.push({id: id, title: title, text: null});
  });

  parsedData.parsablePassages.forEach((passage) => {
    // set variables
    let id = passage.document_id;

    // avoid using html field of returned passages
    if (passage.field === "text") { 
      let i;
      for (i= 0; i < parsedData.passageData.length; i++) {
        if (id === parsedData.passageData[i].id) { // only return passages from the top book results
          parsedData.passageData[i].text = passage.passage_text;
        }
      }
    }
  });

  data.aggregations.forEach((aggregation) => {
    // Overall sentiment
    if (aggregation.type === 'term' && aggregation.field === fields.text_document_sentiment_type) {
      parsedData.sentiment = aggregation;
    }
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
    this.setState({ query, loading: true, error: null, data: null });

    // set variables
    var xmlhttp = null;
    var response = null;
    var responseThis = this; // used for binding this to XMLHttpRequest's module

    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }

    // use natural language query with the Watson Discovery API
    var text = "&natural_language_query=" + query.text.replace(" ", "%");

    // only include emotion filter if/when the user selects a specific emotion
    var emotion;
    if (query.emotion !== 'none') {
      emotion = "&filter=enriched_text.emotion.document.emotion." + query.emotion + "%3E%3D0.5";
    } else {
      emotion = "";
    }

    // construct url based on the natural language query, the selected emotion, and several hard-coded paramters such as aggregations
    var baseUrl = "https://gateway.watsonplatform.net/discovery/api/v1/environments/2d733f0f-ffcd-4b29-ac16-41f677a0732d/collections/ce6bb4be-278f-49c8-9927-0c5dfb530b6e/query?version=2017-11-07";
    var url = baseUrl + text + "&count=5&aggregation=term%28enriched_text.sentiment.document.label%2Ccount%3A5%29&passages=true&passages.count=100" + emotion;

    // once the request state has changed, handle the response
    xmlhttp.onreadystatechange=function()
    {
      if (xmlhttp.readyState===4 && xmlhttp.status===200)
      {
        response = JSON.parse(xmlhttp.responseText);
        responseThis.setState({ loading: false, data: parseQueryResults(response) });
      }
    }

    // set the XMLHttpRequest parameters and initiate the request
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
                      <TopBooks
                        query={this.state.query}
                        books={this.state.data.results}
                        onShowCode={this.toggleTopResults}
                      />
                    </div>
                    <div className="results--panel-2">
                      <TopPassages
                        passages={this.state.data.passageData}
                        onShowCode={this.toggleTopEntities}
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
