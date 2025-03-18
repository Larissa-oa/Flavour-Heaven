import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import recipesData from "../assets/recipes.json";

const RecipeForm = ({ onAddRecipe, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    calories: "",
    image: "",
    servings: "",
    ingredients: [""],
    instructions: [""],
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = value;
    setFormData({
      ...formData,
      ingredients: updatedIngredients,
    });
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = value;
    setFormData({
      ...formData,
      instructions: updatedInstructions,
    });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ""],
    });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, ""],
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      calories: "",
      image: "",
      servings: "",
      ingredients: [""],
      instructions: [""],
    });
    setSubmitStatus(null);
  };

  const saveRecipeToJson = (newRecipe) => {
    try {
      // Get current recipes
      const updatedRecipes = [...recipesData, newRecipe];

      // In a browser environment, we can't directly write to the file system
      // This would typically be handled by a backend API
      // For frontend-only solutions, we can use localStorage as a temporary solution
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

      // Notify parent component about the new recipe
      onAddRecipe(newRecipe, updatedRecipes);

      return true;
    } catch (error) {
      console.error("Error saving recipe:", error);
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter out any empty ingredients or instructions
    const filteredIngredients = formData.ingredients.filter(
      (item) => item.trim() !== ""
    );
    const filteredInstructions = formData.instructions.filter(
      (item) => item.trim() !== ""
    );

    // Create new recipe object with generated ID and timestamp
    const newRecipe = {
      id: uuidv4(),
      name: formData.name,
      calories: Number(formData.calories),
      image: formData.image,
      servings: Number(formData.servings),
      ingredients: filteredIngredients,
      instructions: filteredInstructions,
      timestamp: new Date().toISOString(),
    };

    // Save the recipe
    const success = saveRecipeToJson(newRecipe);

    // Update status instead of closing
    setSubmitStatus(success ? "success" : "error");
  };

  // If we're showing the success message
  if (submitStatus === "success") {
    return (
      <div className="recipe-form-container">
        <div className="success-message">
          <h2>Recipe added successfully!</h2>
          <p>Would you like to add another recipe?</p>
          <div className="button-group">
            <button onClick={resetForm} className="yes-button">
              Yes
            </button>
            <button onClick={onClose} className="no-button">
              No
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If we're showing an error message
  if (submitStatus === "error") {
    return (
      <div className="recipe-form-container">
        <div className="error-message">
          <h2>Error adding recipe</h2>
          <p>There was a problem saving your recipe. Please try again.</p>
          <button
            onClick={() => setSubmitStatus(null)}
            className="try-again-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Default form view
  return (
    <div className="recipe-form-container">
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Recipe Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="calories">Calories:</label>
          <input
            type="number"
            id="calories"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="servings">Servings:</label>
          <input
            type="number"
            id="servings"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ingredients:</label>
          {formData.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              placeholder={`Ingredient ${index + 1}`}
              className="ingredient-input"
            />
          ))}
          <button type="button" onClick={addIngredient} className="add-button">
            Add another ingredient
          </button>
        </div>

        <div className="form-group">
          <label>Instructions:</label>
          {formData.instructions.map((instruction, index) => (
            <textarea
              key={index}
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              placeholder={`Step ${index + 1}`}
              className="instruction-input"
            />
          ))}
          <button type="button" onClick={addInstruction} className="add-button">
            Add another instruction
          </button>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Add Recipe
          </button>
          <button type="button" onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
