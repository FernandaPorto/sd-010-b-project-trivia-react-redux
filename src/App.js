import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './pages/Game';
import Login from './pages/Login';
import Configs from './pages/Configs';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/configs" component={ Configs } />
      <Route path="/jogar" component={ Game } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/Ranking" component={ Ranking } />
    </Switch>
  );
}
