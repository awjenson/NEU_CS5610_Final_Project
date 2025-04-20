import { render, screen, fireEvent, act } from '@testing-library/react';
import ReservationsForm from '../components/ReservationsForm';
import { AVAILABLE_TIMES, OCCASIONS } from '../components/ReservationsPage';

// Test the imports
describe('Constants Import', () => {
  test('AVAILABLE_TIMES is imported correctly', () => {
    expect(AVAILABLE_TIMES).toBeDefined();
    expect(Array.isArray(AVAILABLE_TIMES)).toBe(true);
    expect(AVAILABLE_TIMES.length).toBeGreaterThan(0);
  });

  test('OCCASIONS is imported correctly', () => {
    expect(OCCASIONS).toBeDefined();
    expect(Array.isArray(OCCASIONS)).toBe(true);
    expect(OCCASIONS.length).toBeGreaterThan(0);
  });
});

// Default props to use in tests
const defaultProps = {
  availableTimes: AVAILABLE_TIMES,
  dispatch: jest.fn(),
  onSubmit: jest.fn(),
  occasions: OCCASIONS,
  existingReservations: []
};

// Helper function to get future date
const getFutureDate = (daysFromNow) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
};

test('Submits the form when all required fields are valid', async () => {
  const mockOnSubmit = jest.fn();
  render(
    <ReservationsForm 
      {...defaultProps} 
      onSubmit={mockOnSubmit} 
    />
  );

  const tomorrow = getFutureDate(1);

  // Fill in all required fields
  await act(async () => {
    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: tomorrow },
    });
  });

  await act(async () => {
    fireEvent.change(screen.getByLabelText(/choose time/i), {
      target: { value: AVAILABLE_TIMES[0] },
    });
  });

  await act(async () => {
    fireEvent.change(screen.getByLabelText(/party size/i), {
      target: { value: '4' },
    });
  });

  await act(async () => {
    fireEvent.change(screen.getByLabelText(/occasion/i), {
      target: { value: OCCASIONS[0] },
    });
  });

  const submitButton = screen.getByRole('button', { name: /submit/i });
  expect(submitButton).not.toBeDisabled();

  await act(async () => {
    fireEvent.click(submitButton);
  });

  expect(mockOnSubmit).toHaveBeenCalled();
});

describe('ReservationsForm HTML5 Validation', () => {
  beforeEach(() => {
    render(<ReservationsForm {...defaultProps} />);
  });

  test('date input has required attribute and correct type', () => {
    const dateInput = screen.getByLabelText(/choose date/i);
    expect(dateInput).toHaveAttribute('type', 'date');
    expect(dateInput).toHaveAttribute('required');
  });

  test('time select has required attribute and is disabled when no date selected', () => {
    const timeSelect = screen.getByLabelText(/choose time/i);
    expect(timeSelect).toHaveAttribute('required');
    expect(timeSelect).toBeDisabled();
  });

  test('party size input has required attribute and correct min/max values', () => {
    const guestsInput = screen.getByLabelText(/party size/i);
    expect(guestsInput).toHaveAttribute('type', 'number');
    expect(guestsInput).toHaveAttribute('required');
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
  });

  test('occasion select has required attribute', () => {
    const occasionSelect = screen.getByLabelText(/occasion/i);
    expect(occasionSelect).toHaveAttribute('required');
  });

  test('submit button is disabled when form is invalid', () => {
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });
});

describe('ReservationsForm JavaScript validation', () => {
  test('form is invalid when initially rendered', () => {
    render(<ReservationsForm {...defaultProps} />);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  test('validates entire form - missing required fields', async () => {
    render(<ReservationsForm {...defaultProps} />);
    
    const dateInput = screen.getByLabelText(/choose date/i);
    
    await act(async () => {
      fireEvent.change(dateInput, { 
        target: { value: getFutureDate(1) } 
      });
    });
    
    // Try different ways to find the button
    const submitButton = screen.getByRole('button', { name: /submit/i }) || 
                        screen.getByRole('button') ||
                        screen.getByText(/submit/i);
    
    expect(submitButton).toBeDisabled();
  });
});