import React, { useState } from 'react';

// ReservationsForm component
export default function ReservationsForm({ availableTimes, dispatch, onSubmit, existingReservations = [], occasions }) {

  const [date, setDate] = useState('');
  const [time, setTime] = useState(''); // Keep as string in "HH:MM" format
  const [partySize, setPartySize] = useState(1);
  const [occasion, setOccasion] = useState('');
  const [error, setError] = useState('');

  // Get today's date in Chicago timezone formatted as YYYY-MM-DD for the min attribute
  const getChicagoDate = () => {
    // Create a date in Chicago's timezone
    const options = { timeZone: 'America/Chicago' };
    const chicagoDate = new Date().toLocaleString('en-US', options);
    return new Date(chicagoDate);
  };
  
  // Get today's date in Chicago timezone formatted as YYYY-MM-DD for the min attribute
  const getMinDate = () => {
    const today = getChicagoDate();
    return today.toISOString().split('T')[0];
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    dispatch({ type: 'UPDATE_TIMES', date: newDate }); // Ensure the action object includes both type and date
  };

 // Filter out booked times for the selected date
 const getAvailableTimeSlots = () => {
  if (!date) return availableTimes;
  
  const bookedTimesForDate = existingReservations
    .filter(res => new Date(res.date).toISOString().split('T')[0] === date)
    .map(res => res.time);
  
  return availableTimes.filter(time => !bookedTimesForDate.includes(time));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Create a date that preserves the selected date in Chicago's timezone
    const selectedDate = new Date(`${date}T12:00:00`);
  
    const formData = {
      // Store with Chicago'stimezone information to ensure consistency
      date: selectedDate.toISOString(),
      time, // Keep as string in "HH:MM" format
      partySize: parseInt(partySize),
      occasion: occasion || undefined
    };
  
    console.log('Submitting reservation data:', formData); // Add this log
  
    try {
      await onSubmit(formData);
      // Reset form after successful submission
      setDate('');
      setTime(''); // Reset time to empty string
      setPartySize(1);
      setOccasion('');
    } catch (error) {
      console.error('Error submitting reservation:', error);
      setError('Failed to submit reservation. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reservations-form">

      {/* Error message */}
      {/* If error state has a message, display it */}
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      {/* Required Fields Notice */}
      <p className="required-field-notice">* Required fields</p>

      {/* Form Fields */}
      {/* Date Field */}
      <div className="form-group">
        <label htmlFor="date">
          Choose date
          <span className="required-field-notice">*</span>
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          min={getMinDate()} // Add this line to prevent past dates
          onChange={handleDateChange}
          required
        />
      </div>

      {/* Time Field */}
      <div className="form-group">
        <label htmlFor="time">
          Choose time
          <span className="required-field-notice">*</span>
        </label>
        <select
          id="time"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          disabled={!date} // Disable until date is selected
          required
        >
          <option value="">Select a time</option>
          {getAvailableTimeSlots().length === 0 ? (
            <option value="" disabled>No available times for this date</option>
          ) : (
            getAvailableTimeSlots().map((timeOption) => (
              <option key={timeOption} value={timeOption}>
                {timeOption}
              </option>
            ))
          )}
        </select>
        {!date && (
          <p className="no-slots-message">
            Please select a date to view available times.
          </p>
        )}
        {date && getAvailableTimeSlots().length === 0 && (
          <p className="no-slots-message">
            Sorry, all time slots are booked for this date. Please select a different date.
          </p>
        )}
      </div>

      {/* Party Size Field */}
      <div className="form-group">
        <label htmlFor="partySize">
          Party size
          <span className="required-field-notice">*</span>
        </label>
        <input
          type="number"
          id="partySize"
          name="partySize"
          min="1"
          max="10"
          value={partySize}
          onChange={(e) => setPartySize(parseInt(e.target.value))}
          required
        />
      </div>

      {/* Occasion Field */}
      <div className="form-group">
        <label htmlFor="occasion">
          Occasion
          <span className="required-field-notice">*</span>
        </label>
        <select
          id="occasion"
          name="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          required
        >
          <option value="">Select an occasion</option>
          {occasions.map(occasion => (
            <option key={occasion} value={occasion}>
              {occasion}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
}