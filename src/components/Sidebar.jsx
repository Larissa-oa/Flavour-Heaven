import React from "react";
import searchIcon from "../images/searchicon.png";
import homeIcon from "../images/houseicon.png";
import likesIcon from "../images/likes.png";
import { Link } from "react-router-dom";
import "../components/Sidebar.css";

const Sidebar = ({ onOpenRecipeForm }) => {
  // Add a handler that explicitly calls the passed function
  const handleAddRecipeClick = () => {
    console.log("Add recipe button clicked");
    if (typeof onOpenRecipeForm === "function") {
      onOpenRecipeForm();
      console.log("button clicked");
    } else {
      console.error("onOpenRecipeForm is not a function");
    }
  };

  return (
    <div className="sidebar">
      <div id="icons">
        <Link to="/" className="sidebar-link">
          <button className="sidebar-button" id="home-button">
            <img
              src={homeIcon}
              id="home-icon"
              className="sidebar-icon"
              alt="Home Icon"
            />
          </button>
        </Link>

        <Link to="/favourites" className="sidebar-link">
          <button className="sidebar-button" id="sidebar-favorites">
            <span className="sidebar-text">Your favorite recipes</span>
            <img src={likesIcon} alt="Favorites Icon" />
          </button>
        </Link>

        {/* Add type="button" to ensure it's treated as a button */}
        <button
          type="button"
          className="sidebar-button"
          id="add-recipe-button"
          onClick={handleAddRecipeClick}
        >
          <span className="sidebar-text">Add Recipe</span>
          <div className="add-icon">+</div>
        </button>

        <Link to="*" className="sidebar-link" id="search">
          <button className="sidebar-button">
            <img src={searchIcon} id="search-icon" alt="Search Icon" />
            <form className="search-form">
              <label htmlFor="searchInput" id="search-label"></label>
              <input
                type="text"
                id="searchInput"
                className="search-input"
                placeholder="Enter recipe"
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </form>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
