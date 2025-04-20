import React from 'react';
import { useNavigate } from 'react-router-dom'; // Used inside button onClick
import heroImage from '../images/hero.png'; // Ensure the path is correct

function Hero() {

  const navigate = useNavigate(); // Used inside button onClick

  return (
    <section id="hero">
      <article className="hero-container">

        <section className="hero-left">
          <header>
            <h1>Little Lemon</h1>
            <h2>Chicago</h2>
          </header>

            <p>
              We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
            </p>
            <button
                aria-label="Reserve a Table"
                onClick={() => navigate('/reservations')}
            >
              Reserve a Table
            </button>

        </section>

        <section className="hero-right">
          <img src={heroImage} alt="Little Lemon Restaurant" />
        </section>

      </article>
    </section>
  );
}

export default Hero;