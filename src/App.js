import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import store from './store';
import Login from './pages/Login';
import GamePage from './pages/GamePage';

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={ store }>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/gamepage" component={ GamePage } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}
