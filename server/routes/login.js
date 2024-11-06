const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController"); // Import the controller

// Define the login POST route and link it to the controller
router.post("/", loginController.handleLogin);

module.exports = router;
