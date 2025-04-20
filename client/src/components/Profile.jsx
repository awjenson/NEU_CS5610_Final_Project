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
    <section className="profile-container">

      <header>
        <h2>
          Success! You've logged in.
        </h2>
      </header>

      <section>
        <p>You can now access the {' '}
          <Link to="/reservations" className="reservation-link">
          Reservations page
          </Link>.</p>
      </section>

      <div className="section-divider"></div>

      <section className="profile-info">
        <h3>Account Details</h3>
        <div className="info-group">
          <label>Name:</label>
          <p>{user.name}</p>
        </div>
        <div className="info-group">
          <label>Username:</label>
          <p>{user.username}</p>
        </div>
      </section>

      <section className="logout-button-container">
        <button
          className="logout-button"
          onClick={handleLogout}
          aria-label="Logout"
        >
          Logout
        </button>
      </section>

    </section>
  );
}
