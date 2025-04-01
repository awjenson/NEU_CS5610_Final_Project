import { useState, useEffect } from "react";
import { 
  fetchGetWithAuth, 
  fetchPostWithAuth, 
  fetchPutWithAuth, 
  fetchDeleteWithAuth 
} from "../security/fetchWithAuth";

// fetchWithAuth needed for reservations since it's protected
export default function useReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all reservations on component mount
  useEffect(() => {
    async function getReservationsFromApi() {
      try {
        const data = await fetchGetWithAuth(
          `${process.env.REACT_APP_API_URL}/reservations`
        );
        setReservations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getReservationsFromApi();
  }, []);

  // Add helper functions for CRUD operations --------------------------------

  // Create new reservation
  const addReservation = async (newReservation) => {
    try {
      const response = await fetchPostWithAuth(
        `${process.env.REACT_APP_API_URL}/reservations`,
        newReservation
      );
      const data = await response.json();
      setReservations([...reservations, data]);
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Get a single reservation
  const getReservation = async (id) => {
    try {
      const data = await fetchGetWithAuth(
        `${process.env.REACT_APP_API_URL}/reservations/${id}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Update existing reservation
  const updateReservation = async (id, updatedData) => {
    try {
      const response = await fetchPutWithAuth(
        `${process.env.REACT_APP_API_URL}/reservations/${id}`,
        updatedData
      );
      const data = await response.json();
      setReservations(reservations.map(r => 
        r.id === id ? data : r
      ));
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Delete existing reservation
  const deleteReservation = async (id) => {
    try {
      await fetchDeleteWithAuth(
        `${process.env.REACT_APP_API_URL}/reservations/${id}`
      );
      setReservations(reservations.filter(r => r.id !== id));
    } catch (error) {
      throw error;
    }
  };

  // Return all functions ---------------------------------------------------
  return {
    reservations,    // List of all reservations
    loading,
    error,
    getReservation, // Read single reservation lookup
    addReservation, // Create new reservation 
    updateReservation, // Update existing reservation
    deleteReservation // Delete existing reservation
  };
}