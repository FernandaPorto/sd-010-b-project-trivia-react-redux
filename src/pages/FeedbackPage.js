import React, { Component } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import FeedbackMessages from '../components/FeedbackMessages';

class FeedbackPage extends Component {
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
