import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Configurations from './pages/Configurations';
import Game from './pages/Game';
import Home from './pages/Home';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/game" component={ Game } />
      {/* <Route path="/game/:id" render={ (props) => <Game { ...props } /> } /> */}
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/config" component={ Configurations } />
      <Route exact path="/ranking" component={ Ranking } />
    </Switch>

  );
}
