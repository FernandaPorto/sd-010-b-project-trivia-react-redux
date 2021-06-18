import React from 'react';
import { Switch, Route } from 'react-router';
import LoginPage from './pages/LoginPage';
import './App.css';
import GamePage from './pages/GamePage';
import FeedBackPage from './pages/FeedBackPage';
import RankingPage from './pages/RankingPage';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ LoginPage } />
      <Route exact path="/game" component={ GamePage } />
      <Route exact path="/feedback" component={ FeedBackPage } />
      <Route exact path="/ranking" component={ RankingPage } />
    </Switch>
  );
}
