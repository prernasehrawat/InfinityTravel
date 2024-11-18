// src/components/ThankYouPage.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ThankYouPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pointsEarned, discountedPrice, flightDetails } = location.state || {};

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white p-8 rounded shadow-lg text-center">
                <h2 className="text-3xl font-bold text-green-500 mb-4">
                    Thank You for Your Booking!
                </h2>
                <p className="mb-4">
                    Your booking has been confirmed. Thank you for choosing Infinity
                    Travel!
                </p>

                {flightDetails && (
                    <div className="mb-4 text-left">
                        <h3 className="text-xl font-bold mb-2">Flight Details:</h3>

                        <p>
                            <strong>Flight Number:</strong> {flightDetails.flightNumber}
                        </p>
                        <p>
                            <strong>Departure:</strong> {flightDetails.departure}
                        </p>
                        <p>
                            <strong>Departure:</strong> {flightDetails.departure_time}
                        </p>
                        <p>
                            <strong>Arrival:</strong> {flightDetails.arrival}
                        </p>
                        <p>
                            <strong>Arrival Time:</strong> {flightDetails.arrival_time}
                        </p>

                    </div>
                )}

                <p>
                    <strong>You Paid:</strong> ${discountedPrice?.toFixed(2)}
                </p>
                <p>
                    <strong>You Earned:</strong> {pointsEarned} points
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default ThankYouPage;
