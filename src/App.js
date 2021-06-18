import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import GamePage from './pages/GamePage';
import FeedbackPage from './pages/FeedbackPage';
import RankingPage from './pages/RankingPage';

function App() {
  return (
    <>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/settings" component={ Settings } />
          <Route exact path="/game" component={ GamePage } />
          <Route exact path="/feedback" component={ FeedbackPage } />
          <Route exact path="/ranking" component={ RankingPage } />
        </Switch>
      </div>
      <footer>
        Grupo 11 - Project TrybeTrivia - 2021 - TryB-X
        <span role="img" aria-label="green-heart">💚</span>
      </footer>
    </>
  );
}

export default App;
