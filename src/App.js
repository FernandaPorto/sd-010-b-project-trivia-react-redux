import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './pages/Home';
import TriviaGame from './pages/TriviaGame';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';
import GameFeedback from './pages/GameFeedback';

export default function App() {
  return (
    <Switch>
      <Route path="/game" component={ TriviaGame } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ GameFeedback } />
      <Route exact path="/" component={ Home } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
