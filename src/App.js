import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import GamePage from './pages/GamePage';
import FeedbackPage from './pages/FeedbackPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/settings" component={ Settings } />
          <Route exact path="/game" component={ GamePage } />
          <Route exact path="/feedback" component={ FeedbackPage } />
        </Switch>
      </header>
    </div>
  );
}

export default App;
