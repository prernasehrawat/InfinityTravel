const express = require("express");
const router = express.Router();
const { db } = require("../models/db");

// GET /search route
router.get("/", (req, res) => {
  const { stops, airline, maxPrice } = req.query;
  
  let query = "SELECT * FROM flights WHERE 1=1";
  const params = [];

  // Add filters based on query parameters
  if (stops) {
    query += " AND stops = ?";
    params.push(stops);
  }
  if (airline) {
    query += " AND airline = ?";
    params.push(airline);
  }
  if (maxPrice) {
    query += " AND base_cost <= ?";
    params.push(maxPrice);
  }

  // Sort by base_cost in ascending order
  query += " ORDER BY base_cost ASC";

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error("Error retrieving flights:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (rows.length === 0) {
      return res.status(404).json({
        message: "No flights found matching the search criteria.",
      });
    }

    res.json(rows);
  });
});

module.exports = router;

