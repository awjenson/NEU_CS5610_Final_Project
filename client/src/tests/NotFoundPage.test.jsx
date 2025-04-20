// Test the NotFoundPage component
import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '../components/NotFoundPage';


describe('NotFoundPage', () => {
  it('renders the correct text', () => {
    render(<NotFoundPage />);
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });
});
