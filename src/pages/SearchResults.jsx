import React from "react";
import { Link } from "react-router-dom";
import heartimg from "../images/likes.png";
import "./SearchResults.css"; // You'll need to create this CSS file

const SearchResults = ({
  searchResults,
  searchQuery,
  addToFavourites,
  deleteBtn,
}) => {
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null);

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
    deleteBtn(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="search-results-container">
      <div className="search-header">
        <h1>Search Results for "{searchQuery}"</h1>
        <p>{searchResults.length} results found</p>
      </div>

      {searchResults.length === 0 ? (
        <div className="no-results">
          <p>No recipes found matching your search. Try another keyword.</p>
          <Link to="/recipes">
            <button className="return-btn">Back to All Recipes</button>
          </Link>
        </div>
      ) : (
        <div className="recipes-list">
          {searchResults.map((recipe) => (
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
                    className="btn-favourite"
                    onClick={() => addToFavourites(recipe.id)}
                  >
                    <img src={heartimg} id="like-icon" alt="Like" />
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
      )}
      <div className="search-footer">
        <Link to="/recipes">
          <button className="return-btn">Back to All Recipes</button>
        </Link>
      </div>
    </div>
  );
};

export default SearchResults;
