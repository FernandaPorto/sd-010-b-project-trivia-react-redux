import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homePage: false,
    };
    this.homePageClick = this.homePageClick.bind(this);
  }

  homePageClick() {
    this.setState({ homePage: true });
  }

  render() {
    const { homePage } = this.state;
    return (

      <div>
        {homePage ? <Redirect to="/" /> : ''}
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.homePageClick }
        >
          Voltar
        </button>
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
