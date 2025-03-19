import React from 'react';
import './HomePage.css';
import Carousel from '../components/Carousel';
import eggtoast from '../images/pasta.png'
import peoplecooking from '../images/cooking2.png'

const HomePage = () => {
  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-heading">
            We make cooking<br />
            <span className="hero-subheading"> 
              <span className="rotate-text" id="fun">Fun</span>|
              <span className="rotate-text" id="romantic"> Romantic</span>|
              <span className="rotate-text" id="bold"> Bold</span>
            </span>
          </h1>
          <div className="hero-buttons">
            <button className="btn btn-main">Add your own recipe</button>
            <button className="btn btn-secondary">Explore Recipes</button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="intro-section" id="intro-section">
        <div className="container">
        <div class="intro-overlay"></div>
          <div className="row">
            <div className="col-lg-6 col-12">
              <h2 className="intro-heading">
                Amazing Recipes for You to Share
              </h2>
              <div className="col-lg-6 col-12">
              <img
                src={eggtoast}
                alt="Cooking"
                className="intro-img"
              />
            </div>
              <p id="text">
  Welcome to <strong>Flavour Heaven</strong>, the ultimate kitchen paradise where culinary dreams come true! Whether you're a seasoned chef or a beginner, we've got mouth-watering recipes and cooking tips that will make your taste buds do a happy dance. From cozy family dinners to unforgettable feasts with friends and epic special occasions, explore a delicious variety of dishes that are sure to impress and delight!
</p>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <div className="carousel-wrapper">
        <Carousel />
        </div>
        <div id="img-peoplecooking">
        <img src={peoplecooking}  id="people-cooking"/>
        <span id="finaltext"><p>Your next masterpiece is one recipe away. Happy cooking!</p></span>
      </div>
    </div>
  );
};

export default HomePage;