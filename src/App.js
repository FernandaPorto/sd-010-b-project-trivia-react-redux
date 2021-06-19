import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import {
  TriviaGame,
  Settings,
  Login,
  FeedBack,
  Ranking,
  About,
} from './pages';
import './App.css';

export default function App() {
  const location = useLocation();
  const transitions = useTransition(location, {

    from: { x: 800, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: -800, opacity: 0 },

  });

  return (
    <>
      {transitions((props, item) => (
        <animated.div style={ props }>
          <Switch location={ item }>
            <Route exact path="/" component={ Login } />
            <Route path="/trivia" component={ TriviaGame } />
            <Route path="/settings" component={ Settings } />
            <Route path="/feedback" component={ FeedBack } />
            <Route path="/ranking" component={ Ranking } />
            <Route path="/about" component={ About } />
          </Switch>
        </animated.div>
      ))}

    </>
  );
}
