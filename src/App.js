import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Settings from './components/Settings';
import Trivia from './pages/Trivia';
import Login from './components/Login';
import './App.css';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
        <Route path="/gameplay" component={ Trivia } />
      </Switch>
    </div>

  );
}
