import React from "react";
import recipesLogo from "../images/applogo.png";
import { Link, NavLink } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={recipesLogo} id="logo" />
        </Link>
      </div>
      <span>
       <Link to= '/'>
        <h2> Flavour Heaven</h2>
        </Link>
      </span>
      <div id="navlinks">
      <ul className="navbar-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about ">About</NavLink>
        <NavLink to="/recipes">Recipes</NavLink>
      </ul>
      </div>
    </nav>
  );
};

export default Navbar;
