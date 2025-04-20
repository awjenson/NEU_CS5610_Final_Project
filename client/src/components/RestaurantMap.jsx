import React from 'react';

/**
 * RestaurantMap Component
 * 
 * External API Integration: Google Maps Embed API
 * Purpose: Displays the restaurant's location on an interactive map
 * Features:
 * - Embedded Google Map
 * - Get Directions link
 * - Responsive design
 * 
 * Note: Uses environment variables for API key security
 */
export default function RestaurantMap() {

  // Get the Google Maps API key from the environment variable
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  
  // Using a fictional address in Chicago's River North area
  const address = "123 W Illinois St, Chicago, IL 60654";
  
  // Construct the embed URL using the address
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(address)}`;

  if (!apiKey) {
    return <p>Error: Google Maps API key is missing.</p>;
  }

  return (

    <section id="map">

        <header>
            <h2>Our Location</h2>
        </header>

        <section className="map-container">

            <p className="map-address">
                {address} • <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                >
                Get Directions
                </a>
            </p>

            <iframe
                className="map-iframe"
                title="Little Lemon Restaurant Location"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={mapSrc}
            />

        </section>

    </section>

  );
};
