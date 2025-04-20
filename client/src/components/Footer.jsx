import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo-tall-green.png';

export default function Footer() {
  return (
    <footer id="footer">

      <main className="footer-content">

        <header className="footer-logo">
          <img src={logo} alt="Little Lemon Logo" />
        </header>
        <section className="footer-nav">
          <h1>Navigation</h1>
          <ul className="footer-nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reservations">Reservations</Link></li>
            <li><Link to="/order-online">Order Online</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </section>
        <address className="footer-contact">
          <h1>Contact Us</h1>
          <p>123 W Illinois St, Chicago, IL 60654</p>
          <p>(123) 456-7890</p>
          <p>info@littlelemon.com</p>
        </address>
        <section className="footer-social">
          <h1>Follow Us</h1>
          <ul className="footer-social-links">
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </section>
       
      </main>

    </footer>
  );
}
