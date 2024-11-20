import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/UserContext";
import NavBar from "../components/NavBar"; // Import NavBar if needed

const SupportPage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.user_id) {
      // Redirect to the login page or a different page if the user is not logged in
      navigate("/"); // Adjust this path as needed
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/*<NavBar setIsLoggedIn={() => {}} /> /!* Ensure NavBar is displayed *!/*/}
      <div className="flex items-center justify-center mt-8">
        <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-4xl">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
            Infinity Travel Support
          </h1>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Contact Us
          </h2>

          <p className="text-lg text-gray-700 mb-4 text-center">
            For any assistance, feel free to reach out to us through the
            following options:
          </p>
          <ul className="list-none space-y-4 text-center">
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@infinitytravel.com"
                className="text-blue-600 hover:underline"
              >
                support@infinitytravel.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <span className="text-gray-700">+1 (800) 555-5555</span>
            </li>
            <li>
              <strong>Hours of Operation:</strong>{" "}
              <span className="text-gray-700">
                Mon-Fri, 8:00 AM - 5:00 PM (EST)
              </span>
            </li>
          </ul>

          <p className="text-gray-500 text-center text-base mt-8">
            We’re here to help make your travel experience seamless and
            enjoyable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
