import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Landing from './components/Landing';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Landing}/>
          <Route path="/campaigns/:id" component={Home}/>
          <Route component={Landing}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
