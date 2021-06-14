import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Game from './Pages/Game';
import Login from './Pages/Login';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/jogo" component={ Game } />
      </Switch>
    </div>
  );
}
