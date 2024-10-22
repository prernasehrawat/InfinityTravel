import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';

interface Flight {
  reservation_id: string;
  flight_number: string;
  departure_airport: string;
  arrival_airport: string;
  departure_time: string;
  arrival_time: string;
  total_cost: number;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login status
  const [results, setResults] = useState<Flight[]>([]);  // Store flight search results

  const [showDropdown, setShowDropdown] = useState(false);  // Control dropdown visibility
  const staticCouponCode = 'FLY2024';  // Example coupon code

  // Handle login state change
  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
    console.log('Login successful');
  };

  // Handle logout by resetting login state
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Handle search for flights
  const handleSearch = async (arrival_airport: string, arrival_date: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/flights/destination/${arrival_airport}/date/${arrival_date}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResults(data);  // Store flight data
      } else {
        alert('No flights found or invalid input');
      }
    } catch (error) {
      console.error('Error fetching flights:', error);
      alert('An error occurred while fetching flight data');
    }
  };

  // Handle dropdown toggle
  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />  
      ) : (
        <div>
          <nav className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Infinity Travel</h1>
            <div className="flex items-center">
              <span className="mr-4">Welcome, [User's Name]</span>

              {/* Travel credits button */}
              <div className="relative">
                <button
                  onClick={handleProfileClick}
                  className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200 mr-4"
                >
                  Travel Credits
                </button>
                {/* Dropdown for coupon code */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <div className="py-2 px-4 text-gray-700">
                      <strong>Coupon Code:</strong> {staticCouponCode}
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200"
              >
                Logout
              </button>
            </div> {/* Ensure closing tag here */}
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
