import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
          // Handle successful login (you can store token, redirect, etc.)
          alert('Login successful');
          onLogin(email, password);  // This could trigger a state change in the parent component
        } else {
          // Handle errors such as invalid credentials
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

  return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">Infinity Travel</h1>

          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-gray-400 text-xs mt-4 text-center">
            Example Use: <span className="font-semibold">john.doe@example.com</span> / <span className="font-semibold">hashedpassword1</span>
          </p>
        </div>
      </div>
  );
};

export default LoginForm;
