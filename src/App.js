import React from 'react';
import { Route, Switch } from 'react-router';

<<<<<<< HEAD
import { Game, Login, Settings, Feedback } from './pages'
=======
import Game from './pages/Game';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
>>>>>>> ec9d40c1ac173d368cbfcc5f51baafa333825e47

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
<<<<<<< HEAD
        <Route exact path="/game" component={ Game } />
        <Route exact path="/feedback" component={ Feedback } />
=======
        <Route exact path="/start" component={ Game } />
>>>>>>> ec9d40c1ac173d368cbfcc5f51baafa333825e47
      </Switch>
    );
  }
}

export default App;
