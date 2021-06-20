import React, { Component } from "react";
import { Link } from "react-router-dom";
import triviaBigodesLogo from "../assets/images/headerBigodes.png";
import { getFromLocalStorage } from "../services/helpers/localStorage";

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.handlesort = this.handlesort.bind(this);
  }

  handlesort() {
    const scoreRanking = getFromLocalStorage("ranking");
    return scoreRanking.sort((a, b) => b.score - a.score);
  }

  render() {
    return (
      <div className="bg-light_gray_color flex flex-col justify-center items-center ">
        <div className="w-full">
          <Link to="/">
            <button type="button" data-testid="btn-go-home">
              Home
            </button>
          </Link>
        </div>
        <div
          className="flex flex-col items-center bg-primary_color
          shadow-lg min-w-1/4 min-h-1/4 max-h-3/4 rounded-lg"
        >
          <img className="w-40" src={triviaBigodesLogo} alt="Logo trivia Bigodes" />
          <section data-testid="ranking-title">Ranking</section>
          <ul className="">
            {this.handlesort().map((element, index) => {
              const { name, score, picture } = element;
              return (
                <li key={index} className="">
                  <img src={picture} alt={name} />{" "}
                  <span data-testid={`player-score-${index}`} className="flex justify-around">
                    {score}
                  </span>{" "}
                  <span data-testid={`player-name-${index}`}>{name}</span>
                </li>
              );
            })}
          </ul>
        </div>
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
