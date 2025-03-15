import React from "react";
import recipesLogo from "../images/recipe-logo.jpg";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={recipesLogo} className="logo" />
        </Link>
      </div>
      <ul className="navbar-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about ">About</NavLink>
        <NavLink to="/recipes">Recipes</NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
