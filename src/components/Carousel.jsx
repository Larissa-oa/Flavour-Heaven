import React, { useState, useEffect, useRef } from "react";
import recipesData from "../assets/recipes.json";
import { Link } from "react-router-dom";
import "./Carousel.css";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allRecipes, setAllRecipes] = useState([]);
  const timerRef = useRef(null);

  // Shuffle recipes on component mount
  useEffect(() => {
    const shuffleRecipes = () => {
      // Create a copy of the recipes array
      const recipesCopy = [...recipesData];

      // Fisher-Yates (Knuth) shuffle algorithm
      for (let i = recipesCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [recipesCopy[i], recipesCopy[j]] = [recipesCopy[j], recipesCopy[i]];
      }

      setAllRecipes(recipesCopy);
    };

    shuffleRecipes();

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Start auto-rotation when recipes are loaded
  useEffect(() => {
    if (allRecipes.length > 0) {
      startAutoRotation();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [allRecipes]);

  const startAutoRotation = () => {
    // Clear any existing interval
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Set new interval
    timerRef.current = setInterval(() => {
      moveCarousel(1);
    }, 4000);
  };

  const moveCarousel = (direction) => {
    // Reset the timer when manually navigating
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setCurrentIndex((prevIndex) => {
      const newIndex =
        (prevIndex + direction + allRecipes.length) % allRecipes.length;
      return newIndex;
    });

    // Restart auto rotation
    startAutoRotation();
  };

  // Get the visible recipes
  const getVisibleRecipes = () => {
    if (allRecipes.length === 0) return [];

    const visibleRecipes = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % allRecipes.length;
      visibleRecipes.push(allRecipes[index]);
    }

    return visibleRecipes;
  };

  return (
    <div className="carousel-container">
      <button
        className="carousel-arrow carousel-arrow-left"
        onClick={() => moveCarousel(-1)}
        aria-label="Previous recipe"
      >
        &lt;
      </button>

      <div className="carousel-cards">
        {getVisibleRecipes().map((recipe, index) => (
          <Link
            to={`/recipes/${recipe.id}`}
            className="carousel-card"
            key={`${recipe.id}-${index}`}
          >
            <div className="carousel-card-inner">
              <div className="carousel-image-container">
                <img src={recipe.image} alt={recipe.name} />
              </div>
              <div className="carousel-title">{recipe.name}</div>
            </div>
          </Link>
        ))}
      </div>

      <button
        className="carousel-arrow carousel-arrow-right"
        onClick={() => moveCarousel(1)}
        aria-label="Next recipe"
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
