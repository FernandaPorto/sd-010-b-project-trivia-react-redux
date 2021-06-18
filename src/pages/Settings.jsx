import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      params: {},
    };

    this.fetchCategories = this.fetchCategories.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.propsState = this.propsState.bind(this);
    this.saveOptions = this.saveOptions.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
    this.propsState();
  }

  async fetchCategories() {
    const request = await fetch('https://opentdb.com/api_category.php');
    const response = await request.json();
    this.setState({ categories: response.trivia_categories });
  }

  propsState() {
    const { params } = this.props;
    this.setState({ params });
  }

  saveOptions() {
    const { params } = this.state;
    const { sendFetchData, history } = this.props;
    sendFetchData(params);
    history.push('/');
  }

  handleSelect({ id, value }) {
    const { params } = this.state;
    this.setState({ params: { ...params, [id]: value } });
  }

  render() {
    const { categories, params } = this.state;
    return (
      <div>
        <p data-testid="settings-title">Settings</p>
        <label htmlFor="difficulty">
          Choose a difficulty
          <select
            value={ params.difficulty }
            id="difficulty"
            onChange={ ({ target }) => this.handleSelect(target) }
          >
            <option value={ 0 }>ANY</option>
            <option value="easy">EASY</option>
            <option value="medium">MEDIUM</option>
            <option value="hard">HARD</option>
          </select>
        </label>
        <label htmlFor="category">
          Choose a category
          <select
            value={ params.category }
            id="category"
            onChange={ ({ target }) => this.handleSelect(target) }
          >
            <option value={ 0 }>ANY</option>
            {categories.map((category) => (
              <option
                key={ category.id }
                value={ category.id }
              >
                {category.name}
              </option>))}
          </select>
        </label>
        <label htmlFor="type">
          Choice type
          <select
            value={ params.type }
            id="type"
            onChange={ ({ target }) => this.handleSelect(target) }
          >
            <option value={ 0 }>ANY</option>
            <option value="multiple">Multiple Choice </option>
            <option value="boolean">True / False </option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.saveOptions }
        >
          Salvar
        </button>
      </div>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape().isRequired,
  sendFetchData: PropTypes.func.isRequired,
  params: PropTypes.shape().isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  sendFetchData: (state) => dispatch(fetchData(state)),
});

const mapStateToProps = (state) => ({
  params: state.fetch.params,
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
