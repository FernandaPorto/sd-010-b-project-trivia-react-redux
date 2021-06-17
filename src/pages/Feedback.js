import React, { Component } from 'react';

import MsgFeedback from '../components/MsgFeedback';
import MsgTotalPlacar from '../components/MsgTotalPlacar';

class Feedback extends Component {
  render() {
    return (
      <div>
        <h1>Feedback</h1>
        <MsgFeedback />
        <MsgTotalPlacar />
      </div>
    );
  }
}

export default Feedback;
