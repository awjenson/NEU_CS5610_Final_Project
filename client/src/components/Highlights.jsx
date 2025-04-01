import React from 'react';
import { useNavigate } from 'react-router-dom'; // Used inside button onClick
import dishImage1 from '../images/greek-salad.png'; // Update the path to your image
import dishImage2 from '../images/bruschetta.png';
import dishImage3 from '../images/lemon-dessert.png';

function Highlights() {

  const specials = [
    {
      name: 'Greek salad',
      description: 'The famous greek salad of crispy lettuce, peppers, olives, and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
      price: '$12.99',
      image: dishImage1,
    },
    {
      name: 'Bruschetta',
      description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
      price: '$5.99',
      image: dishImage2,
    },
    {
      name: 'Lemon Dessert',
      description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
      price: '$5.00',
      image: dishImage3,
    },
  ];

  const navigate = useNavigate(); // Used inside button onClick

  return (
    <section id="highlights">
      <div className="highlights-header">
        <h3>This Week's Specials</h3>
        <button onClick={() => navigate('/menu')}>
          Online Menu
        </button>
      </div>
      <div className="specials-container">
        {specials.map((special, index) => (
          <div key={index} className="special-item">
            <img src={special.image} alt={special.name} />
            <h5>{special.name}</h5>
            <p>{special.description}</p>
            <p>{special.price}</p>
            <button className="order-button" onClick={() => navigate('/order-online')}>
              Order Online
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Highlights;