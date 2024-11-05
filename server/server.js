const express = require("express");
const app = express();
const port = 8000; // Frontend will run on 3000, backend on 8000
const cors = require("cors");
const { db, seedData } = require("./models/db");

// const cors = require('cors');
const loginRoute = require("./routes/login"); // Import the login route
const destination = require("./routes/destination"); // Import the Destination route
const search = require("./routes/search"); // Import the search route
const favourites = require("./routes/favourites"); // Import the favourites route
const shareRoutes = require('./routes/share'); // Import the share routes


// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors());
// Routes
app.use("/login", loginRoute); // Use the login route
app.use("/destination", destination); // Use the Destination route
app.use("/search", search); // Use the search route
app.use("/favourites", favourites); // Use the search route
app.use('/share', shareRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
