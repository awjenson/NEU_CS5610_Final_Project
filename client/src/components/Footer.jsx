import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo-tall-green.png';

export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="Little Lemon Logo" />
        </div>
        <div className="footer-nav">
          <h4>Doormat Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reservations">Reservations</Link></li>
            <li><Link to="/order-online">Order Online</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
        <address className="footer-contact">
          <h4>Contact Us</h4>
          <p>123 Main Street, Chicago, IL 60601</p>
          <p>(123) 456-7890</p>
          <p>info@littlelemon.com</p>
        </address>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="https://www.facebook.com">Facebook</a></li>
            <li><a href="https://www.instagram.com">Instagram</a></li>
            <li><a href="https://www.linkedin.com">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <p>&copy; 2025 Little Lemon. All rights reserved.</p>
    </footer>
  );
}
