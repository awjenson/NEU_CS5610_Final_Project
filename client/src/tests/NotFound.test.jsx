import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('NotFound Component', () => {

  // Test that the page displays the correct text
  test('displays the correct text', () => {
    render(<NotFound />);
    expect(screen.getByText("Oops! The page you're looking for doesn't exist.")).toBeInTheDocument();
  }); 
});

