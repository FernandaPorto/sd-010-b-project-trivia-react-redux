import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { fetchCategories } from '../services/api';
import { saveSettingsActionCreator } from '../redux/actions';

class Settings extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      inputSettings: {
        amount: 5,
        category: '',
        difficulty: '',
        type: '',
      },
      isLoading: true,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getCategories();
  }

  async getCategories() {
    const categories = await fetchCategories();
    categories.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    this.setState({
      categories,
      isLoading: false,
    });
  }

  handleChange({ target: { id, value } }) {
    this.setState((prevState) => ({
      inputSettings: {
        ...prevState.inputSettings,
        [id]: value,
      },
    }));
  }

  render() {
    const { categories, inputSettings, isLoading, redirect } = this.state;
    const { settings, saveSettings } = this.props;

    if (isLoading) return <h2>Loading...</h2>;
    if (redirect) return <Redirect to="/" />;

    return (
      <main>
        <h1>Settings</h1>
        <div id="settings" className="container">
          <label htmlFor="category">
            Select Category:
            <select id="category" onChange={ this.handleChange }>
              <option value="">Any Category</option>
              {categories.map((category) => (
                <option key={ category.id } value={ category.id }>{category.name}</option>
              ))}
            </select>
          </label>
          <label htmlFor="difficulty">
            Select Difficulty:
            <select id="difficulty" onChange={ this.handleChange }>
              <option value="">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label htmlFor="type">
            Select Type:
            <select id="type" onChange={ this.handleChange }>
              <option value="">Any Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </label>
          <input
            type="button"
            className="button-main"
            value="Save"
            onClick={ () => {
              saveSettings({ inputSettings });
              this.setState({ redirect: true });
            } }
          />
        </div>
      </main>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  settings: game.settings,
});

const mapDispatchToProps = (dispatch) => ({
  saveSettings: (payload) => dispatch(saveSettingsActionCreator(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
