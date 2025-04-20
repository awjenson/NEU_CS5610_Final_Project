import React, { useState } from 'react';
import { useAuthUser } from '../security/AuthContext';  // Add this import

const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'America/Chicago'  // Keep this to ensure Chicago timezone
      });
    } catch (error) {
      return 'Error formatting date';
    }
  };

  // ReservationsList component
export default function ReservationsList({ reservations, onUpdate, onDelete, occasions }) {

    const { user } = useAuthUser();  // Get current logged-in user
    const [editingReservation, setEditingReservation] = useState(null); // When editingReservation is null, no modal is shown
    const [partySize, setPartySize] = useState('');
    const [occasion, setOccasion] = useState('');

    const handleUpdateClick = (reservation) => {
        setEditingReservation(reservation);
        setPartySize(reservation.partySize);
        setOccasion(reservation.occasion || '');  // Just use the occasion string directly
      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await onUpdate(editingReservation.id, {
          partySize: parseInt(partySize),
          occasion: occasion || null
        });
        setEditingReservation(null);
    };
    

  if (!reservations.length) {
    return <p>No reservations found.</p>;
  }

  return (
    <div className="reservations-grid">
    {reservations.map(reservation => (
      <div key={reservation.id} className="reservation-card">
        <div className="card-header">
          <div className="info-row">
            <span className="label">Date:</span>
            <span className="value">{formatDate(reservation.date)}</span>
          </div>
          <div className="info-row">
            <span className="label">Time:</span>
            <span className="value">{reservation.time}</span>
          </div>
          <div className="info-row">
            <span className="label">Reserved by:</span>
            <span className="value">{reservation.user?.name || 'Unknown'}</span>
          </div>
        </div>

        <div className="card-body">
          <div className="info-row">
            <span className="label">Party Size:</span>
            <span className="value">{reservation.partySize} people</span>
          </div>
          {reservation.occasion && (
            <div className="info-row">
              <span className="label">Occasion:</span>
              <span className="value">{reservation.occasion}</span>
            </div>
          )}
        </div>

        {user && user.id === reservation.userId && (
          <div className="card-actions">

            <button 
              onClick={() => handleUpdateClick(reservation)}
              className="update-button"
              aria-label="Update Reservation"
            >
              Update
            </button>

            <button 
              onClick={() => {
                if (window.confirm('Are you sure you want to cancel this reservation?')) {
                  onDelete(reservation.id);
                }
              }}
              className="delete-button"
              aria-label="Delete Reservation"
            >
              Delete
            </button>

            </div>
          )}
        </div>
      ))}

       {/* Update Modal
           Only shows when editingReservation is not null
           A modal is a popup window that appears on top of the current page
           It is used to update the reservation details */}
       {editingReservation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Update Reservation</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="partySize">Party Size:</label>
                <input
                  type="number"
                  id="partySize"
                  value={partySize}
                  onChange={(e) => setPartySize(e.target.value)}
                  min="1"
                  max="10"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="occasion">Occasion:</label>
                <select
                    id="occasion"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    required
                >
                    <option value="">Select an occasion</option>
                    {occasions.map((occ) => (
                    <option key={occ} value={occ}>
                        {occ}
                    </option>
                    ))}
                </select>
              </div>

              <div className="modal-actions">

                <button
                type="submit"
                className="save-button"
                aria-label="Save Changes"
                >
                  Save Changes
                </button>

                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setEditingReservation(null)}
                  aria-label="Cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}