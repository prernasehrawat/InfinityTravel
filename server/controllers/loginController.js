// In-memory user data for testing purposes
const users = [
    { email: 'user@example.com', password: 'password123' }
];

// Login controller
const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      setError('');
  
      try {
        // Making POST request to the backend (Node.js)
        const response = await fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Call parent component's login handler
          onLogin(email, password);  // This will trigger state change in App.tsx
        } else {
          setError(data.message || 'Invalid credentials');
        }
      } catch (error) {
        setError('An error occurred while trying to log in. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please enter valid credentials');
    }
  };
  

module.exports = { handleLogin };
