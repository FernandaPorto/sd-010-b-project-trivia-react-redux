import React from 'react';
import { connect } from 'react-redux';
import FeedbackHeader from './FeedbackHeader';

class Feedback extends React.Component {
  render() {
    return (
      <FeedbackHeader />
    );
  }
}

export default connect(null)(Feedback);
