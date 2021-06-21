import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Transition, animated, config } from 'react-spring';
import { resetState } from '../action';

import '../ranking.css';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      showComp: false,
    };

    this.showComp = this.showComp.bind(this);
    this.rowRanking = this.rowRanking.bind(this);
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

  rowRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const arr = ranking.sort((a, b) => b.score - a.score);
    return (
      <section className="ranking-container">
        {
          arr.map((player, index) => (
            <tr className="row-ranking" key={ index }>
              <th>
                <img src={ player.picture } alt="avatar" />
              </th>
              <th className="ranking-name">
                <span data-testid={ `player-name-${index}` }>{player.name}</span>
              </th>
              <th>
                <span data-testid={ `player-score-${index}` }>{player.score}</span>
              </th>
            </tr>
          ))
        }
      </section>
    );
  }

  render() {
    const { showComp } = this.state;
    const { history, reset } = this.props;
    return (
      <section className="ranking-content ">
        <section className="header-ranking">
          <h1 data-testid="ranking-title">Ranking</h1>
        </section>

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
                  this.rowRanking()
                }
              </animated.div>
            )}
        </Transition>

        <button
          type="button"
          className="btn-go-home"
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
