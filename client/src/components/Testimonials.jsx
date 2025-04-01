import React from 'react';
import reviewer1 from '../images/reviewer1.png';
import reviewer2 from '../images/reviewer2.png';
import reviewer3 from '../images/reviewer3.png';
import reviewer4 from '../images/reviewer4.png';


function Testimonials() {
    const reviews = [
      {
        name: 'Sara Doe',
        rating: 5,
        comment: 'Amazing food and great service!',
        photo: reviewer1,
      },
      {
        name: 'Jane Smith',
        rating: 4,
        comment: 'Delicious meals and cozy atmosphere.',
        photo: reviewer2,
      },
      {
        name: 'Alice Johnson',
        rating: 5,
        comment: 'Best Mediterranean cuisine in town!',
        photo: reviewer3,
      },
      {
        name: 'Bobby Brown',
        rating: 4,
        comment: 'Highly recommend this place!',
        photo: reviewer4,
      },
    ];

    return (
      <section id="testimonials">
        <h3>Testimonials</h3>
        <div className="reviews-container">
          {reviews.map((review, index) => (
            <div key={index} className="review-item">
              <img src={review.photo} alt={`${review.name}'s photo`} className="review-photo" />
              <h5>{review.name}</h5>
              <p>Rating: {review.rating} / 5</p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  export default Testimonials;