import React, { useState, useEffect } from 'react';

// ReservationsForm component
export default function ReservationsForm({ availableTimes, dispatch, onSubmit, existingReservations = [], occasions = [] }) {

  // State variables
  const [date, setDate] = useState('');
  const [time, setTime] = useState(''); // Keep as string in "HH:MM" format
  const [partySize, setPartySize] = useState(1);
  const [occasion, setOccasion] = useState('');
  const [error, setError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form whenever any field changes
  useEffect(() => {
      const validateForm = () => {
          const isDateValid = date !== '';
          const isTimeValid = time !== '';
          const isPartySizeValid = partySize >= 1 && partySize <= 10;
          const isOccasionValid = occasion !== '';

          console.log('Validation results:', {
              isDateValid,
              isTimeValid,
              isPartySizeValid,
              isOccasionValid,
              finalValidity: isDateValid && isTimeValid && isPartySizeValid && isOccasionValid
          });

          setIsFormValid(isDateValid && isTimeValid && isPartySizeValid && isOccasionValid);
      };

      validateForm();
  }, [date, time, partySize, occasion]);

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
    const selectedDate = new Date(newDate);
    const today = getChicagoDate();
    
    // Reset to today's date if selected date is in the past
    if (selectedDate < today) {
      setDate('');
      return;
    }
    
    setDate(newDate);
    dispatch({ type: 'UPDATE_TIMES', date: newDate });
  };

 // Filter out booked times for the selected date
 const getAvailableTimeSlots = () => {
  if (!date) return [];  // Return empty array when no date selected
  
  const bookedTimesForDate = existingReservations
    .filter(res => new Date(res.date).toISOString().split('T')[0] === date)
    .map(res => res.time);
  
  return availableTimes.filter(time => !bookedTimesForDate.includes(time));
};

const handlePartySizeChange = (e) => {
  const value = parseInt(e.target.value);
  if (value >= 1 && value <= 10) {
      setPartySize(value);
  }
};



const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Disable the submit button if the form is not valid
    if (!isFormValid) return;

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
    <form onSubmit={handleSubmit} className="reservations-form" aria-label="Reservation Form">

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
      <div className="form-group">

        {/* Web Accessibility: Added htmlFor to each label (should match the id of associated input field) */}
        {/* Web Accessibility: Added aria-label to the submit button */}

        {/* Date Field */}
        <label htmlFor="reservation-date">
          Choose date
          <span className="required-field-notice">*</span>
        </label>
        <input
          type="date"
          id="reservation-date"
          name="reservation-date"
          value={date}
          min={getMinDate()} // Add this line to prevent past dates
          onChange={handleDateChange}
          required
        />
      </div>

      {/* Time Field */}
      <div className="form-group">
        <label htmlFor="reservation-time">
          Choose time
          <span className="required-field-notice">*</span>
        </label>
        <select
          id="reservation-time"
          name="reservation-time"
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
        <label htmlFor="reservation-party-size">
          Party size
          <span className="required-field-notice">*</span>
        </label>
        <input
          type="number"
          id="reservation-party-size"
          name="reservation-party-size"
          min="1"
          max="10"
          value={partySize}
          onChange={handlePartySizeChange}
          required
        />
      </div>

      {/* Occasion Field */}
      <div className="form-group">
        <label htmlFor="reservation-occasion">
          Occasion
          <span className="required-field-notice">*</span>
        </label>
        <select
          id="reservation-occasion"
          name="reservation-occasion"
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
      <button 
          type="submit" 
          className="submit-button"
          aria-label="Submit Reservation"
          disabled={!isFormValid}
          style={{ 
              backgroundColor: !isFormValid ? 'lightgray' : '#F4CE14',
              cursor: !isFormValid ? 'not-allowed' : 'pointer'
          }}
        >
          Submit
        </button>
    </form>
  );
}