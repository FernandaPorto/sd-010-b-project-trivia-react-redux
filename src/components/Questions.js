import React, { Component } from 'react';
import { connect } from 'react-redux';

class Questions extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      ...props,
      answers: [],
      timer: 30,
    };
    this.randAnswers = this.randAnswers.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
  }

  // REFERÊNCIA https://github.com/tryber/sd-10b-live-lectures/blob/lecture/13.1/cronometer/src/components/Cronometer.jsx

  componentDidMount() {
    const { nextAnswer } = this.state;
    nextAnswer(false);
    const second = 1000;
    this.randAnswers();
    this.cronometerInterval = setInterval(() => {
      this.setState((state) => ({ timer: state.timer - 1 }));
    }, second);
  }

  componentDidUpdate(_, prev) {
    const clear = () => {
      const { nextAnswer } = this.state;
      nextAnswer(true);
      this.setState({ timer: 0 });
      clearInterval(this.cronometerInterval);
    };
    if (prev.timer === 0) clear();
  }

  componentWillUnmount() {
    clearInterval(this.cronometerInterval);
  }

  randAnswers() {
    const { correct_answer: correct, incorrect_answers: incorrect } = this.state;
    const answers = [correct, ...incorrect];
    const newArr = [];
    while (newArr.length < answers.length) {
      const rand = Math.floor(Math.random() * answers.length);
      if (!newArr.includes(answers[rand])) newArr.push(answers[rand]);
    }
    this.setState({ answers: newArr });
  }

  renderAnswers() {
    const { correct_answer: correct, answers, timer, nextAnswer } = this.state;
    const { next } = this.props;
    return answers.map((answer, idx) => {
      const checkColor = answer === correct
        ? '3px solid rgb(6, 240, 15)'
        : '3px solid rgb(255, 0, 0)';

      const checkIsCorrect = answer === correct
        ? 'correct-answer'
        : `wrong-answer-${idx}`;

      return (
        <button
          style={ { border: `${next || !timer ? checkColor : ''}` } }
          key={ answer }
          type="button"
          data-testid={ checkIsCorrect }
          onClick={ () => !next && nextAnswer(true) }
          disabled={ !timer }
        >
          {answer}
        </button>
      );
    });
  }

  render() {
    const { category, question, timer } = this.state;
    return (
      <div>
        <p>{ timer }</p>
        <h3 data-testid="question-category">{category}</h3>
        <h3 data-testid="question-text">{question}</h3>
        {this.renderAnswers()}
      </div>
    );
  }
}

const mapStateToProps = ({ user: { triviaGame } }) => ({
  triviaGame,
});

// const mapDispatchToProps = (dispatch) => ({

// });

export default connect(mapStateToProps)(Questions);
