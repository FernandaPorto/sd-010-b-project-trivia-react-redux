import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FeedbackMessages extends Component {
  constructor(props) {
    super(props);

    this.messages = this.messages.bind(this);
  }

  componentDidMount() {
    this.messages();
  }

  messages(score) {
    const minScore = 3;
    const fail = 'Podia ser melhor...';
    const success = 'Mandou bem!';
    if (score < minScore) {
      return `${fail}
      Você acertou ${score} de 5.`;
    }
    if (score >= minScore) {
      return `${success}
      Você acertou ${score} de 5.`;
    }
  }

  render() {
    const { score } = this.props;
    return (
      <div>
        <span data-testid="feedback-text">{this.messages(score)}</span>
      </div>
    );
  }
}

FeedbackMessages.propTypes = {
  score: PropTypes.number.isRequired,
};

export default FeedbackMessages;
