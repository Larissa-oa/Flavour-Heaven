import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RecipesList = ({ recipes, addToFavourites, onUpdate }) => {
  // State for sort type
  const [sortType, setSortType] = useState("newest");
  // State for sorted recipes
  const [sortedRecipes, setSortedRecipes] = useState([]);
  // State for tracking which recipe is being considered for deletion
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Effect to sort recipes whenever recipes list or sort type changes
  useEffect(() => {
    if (!recipes || recipes.length === 0) {
      setSortedRecipes([]);
      return;
    }

    // Create a copy to avoid mutating the original array
    let recipesCopy = [...recipes];

    // Sort based on the selected sort type
    switch (sortType) {
      case "newest":
        recipesCopy.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        break;
      case "oldest":
        recipesCopy.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
        break;
      case "alphabetical":
        recipesCopy.sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
        );
        break;
      case "low-cal":
        // Sort by calories ascending (lowest first)
        recipesCopy.sort((a, b) => a.calories - b.calories);
        break;
      case "high-cal":
        // Sort by calories descending (highest first)
        recipesCopy.sort((a, b) => b.calories - a.calories);
        break;
      default:
        // Default to newest
        recipesCopy.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
    }

    setSortedRecipes(recipesCopy);
  }, [recipes, sortType]);

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  // Function to show delete confirmation
  const showDeleteConfirmation = (id) => {
    setDeleteConfirmId(id);
  };

  // Function to cancel deletion
  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };

  // Function to confirm and execute deletion
  const confirmDelete = (id) => {
    const filterRecipes = recipes.filter((recipe) => {
      return recipe.id !== id;
    });

    // Notify parent component about the update
    if (onUpdate) {
      onUpdate(filterRecipes);
    }

    // Clear the confirmation state
    setDeleteConfirmId(null);
  };

  return (
    <div className="recipes-page-container">
      <div className="recipes-header">
        <h1>Recipes</h1>

        <div className="sort-container">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            className="sort-select"
            value={sortType}
            onChange={handleSortChange}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="low-cal">Calories (Low to High)</option>
            <option value="high-cal">Calories (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="recipes-list">
        {sortedRecipes.map((recipe) => (
          <div key={recipe.id} id="recipe-container">
            {/* Display the recipe image */}
            <img
              src={recipe.image || "/placeholder-recipe.jpg"}
              alt={recipe.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-recipe.jpg";
              }}
            />

            <div id="text-container">
              <h3>{recipe.name}</h3>
              <p>Calories: {recipe.calories}</p>
              <p>Servings: {recipe.servings}</p>

              <div>
                {recipe.calories <= 150 ? (
                  <span className="low-calories">Low Calories</span>
                ) : null}
                {recipe.calories > 250 ? (
                  <span className="high-calories">High Calories</span>
                ) : null}
              </div>

              <div id="buttons">
                <Link to={`/recipes/${recipe.id}`}>
                  <button id="details-btn" className="btn-recipe">
                    Details
                  </button>
                </Link>
                <button
                  className="sidebar-button"
                  onClick={() => addToFavourites(recipe.id)}
                >
                  Add to Favorites
                </button>
                <button onClick={() => showDeleteConfirmation(recipe.id)}>
                  Delete
                </button>
              </div>
            </div>

            {/* Delete confirmation popup */}
            {deleteConfirmId === recipe.id && (
              <div className="delete-confirmation">
                <p>Are you sure you want to delete this recipe?</p>
                <div className="confirm-actions">
                  <button
                    className="btn-confirm"
                    onClick={() => confirmDelete(recipe.id)}
                  >
                    Yes, Delete
                  </button>
                  <button className="btn-cancel" onClick={cancelDelete}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesList;
