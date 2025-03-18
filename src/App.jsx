import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import RecipesList from "./components/RecipesList";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RecipeDetailPage from "./pages/RecipeDetails";
import NotFoundPage from "./pages/NotFoundPage";
import { Routes, Route } from "react-router-dom";
import FavouriteList from "./pages/FavouriteList";
import RecipeFormPopup from "./components/RecipeFormPopup";
import recipesData from "./assets/recipes.json";

function App() {
  // State for recipes and favourites
  const [recipes, setRecipes] = useState(recipesData);
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);
  const [isRecipeFormOpen, setIsRecipeFormOpen] = useState(false);

  // Function to handle adding to favourites
  const addToFavourites = (id) => {
    console.log(`Adding ${id} to fav`);
    // Find the recipe by ID and add it to favouriteRecipes
    const favouriteRecipe = recipes.find((recipe) => recipe.id === id);
    if (favouriteRecipe) {
      setFavouriteRecipes((prevFavourites) => [
        ...prevFavourites,
        favouriteRecipe,
      ]);
    }
  };

  const removeFavourite = (id) => {
    setFavouriteRecipes(favouriteRecipes.filter((recipe) => recipe.id !== id));
  };

  // Handle deleting recipes from the list
  const deleteBtn = (id) => {
    const filteredRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(filteredRecipes);
  };

  // Handle opening and closing the recipe form
  const openRecipeForm = () => {
    console.log("Opening recipe form");
    setIsRecipeFormOpen(true);
  };

  const closeRecipeForm = () => {
    console.log("Closing recipe form");
    setIsRecipeFormOpen(false);
  };

  // Handle adding a new recipe
  const handleAddRecipe = (newRecipe) => {
    console.log("Adding new recipe:", newRecipe);
    setRecipes([...recipes, newRecipe]);
  };

  return (
    <div>
      <Navbar />
      <Sidebar onOpenRecipeForm={openRecipeForm} />
      <div className="pages">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/recipes/:recipesId" element={<RecipeDetailPage />} />
          <Route
            path="/recipes"
            element={
              <RecipesList
                recipes={recipes}
                addToFavourites={addToFavourites}
                deleteBtn={deleteBtn}
              />
            }
          />
          <Route
            path="/favourites"
            element={
              <FavouriteList
                favouriteRecipes={favouriteRecipes}
                removeFavourite={removeFavourite}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />

      {/* Recipe Form Popup */}
      <RecipeFormPopup
        isOpen={isRecipeFormOpen}
        onClose={closeRecipeForm}
        onAddRecipe={handleAddRecipe}
      />
    </div>
  );
}

export default App;
