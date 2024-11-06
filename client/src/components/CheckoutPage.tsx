// src/components/CheckoutPage.tsx
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom'; // To receive the flight details from the navigation state
import { useUser } from './UserContext'; // Access user session

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
    const { user } = useUser(); // Access user context to get user details

    const navigate = useNavigate();
    const location = useLocation();
    const flight: Flight = location.state?.flight; // Get flight details passed from SearchResults
    const [couponCode, setCouponCode] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState(flight.base_cost);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!user || !user.user_id) {
            // Redirect to the login page or a different page if the user is not logged in
            navigate("/"); // Adjust this path as needed
        }
    }, [user, navigate]);

    const handleApplyCoupon = () => {
        if (couponCode === user.couponCode) {
            // Apply a discount (e.g., 10% off)
            const discount = flight.base_cost * 0.1;
            setDiscountedPrice(flight.base_cost - discount);
            setMessage('Coupon applied successfully!');
        } else {
            setMessage('Invalid or expired coupon.');
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white p-8 rounded shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                <p><strong>Flight Number:</strong> {flight.flight_number}</p>
                <p><strong>From:</strong> {flight.departure_airport} <strong>To:</strong> {flight.arrival_airport}</p>
                <p><strong>Departure:</strong> {new Date(flight.departure_time).toLocaleString()}</p>
                <p><strong>Arrival:</strong> {new Date(flight.arrival_time).toLocaleString()}</p>
                <p><strong>Original Cost:</strong> ${flight.base_cost}</p>
                <p><strong>Discounted Cost:</strong> ${discountedPrice.toFixed(2)}</p>

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
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
            </div>
        </div>
    );
};

export default CheckoutPage;
