import React, { Component } from 'react';
import Web3 from 'web3';
import Factory from '../build/contracts/Factory.json';
import Campaign from '../build/contracts/Campaign.json';
import Home from './HomeComponent';
import CampaignList from './CampaignListComponent';
import Spinner from './Spinner';

class Main extends Component {
	async componentDidMount() {
	    await this.loadWeb3();
	    await this.loadBlockchainData();
	}

  	async loadWeb3() {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
		} else {
			window.alert('Non-Ethereum browser detected. You should consider trying MetaMask');
		}
	}

	async loadBlockchainData() {
		const web3 = window.web3;

		// get the account linked with MetaMask
		const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		this.setState({ account: accounts[0] });

		// get the balance of the linked account in hex form
		// const balance = await window.ethereum.request({
		//   method: 'eth_getBalance',
		//   params: [this.state.account]
		// });
		// this.setState({ balance });

		// get the network id to which MetaMask node is connected
		const networkId = await web3.eth.net.getId();

		// load the instance of deployed contract on detected network id
		const factoryData = Factory.networks[networkId];

		if (factoryData) {
			const factory = await new web3.eth.Contract(Factory.abi, factoryData.address);
			this.setState({ factory });
			// await factory.methods.createCampaign(1000, 300, 'Test Campaign 4', 'Test product').send({ from: this.state.account });
			const deployedCampaignAddresses = await this.state.factory.methods.getDeployedCampaigns().call();
			if (deployedCampaignAddresses.length !== 0) {
				const campaignList = [];
				for (let i=0; i<deployedCampaignAddresses.length; i++) {
					let campaign = await new web3.eth.Contract(Campaign.abi, deployedCampaignAddresses[i]);
					let details = await campaign.methods.getCampaignDetails().call();
					let summary = {
						id: i,
						address: deployedCampaignAddresses[i],
						manager: details[0],
						name: details[1],
						product: details[2],
						minimumDonation: details[3],
						requests: details[4],
						backedBy: details[5],
						createdDate: details[6],
						lastDate: details[7],
						balance: details[8]
					}
					campaignList.push(summary);
				}
				this.setState({ campaignList });
			}
			console.log(this.state.campaignList);
		} else {
			window.alert('Factory token not deployed to detected network.');
		}

		this.setState({ loading: false });
	}

  constructor(props) {
  	super(props);

  	this.state = {
  		account: '0x0',
  		campaignList: [],
  		loading: true
  	}
  }

  render() {
  	let account, deployedCampaigns;
  	if (this.state.loading) {
  		deployedCampaigns = Spinner
  		account = Spinner
  	} else {
  		deployedCampaigns = <CampaignList list={this.state.campaignList}/>
  		account = this.state.account;
  	}

    return (
      <div className="App">
      	<nav className="nav-wrapper">
      		<div className="container">
			  	<a class="brand-logo" href="/">Crypto-Campaign</a>
      			<span className="right">Account connected: <b>{account}</b></span>
      		</div>
      	</nav>
      	<Home />
      	{deployedCampaigns}
      </div>
    );
  }
}

export default Main;
