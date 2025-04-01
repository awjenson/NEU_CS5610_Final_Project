import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthUser } from '../security/AuthContext';
import logo from '../images/logo-long-yellow.png';

export default function Nav() {

    const { isAuthenticated } = useAuthUser();

    return (
        <header id="nav">
        <nav className="nav-container">
          <div className="nav-logo">
            <img src={logo} alt="Little Lemon Logo" />
          </div>
          <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reservations">Reservations</Link></li>
            <li><Link to="/order-online">Order Online</Link></li>
            {isAuthenticated ? (
            <li><Link to="/profile">Profile</Link></li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
          </ul>
        </nav>
      </header>
    );
}
