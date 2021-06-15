import React, { Component } from 'react';
import { connect } from 'react-redux';

class Perguntas extends Component {
  render() {
    const { perguntas } = this.props;
    return (
      <div>
        {console.log(perguntas)}
      </div>
    );
  }
}

const mapDispatchToProps = () => ({
  // pedePerguntas: (token) => dispatch(fetchPerguntas(token)),
});

const mapStateToProps = (state) => ({
  perguntas: state.perguntas.perguntas.results,
});

export default connect(mapStateToProps, mapDispatchToProps)(Perguntas);
