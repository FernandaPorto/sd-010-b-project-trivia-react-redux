import React from 'react';
import { Switch, Route } from 'react-router';
import LoginPage from './pages/LoginPage';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ LoginPage } />
    </Switch>
  );
}
