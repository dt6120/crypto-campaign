import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Create from './Create.js';
import Showcase from './Showcase';
import { JumboTron, FooterCustom } from './UI/Helper';

export class Landing extends Component {
    render() {
        return (
            <div className="animated fadeIn">
                <JumboTron title="Crypto-Campaign" buttonText="Create">
                <strong>Welcome to Crypto-Campaign</strong>
                </JumboTron>
                <Switch>
                    <Route path="/create-campaign" exact component={Create}/>
                    <Route path="/" exact component={Showcase}/>
                </Switch>
                <FooterCustom />
            </div>
        )
    }
}

export default Landing;
