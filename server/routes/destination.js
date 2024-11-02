const express = require("express");
const router = express.Router();
const { db } = require("../models/db");

// GET /destination/:arrival_airport/date/:arrival_date
router.get("/:arrival_airport/date/:arrival_date", (req, res) => {
  const { arrival_airport, arrival_date } = req.params;

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

  db.all(query, [arrival_airport, arrival_date], (err, rows) => {
    if (err) {
      console.error("Error retrieving flights:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (rows.length === 0) {
      return res.status(404).json({
        message: "No flights found to this destination on the specified date.",
      });
    }

    res.json(rows);
  });
});

module.exports = router;
