import { render, screen } from '@testing-library/react';
import { initializeTimes, updateTimes, AVAILABLE_TIMES } from '../components/ReservationsPage';

/*
const AVAILABLE_TIMES = [
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00'
  ];
*/

  describe('initializeTimes', () => {
    test('Should return the correct initial available times', () => {
      const result = initializeTimes();
      expect(result).toEqual(AVAILABLE_TIMES);
    });
  });

  describe('updateTimes', () => {
    test('Should return the same available times provided in the state for UPDATE_TIMES action', () => {
      const state = AVAILABLE_TIMES;
      const action = { type: 'UPDATE_TIMES', payload: '2025-03-28' }; // payload is ignored for now
      const result = updateTimes(state, action);
      expect(result).toEqual(AVAILABLE_TIMES);
    });

    test('Should return the current state if action type is not recognized', () => {
      const state = AVAILABLE_TIMES;
      const action = { type: 'UNKNOWN_ACTION' };
      const result = updateTimes(state, action);
      expect(result).toEqual(state);
    });
  });