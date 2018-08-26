import React, { Component } from 'react';
import './App.css';
import Form from './components/form';
import Recipes from './components/recipes';


const API_KEY = '05cf225d8f09e7efa357d70086ab74d9';

class App extends Component {

  state = {
    recipes: []
  }
  
  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value
    e.preventDefault();
    const api_call = await fetch(`http://food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=5`)
    
    const data = await api_call.json();
    this.setState({ recipes: data.recipes})
    console.log(this.state.recipes); 
  }

    componentDidUpdate = () => {
      const recipes = JSON.stringify(this.state.recipes);
      localStorage.setItem("recipes", recipes);
    }

    componentDidMount = () => {
      const jsonString = localStorage.getItem("recipes");
      const recipes = JSON.parse(jsonString);
      this.setState({recipes})
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
       <Recipes recipes={this.state.recipes}/>
      </div>
    );
  }
}

export default App;