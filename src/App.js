import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Game from './Pages/Game';
import Login from './Pages/Login';
import Configuracoes from './Pages/Configuracoes';
import Feedback from './Pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/jogo" component={ Game } />
        <Route exact path="/configuracoes" component={ Configuracoes } />
        <Route exact path="/feedback" component={ Feedback } />
      </Switch>
    </div>
  );
}
