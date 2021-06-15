import React from 'react';
import { Route, Switch } from 'react-router';

import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/start" component={ Game } />
      </Switch>
    );
  }
}

export default App;
