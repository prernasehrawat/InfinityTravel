// Import necessary modules
const { v4: uuidv4 } = require('uuid'); // UUID library for generating unique links
const db = require('../models/db'); // Assuming there's a db module to handle database interactions

// Generate a shareable link
const generateShareableLink = (req, res) => {
    const { searchId } = req.body; // Get the search ID from the request body

    // Generate a unique link using UUID
    const shareLink = `http://localhost:8000/share/${uuidv4()}`;

    // Log the sharing activity (example entry)
    const query = `INSERT INTO share_logs (search_id, link, created_at) VALUES (?, ?, ?)`;
    const params = [searchId, shareLink, new Date()];

    db.run(query, params, function (err) {
        if (err) {
            console.error("Error logging share activity:", err);
            return res.status(500).json({ message: "Failed to create shareable link" });
        }
        // Return the generated link
        res.status(200).json({ link: shareLink });
    });
};

module.exports = { generateShareableLink };
