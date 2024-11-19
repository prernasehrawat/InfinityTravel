// File: routes/metrics.js
const express = require("express");
const router = express.Router();

// Dummy data for consistent metrics
const dummyMetrics = {
    // For SEA -> IAD route
    "SEA-IAD": {
        hourly: [
            // January 15, 2024 data
            { hour: "09", source: "SEA", destination: "IAD", search_count: 50 },
            { hour: "10", source: "SEA", destination: "IAD", search_count: 75 },
            { hour: "11", source: "SEA", destination: "IAD", search_count: 85 }
        ],
        monthly: [
            { month: "2024-01", source: "SEA", destination: "IAD", search_count: 3000 },
            { month: "2024-02", source: "SEA", destination: "IAD", search_count: 2800 },
            { month: "2024-03", source: "SEA", destination: "IAD", search_count: 3200 }
        ]
    },
    // For LAX -> JFK route
    "LAX-JFK": {
        hourly: [
            { hour: "09", source: "LAX", destination: "JFK", search_count: 65 },
            { hour: "10", source: "LAX", destination: "JFK", search_count: 90 },
            { hour: "11", source: "LAX", destination: "JFK", search_count: 95 }
        ],
        monthly: [
            { month: "2024-01", source: "LAX", destination: "JFK", search_count: 3500 },
            { month: "2024-02", source: "LAX", destination: "JFK", search_count: 3200 },
            { month: "2024-03", source: "LAX", destination: "JFK", search_count: 3800 }
        ]
    },
    // For SFO -> BOS route
    "SFO-BOS": {
        hourly: [
            { hour: "09", source: "SFO", destination: "BOS", search_count: 45 },
            { hour: "10", source: "SFO", destination: "BOS", search_count: 60 },
            { hour: "11", source: "SFO", destination: "BOS", search_count: 70 }
        ],
        monthly: [
            { month: "2024-01", source: "SFO", destination: "BOS", search_count: 2500 },
            { month: "2024-02", source: "SFO", destination: "BOS", search_count: 2300 },
            { month: "2024-03", source: "SFO", destination: "BOS", search_count: 2700 }
        ]
    }
};

// GET /metric route
router.get("/", async (req, res) => {
    try {
        const {
            timeFrame,
            source,
            destination,
            date,
            startDate,
            endDate
        } = req.query;

        // Create key for dummy data lookup
        const routeKey = `${source}-${destination}`;

        // Check if route exists in dummy data
        if (!dummyMetrics[routeKey]) {
            return res.status(404).json({
                success: false,
                error: "No data available for this route"
            });
        }

        // Return appropriate data based on timeFrame
        if (timeFrame === 'hourly') {
            res.json({
                success: true,
                data: dummyMetrics[routeKey].hourly
            });
        } else if (timeFrame === 'monthly') {
            res.json({
                success: true,
                data: dummyMetrics[routeKey].monthly
            });
        } else {
            res.status(400).json({
                success: false,
                error: "Invalid timeFrame parameter. Must be 'hourly' or 'monthly'"
            });
        }

    } catch (error) {
        console.error("Error fetching metrics:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch metrics"
        });
    }
});

module.exports = router;
