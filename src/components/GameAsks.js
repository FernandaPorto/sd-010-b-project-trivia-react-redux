import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GameAsks extends Component {
  render() {
    const { asksG } = this.props;
    console.log(asksG);
    return (
      <>
        {asksG.map((ask, index) => (
          <section key={ index }>
            <p data-testid="question-category">{ask.category}</p>
            <h1 data-testid="question-text">{ask.question}</h1>
            {ask.incorrect_answers.map((element, indexI) => (
              <label htmlFor={ index } key={ indexI }>
                <input
                  type="radio"
                  id={ index }
                  name={ index }
                  data-testid="correct-answer"
                />
                {element}
              </label>
            ))}
            <label htmlFor={ index }>
              <input
                type="radio"
                id={ index }
                name={ index }
                data-testid={ `wrong-answer-${index}` }
              />
              {ask.correct_answer}
            </label>
          </section>
        ))}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  asksG: state.asksReducer.asks,
});

GameAsks.propTypes = {
  asksG: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(GameAsks);
