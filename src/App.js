import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import store from './redux/store';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
// import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/settings" component={ Settings } />
          <Route path="/game" component={ Game } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
