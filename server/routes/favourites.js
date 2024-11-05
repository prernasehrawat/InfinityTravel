const express = require("express");
const router = express.Router();
const favouritesController = require("../controllers/favouritesController"); // Import the controller

router.get("/", favouritesController.getFavourites);

module.exports = router;
