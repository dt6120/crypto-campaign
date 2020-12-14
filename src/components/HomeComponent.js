import React, { Component } from 'react';

class Home extends Component {
	render() {
    return (
      <div className="mt-1">
        <div className="jumbotron">
          <h1 className="container">Welcome to Crypto Campaign</h1>
        </div>
        <div className="container mb-5">
          <button className="btn btn-outline-info">View Campaigns</button>&nbsp;
          <button className="btn btn-outline-success">Create Campaign</button>
        </div>
        <hr className="container"></hr>
      </div>
    );
	}
}

export default Home;
