import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import { TriviaGame, Settings, Login, FeedBack, Ranking } from './pages';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/trivia" component={ TriviaGame } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ FeedBack } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
