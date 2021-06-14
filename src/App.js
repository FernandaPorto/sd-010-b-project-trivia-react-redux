import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import store from './store';
import Login from './pages/Login';
import GamePage from './pages/GamePage';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={ store }>
        <Switch>
          <Route path="/gamepage" component={ GamePage } />
          <Route path="/settings" component={ Settings } />
          <Route exact path="/" component={ Login } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}
