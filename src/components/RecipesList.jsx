import React from "react";
import { Link } from "react-router-dom";
import './RecipesList.css';

const RecipesList = ({ recipes, addToFavourites, deleteBtn }) => {
  return (
    <>
      {recipes.map((recipe) => (
        <div key={recipe.id} id="recipe-container">
          <img src={recipe.image} alt={recipe.name} />

          <div id="text-container">
            <p>Name: {recipe.name}</p>
            <p>Calories: {recipe.calories}</p>
            <p>Servings: {recipe.servings}</p>

            {recipe.calories <= 150 ? (
              <span className="low-calories">Low Calories</span>
            ) : null}
            {recipe.calories > 250 ? (
              <span className="high-calories">High Calories</span>
            ) : null}

            <section id="buttons">
              <button onClick={() => deleteBtn(recipe.id)}>Delete</button>

              <Link to={`/recipes/${recipe.id}`}>
                <button id="details-btn" className="btn-recipe">Details</button>
              </Link>

              <button
                className="sidebar-button"
                id="sidebar-favorites"
                onClick={() => addToFavourites(recipe.id)}
              >
                <span>Add to Favorites</span>
              </button>
            </section>
          </div>
        </div>
      ))}
    </>
  );
};

export default RecipesList;
