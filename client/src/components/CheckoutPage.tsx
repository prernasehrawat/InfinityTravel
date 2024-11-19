import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

interface Flight {
  flight_id: number;
  flight_number: string;
  airline: string;
  departure_airport: string;
  arrival_airport: string;
  departure_time: string;
  arrival_time: string;
  base_cost: number;
}

const CheckoutPage: React.FC = () => {
  const { user, updateUser } = useUser(); // Access user context to get user details and update points
  const navigate = useNavigate();
  const location = useLocation();
  const flight: Flight = location.state?.flight; // Get flight details passed from SearchResults
  const [couponCode, setCouponCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(flight.base_cost);
  const [pointsEarned, setPointsEarned] = useState(0); // New state for points earned
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user || !user.user_id) {
      navigate("/"); // Redirect to login if user is not logged in
    }

    // Calculate initial points earned
    const basePoints = Math.floor(flight.base_cost / 10); // Assuming 1 point per $10
    setPointsEarned(basePoints);
  }, [user, navigate, flight.base_cost]);

  const handleApplyCoupon = () => {
    if (couponCode === user.couponCode) {
      const discount = flight.base_cost * 0.1; // 10% discount
      const newDiscountedPrice = flight.base_cost - discount;
      setDiscountedPrice(newDiscountedPrice);

      // Update points earned based on discounted price
      const updatedPoints = Math.floor(newDiscountedPrice / 10); // Assuming 1 point per $10
      setPointsEarned(updatedPoints);

      setMessage("Coupon applied successfully!");
    } else {
      setMessage("Invalid or expired coupon.");
    }
  };

  const handleConfirmBooking = () => {
    // Simulate adding the reservation and updating the user's rewards points
    const reservationData = {
      user_id: user.user_id,
      flight_id: flight.flight_id,
      passenger_name: `${user.first_name} ${user.last_name}`,
      seat_class: "Economy", // Example class
      total_cost: discountedPrice,
    };

    fetch("http://localhost:8000/flight-reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    })
        .then((response) => response.json())
        .then((data) => {
          if (data.pointsEarned) {
            // Update user's reward points in the context
            const updatedPoints = (user.rewards_points || 0) + data.pointsEarned;
            updateUser({ rewards_points: updatedPoints });

            // Navigate to the thank-you page
            navigate("/thank-you", {
              state: {
                pointsEarned: data.pointsEarned,
                discountedPrice,
                flightDetails: {
                  airline: flight.airline,       // Replace with actual data fields
                  flightNumber: flight.flight_number,
                  departure: flight.departure_airport,
                  departure_time: flight.departure_time,
                  arrival: flight.arrival_airport,
                  arrival_time: flight.arrival_time,

                },
              },
            });
          } else {
            setMessage("Failed to confirm booking. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error confirming booking:", error);
          setMessage("An error occurred while confirming the booking.");
        });
  };

  return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white p-8 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <p>
            <strong>Flight Number:</strong> {flight.flight_number}
          </p>
          <p>
            <strong>Airline:</strong> {flight.airline}
          </p>
          <p>
            <strong>From:</strong> {flight.departure_airport} <strong>To:</strong>{" "}
            {flight.arrival_airport}
          </p>
          <p>
            <strong>Departure:</strong>{" "}
            {new Date(flight.departure_time).toLocaleString()}
          </p>
          <p>
            <strong>Arrival:</strong>{" "}
            {new Date(flight.arrival_time).toLocaleString()}
          </p>
          <p>
            <strong>Original Cost:</strong> ${flight.base_cost}
          </p>
          <p>
            <strong>Discounted Cost:</strong> ${discountedPrice.toFixed(2)}
          </p>
          <p>
            <strong>Points Earned from This Booking:</strong> {pointsEarned} points
          </p>
          <p>
            <strong>Your Current Reward Points:</strong> {user.rewards_points || 0} points
          </p>

          <div className="mt-4">
            <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="border px-4 py-2 mr-2"
            />
            <button
                onClick={handleApplyCoupon}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Apply Coupon
            </button>
          </div>

          {message && <p className="mt-2 text-green-500">{message}</p>}

          <button
              onClick={handleConfirmBooking}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Confirm Booking
          </button>
        </div>
      </div>
  );
};

export default CheckoutPage;
