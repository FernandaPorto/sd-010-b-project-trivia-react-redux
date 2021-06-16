import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderGame from '../components/HeaderGame';
import Answers from '../components/Answers';

class GamePlay extends React.Component {
  constructor() {
    super();

    this.state = {
      questionIndex: 0,
    };
  }

  render() {
    const { questionIndex } = this.state;
    const { questions } = this.props;

    return (
      <div>
        <HeaderGame />
        <div>
          <h3
            data-testid="question-category"
          >
            { questions && questions[questionIndex].category }
          </h3>
          <p
            data-testid="question-text"
          >
            { questions && questions[questionIndex].question }
          </p>
        </div>
        <div>
          { questions && <Answers
            correct={ questions[questionIndex].correct_answer }
            incorrect={ questions[questionIndex].incorrect_answers }
          /> }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.triviaGame.questions,
});

GamePlay.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(GamePlay);
