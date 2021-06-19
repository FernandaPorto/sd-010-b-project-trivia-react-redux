import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { changeConfig } from '../redux/actions';

const INITIAL_STATE = {
  categories: [],
};

class Config extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.renderCategories = this.renderCategories.bind(this);
    this.updateCategories = this.updateCategories.bind(this);
    this.renderDifficulty = this.renderDifficulty.bind(this);
    this.renderType = this.renderType.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const res = await (await fetch('https://opentdb.com/api_category.php')).json();
    this.updateCategories(res.trivia_categories);
  }

  updateCategories(categories) {
    this.setState({ categories });
  }

  handleChange({ target: { value, name } }) {
    const { handleChangeConfig } = this.props;
    handleChangeConfig(value, name);
  }

  renderCategories() {
    const { categories } = this.state;
    const { category } = this.props;
    return (
      <label htmlFor="categoryId">
        Select Category
        <select
          value={ category }
          onChange={ this.handleChange }
          name="category"
          id="categoryId"
        >
          <option value="any">Any Category</option>
          { categories.map((currentCategory) => {
            const { name, id } = currentCategory;
            return (
              <option key={ name } value={ id }>{name}</option>
            );
          })}
        </select>
      </label>
    );
  }

  renderDifficulty() {
    const { difficulty } = this.props;
    return (
      <label htmlFor="difficulty">
        Select Difficulty
        <select
          value={ difficulty }
          onChange={ this.handleChange }
          name="difficulty"
          id="difficulty"
        >
          <option name="difficulty" value="any">Any Difficulty</option>
          <option name="difficulty" value="easy">easy</option>
          <option name="difficulty" value="medium">medium</option>
          <option name="difficulty" value="hard">hard</option>
        </select>
      </label>
    );
  }

  renderType() {
    const { type } = this.props;
    return (
      <label htmlFor="type">
        Select Type
        <select value={ type } onChange={ this.handleChange } name="type" id="type">
          <option value="any">Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True or False</option>
        </select>
      </label>
    );
  }

  render() {
    return (
      <div>
        <section>
          <title data-testid="settings-title">
            CONFIGURAÇÕES
          </title>
          {this.renderCategories()}
          {this.renderDifficulty()}
          {this.renderType()}
        </section>
        <Link to="/"> Voltar</Link>
      </div>
    );
  }
}

Config.propTypes = {
  handleChangeConfig: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.configReducer.category,
  difficulty: state.configReducer.difficulty,
  type: state.configReducer.type,
});

const mapDispatchToProps = (dispatch) => ({
  handleChangeConfig: (value, name) => dispatch(changeConfig(value, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Config);
