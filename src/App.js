import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Configurations from './pages/Configurations';
import Game from './pages/Game';
import Home from './pages/Home';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      {/* <Route exact path="/game" component={ Game } /> */}
      <Route path='/game/:id' render={(props) => <Game {...props}/>} />
      <Route exact path="/config" component={ Configurations } />
    </Switch>

  );
}
