import React from 'react'
import Carousel from '../components/Carousel'

const HomePage = () => {
  return (
    <div className="home-page">
    <header>
        <h1> Recipe App </h1>
        <p> Cook, Eat, Repeat – Delicious adventures await with every recipe!</p>
        </header>
        <div className="carousel-wrapper">
          <Carousel />
        </div>
    </div>
  )
}

export default HomePage
