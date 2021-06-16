import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/quiz" component={ Quiz } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
