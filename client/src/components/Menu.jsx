import React from 'react';

export default function Menu({ categories, menuItems }) {
  return (
    <section className="menu-container">
      {categories.map(category => (
        <section key={category} className="menu-section">
          <h2>{category}</h2>
          <div className="menu-grid">
            {menuItems
              .filter(item => item.category === category)
              .map(item => (
                <article key={item.id} className="menu-item">
                  <div className="menu-item-content">
                                        <div className="menu-item-header">
                                            <h3>{item.name}</h3>
                                            <p className="price">${item.price}</p>
                                        </div>
                                        <p className="description">{item.description}</p>
                                    </div>
                </article>
              ))}
          </div>
        </section>
      ))}
    </section>
  );
}