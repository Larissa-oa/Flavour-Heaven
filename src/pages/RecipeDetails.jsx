import React from "react";
import recipesData from "../assets/recipes.json";
import { useParams, Link } from "react-router-dom";


const RecipeDetailPage = () => {
  const { recipesId } = useParams(); 
  const recipeDetails = recipesData.find((recipe) => recipe.id === recipesId);

  console.log(recipesId, recipeDetails);

  return (
    <div className="recipe-details-page" id="recipe-details-page">
      <h1 id="recipe-details-title">Recipe Details Page</h1>
      <div className="recipe-details-container" id="recipe-details-container">
        {recipeDetails && (
          <>
            <img
              src={recipeDetails.image || placeholderImage}
              alt="recipe-photo"
              id="recipe-image"
              className="recipe-image"
            />
      
            <h2 id="recipe-name" className="recipe-name">{recipeDetails.name}</h2>

            <div id="recipe-details-text" className="recipe-details-text-container">
              <p id="recipe-name-text">Name: {recipeDetails.name}</p>
              <p id="recipe-calories-text">Calories: {recipeDetails.calories}</p>
              <p id="recipe-servings-text">Servings: {recipeDetails.servings}</p>
              <p id="recipe-ingredients-text">Ingredients: {recipeDetails.ingredients}</p>
              <p id="recipe-instructions-text">Instructions: {recipeDetails.instructions}</p>
              
              {recipeDetails.calories <= 150 ? (
                <span id="low-calories-tag" className="low-calories">Low Calories</span>
              ) : null}
              {recipeDetails.calories > 250 ? (
                <span id="high-calories-tag" className="high-calories">High Calories</span>
              ) : null}
            </div>

            {/* Back button */}
            <Link to="/" id="back-button-link">
              <button id="back-button" className="back-button">Back</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeDetailPage;