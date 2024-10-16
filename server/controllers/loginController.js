// In-memory user data for testing purposes
const users = [
    { email: 'user@example.com', password: 'password123' }
];

// Login controller
const handleLogin = (req, res) => {
    const { email, password } = req.body;

    // Find user with matching email and password
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.status(200).json({ message: 'Login successful!' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

module.exports = { handleLogin };
