import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import { getFromLocalStorage } from '../services/helpers/localStorage';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.handlesort = this.handlesort.bind(this);
  }

  handlesort() {
    const scoreRanking = getFromLocalStorage('ranking');
    return scoreRanking
      .sort((a, b) => (b.score - a.score));
  }

  render() {
    return (
      <div className="bg-light_gray_color">
        <section data-testid="ranking-title">
          Titulo
        </section>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Inicio
          </button>
        </Link>
        <ul className="flex justify-center items-center w-screen h-screen flex-col">
          {this.handlesort().map((element, index) => {
            const { name, score, picture } = element;
            return (
              <li key={ index } className="flex bg-primary_color justify-around py-5">
                <img src={ picture } alt={ name } />
                {' '}
                <span data-testid={ `player-score-${index}` } className="flex justify-around">{score}</span>
                {' '}
                <span data-testid={ `player-name-${index}` }>{name}</span>
              </li>);
          })}
        </ul>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({

// });

// const mapDispatchToProps = {

// };

// export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
export default Ranking;
