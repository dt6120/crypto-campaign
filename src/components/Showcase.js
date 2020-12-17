import React, { Component } from 'react';
import { ShowCard } from './UI/Helper';
import { Link } from 'react-router-dom';

import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';

class Showcase extends Component {
    state = {
      renderCampaigns: null,
      otherNetwork: null,
    };
  
    async componentDidMount() {
      
        const network = await web3.eth.net.getNetworkType();
        if (network !== 'rinkeby') {
          this.setState({ otherNetwork: network });
        }
  
        const campaigns = await factory.methods.getDeployedCampaigns().call();
  
        const campaignCards = campaigns.map(address => {
          return <ShowCard address={address} key={address} route={address} />;
        });
  
        this.setState({ renderCampaigns: campaignCards });
       
    }
    
  
    render() {
      let networkError = this.state.otherNetwork ? (
        <div
          className="alert alert-danger z-depth-2 text-center animated fadeIn"
          role="alert"
          style={{ fontSize: '25px', marginTop: '75px' }}
        >
          <div className="mt-3 mb-3">
            You are on the{' '}
            <strong>{this.state.otherNetwork.toUpperCase()}</strong> network. At
            this moment in time, Ethstarter operates only on the{' '}
            <strong>Rinkeby</strong> network. Therefore, in order to use
            Ethstarter, please switch the network type in your Metamask extension
            to Rinkeby.
          </div>
        </div>
      ) : null;
  
      return (
        <div className="container mt-5 mb-5 animated fadeIn">
          <div className="clearfix center">
            <Link to="/create-campaign">
            <a class="waves-effect waves-light btn grey" >Create <i class="fas fa-arrow-circle-right material-icons right"></i></a>
            </Link>
            <br/>
          </div>
          <h1 className="mt-2">Open Campaigns</h1>
          <div className="mt-5">{this.state.renderCampaigns}</div>
          {networkError}
        </div>
      );
    }
  }
  
  export default Showcase;
