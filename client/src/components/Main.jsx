import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'; // Import your HomePage component
import AboutPage from './AboutPage';
import MenuPage from './MenuPage';
import ReservationsPage from './ReservationsPage';
import OrderOnlinePage from './OrderOnlinePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

function Main() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} /> {/* Route for the HomePage */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/reservations" element={<ReservationsPage />} /> {/* Route for the BookingPage */}
      <Route path="/order-online" element={<OrderOnlinePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Main;    