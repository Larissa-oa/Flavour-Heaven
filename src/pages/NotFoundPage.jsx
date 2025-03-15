import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";
import burntRecipeImage from "../images/404/recipe-burnt.jpeg";
import souffleImage from "../images/404/souffle.jpeg";
import burgerImage from "../images/404/burger.jpeg";
import emptyPlateImage from "../images/404/empty-plate.jpeg";
import vacationImage from "../images/404/vacation.jpeg";
import noIngredientsImage from "../images/404/no-ingredients.jpeg";

const NotFoundPage = () => {
  const [errorPage, setErrorPage] = useState(null);

  const errorPages = [
    {
      title: "404 - Oops! The Recipe Got Burnt!",
      text: "Looks like this page was left in the oven for too long. It's toast!",
      image: burntRecipeImage,
    },
    {
      title: "404 - This Recipe Ran Out of Ingredients!",
      text: "We were halfway through making it… and then we realized we're out of eggs. Oops!",
      image: noIngredientsImage,
    },
    {
      title: "404 - This Recipe Vanished Like a Soufflé!",
      text: "It was here a moment ago, but then it deflated... Poof!",
      image: souffleImage,
    },
    {
      title: "404 - Chef's Taking a Break",
      text: "The chef who prepared this page is currently on vacation. Browse our other culinary creations instead!",
      image: vacationImage,
    },
    {
      title: "404 - The Chef Took a Snack Break!",
      text: "Our chef left this page unattended… probably munching on a burger. Try a different page!",
      image: burgerImage,
    },
    {
      title: "404 - Page Not Found - Someone Ate It!",
      text: "We swear this recipe was here… but now it's just crumbs. Suspicious!",
      image: emptyPlateImage,
    },
  ];

  // Select a random error page when component mounts
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * errorPages.length);
    setErrorPage(errorPages[randomIndex]);
  }, []);

  // Show loading state until error page is selected
  if (!errorPage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <img
          src={errorPage.image}
          alt="404 Error Illustration"
          className="not-found-image"
        />
        <h1 className="not-found-title">{errorPage.title}</h1>
        <p className="not-found-text">{errorPage.text}</p>
        <div className="not-found-actions">
          <Link to="/" className="home-button">
            Return to Homepage
          </Link>
          <Link to="/recipes" className="recipes-button">
            Browse Recipes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
