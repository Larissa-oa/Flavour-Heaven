import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RecipesList.css";
import heartimg from "../images/likes.png";
import upArrowImg from "../images/up-arrow.png";

const RecipesList = ({
  recipes,
  addToFavourites,
  deleteBtn,
  favouriteRecipes,
}) => {
  const [sortType, setSortType] = useState("newest");
  const [sortedRecipes, setSortedRecipes] = useState([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    if (!recipes || recipes.length === 0) {
      setSortedRecipes([]);
      return;
    }

    let recipesCopy = [...recipes];

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
        recipesCopy.sort((a, b) => a.calories - b.calories);
        break;
      case "high-cal":
        recipesCopy.sort((a, b) => b.calories - a.calories);
        break;
      default:
        recipesCopy.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
    }

    setSortedRecipes(recipesCopy);
  }, [recipes, sortType]);

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const showDeleteConfirmation = (id) => {
    setDeleteConfirmId(id);
  };

  const cancelDelete = () => {
    setDeleteConfirmId(null);
  };

  const confirmDelete = (id) => {
    if (typeof deleteBtn === "function") {
      deleteBtn(id);
    } else {
      console.error("deleteBtn is not a function", deleteBtn);
    }
    setDeleteConfirmId(null);
  };

  const isInFavorites = (recipeId) => {
    return (
      Array.isArray(favouriteRecipes) &&
      favouriteRecipes.some((recipe) => recipe.id === recipeId)
    );
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="recipes-page-container">
      <div className="recipes-header">
        <header>
          <h1>Recipes</h1>
        </header>
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
            <img
              src={recipe.image || "/placeholder-recipe.jpg"}
              alt={recipe.name}
              id="recipe-image"
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
                <span>
                  <Link to={`/recipes/${recipe.id}`}>
                    <button id="details-btn" className="btn-recipe">
                      Details
                    </button>
                  </Link>
                  <button
                    className="btn-recipe"
                    id="delete-btn"
                    onClick={() => showDeleteConfirmation(recipe.id)}
                  >
                    Delete
                  </button>
                </span>
                <button
                  className={`btn-favourite ${
                    isInFavorites(recipe.id) ? "favorite-active" : ""
                  }`}
                  onClick={() => addToFavourites(recipe.id)}
                >
                  <img src={heartimg} id="like-icon" alt="Like icon" />
                </button>
              </div>
            </div>
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

      <button className="back-to-top" onClick={scrollToTop}>
        <img src={upArrowImg} alt="Back to Top" className="back-to-top-img" />
      </button>
    </div>
  );
};

export default RecipesList;
