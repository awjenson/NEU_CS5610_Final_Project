import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthUser } from "../security/AuthContext";

export default function Profile() {
  const { user, logout } = useAuthUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <h2>
        You've successfully logged in! You can now access the {' '}
        <Link to="/reservations" className="reservation-link">
          reservations page
        </Link>.
      </h2>
      <div className="profile-info">
        <div className="info-group">
          <label>Name:</label>
          <p>{user.name}</p>
        </div>
        <div className="info-group">
          <label>Username:</label>
          <p>{user.username}</p>
        </div>
      </div>
      <button 
        className="logout-button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
