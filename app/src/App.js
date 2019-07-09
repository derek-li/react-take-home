import React, { Component } from 'react';
import './App.css';

import Campaign from './components/campaign';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      campaigns: []
    };
  }

  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.plugco.in/public/take_home_sample_feed");
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.response);
        this.setState({ campaigns: data.campaigns });
      }
    }.bind(this);
    xhr.send();
  }

  renderCampaigns() {
    const campaigns = this.state.campaigns;

    if (campaigns.length !== 0) {
      return campaigns.map(function(campaign, i) {
        return (
          <Campaign
            key={i}
            campaign={campaign}
          />
        );
      }, this);
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderCampaigns()}
      </div>
    );
  }
  
}

export default App;
