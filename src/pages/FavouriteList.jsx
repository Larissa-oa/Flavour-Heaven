import React from "react";
import { Link } from "react-router-dom";
import './FavouriteList.css'

const FavouriteList = ({ favouriteRecipes, removeFavourite }) => {

    const deleteBtn = (recipeId) => {
      removeFavourite(recipeId);
    };

  return (
    <div id="favourite-page">
      <h1>Favourite Recipes</h1>
      {favouriteRecipes.length === 0 ? (
        <div id="nofav-container">
          <p>No favourite recipes added yet.</p>
        </div>
      ) : (
        <div id="favourite-text-container">
          <ul>
            {favouriteRecipes.map((recipe) => (
              <li key={recipe.id} className="recipe-card">
                <div className="recipe-card-content">
                  <img src={recipe.image} alt={recipe.name} />
                  <div className="recipe-details">
                    <p>{recipe.name}</p>
                    <p>Calories: {recipe.calories}</p>
                    <p>Servings: {recipe.servings}</p>
                    <button 
                      className="delete-btn" 
                      onClick={() => deleteBtn(recipe.id)}>Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div id="buttons-container">
        <Link to="/recipes">
          <button id="return-btn">Back to Recipes</button>
        </Link>
      </div>
    </div>
  );
};

export default FavouriteList;