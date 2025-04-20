import React from 'react';
import aboutImage1 from '../images/about1.png';
import aboutImage2 from '../images/about2.png';

export default function About() {
  return (
    <section id="about">

      <header>
        <h2>Our Story</h2>
      </header>

      {/* First article: About content */}
      <article className="about-container">


        <section className="about-left">
          <p>
                Little Lemon is a charming family-owned Mediterranean restaurant nestled in the heart of Chicago. 
                Established with love and passion for authentic Mediterranean cuisine in 2005, our restaurant has become 
                a beloved neighborhood gem. We take pride in serving traditional recipes passed down through 
                generations, each dish crafted with the freshest ingredients and attention to detail. Our warm, 
                inviting atmosphere makes every guest feel like part of our extended family, creating the perfect 
                setting for memorable dining experiences.
              </p>
              <p>
                At the helm of our kitchen are our talented chefs, Mario and Adrian. With their combined expertise 
                in Mediterranean cuisine, they bring innovation and tradition together in perfect harmony. Mario, 
                with his classical culinary training, and Adrian, with his modern creative flair, work side by side 
                to create dishes that honor traditional recipes while adding contemporary twists. Their collaboration 
                has made Little Lemon a standout destination for both authentic and innovative Mediterranean dining 
                in Chicago.
              </p>
              
          </section>

          <section className="about-right">
            <img src={aboutImage1} alt="Chefs Mario and Adrian talking" className="about-image1" />
            <img src={aboutImage2} alt="Chefs Mario and Adrian smiling" className="about-image2" />
          </section>

      </article>

    </section>


  );
};

