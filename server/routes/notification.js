// File: routes/notification.js
const express = require("express");
const router = express.Router();
const { handleGeneralNotification } = require('./send_notification');

// GET /notification route
router.get("/", async (req, res) => {
    try {
        const {
            name,
            cost,
            source,
            destination
        } = req.query;

        // Create notification message string
        const notificationMessage = `Ticket information: Hi ${name}! Your ticket from ${source} to ${destination} is booked. Total ticket cost is $${cost}`;

        // Send notification using the existing notification system
        await handleGeneralNotification('Purchase notification', notificationMessage);

        res.json({
            success: true,
            message: "Notification sent successfully",
            details: {
                name,
                cost,
                source,
                destination,
                notificationMessage
            }
        });

    } catch (error) {
        console.error("Error sending notification:", error);
        res.status(500).json({
            success: false,
            error: "Failed to send notification"
        });
    }
});

module.exports = router;
