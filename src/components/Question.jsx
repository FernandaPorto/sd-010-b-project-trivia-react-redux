/* eslint-disable react/no-danger */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.getQuestions = this.getQuestions.bind(this);

    this.state = {
      questions: [],
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

  render() {
    const { questions } = this.state;
    return (
      questions.length > 0 ? (
        <div>
          <p
            data-testid="question-category"
          >
            { questions[0].category }
          </p>
          <h2
            data-testid="question-text"
            dangerouslySetInnerHTML={ { __html: questions[0].question } }
          />
          <div>
            <div>
              <button
                type="button"
                data-testid="correct-answer"
              >
                {questions[0].correct_answer}
              </button>
              {questions[0].incorrect_answers.map(
                (elem, index) => (
                  <button
                    type="button"
                    data-testid={ `wrong-answer-${index}` }
                    key={ index }
                  >
                    { elem }
                  </button>
                ),
              )}
            </div>

          </div>
        </div>) : (<h2>Loading...</h2>)
    );
  }
}

const mapStateToProps = (state) => ({
  tok: state.api.token,
});

Question.propTypes = {
  tok: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Question);
