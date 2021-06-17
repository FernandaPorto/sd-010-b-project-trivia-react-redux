import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

import Question from '../components/Question';
import GameHeader from '../components/GameHeader';

const FIVE = 5;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
    };

    this.getQuestions = this.getQuestions.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const { token } = this.props;
    const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const { results } = await request.json();
    this.setState({
      questions: results,
    });
  }

  handleNextQuestion() {
    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1,
    }));
  }

  render() {
    const { questions, questionIndex } = this.state;

    if (questionIndex === FIVE) {
      return (<Redirect to="/" />);
    }

    return (
      <section>
        <GameHeader />
        <main>
          { questions ? (
            <main>
              <Question
                result={ questions[questionIndex] }
                handleNext={ this.handleNextQuestion }
              />
            </main>
          ) : <p>Loading...</p> }
        </main>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { player: { token } } = state;
  return {
    token,
  };
};

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
