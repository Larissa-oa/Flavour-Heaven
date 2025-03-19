import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heartimg from "../images/likes.png";
import "./SearchResults.css";

const SearchResults = ({
  searchResults,
  searchQuery,
  addToFavourites,
  deleteBtn, // This should be a function from parent to delete recipes
  favouriteRecipes = [],
}) => {
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [localResults, setLocalResults] = useState(searchResults);

  // Sync local results with props when searchResults changes
  useEffect(() => {
    setLocalResults(searchResults);
  }, [searchResults]);

  // Function to show delete confirmation
  const showDeleteConfirmation = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteConfirmId(id);
  };

  // Function to cancel deletion
  const cancelDelete = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setDeleteConfirmId(null);
  };

  // Function to handle delete confirmation
  const confirmDelete = (id) => {
    console.log("SearchResults - Deleting recipe:", id);

    // Call the parent's delete function
    if (typeof deleteBtn === "function") {
      deleteBtn(id);

      // Immediately update local state for better UX
      setLocalResults((prevResults) =>
        prevResults.filter((recipe) => recipe.id !== id)
      );
    } else {
      console.error("deleteBtn is not a function:", deleteBtn);
    }

    setDeleteConfirmId(null);
  };

  // Handle favorite click with proper event prevention
  const handleFavoriteClick = (e, recipeId) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof addToFavourites === "function") {
      addToFavourites(recipeId);
    } else {
      console.error("addToFavourites is not a function");
    }
  };

  // Fixed isInFavorites function
  const isInFavorites = (recipeId) => {
    if (!Array.isArray(favouriteRecipes)) return false;
    return favouriteRecipes.some((fav) => fav.id === recipeId);
  };

  return (
    <div className="search-results-container">
      <h2>Search Results for: {searchQuery}</h2>
      {localResults.length === 0 ? (
        <p>No recipes found for "{searchQuery}"</p>
      ) : (
        <div className="recipes-list">
          {localResults.map((recipe) => (
            <div key={recipe.id} id="recipe-container">
              <Link
                to={`/recipes/${recipe.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={recipe.image || "/placeholder-recipe.jpg"}
                  alt={recipe.name}
                  id="recipe-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder-recipe.jpg";
                  }}
                />
              </Link>
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
                    <Link
                      to={`/recipes/${recipe.id}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button id="details-btn" className="btn-recipe">
                        Details
                      </button>
                    </Link>
                    <button
                      className="btn-recipe"
                      id="delete-btn"
                      onClick={(e) => showDeleteConfirmation(e, recipe.id)}
                    >
                      Delete
                    </button>
                  </span>
                  <button
                    className={`btn-favourite ${
                      isInFavorites(recipe.id) ? "favorite-active" : ""
                    }`}
                    onClick={(e) => handleFavoriteClick(e, recipe.id)}
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
                    <button
                      className="btn-cancel"
                      onClick={(e) => cancelDelete(e)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
