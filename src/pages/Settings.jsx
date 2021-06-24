import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { getCategoriesThunk, saveSettingsActionCreator } from '../redux/actions';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputSettings: {
        amount: 5,
        categoryId: props.categoryId,
        difficulty: props.difficulty,
      },
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { allCategories, getCategories } = this.props;
    if (allCategories.length === 0) getCategories();
  }

  handleChange({ target: { name, value } }) {
    this.setState((prevState) => ({
      inputSettings: {
        ...prevState.inputSettings,
        [name]: value,
      },
    }));
  }

  renderOptions() {
    const { allCategories } = this.props;
    const { inputSettings } = this.state;
    return (
      <div>
        <label htmlFor="category">
          Select Category:
          <br />
          <select
            id="category"
            name="categoryId"
            defaultValue={ inputSettings.categoryId }
            onChange={ this.handleChange }
          >
            <option value="">Any Category</option>
            {allCategories.map((category) => (
              <option key={ category.id } value={ category.id }>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="difficulty">
          Select Difficulty:
          <br />
          <select
            id="difficulty"
            name="difficulty"
            defaultValue={ inputSettings.difficulty }
            onChange={ this.handleChange }
          >
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
      </div>
    );
  }

  render() {
    const { inputSettings, redirect } = this.state;
    const { isLoading, saveSettings } = this.props;

    if (isLoading) return <h2>Loading...</h2>;
    if (redirect) return <Redirect to="/" />;

    return (
      <main>
        <h1>Settings</h1>
        <div id="settings" className="container">
          {this.renderOptions()}
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

const mapStateToProps = ({ settings }) => ({
  allCategories: settings.allCategories,
  categoryId: settings.categoryId,
  difficulty: settings.difficulty,
  isLoading: settings.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesThunk()),
  saveSettings: (payload) => dispatch(saveSettingsActionCreator(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
