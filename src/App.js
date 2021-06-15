import React from 'react';
import { Route, Switch } from 'react-router';
// import logo from './trivia.png';
import './App.css';
import GamePage from './pages/GamePage';
import Login from './pages/Login';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={ logo } className="App-logo" alt="logo" /> */}
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/setting" component={ Settings } />
          <Route exact path="/game" component={ GamePage } />
        </Switch>
      </header>
    </div>
  );
}
