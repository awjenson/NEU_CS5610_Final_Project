import React, { useReducer } from 'react';
import useReservations from '../hooks/useReservations';
import ReservationsForm from './ReservationsForm';
import ReservationsList from './ReservationsList';

// Define times once to avoid duplication
// The 'Constants' file is an anti-pattern. Placement by functionality, not technical concerns
  // https://www.hacklewayne.com/the-constants-file-is-an-anti-pattern-so-is-the-interface-folder-placement-by-functionality-not-technical-concerns
const AVAILABLE_TIMES = [
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00'
];

const OCCASIONS = [
    'Normal',
    'Birthday',
    'Anniversary',
    'Business',
    'Other'
];

// Step 1: Create the reducer function
export const updateTimes = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TIMES':
            // For now, return the same times regardless of the date
            return AVAILABLE_TIMES;
        default:
            return state; // Return the current state if action type is not recognized
    }
};

// Step 2: Create initialization function
export const initializeTimes = () => {
    // Return initial times
    return AVAILABLE_TIMES;
};

// ReservationsPage component
export default function ReservationsPage() {

    // Get CRUD functions and reservations from useReservations hook
    const {
        reservations,
        loading,
        error,
        addReservation, // This is the onSubmit prop for the ReservationsForm component
        updateReservation,
        deleteReservation
      } = useReservations();

    // Step 3: Use reducer instead of useState
    // useReducer is used to manage the state of the available times
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  if (loading) return <div>Loading reservations...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="reservations-page">
      <h1>Reservations</h1>
      
      <section className="new-reservation">
        <h2>Make a New Reservation</h2>
        <ReservationsForm 
          availableTimes={availableTimes}
          dispatch={dispatch}
          onSubmit={addReservation}
          existingReservations={reservations}
          occasions={OCCASIONS}
        />
      </section>

      <div className="section-divider"></div>

      <section className="existing-reservations">
        <h2>Existing Reservations</h2>
        <ReservationsList
            reservations={reservations}
            onUpdate={updateReservation}
            onDelete={deleteReservation}
            occasions={OCCASIONS}
        />
      </section>
    </div>
  );
};
