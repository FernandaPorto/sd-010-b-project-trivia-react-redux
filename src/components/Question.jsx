import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Questionaire from './Questionaire';
import { assertionsPlayer } from '../actions/index';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.getQuestions = this.getQuestions.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleAssertions = this.handleAssertions.bind(this);

    this.state = {
      questions: [],
      currentIndex: 0,
      assertions: 0,
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const { tok } = this.props;
    const apiQuestion = (`https://opentdb.com/api.php?amount=5&token=${tok}`);
    const response = await fetch(apiQuestion);
    const data = await response.json();
    this.setState({
      questions: data.results,
    });
  }

  handleAnswer(answer) {
    const { currentIndex, questions } = this.state;
    const newIndex = currentIndex + 1;
    this.setState({
      currentIndex: newIndex,
    });
    if (answer === questions[currentIndex].correct_answer) {
      this.setState((prev) => ({
        assertions: prev.assertions + 1,
      }));
    }
  }

  handleAssertions() {
    const { assertions } = this.state;
    const { points } = this.props;
    points({ assertions });
  }

  render() {
    const { questions, currentIndex } = this.state;
    console.log(questions);
    return questions.length > 0 ? (
      <div className="container">
        {currentIndex >= questions.length ? (
          <Redirect to="/score" />
        ) : (
          <Questionaire
            data={ questions[currentIndex] }
            handleAnswer={ this.handleAnswer }
            handleAssertions={ this.handleAssertions }
          />
        )}
      </div>
    ) : (
      <h2>Loading...</h2>

    );
  }
}

const mapStateToProps = (state) => ({
  tok: state.api.token,
});

const mapDispatchToProps = (dispatch) => ({
  points: (assertions) => dispatch(assertionsPlayer(assertions)),
});

Question.propTypes = {
  tok: PropTypes.string.isRequired,
  points: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
