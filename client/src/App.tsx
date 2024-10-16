// src/App.tsx
import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  // const validUsername = 'user@example.com';
  // const validPassword = 'password123';

  // const handleLogin = (email: string, password: string) => {
  //   if (email === validUsername && password === validPassword) {
  //     setIsLoggedIn(true);
  //     console.log('Login successful');
  //   } else {
  //     alert('Invalid credentials');
  //   }
  // };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        console.log('Login successful');
      } else {
        alert(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred during login');
    }
  };


  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    const fakeResults = ['Result 1', 'Result 2', 'Result 3'];
    setResults(fakeResults);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div>
          <nav className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Infinity Travel</h1>
            <button onClick={handleLogout} className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200">
              Logout
            </button>
          </nav>
          <div className="p-4">
            <SearchForm onSearch={handleSearch} />
            <SearchResults results={results} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
