import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { pointsAction } from '../Actions';

const ONE_SECOND = 1000;
class Trivia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      seconds: 30,
      redirect: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    this.cronometer = setInterval(() => {
      this.setState((state) => ({ seconds: state.seconds - 1 }));
    }, ONE_SECOND);
    const countScore = {
      player: {
        assertions: 0,
        score: 0,
      },
    };
    localStorage.setItem('state', JSON.stringify(countScore));
  }

  componentDidUpdate(_prevProps, prevState) {
    const MinSeconds = 0;
    if (prevState.seconds === MinSeconds) {
      this.changeState();
    }
  }

  componentWillUnmount() {
    clearInterval(this.cronometer);
  }

  changeState() {
    this.setState({ seconds: 30 });
    this.correctAnswer();
  }

  handleClick() {
    const { count } = this.state;
    const THREE = 3;
    const contador = count;
    if (count > THREE) {
      this.setState({ redirect: true });
    }
    this.setState({ count: contador + 1, seconds: 30 });
    const btnC = document.querySelectorAll('#correct');
    const btnE = document.querySelectorAll('#errada');
    const btnNext = document.querySelector('#next');
    const timer = document.querySelector('#id-timer');

    timer.style.display = 'inline-block';
    btnNext.style.display = 'none';
    btnC.forEach((e) => {
      e.style.border = '1px solid';
      e.disabled = false;
    });
    btnE.forEach((e) => {
      e.style.border = '1px solid';
      e.disabled = false;
    });
  }

  correctAnswer(event) {
    const btnC = document.querySelectorAll('#correct');
    const btnE = document.querySelectorAll('#errada');
    const btnNext = document.querySelector('#next');
    const timer = document.querySelector('#id-timer');
    btnNext.style.display = 'inline-block';

    timer.style.display = 'none';
    btnC.forEach((e) => {
      e.style.border = '3px solid rgb(6, 240, 15)';
      e.disabled = true;
    });
    btnE.forEach((e) => {
      e.style.border = '3px solid rgb(255, 0, 0)';
      e.disabled = true;
    });
    if (event !== undefined && event.target.id === 'correct') {
      this.calcScore();
    }
  }

  calcScore() {
    const { name, email, setPoints, questions } = this.props;
    const { count, seconds } = this.state;
    const maxDifficulty = 3;
    let difficulty = 0;
    if (questions[count].difficulty === 'easy') {
      difficulty = 1;
    } else if (questions[count].difficulty === 'medium') {
      difficulty = 2;
    } else if (questions[count].difficulty === 'hard') {
      difficulty = maxDifficulty;
    }
    const prevScore = localStorage.getItem('state');
    const BASE_POINTS = 10;
    const calc = prevScore ? JSON.parse(prevScore).player.score : 0;
    const totalPoints = BASE_POINTS + (seconds * difficulty);

    const countScore = {
      player: {
        name,
        assertions: count + 1,
        score: totalPoints + calc,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(countScore));
    setPoints(countScore);
  }

  renderquestionCorrect() {
    const { questions } = this.props;
    const { count } = this.state;
    return (
      <button
        id="correct"
        type="button"
        data-testid="correct-answer"
        onClick={ this.correctAnswer }
      >
        {questions[count].correct_answer}
      </button>
    );
  }

  renderWrong1() {
    const { questions } = this.props;
    const { count } = this.state;
    return (
      <button
        id="errada"
        type="button"
        data-testid={ `wrong-answer-${0}` }
        onClick={ this.correctAnswer }
      >
        {questions[count].incorrect_answers[0]}
      </button>);
  }

  renderWrong2() {
    const { questions } = this.props;
    const { count } = this.state;
    return (
      <button
        id="errada"
        type="button"
        data-testid={ `wrong-answer-${1}` }
        onClick={ this.correctAnswer }
      >
        {questions[count].incorrect_answers[1]}
      </button>
    );
  }

  renderWrong3() {
    const { questions } = this.props;
    const { count } = this.state;
    return (
      <button
        id="errada"
        type="button"
        data-testid={ `wrong-answer-${2}` }
        onClick={ this.correctAnswer }
      >
        {questions[count].incorrect_answers[2]}
      </button>);
  }

  render() {
    const { questions } = this.props;
    const { count, seconds, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/feedback" />;
    }
    if (questions) {
      const respostas = [this.renderquestionCorrect(),
        this.renderWrong1(), this.renderWrong2(), this.renderWrong3()];
      return (
        <>
          <h4 data-testid="question-category">{questions[count].category}</h4>
          <h1 data-testid="question-text">{questions[count].question }</h1>
          <ul>
            {(questions[count].incorrect_answers.length > 2) ? respostas[3] : null }
            {respostas[1]}
            {respostas[0]}
            {(questions[count].incorrect_answers.length > 2) ? respostas[2] : null }
          </ul>

          <button
            id="next"
            style={ { display: 'none' } }
            data-testid="btn-next"
            type="button"
            onClick={ this.handleClick }
          >
            Next
          </button>
          <h4 id="id-timer">{seconds}</h4>
        </>);
    }
    return (
      <div />
    );
  }
}
Trivia.propTypes = {
  questions: PropTypes.shape(PropTypes.string),

}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  setPoints: (points) => dispatch(pointsAction(points)),
});

const mapStateToProps = (state) => ({
  questions: state.loginReducer.payload,
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
