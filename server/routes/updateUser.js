const express = require('express');
const router = express.Router();
const { db } = require('../models/db'); // Replace with your actual database connection

// Route for updating user profile
router.put('/update-user', (req, res) => {
    const { user_id, first_name, last_name, email, phone_number, profileImage } = req.body;

    if (!user_id || !first_name || !last_name || !email || !phone_number) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = `
    UPDATE users
    SET first_name = ?, last_name = ?, email = ?, phone_number = ?
    WHERE user_id = ?
  `;

    db.run(query, [first_name, last_name, email, phone_number, user_id], function(err) {
        if (err) {
            console.error('Error updating user profile:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(200).json({ message: 'Profile updated successfully' });
    });
});

module.exports = router;
