import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import RecipesList from "./components/RecipesList";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RecipeDetailPage from "./pages/RecipeDetails";
import NotFoundPage from "./pages/NotFoundPage";
import { Routes, Route, Outlet } from "react-router-dom";
import FavouriteList from "./pages/FavouriteList";
import RecipeFormPopup from "./components/RecipeFormPopup";
import SearchResults from "./pages/SearchResults";
import recipesData from "./assets/recipes.json";

// Create a layout component to provide the context
function Layout({ recipes, addToFavourites, deleteBtn }) {
  return (
    <>
      <Outlet context={{ recipes, addToFavourites, deleteBtn }} />
    </>
  );
}

function App() {
  // State for recipes and favourites
  const [recipes, setRecipes] = useState(recipesData);
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);
  const [isRecipeFormOpen, setIsRecipeFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle adding to favourites
  const addToFavourites = (id) => {
    // Check if the recipe is already in favorites
    const isAlreadyFavorite = favouriteRecipes.some(
      (recipe) => recipe.id === id
    );

    if (isAlreadyFavorite) {
      // If already in favorites, remove it
      setFavouriteRecipes(
        favouriteRecipes.filter((recipe) => recipe.id !== id)
      );
    } else {
      // If not in favorites, add it
      const favouriteRecipe = recipes.find((recipe) => recipe.id === id);
      if (favouriteRecipe) {
        setFavouriteRecipes((prevFavourites) => [
          ...prevFavourites,
          favouriteRecipe,
        ]);
      }
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
    setIsRecipeFormOpen(true);
  };

  const closeRecipeForm = () => {
    setIsRecipeFormOpen(false);
  };

  // Handle adding a new recipe
  const handleAddRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  // New function to handle search
  const handleSearch = (query) => {
    setSearchQuery(query);

    // Filter recipes that match the search query in name or ingredients
    const results = recipes.filter((recipe) => {
      // Check if recipe name includes the search query
      const nameMatch = recipe.name.toLowerCase().includes(query.toLowerCase());

      // Check if any ingredient includes the search query
      const ingredientMatch = recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(query.toLowerCase())
      );

      // Return true if either name or ingredients match
      return nameMatch || ingredientMatch;
    });

    setSearchResults(results);
  };

  return (
    <div>
      <Navbar />
      <Sidebar onOpenRecipeForm={openRecipeForm} onSearch={handleSearch} />
      <div className="pages">
        <Routes>
          <Route
            element={
              <Layout
                recipes={recipes}
                addToFavourites={addToFavourites}
                deleteBtn={deleteBtn}
              />
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/recipes/:recipesId" element={<RecipeDetailPage />} />
          </Route>
          <Route
            path="/recipes"
            element={
              <RecipesList
                recipes={recipes}
                addToFavourites={addToFavourites}
                deleteBtn={deleteBtn}
                favouriteRecipes={favouriteRecipes}
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
          <Route
            path="/search"
            element={
              <SearchResults
                searchResults={searchResults}
                searchQuery={searchQuery}
                addToFavourites={addToFavourites}
                deleteBtn={deleteBtn}
                favouriteRecipes={favouriteRecipes}
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
