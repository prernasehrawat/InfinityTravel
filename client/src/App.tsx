// import React, { useState } from "react";
// import "./App.css";
// import LoginForm from "./components/LoginForm";
// import SearchForm from "./components/SearchForm";
// import SearchResults from "./components/SearchResults";
// import { useUser } from "./components/UserContext"; // Import useUser to access context
//
//
// interface Flight {
//   reservation_id: string;
//   flight_number: string;
//   departure_airport: string;
//   arrival_airport: string;
//   departure_time: string;
//   arrival_time: string;
//   total_cost: number;
// }
//
// function App() {
//   const { user, login, logout } = useUser();  // Use context for user data
//   const [results, setResults] = useState<Flight[]>([]);  // Store flight search results
//   const [showDropdown, setShowDropdown] = useState(false);
//   console.log(user);
//   const handleLogin = async (email: string, password: string) => {
//     try {
//       const response = await fetch("http://localhost:8000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });
//
//       const data = await response.json();
//
//       if (response.ok) {
//         login({
//           email: data.email,
//           coupon_code: data.coupon_code,  // Assuming the backend returns the coupon code
//         });
//         console.log("Login successful");
//       } else {
//         alert(data.message || "Invalid credentials");
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       alert("An error occurred during login");
//     }
//   };
//
//   // Handle search for flights
//   const handleSearch = async (arrival_airport: string, arrival_date: string) => {
//     try {
//       const response = await fetch(
//           `http://localhost:8000/destination/${arrival_airport}/date/${arrival_date}`,
//           {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//       );
//
//       const data = await response.json();
//
//       if (response.ok) {
//         setResults(data);  // Store flight data
//       } else {
//         alert('No flights found or invalid input');
//       }
//     } catch (error) {
//       console.error('Error fetching flights:', error);
//       alert('An error occurred while fetching flight data');
//     }
//   };
//
//   const handleProfileClick = () => {
//     setShowDropdown(!showDropdown);
//   };
//
//
//   return (
//       <div className="App">
//         {!user.isLoggedIn ? (
//             <LoginForm onLogin={handleLogin} />
//         ) : (
//             <div>
//               <nav className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
//                 <h1 className="text-xl font-semibold">Infinity Travel</h1>
//                 <div className="flex items-center">
//                   <span className="mr-4">Welcome, {user.email}</span> {/* Display user's email */}
//
//                   {/* Travel credits button */}
//                   <div className="relative">
//                     <button
//                         onClick={handleProfileClick}
//                         className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200 mr-4"
//                     >
//                       Travel Credits
//                     </button>
//                     {/* Dropdown for coupon code */}
//                     {showDropdown && (
//                         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
//                           <div className="py-2 px-4 text-gray-700">
//                             <strong>Coupon Code:</strong> {user.couponCode} {/* Dynamic coupon */}
//                           </div>
//                         </div>
//                     )}
//                   </div>
//                   <button
//                       onClick={logout}
//                       className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </nav>
//               <div className="p-4">
//                 <SearchForm onSearch={handleSearch} />
//                 <SearchResults results={results} />
//               </div>
//             </div>
//         )}
//       </div>
//   );
// }
//
// export default App;

// import React, { useState } from "react";
// import "./App.css";
// import LoginForm from "./components/LoginForm";
// import SearchForm from "./components/SearchForm";
// import SearchResults from "./components/SearchResults";
// import { useUser } from "./components/UserContext"; // Import useUser to access context

// interface Flight {
//   reservation_id: string;
//   flight_number: string;
//   departure_airport: string;
//   arrival_airport: string;
//   departure_time: string;
//   arrival_time: string;
//   total_cost: number;
// }
// function App() {
//   const { user, login, logout } = useUser();  // Use context for user data
//   const [results, setResults] = useState<Flight[]>([]); // Type results properly with flight data type
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleLogin = async (email: string, password: string) => {
//     try {
//       const response = await fetch("http://localhost:8000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         login({
//           email: data.email,
//           coupon_code: data.coupon_code,  // Assuming the backend returns the coupon code
//         });
//         console.log("Login successful");
//       } else {
//         alert(data.message || "Invalid credentials");
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       alert("An error occurred during login");
//     }
//   };

//   const handleProfileClick = () => {
//     setShowDropdown(!showDropdown);
//   };

//   // This function is passed to the SearchForm component
//   const handleSearch = async (arrival_airport: string, arrival_date: string) => {
//     try {
//       const response = await fetch(`http://localhost:8000/destination/${arrival_airport}/date/${arrival_date}`);
//       const data = await response.json();

//       if (response.ok) {
//         setResults(data);  // Store search results in state
//       } else {
//         alert(data.message || "No flights found.");
//       }
//     } catch (error) {
//       console.error("Error searching flights:", error);
//       alert("An error occurred while searching");
//     }
//   };

//   return (
//       <div className="App">
//         {!user.isLoggedIn ? (
//             <LoginForm onLogin={handleLogin} />
//         ) : (
//             <div>
//               {/* Updated nav - creating a Travel Credits button, Coupon dropdown */}
//               <nav className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
//                 <h1 className="text-xl font-semibold">Infinity Travel</h1>
//                 <div className="flex items-center">
//                   <span className="mr-4">Welcome, {user.email}</span> {/* Display user's email */}

//                   {/* Travel credits button */}
//                   <div className="relative">
//                     <button
//                         onClick={handleProfileClick}
//                         className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200 mr-4"
//                     >
//                       Travel Credits
//                     </button>
//                     {/* Dropdown for coupon code */}
//                     {showDropdown && (
//                         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
//                           <div className="py-2 px-4 text-gray-700">
//                             <strong>Coupon Code:</strong> {user.couponCode} {/* Dynamic coupon */}
//                           </div>
//                         </div>
//                     )}
//                   </div>
//                   <button
//                       onClick={logout}
//                       className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </nav>

//               <div className="p-4">
//                 {/* SearchForm Component */}
//                 <SearchForm onSearch={handleSearch} />

//                 {/* Conditionally render SearchResults if there are results */}
//                 {results.length > 0 && (
//                     <div className="mt-8">
//                       <SearchResults results={results} />
//                     </div>
//                 )}
//               </div>
//             </div>
//         )}
//       </div>
//   );
// }

// export default App;
//Updated code below
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResults";
import SupportPage from "./components/SupportPage";
import ProfilePage from "./components/ProfilePage";
import { useUser } from "./components/UserContext";
import Favourites from "./components/Favourites";

interface Flight {
  flight_id: number;
  flight_number: string;
  airline: string;
  departure_airport: string;
  arrival_airport: string;
  departure_time: string;
  arrival_time: string;
  base_cost: number;
  stops: number;
}

interface MainContentProps {
  setIsLoggedIn: (value: boolean) => void;
}

function MainContent({ setIsLoggedIn }: MainContentProps) {
  const { user, logout } = useUser();
  const [results, setResults] = useState<Flight[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = async (
    arrival_airport: string,
    arrival_date: string
  ) => {
    try {
      // const response = await fetch(
      //   `http://localhost:8000/destination/${arrival_airport}/date/${arrival_date}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      const response = await fetch(
          `http://localhost:8000/search?arrival_airport=${arrival_airport}&arrival_date=${arrival_date}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
      );

      const data = await response.json();

      if (response.ok) {
        setResults(data);
      } else {
        alert("No flights found or invalid input");
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
      alert("An error occurred while fetching flight data");
    }
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <nav className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Infinity Travel</h1>
        <div className="flex items-center">
          <span className="mr-4">
            Welcome, {user.first_name} {user.last_name}{" "}
          </span>
          <a
            href="/favourite-searches"
            className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200 mr-4"
          >
            Favourite Searches
          </a>

          <div className="relative">
            <button
              onClick={handleProfileClick}
              className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200 mr-4"
            >
              Travel Credits
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <div className="py-2 px-4 text-gray-700">
                  <strong>Coupon Code:</strong> {user.couponCode}{" "}
                  {/*Assuming the backend returns the coupon code*/}
                </div>
              </div>
            )}
          </div>

          {/* Profile Button linking to Support Page */}
          <a
            href="/profile"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200 mr-4"
          >
            Profile
          </a>
          <button
            onClick={() => {
              logout();
              setIsLoggedIn(false);
            }}
            className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="main-content">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Infinity Travel
        </h1>
        <SearchForm onSearch={handleSearch} />
        {results.length > 0 && <SearchResults results={results} />}
      </div>
    </div>
  );
}

function App() {
  const { user, login } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login({
          user_id: data.user_id,
          email: data.email,
          phone_number: data.phone_number,
          first_name: data.first_name,
          last_name: data.last_name,
          couponCode: data.coupon_code,
        });
        console.log("Login successful");

        // Setting logged-in state to true
        setIsLoggedIn(true);
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              user.isLoggedIn || isLoggedIn ? (
                <MainContent setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favourite-searches" element={<Favourites />} />
        </Routes>

        {/* Global Footer - Hidden on the support page*/}
        {user.isLoggedIn && <ConditionalFooter />}
      </div>
    </Router>
  );
}

// Footer component with conditional visibility
function ConditionalFooter() {
  const location = useLocation();

  if (location.pathname === "/support" || location.pathname === "/profile") {
    return null;
  }

  return (
    <footer className="footer bg-gray-200 py-4 flex justify-center">
      <button className="contact-button bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        <a
          href="/support"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link underline"
        >
          Contact Us
        </a>
      </button>
    </footer>
  );
}

export default App;
