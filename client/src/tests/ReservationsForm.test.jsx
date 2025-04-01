import { render, screen, fireEvent } from '@testing-library/react';
import ReservationsForm from '../components/ReservationsForm';

// Define the expected available times
const AVAILABLE_TIMES = [
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00'
];

test('Renders the "Choose date" label in ReservationsForm', () => {
  // Pass availableTimes and a dummy dispatch function as props
  render(<ReservationsForm availableTimes={AVAILABLE_TIMES} dispatch={() => {}} />);

  // Adjust this to match the actual header text in BookingForm
  const headerElement = screen.getByText(/choose date/i);
  expect(headerElement).toBeInTheDocument();
});

test('Allows the user to submit the ReservationsForm', () => {
    const mockDispatch = jest.fn(); // Mock dispatch function
    render(<ReservationsForm availableTimes={AVAILABLE_TIMES} dispatch={mockDispatch} />);

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: '2025-03-28' } });
    fireEvent.change(screen.getByLabelText(/choose time/i), { target: { value: '18:00' } });
    fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText(/occasion/i), { target: { value: 'Birthday' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /submit reservation/i }));

    // Verify that the form submission logic works
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'UPDATE_TIMES', date: '2025-03-28' });
  });