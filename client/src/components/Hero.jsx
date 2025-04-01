import React from 'react';
import { useNavigate } from 'react-router-dom'; // Used inside button onClick
import heroImage from '../images/hero.png'; // Ensure the path is correct

function Hero() {

  const navigate = useNavigate(); // Used inside button onClick

  return (
    <section id="hero">
      <div className="hero-container">

        <div className="hero-left">

            <h1>Little Lemon</h1>
            <h3>Chicago</h3>
            <p>
              We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
            </p>
            <button onClick={() => navigate('/reservations')}>
              Reserve a Table
            </button>

        </div>

        <div className="hero-right">
          <img src={heroImage} alt="Little Lemon Restaurant" />
        </div>

      </div>
    </section>
  );
}

export default Hero;