import React from "react";
import recipesData from "../recipes.json";
import { useParams, Link } from "react-router-dom";

const RecipeDetailPage = () => {
  const { recipesId } = useParams();       /* destructuring the recipesId */
  const recipeDetails = recipesData.find((recipe) => recipe.id === recipesId);

  console.log(recipesId, recipeDetails)

  return (
    <div className="RecipeDetailsPage">
      <h1>Recipe Details Page</h1>
      <div className="recipe-details-container">
        {recipeDetails && (
          <>
            <img
              src={recipeDetails.image || placeholderImage}
              alt="recipe-photo"
              className="recipes-picture"
            />
            <h1 className="recipe-name">{recipeDetails.name}</h1>

            <div className="recipe-details-text-container">
              
                <p>Name: {recipeDetails.name}</p>
                <p>Calories: {recipeDetails.calories}</p>
                <p>Servings: {recipeDetails.servings}</p>
                <p>Ingredients: {recipeDetails.ingredients}</p>
                <p>Instructions: {recipeDetails.instructions}</p>
                {recipeDetails.calories <= 150 ? (
                  <span className="low-calories">Low Calories</span>
                ) : null}
                {recipeDetails.calories > 250 ? (
                  <span className="high-calories">High Calories</span>
                ) : null}
            </div>

            {/* Back button */}
            <Link to="/">
              <button>Back</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeDetailPage