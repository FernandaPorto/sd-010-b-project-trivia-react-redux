import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeedBackHeader from './FeedBackHeader';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rankingOn: false };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { score, getNome, getMd5, email } = this.props;
    const url = `https://www.gravatar.com/avatar/${getMd5}`;
    const player = localStorage.getItem('state');
    if (localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', [...player]);
    } else {
      localStorage.setItem('ranking', player);
    }
  }

  handleClick() {
    this.setState({ rankingOn: true });
  }

  render() {
    const { rankingOn } = this.state;
    const { assertions, score } = this.props;
    const assert = 3;
    if (rankingOn) return <Redirect to="/ranking" />;
    return (
      <main>
        <FeedBackHeader />
        <span data-testid="feedback-total-question">{ assertions }</span>
        <span data-testid="feedback-total-score">{ score }</span>
        <p data-testid="feedback-text">
          { assertions >= assert
            ? 'Mandou bem!' : 'Podia ser melhor...' }
        </p>
        <Link
          data-testid="btn-play-again"
          to="/"
        >
          Jogar novamente
        </Link>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-ranking"
        >
          Ver Ranking
        </button>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.loginReducer.assertions,
  score: state.loginReducer.score,
  getNome: state.loginReducer.nome,
  getMd5: state.loginReducer.md5,
  email: state.loginReducer.email,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
