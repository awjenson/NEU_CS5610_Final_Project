import React from 'react';
import About from '../components/About';
import Hours from '../components/Hours';
import RestaurantMap from './RestaurantMap';

export default function AboutPage() {
    return (
      <main className="about-page">

        <header className="header-container">
          <h1>About Us</h1>
        </header>

        <section>
          <About />
        </section>

        <section>
          <Hours />
        </section>

        <section>
          <RestaurantMap />
        </section>

      </main>
    );
};
