import React from 'react';

import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Settings from './pages/Settings';


export default class App extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/settings" component={Settings} />



      </Switch>
    );

  }
}
