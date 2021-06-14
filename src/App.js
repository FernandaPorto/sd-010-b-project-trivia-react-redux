import React from 'react';
import { Route } from 'react-router';
import Login from './pages/Login';
import Game from './pages/Game';
import './App.css';

export default function App() {
  return (
    <>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
    </>
  );
}
