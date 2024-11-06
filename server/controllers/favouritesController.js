const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./infinity-travel.db"); // Path to your SQLite database

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
        return res
          .status(500)
          .json({ message: "An error occurred while fetching favourites" });
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

const favouriteSearch = (req, res) => {
  const headers = req.headers;
  const userId = headers["x-user-id"];

  if (!userId) {
    return res.status(401).json({ message: "Invalid parameters" });
  }

  const { searchParams } = req.body;

  // Check if searchParams is present
  if (!searchParams) {
    return res.status(400).json({ message: "Missing search parameters" });
  }

  // Stringify the searchParams object to store it as JSON in the database
  const searchParamsString = JSON.stringify(searchParams);

  // SQL query to insert the favorite search
  const query = `
      INSERT INTO favourites (user_id, search_params)
      VALUES (?, ?)
    `;

  // Execute the query
  db.run(query, [userId, searchParamsString], function (err) {
    if (err) {
      console.error("Error saving favourite search:", err);
      return res
        .status(500)
        .json({ message: "Failed to save favourite search" });
    }

    // Send a success response with the ID of the new favourite
    return res.status(201).json({
      message: "Favourite search saved successfully",
      favouriteId: this.lastID,
    });
  });
};

module.exports = { getFavourites, favouriteSearch };
