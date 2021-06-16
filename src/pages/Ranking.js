import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { srcAvatar, name, score } = this.props;
    localStorage.setItem(`Player ${name}`, [name, score, srcAvatar]);
    const storage = localStorage;
    console.log(storage);
    return (
      <div>
        <ol>
          <h1>{name}</h1>
          <img alt="avatar" src={ srcAvatar } />
          <p>{`Score: ${score}`}</p>
        </ol>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  srcAvatar: state.ranking.avatar,
  name: state.login.name,
  score: state.ranking.score,
});

Ranking.propTypes = {
  srcAvatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Ranking);
