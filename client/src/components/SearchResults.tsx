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
  return (
    <div className="search-results">
      {results.length > 0 && <h3>Search Results:</h3>}
      {results.map((flight) => (
        <div key={flight.reservation_id} className="result-item">
          <p>Flight Number: {flight.flight_number}</p>
          <p>From: {flight.departure_airport} To: {flight.arrival_airport}</p>
          <p>Departure: {flight.departure_time}</p>
          <p>Arrival: {flight.arrival_time}</p>
          <p>Cost: ${flight.total_cost}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
