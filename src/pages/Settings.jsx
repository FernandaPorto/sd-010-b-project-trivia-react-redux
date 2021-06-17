import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { choseSettings } from '../actions';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      category: '',
      difficulty: '',
      type: '',
    };

    this.getCategory = this.getCategory.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.sendSettings = this.sendSettings.bind(this);
  }

  componentDidMount() {
    fetch('https://opentdb.com/api_category.php')
      .then((response) => response.json())
      .then((result) => result.trivia_categories)
      .then((resultado) => this.getCategory(resultado));
  }

  getCategory(categories) {
    this.setState({ categories });
  }

  handleChangeCategory({ target: { value } }) {
    console.log(value);
    if (value !== 'Any Category') {
      this.setState({ category: value });
    }
  }

  sendSettings() {
    const { category, difficulty, type } = this.state;
    const { choseSettingsAction } = this.props;
    choseSettingsAction({ category, difficulty, type });
  }

  render() {
    const { categories } = this.state;
    if (categories.length === 0) { return <h2>Loading...</h2>; }
    return (
      <section>
        <h2 data-testid="settings-title"> Configurações</h2>

        <form>
          <select onChange={ this.handleChangeCategory } id="select-category">
            <option value="">Any Category</option>
            {categories.map((category) => (
              <option
                key={ category.id }
                value={ category.id }
              >
                {category.name}
              </option>))}
          </select>

          <select
            onChange={ ((e) => this
              .setState({ difficulty: e.target.value })) }
            id="select-difficulty"
          >
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select
            onChange={ ((e) => this
              .setState({ type: e.target.value })) }
            id="select-type"
          >
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choise</option>
            <option value="boolean">True / False</option>
          </select>
        </form>

        <Link to="/">
          <button type="button" onClick={ this.sendSettings }>Voltar</button>
        </Link>

      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  choseSettingsAction: (payload) => dispatch(choseSettings(payload)),
});

export default connect(null, mapDispatchToProps)(Settings);

Settings.propTypes = {
  choseSettingsAction: PropTypes.func.isRequired,
};
