// Import necessary modules
const express = require('express');
const router = express.Router();
const { generateShareableLink } = require('../controllers/shareController'); // Import the controller function

// Define the POST route for generating a shareable link
router.post('/generate', generateShareableLink);

module.exports = router;
