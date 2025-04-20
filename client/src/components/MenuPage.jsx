import React from 'react';
import useMenuItems from '../hooks/useMenuItems';
import Menu from '../components/Menu';

export default function MenuPage() {
  const categories = ['Starters', 'Main Courses', 'Desserts', 'Drinks'];
  const { menuItems, isLoading, error } = useMenuItems();


  console.log('Loading:', isLoading);
  console.log('Error:', error);
  console.log('Menu Items:', menuItems);

  if (isLoading) {
    return <div>Loading menu items...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1>Our Menu</h1>
      <main className="menu-page">
        <Menu categories={categories} menuItems={menuItems} />
      </main>
    </>
  );
} 