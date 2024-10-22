// import React, { useState } from "react";
// import "./App.css";
// import LoginForm from "./components/LoginForm";
// import SearchForm from "./components/SearchForm";
// import SearchResults from "./components/SearchResults";
//
// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [results, setResults] = useState<string[]>([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const staticCouponCode = "TRAVEL10";
//
//   // const validUsername = 'user@example.com';
//   // const validPassword = 'password123';
//
//   // const handleLogin = (email: string, password: string) => {
//   //   if (email === validUsername && password === validPassword) {
//   //     setIsLoggedIn(true);
//   //     console.log('Login successful');
//   //   } else {
//   //     alert('Invalid credentials');
//   //   }
//   // };
//
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
//         setIsLoggedIn(true);
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
//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setShowDropdown(false);
//   };
//
//   const handleProfileClick = () => {
//     setShowDropdown(!showDropdown);
//   };
//
//   const handleSearch = (query: string) => {
//     console.log("Searching for:", query);
//     const fakeResults = ["Result 1", "Result 2", "Result 3"];
//     setResults(fakeResults);
//   };
//
//   return (
//     <div className="App">
//       {!isLoggedIn ? (
//         <LoginForm onLogin={handleLogin} />
//       ) : (
//         <div>
//           {/*updated nav- creating a Travel Credits button, Coupon dropdown*/}
//           <nav className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
//             <h1 className="text-xl font-semibold">Infinity Travel</h1>
//             <div className="flex items-center">
//               <span className="mr-4">Welcome, [User's Name]</span>
//
//               {/* Travel credits button */}
//               <div className="relative">
//                 <button
//                   onClick={handleProfileClick}
//                   className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200 mr-4"
//                 >
//                   Travel Credits
//                 </button>
//                 {/* Dropdown for coupon code */}
//                 {showDropdown && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
//                     <div className="py-2 px-4 text-gray-700">
//                       <strong>Coupon Code:</strong> {staticCouponCode}
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200"
//               >
//                 Logout
//               </button>
//             </div>
//           </nav>
//           <div className="p-4">
//             <SearchForm onSearch={handleSearch} />
//             <SearchResults results={results} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
//
// export default App;


import React, { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResults";
import { useUser } from "./components/UserContext"; // Import useUser to access context

function App() {
  const { user, login, logout } = useUser();  // Use context for user data
  const [results, setResults] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  console.log(user);
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
          email: data.email,
          coupon_code: data.coupon_code,  // Assuming the backend returns the coupon code
        });
        console.log("Login successful");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred during login");
    }
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    const fakeResults = ["Result 1", "Result 2", "Result 3"];
    setResults(fakeResults);
  };

  return (
      <div className="App">
        {!user.isLoggedIn ? (
            <LoginForm onLogin={handleLogin} />
        ) : (
            <div>
              {/* updated nav- creating a Travel Credits button, Coupon dropdown */}
              <nav className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
                <h1 className="text-xl font-semibold">Infinity Travel</h1>
                <div className="flex items-center">
                  <span className="mr-4">Welcome, {user.email}</span> {/* Display user's email */}

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
                            <strong>Coupon Code:</strong> {user.couponCode} {/* Dynamic coupon */}
                          </div>
                        </div>
                    )}
                  </div>
                  <button
                      onClick={logout}
                      className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
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
