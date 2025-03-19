import React, { useState } from "react";
import searchIcon from "../images/searchicon.png";
import homeIcon from "../images/houseicon.png";
import likesIcon from "../images/likes.png";
import { Link, useNavigate } from "react-router-dom";
import "../components/Sidebar.css";

const Sidebar = ({ onOpenRecipeForm, onSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

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

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
      navigate("/search"); // Navigate to search results page
      setSearchInput(""); // Clear the input field after submission
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

        <button
          type="button"
          className="sidebar-button"
          id="add-recipe-button"
          onClick={handleAddRecipeClick}
        >
          <span className="sidebar-text">Add Recipe</span>
          <div className="add-icon">+</div>
        </button>

        <div className="sidebar-link" id="search">
          {/* Fixed: Changed button to div */}
          <div className="sidebar-button">
            <img src={searchIcon} id="search-icon" alt="Search Icon" />
            <form className="search-form" onSubmit={handleSearchSubmit}>
              <label htmlFor="searchInput" id="search-label"></label>
              <input
                type="text"
                id="searchInput"
                className="search-input"
                placeholder="Enter recipe"
                value={searchInput}
                onChange={handleSearchChange}
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
