const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./infinity-travel.db"); // Path to your SQLite database

// Login controller
const getFavourites = (req, res) => {
    const headers = req.headers;
    const userId = headers["x-user-id"];

    if (!userId) {
        // Stop further code execution after sending the response
        return res.status(401).json({ message: "Invalid parameters" });
    }

    // Query the SQLite database for a user with the provided email and password
    db.all(
        "SELECT * FROM favourites where user_id = ? ORDER BY TIMESTAMP DESC",
        [userId],
        (err, favourites) => {
            if (err) {
                // Handle the error and stop further code execution
                console.error(err);
                return res.status(500).json({ message: "An error occurred while fetching favourites" });
            } else if (favourites) {
                // User found, login successful
                return res.status(200).json(favourites);
            } else {
                // No matching user found, invalid credentials
                return res.status(401).json({ message: "Invalid parameters" });
            }
        }
    );
};

module.exports = { getFavourites };
