import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import Login from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={ store }>
        <Login />
      </Provider>
    </BrowserRouter>
  );
}
