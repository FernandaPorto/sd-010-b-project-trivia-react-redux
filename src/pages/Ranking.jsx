import React, { Component } from 'react';
// import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button type="button" data-testid="btn-go-home">Voltar</button>
      </div>
    );
  }
}
// const mapStateToProps = (state) => ({
//   email: state.user.email,
//   nome: state.user.name,
//   gravatar: state.user.gravatar,
//   eachPoints: state.user.player.eachScore,
// });

export default Ranking;
