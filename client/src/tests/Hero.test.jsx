import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Hero from '../components/Hero';

// Wrap component with BrowserRouter since Hero likely contains Links
const renderHero = () => {
  return render(
    <BrowserRouter>
      <Hero />
    </BrowserRouter>
  );
};

describe('Hero Component', () => {
  test('displays "Little Lemon" in the header', () => {
    renderHero();
    const header = screen.getByRole('heading', { level: 1 });
    expect(header).toHaveTextContent('Little Lemon');
  });

  test('displays "Chicago" as a subheading', () => {
    renderHero();
    const subheading = screen.getByRole('heading', { level: 2 });
    expect(subheading).toHaveTextContent('Chicago');
  });

  test('displays "Reserve a Table" button', () => {
    renderHero();
    const button = screen.getByRole('button', { name: /reserve a table/i });
    expect(button).toBeInTheDocument();
  });
}); 