import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends React.Component {
  render() {
    const { name, imagePath, score } = this.props;
    return (
      <section>
        <header>
          <span>
            { name }
          </span>
          <img src={ imagePath } alt="Foto de perfil do usuário" />
          <span>
            { score }
          </span>
        </header>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { user: { name, image } } = state;
  return { name, image };
};

Game.propTypes = {
  name: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
