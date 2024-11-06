const express = require("express");
const router = express.Router();
const { db } = require("../models/db");

// GET /search route
router.get("/", (req, res) => {
  const {
    stops,
    airlines,
    price_range,
    origin_airport,
    arrival_airport,
    arrival_date,
  } = req.query;

  // Extract price range
  const [minPrice, maxPrice] = price_range
    ? price_range.split(",").map(Number)
    : [null, null];

  // Extract airlines
  const airlineList = airlines ? airlines.split(",") : [];

  // Extract stops
  const stopsCount = stops ? parseInt(stops, 10) : null;

  let query = "SELECT * FROM flights WHERE 1=1";
  const params = [];

  // Add filters based on query parameters
  if (stopsCount) {
    query += " AND stops = ?";
    params.push(stopsCount);
  }
  if (airlineList.length > 0) {
    query += ` AND airline IN (${airlineList
      .map((airline) => `'${airline}'`)
      .join(", ")})`;
  }
  if (minPrice) {
    query += " AND base_cost >= ?";
    params.push(minPrice);
  }
  if (maxPrice) {
    query += " AND base_cost <= ?";
    params.push(maxPrice);
  }
  if (arrival_airport) {
    query += " AND arrival_airport = ?";
    params.push(arrival_airport);
  }
  if (origin_airport) {
    query += " AND departure_airport = ?";
    params.push(origin_airport);
  }
  if (arrival_date) {
    query += " AND DATE(arrival_time) = DATE(?)";
    params.push(arrival_date);
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
