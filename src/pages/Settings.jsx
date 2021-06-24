import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import {
  getCategoriesThunk,
  saveSettingsActionCreator,
} from '../redux/actions';
import Loading from '../components/Loading';

const QUESTIONS_LIMIT = 50;

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputSettings: {
        amount: props.amount,
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

  getQuestionsCount() {
    const { allCategories } = this.props;
    const { inputSettings: { categoryId, difficulty } } = this.state;

    if (categoryId === '') {
      if (difficulty === '') {
        return allCategories.reduce(
          (acc, curr) => acc + curr.questionsCount.total,
          0,
        );
      }
      return allCategories.reduce(
        (acc, curr) => acc + curr.questionsCount[difficulty],
        0,
      );
    }
    const category = allCategories.find(({ id }) => id === Number(categoryId));
    if (difficulty === '') return category.questionsCount.total;
    return category.questionsCount[difficulty];
  }

  handleChange({ target: { name, value } }) {
    this.setState((prevState) => ({
      inputSettings: {
        ...prevState.inputSettings,
        [name]: value,
      },
    }));
  }

  renderNumberOfQuestions() {
    const { inputSettings: { amount } } = this.state;
    const questionsCount = this.getQuestionsCount();

    const numberOptions = [];
    for (let i = 5; i <= questionsCount; i += 5) {
      numberOptions.push(i);
      if (i === QUESTIONS_LIMIT) break;
    }

    return (
      <label htmlFor="amount">
        Number of Questions:
        <select
          id="amount"
          name="amount"
          defaultValue={ amount }
          onChange={ this.handleChange }
        >
          {numberOptions.map((option) => (
            <option key={ option } value={ option }>{ option }</option>
          ))}
        </select>
      </label>
    );
  }

  renderSelectCategory() {
    const { allCategories } = this.props;
    const { inputSettings: { categoryId } } = this.state;
    return (
      <label htmlFor="category">
        Select Category:
        <select
          id="category"
          name="categoryId"
          defaultValue={ categoryId }
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
    );
  }

  renderSelectDifficulty() {
    const { inputSettings: { difficulty } } = this.state;
    return (
      <label htmlFor="difficulty">
        Select Difficulty:
        <select
          id="difficulty"
          name="difficulty"
          defaultValue={ difficulty }
          onChange={ this.handleChange }
        >
          <option value="">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
    );
  }

  render() {
    const { inputSettings, redirect } = this.state;
    const { isLoading, saveSettings } = this.props;

    if (redirect) return <Redirect to="/" />;
    if (isLoading) return <Loading />;

    return (
      <main>
        <h1>Settings</h1>
        <div>
          <span>{`Available Questions: ${this.getQuestionsCount()}`}</span>
        </div>
        <div id="settings" className="container">
          {this.renderSelectCategory()}
          {this.renderSelectDifficulty()}
          {this.renderNumberOfQuestions()}
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
  amount: settings.amount,
  categoryId: settings.categoryId,
  difficulty: settings.difficulty,
  isLoading: settings.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesThunk()),
  saveSettings: (payload) => dispatch(saveSettingsActionCreator(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
