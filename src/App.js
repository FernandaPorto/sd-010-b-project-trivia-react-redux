import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Setting from './pages/Setting';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/setting" component={ Setting } />

    </Switch>
  );
}
