import React, { Component } from 'react';
import { connect } from 'react-redux';

class Perguntas extends Component {
  render() {
    const { perguntas } = this.props;
    if (perguntas) {
      console.log(perguntas[0])
      return (
        <div>
        {/* {perguntas.find((pergunta) => pergunta === 0)} */}
      </div>
    );
  }
    return <p>Loading</p>
  }
}

const mapDispatchToProps = () => ({
  // pedePerguntas: (token) => dispatch(fetchPerguntas(token)),
});

const mapStateToProps = (state) => ({
  perguntas: state.perguntas.perguntas.results,
});

export default connect(mapStateToProps, mapDispatchToProps)(Perguntas);
