import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/GloomEffect.css';
export default class BtnRanking extends Component {
  render() {
    return (
      <Link to="/ranking">
        <button type="button" data-testid="btn-ranking" className="main-div main-div2">
          Show Ranking
        </button>
      </Link>
    );
  }
}
