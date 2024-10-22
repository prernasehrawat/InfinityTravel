import React, { useState } from 'react';

interface SearchFormProps {
  onSearch: (arrival_airport: string, arrival_date: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [selectedAirport, setSelectedAirport] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [error, setError] = useState('');

  const commonAirports = ['JFK', 'LAX', 'CDG', 'LHR', 'HND', 'SFO', 'ORD', 'ATL', 'DXB', 'SIN'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAirport || !arrivalDate) {
      setError('Please select an airport and date');
      return;
    }
    setError('');
    onSearch(selectedAirport, arrivalDate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Infinity Travel</h1>
        <h2 className="text-2xl font-semibold text-center mb-6">Search Flights</h2>

        <form onSubmit={handleSearch} className="space-y-6">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
            <div className="w-full">
              <label htmlFor="airport" className="block text-lg mb-2 text-gray-700">Destination Airport</label>
              <input
                type="text"
                list="airports"
                id="airport"
                placeholder="Enter Destination Airport Code"
                value={selectedAirport}
                onChange={(e) => setSelectedAirport(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <datalist id="airports">
                {commonAirports.map((airport) => (
                  <option key={airport} value={airport} />
                ))}
              </datalist>
            </div>

            <div className="w-full">
              <label htmlFor="arrivalDate" className="block text-lg mb-2 text-gray-700">Arrival Date</label>
              <input
                type="date"
                id="arrivalDate"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-center text-lg">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Search
          </button>
        </form>

        <p className="text-gray-500 text-center text-base mt-8">
          Try searching for: <span className="font-semibold">LAX on 2024-10-10</span>, <span className="font-semibold">CDG on 2024-11-01</span>
        </p>
      </div>
    </div>
  );
};

export default SearchForm;
