const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./infinity-travel.db');  // Path to your SQLite database

// Login controller
const handleLogin = (req, res) => {
    const { email, password } = req.body;

    // Query the SQLite database for a user with the provided email and password
    db.get("SELECT * FROM users WHERE email = ? AND hashed_password = ?", [email, password], (err, user) => {
        if (err) {
            // Handle the error
            console.error(err);
            res.status(500).json({ message: 'An error occurred while logging in' });
        } else if (user) {
            // User found, login successful
            res.status(200).json({
                message: 'Login successful!',
                user_id: user.user_id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                phone_number: user.phone_number,
                coupon_code: user.coupon_code,
                rewards_points: user.rewards_points,
                created_at: user.created_at
            });
        } else {
            // No matching user found, invalid credentials
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
};



module.exports = { handleLogin };
