import React from 'react';
import { Route, Switch } from 'react-router';

import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/start" component={ Game } />
        <Route exact path="/feedback" component={ Feedback } />
      </Switch>
    );
  }
}

export default App;
