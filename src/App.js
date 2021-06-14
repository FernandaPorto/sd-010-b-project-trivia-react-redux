import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './pages/Home';
import TriviaGame from './pages/TriviaGame';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route path="/game" component={ TriviaGame } />
      <Route path="/settings" component={ Settings } />
      <Route exact path="/" component={ Home } />
    </Switch>
  );
}
