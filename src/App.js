import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Jogo from './pages/Jogo';
import Home from './Home';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/jogo" component={ Jogo } />
          <Route path="/settings" component={ Settings } />
          <Route exact path="/" component={ Home } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
