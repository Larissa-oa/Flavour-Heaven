import React from "react";
import RecipeForm from "./RecipeForm";
import "./RecipeFormPopup.css";

const RecipeFormPopup = ({ isOpen, onClose, onAddRecipe }) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    // Close the popup if the background is clicked
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="recipe-form-popup" onClick={handleBackgroundClick}>
      <div className="recipe-form-content">
        <RecipeForm onAddRecipe={onAddRecipe} onClose={onClose} />
      </div>
    </div>
  );
};

export default RecipeFormPopup;
