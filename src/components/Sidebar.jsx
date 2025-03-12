import React from 'react'

const Sidebar = () => {
  return (
    <div className="sidebar">
    <div> 
    <span><a href="#">Home</a></span>
    </div>
        <div id="sidebar-item">
          <span><a href="#">Search</a></span>
          <input type="text" placeholder="Search recipes..." className="search-input" />
        </div>
        <div className="sidebar-item">
          <span><a href="#">Favorite Recipes</a></span>
          <button>View your favorite recipes here.</button>
        </div>
      </div>
  )
}

export default Sidebar
