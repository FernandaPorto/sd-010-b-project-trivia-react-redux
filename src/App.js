import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import { TriviaGame, Settings, Login } from './pages';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/trivia" component={ TriviaGame } />
      <Route path="/settings" component={ Settings } />
    </Switch>
  );
}
