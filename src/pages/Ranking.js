import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { player } = this.props;
    return (
      <div>
        <ol>
          <li>{player}</li>
        </ol>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.login.name,
});

Ranking.propTypes = {
  player: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Ranking);
