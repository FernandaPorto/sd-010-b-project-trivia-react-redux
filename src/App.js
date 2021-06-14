import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Settings from './components/Settings';
import Login from './components/Login';
import './App.css';

export default function App() {
  return (
    <div>
      <h1>ko</h1>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </div>

  );
}
