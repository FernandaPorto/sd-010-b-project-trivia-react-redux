import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Setting from './pages/Setting';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/setting" component={ Setting } />
      <Route exact path="/gameScreen" component={ Game } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/ranking" component={ Ranking } />
    </Switch>
  );
}
