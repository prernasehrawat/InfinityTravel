const { db } = require("../models/db");

const addFlightReservation = (req, res) => {
    const { user_id, flight_id, passenger_name, seat_class, total_cost } = req.body;

    if (!user_id || !flight_id || !passenger_name || !seat_class || !total_cost) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const insertReservationQuery = `
    INSERT INTO flight_reservations (user_id, flight_id, passenger_name, seat_class, total_cost)
    VALUES (?, ?, ?, ?, ?);
  `;
    const updatePointsQuery = `
    UPDATE users
    SET rewards_points = rewards_points + ?
    WHERE user_id = ?;
  `;
    const pointsEarned = Math.floor(total_cost / 10); // 1 point for every $10 spent

    db.serialize(() => {
        // Insert the flight reservation
        db.run(insertReservationQuery, [user_id, flight_id, passenger_name, seat_class, total_cost], function (err) {
            if (err) {
                console.error("Error adding flight reservation:", err.message);
                res.status(500).json({ error: "Failed to add flight reservation" });
                return;
            }
            console.log(`Flight reservation added for user ${user_id}.`);

            // Update the user's rewards points
            db.run(updatePointsQuery, [pointsEarned, user_id], (err) => {
                if (err) {
                    console.error("Error updating rewards points:", err.message);
                    res
                        .status(500)
                        .json({ error: "Flight reservation added, but failed to update rewards points" });
                } else {
                    res.status(201).json({
                        message: "Flight reservation added and rewards points updated",
                        pointsEarned,
                    });
                }
            });
        });
    });
};

const getReservationsByUser = (req, res) => {
    const { user_id } = req.params;

    if (!user_id) {
        return res.status(400).json({ error: "User ID is required" });
    }

    const query = `
    SELECT * FROM flight_reservations WHERE user_id = ?;
  `;

    db.all(query, [user_id], (err, rows) => {
        if (err) {
            console.error("Error fetching reservations:", err.message);
            res.status(500).json({ error: "Failed to fetch reservations" });
            return;
        }

        if (rows.length === 0) {
            res.status(404).json({ message: "No reservations found for this user" });
            return;
        }

        res.json(rows);
    });
};

module.exports = {
    addFlightReservation,
    getReservationsByUser,
};
