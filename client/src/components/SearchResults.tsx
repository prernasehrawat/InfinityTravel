// // import React from 'react';
// // import { useUser } from './UserContext';  // Import useUser to access the session
// // interface Flight {
// //   reservation_id: string;
// //   flight_number: string;
// //   departure_airport: string;
// //   arrival_airport: string;
// //   departure_time: string;
// //   arrival_time: string;
// //   total_cost: number;
// // }
// //
// // interface SearchResultsProps {
// //   results: Flight[];
// // }
// //
// // const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
// //   const { user } = useUser();  // Access the session data (like isLoggedIn)
// //
// //   if (!user.isLoggedIn) {
// //     return <div>Please log in to see search results.</div>;  // Display a message if not logged in
// //   }
// //
// //   return (
// //     <div className="search-results">
// //       {results.length > 0 && <h3>Search Results:</h3>}
// //       {results.map((flight) => (
// //         <div key={flight.reservation_id} className="result-item">
// //           <p>Flight Number: {flight.flight_number}</p>
// //           <p>From: {flight.departure_airport} To: {flight.arrival_airport}</p>
// //           <p>Departure: {flight.departure_time}</p>
// //           <p>Arrival: {flight.arrival_time}</p>
// //           <p>Cost: ${flight.total_cost}</p>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };
// //
// // export default SearchResults;
//
// import React from 'react';
// import { useUser } from './UserContext';  // Import useUser to access the session
//
// interface Flight {
//   flight_id: number;
//   flight_number: string;
//   airline: string;
//   departure_airport: string;
//   arrival_airport: string;
//   departure_time: string;
//   arrival_time: string;
//   base_cost: number;
//   stops: number;
// }
//
// interface SearchResultsProps {
//   results: Flight[];
// }
//
// const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
//   const { user } = useUser();  // Access the session data (like isLoggedIn)
//
//   // Function to copy shareable content to clipboard
//   const handleCopyShareContent = (flight: Flight) => {
//     const shareContent = `Flight Number: ${flight.flight_number}\nFrom: ${flight.departure_airport} To: ${flight.arrival_airport}\nDeparture: ${new Date(flight.departure_time).toLocaleString()}\nArrival: ${new Date(flight.arrival_time).toLocaleString()}\nCost: $${flight.base_cost}`;
//
//     navigator.clipboard.writeText(shareContent)
//       .then(() => {
//         alert("Flight details copied to clipboard!");
//       })
//       .catch((error) => {
//         console.error("Failed to copy text:", error);
//         alert("Failed to copy flight details.");
//       });
//   };
//
//   // Function to share via email
//   const handleEmailShare = (flight: Flight) => {
//     const subject = `Flight Details: ${flight.flight_number}`;
//     const body = `Flight Number: ${flight.flight_number}\nFrom: ${flight.departure_airport} To: ${flight.arrival_airport}\nDeparture: ${new Date(flight.departure_time).toLocaleString()}\nArrival: ${new Date(flight.arrival_time).toLocaleString()}\nCost: $${flight.base_cost}`;
//
//     // Create a mailto link with subject and body
//     const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
//     window.location.href = mailtoLink;
//   };
//
//   // Check if the user is logged in
//   if (!user.isLoggedIn) {
//     return <div className="text-center text-red-500">Please log in to see search results.</div>;
//   }
//
//   // Handle when there are no results
//   if (results.length === 0) {
//     return <div className="text-center text-gray-500">No search results found.</div>;
//   }
//
//   return (
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold mb-4">Search Results:</h3>
//         <div className="space-y-4">
//           {results.map((flight) => (
//               <div key={flight.flight_id} className="p-4 border rounded-lg shadow-sm bg-white">
//                 <p><strong>Flight Number:</strong> {flight.flight_number}</p>
//                 <p><strong>From:</strong> {flight.departure_airport} <strong>To:</strong> {flight.arrival_airport}</p>
//                 <p><strong>Departure:</strong> {new Date(flight.departure_time).toLocaleString()}</p>
//                 <p><strong>Arrival:</strong> {new Date(flight.arrival_time).toLocaleString()}</p>
//                 <p><strong>Cost:</strong> ${flight.base_cost}</p>
//                 {/* Copy to Clipboard Button */}
//                 <button
//                     onClick={() => handleCopyShareContent(flight)}
//                     className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
//                 >
//                   Copy Details
//                 </button>
//
//                 {/* Share via Email Button */}
//                 <button
//                     onClick={() => handleEmailShare(flight)}
//                     className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                 >
//                   Share via Email
//                 </button>
//               </div>
//
//           ))}
//
//         </div>
//
//       </div>
//
//
//   );
// };
//
// export default SearchResults;


import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { useUser } from './UserContext';  // Import useUser to access the session

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
  const { user } = useUser();  // Access the session data (like isLoggedIn)
  const navigate = useNavigate(); // Hook for navigation

  // Function to navigate to the checkout page with flight details
  const handleBookFlight = (flight: Flight) => {
    navigate('/checkout', { state: { flight } }); // Pass the flight data to the checkout page
  };


    // Function to copy shareable content to clipboard
  const handleCopyShareContent = (flight: Flight) => {
    const shareContent = `Flight Number: ${flight.flight_number}\nFrom: ${flight.departure_airport} To: ${flight.arrival_airport}\nDeparture: ${new Date(flight.departure_time).toLocaleString()}\nArrival: ${new Date(flight.arrival_time).toLocaleString()}\nCost: $${flight.base_cost}`;

    navigator.clipboard.writeText(shareContent)
      .then(() => {
        alert("Flight details copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
        alert("Failed to copy flight details.");
      });
  };

  // Function to share via email
  const handleEmailShare = (flight: Flight) => {
    const subject = `Flight Details: ${flight.flight_number}`;
    const body = `Flight Number: ${flight.flight_number}\nFrom: ${flight.departure_airport} To: ${flight.arrival_airport}\nDeparture: ${new Date(flight.departure_time).toLocaleString()}\nArrival: ${new Date(flight.arrival_time).toLocaleString()}\nCost: $${flight.base_cost}`;

    // Create a mailto link with subject and body
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };



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
              <div key={flight.flight_id} className="p-4 border rounded-lg shadow-sm bg-white">
                <p><strong>Flight Number:</strong> {flight.flight_number}</p>
                <p><strong>From:</strong> {flight.departure_airport} <strong>To:</strong> {flight.arrival_airport}</p>
                <p><strong>Departure:</strong> {new Date(flight.departure_time).toLocaleString()}</p>
                <p><strong>Arrival:</strong> {new Date(flight.arrival_time).toLocaleString()}</p>
                <p><strong>Cost:</strong> ${flight.base_cost}</p>

                {/* Book Flight Button */}
                <button
                    onClick={() => handleBookFlight(flight)}
                    className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Book Flight
                </button>

                {/* Copy to Clipboard Button */}
                <button
                    onClick={() => handleCopyShareContent(flight)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                >
                  Copy Details
                </button>

                {/* Share via Email Button */}
                <button
                    onClick={() => handleEmailShare(flight)}
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Share via Email
                </button>
              </div>
          ))}
        </div>
      </div>
  );
};

export default SearchResults;