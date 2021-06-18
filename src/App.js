import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import GamePlay from './pages/GamePlay';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';
import FeedbackScreen from './pages/FeedbackScreen';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/game" component={ GamePlay } />
        <Route exact path="/ranking" component={ Ranking } />
        <Route exact path="/feedback" component={ FeedbackScreen } />
      </Switch>
    );
  }
}
