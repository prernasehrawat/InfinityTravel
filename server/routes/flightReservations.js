const express = require("express");
const router = express.Router();
const {
    addFlightReservation,
    getReservationsByUser,
} = require("../controllers/flightReservationsController");

// POST - Add a new flight reservation
router.post("/", addFlightReservation);

// GET - Get all reservations for a specific user
router.get("/:user_id", getReservationsByUser);

module.exports = router;
