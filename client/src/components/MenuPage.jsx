import React from 'react';
import useMenuItems from '../hooks/useMenuItems';

export default function MenuPage() {
  console.log('MenuPage component rendering'); // Debug log

  const { menuItems, loading, error } = useMenuItems();
  
  console.log('MenuPage state:', { menuItems, loading, error }); // Debug log

  return (
    <div className="menu-page">
      <h1>Our Menu</h1>
      
      {loading && <div>Loading menu items...</div>}
      
      {error && (
        <div className="error-message">
          Error loading menu items: {error}
        </div>
      )}

      {!loading && !error && (
        <div className="menu-items">
          {menuItems.map(item => (
            <div key={item.id} className="menu-item">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p className="price">
                ${Number(item.price).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}