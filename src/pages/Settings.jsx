import React from 'react';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };

    this.getCategory = this.getCategory.bind(this);
  }

  componentDidMount() {
    fetch('https://opentdb.com/api_category.php')
      .then((response) => response.json())
      .then((result) => result.trivia_categories)
      .then((resultado) => this.getCategory(resultado))
      .then((a) => console.log(a));
  }

  getCategory(categories) {
    console.log(categories);
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
    console.log(this.state);
    if (categories.length === 0) { return <h2>Loading...</h2>; }
    return (
      <>
        <h2 data-testid="settings-title"> Configurações</h2>
        <p>{ categories[0].name }</p>

        <form>
          <select>
            {categories.map((category) => <option key={ category.id }>{category.name}</option>)}
          </select>

        </form>
      </>
    );
  }
}

export default Settings;
