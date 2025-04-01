import React from 'react';
import aboutImage1 from '../images/about1.png';
import aboutImage2 from '../images/about2.png';

export default function About() {
  return (
    <section id="about">

      <div className="about-container">

        <div className="about-left">

            <h1>Little Lemon</h1>
            <h3>Chicago</h3>
            <p>
            Little Lemon is a family-owned Mediterranean restaurant located in the heart of Chicago. We are dedicated to providing our customers with the best dining experience, offering a variety of traditional Mediterranean dishes with a modern twist. Our cozy atmosphere and friendly staff make Little Lemon the perfect place to enjoy a meal with family and friends.
            </p>

        </div>

        <div className="about-right">
          <img src={aboutImage1} alt="Interior of Little Lemon restaurant" className="about-image1" />
          <img src={aboutImage2} alt="Delicious Mediterranean dish" className="about-image2" />
        </div>

      </div>

    </section>
  );
}
