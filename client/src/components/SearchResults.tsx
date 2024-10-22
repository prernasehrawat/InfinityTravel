// import React from 'react';
// import { useUser } from './UserContext';  // Import useUser to access the session
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
// interface SearchResultsProps {
//   results: Flight[];
// }
//
// const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
//   const { user } = useUser();  // Access the session data (like isLoggedIn)
//
//   if (!user.isLoggedIn) {
//     return <div>Please log in to see search results.</div>;  // Display a message if not logged in
//   }
//
//   return (
//     <div className="search-results">
//       {results.length > 0 && <h3>Search Results:</h3>}
//       {results.map((flight) => (
//         <div key={flight.reservation_id} className="result-item">
//           <p>Flight Number: {flight.flight_number}</p>
//           <p>From: {flight.departure_airport} To: {flight.arrival_airport}</p>
//           <p>Departure: {flight.departure_time}</p>
//           <p>Arrival: {flight.arrival_time}</p>
//           <p>Cost: ${flight.total_cost}</p>
//         </div>
//       ))}
//     </div>
//   );
// };
//
// export default SearchResults;

import React from 'react';
import { useUser } from './UserContext';  // Import useUser to access the session

interface Flight {
  reservation_id: string;
  flight_number: string;
  departure_airport: string;
  arrival_airport: string;
  departure_time: string;
  arrival_time: string;
  total_cost: number;
}

interface SearchResultsProps {
  results: Flight[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const { user } = useUser();  // Access the session data (like isLoggedIn)

  // Check if the user is logged in
  if (!user.isLoggedIn) {
    return <div className="text-center text-red-500">Please log in to see search results.</div>;
  }

  // Handle when there are no results
  if (results.length === 0) {
    return <div className="text-center text-gray-500">No search results found.</div>;
  }

  return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Search Results:</h3>
        <div className="space-y-4">
          {results.map((flight) => (
              <div key={flight.reservation_id} className="p-4 border rounded-lg shadow-sm bg-white">
                <p><strong>Flight Number:</strong> {flight.flight_number}</p>
                <p><strong>From:</strong> {flight.departure_airport} <strong>To:</strong> {flight.arrival_airport}</p>
                <p><strong>Departure:</strong> {new Date(flight.departure_time).toLocaleString()}</p>
                <p><strong>Arrival:</strong> {new Date(flight.arrival_time).toLocaleString()}</p>
                <p><strong>Cost:</strong> ${flight.total_cost}</p>
              </div>
          ))}
        </div>
      </div>
  );
};

export default SearchResults;
