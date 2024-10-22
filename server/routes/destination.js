// routes/flights.js

const express = require('express');
const router = express.Router();
const { db } = require('../models/db');

// GET /flights/destination/:arrival_airport/date/:arrival_date
router.get('/destination/:arrival_airport/date/:arrival_date', (req, res) => {
  const { arrival_airport, arrival_date } = req.params;
  console.log("ENTERED");

  // Basic input validation
  if (!arrival_airport || arrival_airport.length > 5 || /[^a-zA-Z0-9]/.test(arrival_airport)) {
    return res.status(400).json({ error: 'Invalid arrival airport code.' });
  }

  // Validate arrival_date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!arrival_date || !dateRegex.test(arrival_date)) {
    return res.status(400).json({ error: 'Invalid arrival date format. Use YYYY-MM-DD.' });
  }

  const query = `
    SELECT 
      reservation_id,
      user_id,
      flight_number,
      departure_airport,
      arrival_airport,
      departure_time,
      arrival_time,
      passenger_name,
      seat_class,
      total_cost,
      reservation_date
    FROM flight_reservations
    WHERE arrival_airport = ?
      AND DATE(arrival_time) = DATE(?)
      ORDER BY total_cost ASC
  `;
   
  console.log("abccc");

  db.all(query, [arrival_airport, arrival_date], (err, rows) => {
    if (err) {
      console.error('Error retrieving flights:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No flights found to this destination on the specified date.' });
    }

    res.json(rows);
  });
});

module.exports = router;

