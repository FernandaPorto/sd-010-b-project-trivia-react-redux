import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import store from './store';

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={ store }>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/game" component={ Game } />
          <Route exact path="/settings" component={ Settings } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}
