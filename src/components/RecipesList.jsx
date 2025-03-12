import recipesData from "../recipes.json";
import { useState } from 'react';

const RecipesList = () => {
  const [recipes, setRecipes] = useState(recipesData);
 return (
  <>
    {recipes.map((recipe) => (
      <div key = {recipe.id}>
    <img src={recipe.image} />
    <p>Name: {recipe.name}</p>
    <p>Calories: {recipe.calories}</p>
    <p>Servings: {recipe.servings}</p>
    </div>
    ))}
</>
)
  };

  export default RecipesList