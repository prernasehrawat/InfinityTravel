import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import {
  FaPlane,
  FaClock,
  FaMoneyBillAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

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

interface SearchResultsProps {
  results: Flight[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleBookFlight = (flight: Flight) => {
    navigate("/checkout", { state: { flight } });
  };

  const handleCopyShareContent = (flight: Flight) => {
    const shareContent = `Flight Number: ${flight.flight_number}\nFrom: ${
      flight.departure_airport
    } To: ${flight.arrival_airport}\nDeparture: ${new Date(
      flight.departure_time
    ).toLocaleString()}\nArrival: ${new Date(
      flight.arrival_time
    ).toLocaleString()}\nCost: $${flight.base_cost}`;
    navigator.clipboard
      .writeText(shareContent)
      .then(() => {
        alert("Flight details copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
        alert("Failed to copy flight details.");
      });
  };

  const handleEmailShare = (flight: Flight) => {
    const subject = `Flight Details: ${flight.flight_number}`;
    const body = `Flight Number: ${flight.flight_number}\nFrom: ${
      flight.departure_airport
    } To: ${flight.arrival_airport}\nDeparture: ${new Date(
      flight.departure_time
    ).toLocaleString()}\nArrival: ${new Date(
      flight.arrival_time
    ).toLocaleString()}\nCost: $${flight.base_cost}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    debugger;
    window.location.href = mailtoLink;
  };

  if (!user.isLoggedIn) {
    return (
      <div className="text-center text-red-500">
        Please log in to see search results.
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center text-gray-500">No search results found.</div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 mdgrid-cols-1 lg:grid-cols-2 gap-4">
      {results.map((flight) => (
        <div
          key={flight.flight_id}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">{flight.flight_number}</p>
              <p className="text-gray-500">{flight.airline}</p>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <FaMapMarkerAlt className="text-gray-500" />
              <p>
                {flight.departure_airport} &#8594; {flight.arrival_airport}
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <FaClock className="text-gray-500" />
              <p>
                {new Date(flight.departure_time).toLocaleString()} &#8594;{" "}
                {new Date(flight.arrival_time).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <FaMoneyBillAlt className="text-gray-500" />
              <p>${flight.base_cost}</p>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <FaPlane className="text-gray-500" />
              <p>{flight.stops} stops</p>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => handleBookFlight(flight)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Book
            </button>
            <button
              onClick={() => handleCopyShareContent(flight)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Copy
            </button>
            <button
              onClick={() => handleEmailShare(flight)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Email
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
