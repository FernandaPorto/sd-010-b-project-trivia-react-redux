// Requisitos de 01 a 07 feitos em 13/06 em sessão de estudos com Henrique Clementino.

import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Jogo from './pages/Jogo';
import Home from './Home';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/jogo" component={ Jogo } />
          <Route path="/settings" component={ Settings } />
          <Route path="/feedback" component={ Feedback } />
          <Route exact path="/" component={ Home } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
