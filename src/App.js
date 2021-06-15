import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import GamePlay from './pages/GamePlay';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/game" component={ GamePlay } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}
