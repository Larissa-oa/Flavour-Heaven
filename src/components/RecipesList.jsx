import recipesData from "../recipes.json";
import { useState } from "react";
import { Link } from "react-router-dom";

const RecipesList = () => {
  const [recipes, setRecipes] = useState(recipesData);

  const deleteBtn = (id) => {
    const filterRecipes = recipes.filter((recipe) => {
      return recipe.id !== id;
    });
    setRecipes(filterRecipes);
  };

  return (
    <>
      {recipes.map((recipe) => (
        <div key={recipe.id} id="recipe-container">
          <img src={recipe.image} />

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


              
              
                      <Link to={`/recipes/${recipe.id}`}>    {/*  has to be in backticks and curly braces */}
                        <button>Details </button>   
                      </Link>
             

              
              
              <button>Favorite</button>
            </section>
          </div>
        </div>
      ))}
    </>
  );
};

export default RecipesList;
