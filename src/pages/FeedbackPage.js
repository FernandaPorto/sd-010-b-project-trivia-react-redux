import React, { Component } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import FeedbackMessages from '../components/FeedbackMessages';

class FeedbackPage extends Component {
  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    const state = JSON.parse(localStorage.getItem('state'));
    ranking.push(state.player);
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    return (
      <div>
        <HeaderComponent />
        <FeedbackMessages />
      </div>
    );
  }
}

export default FeedbackPage;
