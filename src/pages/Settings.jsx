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

  getQuestionCount() {
    const { allCategories } = this.props;
    const { inputSettings: { categoryId, difficulty } } = this.state;

    if (categoryId === '') {
      if (difficulty === '') {
        return allCategories.reduce(
          (acc, curr) => acc + curr.questionCount.total,
          0,
        );
      }
      return allCategories.reduce(
        (acc, curr) => acc + curr.questionCount[difficulty],
        0,
      );
    }
    const category = allCategories.find(({ id }) => id === Number(categoryId));
    if (difficulty === '') return category.questionCount.total;
    return category.questionCount[difficulty];
  }

  handleChange({ target: { name, value } }) {
    this.setState((prevState) => ({
      inputSettings: {
        ...prevState.inputSettings,
        [name]: value,
      },
    }));
  }

  renderSelectCategory() {
    const { allCategories } = this.props;
    const { inputSettings: { categoryId } } = this.state;
    return (
      <label htmlFor="category">
        Select Category:
        <br />
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
        <br />
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

  renderNumberOfQuestions() {
    const { inputSettings: { amount } } = this.state;

    return (
      <label htmlFor="amount">
        Number of Questions:
        { amount }
        <br />
        <input
          type="range"
          id="amount"
          name="amount"
          min="5"
          max={ QUESTIONS_LIMIT }
          defaultValue={ amount }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  render() {
    const { inputSettings, redirect } = this.state;
    const { isLoading, saveSettings } = this.props;

    const questionCount = this.getQuestionCount();
    const isHigher = inputSettings.amount > questionCount;
    const warningMessage = isHigher ? 'Insufficient questions' : '';

    if (redirect) return <Redirect to="/" />;
    if (isLoading) return <Loading />;

    return (
      <main>
        <h1>Settings</h1>
        <div>
          <span>{`Available Questions: ${questionCount}`}</span>
        </div>
        <div id="settings" className="container">
          {this.renderSelectCategory()}
          <br />
          {this.renderSelectDifficulty()}
          <br />
          {this.renderNumberOfQuestions()}
          <br />
          <input
            type="button"
            className="button-main"
            value="Save"
            disabled={ isHigher }
            onClick={ () => {
              saveSettings({ inputSettings });
              this.setState({ redirect: true });
            } }
          />
        </div>
        <div>{ warningMessage }</div>
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
