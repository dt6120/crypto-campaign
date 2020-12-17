import React, { Component } from 'react';
import campaign from '../../ethereum/campaign';

import { CampaignTron } from '../UI/Helper';
import { Route, Switch } from 'react-router-dom';

import Details from './Details';
import Requests from './Requests';
import CreateRequest from './CreateRequest';

class Home extends Component {
    state = {
        manager: "",
        campaignName: ""
    }

    async componentDidMount() {
        this.campaign = campaign(this.props.match.params.id);
        const manager = await this.campaign.methods.manager().call();
        const campaignName = await this.campaign.methods.campaignName().call();
        this.setState({
            manager, 
            campaignName
        });
    }


    render() {
        return (
            <div className="animated fadeIn">
                <CampaignTron campaignName={this.state.campaignName} manager={this.state.manager} contractAddress={this.props.match.params.id} />
                <div className="container">
                    <Switch>
                        <Route path={this.props.match.url + '/requests'} render={() => <Requests {...this.props}/> } />
                        <Route path={this.props.match.url + '/create-request'} render={() => <CreateRequest contractAddress={this.props.match.params.id} />} />
                        <Route path={this.props.match.url} render={() => <Details {...this.props}/>} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Home;
