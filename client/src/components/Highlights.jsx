import React from 'react';
import { useNavigate } from 'react-router-dom'; // Used inside button onClick
import dishImage1 from '../images/greek-salad.png'; // Update the path to your image
import dishImage2 from '../images/bruschetta.png';
import dishImage3 from '../images/lemon-cake.png';

function Highlights() {

  // Specials are the items that are featured on the menu page and updated weekly
  const specials = [
    {
      name: 'Greek Salad',
      description: 'The famous greek salad of crispy lettuce, peppers, olives, and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
      price: '$10.99',
      image: dishImage1,
    },
    {
      name: 'Bruschetta',
      description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
      price: '$8.99',
      image: dishImage2,
    },
    {
      name: 'Lemon Cake',
      description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
      price: '$5.99',
      image: dishImage3,
    },
  ];

  const navigate = useNavigate(); // Used inside button onClick

  return (
    <section id="highlights">
      <header className="highlights-header">
        <h2>This Week's Specials</h2>
        <button
          aria-label="Online Menu"
          onClick={() => navigate('/menu')}
        >
          Online Menu
        </button>
      </header>
      <article className="specials-container">
        {specials.map((special, index) => (
          <section key={index} className="special-item">
            <img src={special.image} alt={special.name} />
            <h3>{special.name}</h3>
            <p>{special.description}</p>
            <p>{special.price}</p>
            <button
              aria-label="Order Online"
              onClick={() => navigate('/order-online')}
            >
              Order Online
            </button>
          </section>
        ))}
      </article>
    </section>
  );
}

export default Highlights;