import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Transition, animated, config } from 'react-spring';
import { resetState } from '../action';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      showComp: false,
    };
  }

  componentDidMount() {
    this.showComp();
  }

  componentWillUnmount() {
    this.showComp();
  }

  showComp() {
    const { showComp } = this.state;
    this.setState({ showComp: !showComp });
  }

  render() {
    const { showComp } = this.state;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const arr = ranking.sort((a, b) => b.score - a.score);
    const { history, reset } = this.props;
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>

        <Transition
          items={ showComp }
          from={ { y: 800, opacity: 0 } }
          enter={ { y: 0, opacity: 1 } }
          leave={ { y: -800, opacity: 0 } }
          delay={ 200 }
          config={ config.molasses }
        >
          {(styles, item) => item
            && (
              <animated.div style={ styles }>
                {
                  arr.map((player, index) => (
                    <section key={ index }>
                      <img src={ player.picture } alt="avatar" />
                      <span data-testid={ `player-name-${index}` }>{player.name}</span>
                      <span data-testid={ `player-score-${index}` }>{player.score}</span>
                    </section>
                  ))
                }
              </animated.div>
            )}
        </Transition>

        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            history.replace('/');
            reset();
          } }
        >
          Ir para Home
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetState()),
});

Ranking.propTypes = {
  history: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Ranking);
