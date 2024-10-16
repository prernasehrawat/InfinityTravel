const express = require('express');
const app = express();
const port = 8000; // Frontend will run on 3000, backend on 8000
const cors = require('cors');

// const cors = require('cors');
const loginRoute = require('./routes/login'); // Import the login route
// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors());
// Routes
app.use('/login', loginRoute); // Use the login route

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

