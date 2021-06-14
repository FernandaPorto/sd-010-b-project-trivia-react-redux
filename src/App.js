import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';

import Login from './pages/Login';
import Settings from './pages/Settings';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    );
  }
}

export default App;
