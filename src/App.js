import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Login from './pages/Login';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';

export default class App extends React.Component {
  return (
    <div className="App">
      <Switch>
        <Route path="/setting" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/game" component={ Game } />
        <Route path="/" component={ Login } />
      </Switch>
    </div>
  );
}
