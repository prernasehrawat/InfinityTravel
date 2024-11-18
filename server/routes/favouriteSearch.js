const express = require("express");
const router = express.Router();
const favouritesController = require("../controllers/favouritesController"); // Import the controller

router.post("/", favouritesController.favouriteSearch);

module.exports = router;
