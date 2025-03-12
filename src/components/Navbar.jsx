import React from 'react'
import recipesLogo from "../assets/recipe-logo.jpg";


const Navbar = () => {
  return (
     <nav className="navbar">
     <div className="navbar-logo">
       <img src={recipesLogo} alt="Logo" className="logo" />
     </div>
     <ul className="navbar-links">
       <li><a href="#">Home</a></li>
       <li><a href="#">About</a></li>
       <li><a href="#">Recipes</a></li>
     </ul>
   </nav>   
  )
}

export default Navbar
