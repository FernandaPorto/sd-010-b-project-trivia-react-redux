import React from 'react';
import { Route } from 'react-router';
import Login from './pages/Login';
import Game from './pages/Game';
import Config from './pages/Config';
import './App.css';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route path="/config" component={ Config } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
    </>
  );
}
