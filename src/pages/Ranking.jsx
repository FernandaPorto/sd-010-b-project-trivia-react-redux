import Button from '../components/Button';
import RankingList from '../components/RankingList';
import '../css/Ranking.css';

const PropTypes = require('prop-types');

const React = require('react');

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className="rcentral">
        <div className="rancking">
          <h1 data-testid="ranking-title" className="h1_title">Ranking</h1>
          <RankingList />
          <Button
            test="btn-go-home"
            clickable={ () => history.push('/') }
            value="Jogar Novamente"
          />
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Ranking;
