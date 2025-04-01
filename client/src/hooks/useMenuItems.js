import { useState, useEffect } from "react";

// No auth needed for menu items since it's public
// This hook is used to fetch menu items from the API
export default function useMenuItems() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchMenuItems = async () => {
        try {
          console.log('Fetching from:', `${process.env.REACT_APP_API_URL}/menu-items`); // Debug log
          const response = await fetch(`${process.env.REACT_APP_API_URL}/menu-items`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setMenuItems(data);
        } catch (err) {
          console.error('Fetch error:', err); // Debug log
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchMenuItems();
    }, []);
  
    return { menuItems, loading, error };
  }