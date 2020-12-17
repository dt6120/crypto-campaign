import React, { Component } from 'react';

class Home extends Component {
	render() {
    return (
      <div className="container">
          <h1 className="section center">Welcome to Crypto Campaign</h1>
        <div className="section center">
          <button className="waves-effect waves-light btn">View Campaigns</button>&nbsp;
          <button class="btn waves-effect waves-light" type="submit" name="action">Create Campaign
          </button>
        </div>
        <div className="divider"></div>
      </div>
    );
	}
}

export default Home;
