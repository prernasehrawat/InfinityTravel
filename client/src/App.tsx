import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import MainContent from "./components/MainContent";
import SupportPage from "./components/SupportPage";
import ProfilePage from "./components/ProfilePage";
import Favourites from "./components/Favourites";
import CheckoutPage from "./components/CheckoutPage";
import { useUser } from "./components/UserContext";
import NavBar from "./components/NavBar";
import ThankYouPage from "./components/ThankYouPage";
import Dashboard from "./components/Dashboard";

function App() {
  const { user, login } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          role: data.role,
          phone_number: data.phone_number,
          first_name: data.first_name,
          last_name: data.last_name,
          rewards_points: data.rewards_points,
          couponCode: data.coupon_code,
        });

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
        {/* Conditionally render the NavBar only if the user is logged in */}
        {(user.isLoggedIn || isLoggedIn) && (
          <NavBar setIsLoggedIn={setIsLoggedIn} />
        )}

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
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route
            path="/dashboard"
            element={
              user.role === "admin" ? (
                <Dashboard />
              ) : (
                <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-600 mb-4">
                      Access Denied
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                      You do not have permission to access this page.
                    </p>
                    <button
                      onClick={() => (window.location.href = "/")}
                      className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      Go to Homepage
                    </button>
                  </div>
                </div>
              )
            }
          />
        </Routes>

        {/* Global Footer - Hidden on the support and profile page */}
        {user.isLoggedIn && <ConditionalFooter />}
      </div>
    </Router>
  );
}

export default App;
