import React, { useState, useEffect } from "react";
import { useUser } from "./UserContext";
import { Transition } from "@headlessui/react";

interface SearchFormProps {
  onSearch: (
    origin_airport: string,
    arrival_airport: string,
    arrival_date: string,
    filters: Filters
  ) => void;
  initialSearchState: {
    origin_airport: string;
    arrival_airport: string;
    arrival_date: string;
    filters: Filters;
  };
}

export interface Filters {
  priceRange: [number, number];
  airlines: string[];
  stops: number;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  initialSearchState,
}) => {
  const { user } = useUser();
  const [query, setQuery] = useState("");
  const [selectedOriginAirport, setSelectedOriginAirport] = useState("");
  const [selectedDestAirport, setSelectedDestAirport] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [error, setError] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [100, 1000],
    airlines: [],
    stops: 0,
  });

  const commonAirports = [
    "JFK",
    "LAX",
    "CDG",
    "LHR",
    "HND",
    "SFO",
    "ORD",
    "ATL",
    "DXB",
    "SIN",
  ];

  useEffect(() => {
    // Set initial search state when component mounts
    if (initialSearchState) {
      setSelectedOriginAirport(initialSearchState.origin_airport || "");
      setSelectedDestAirport(initialSearchState.arrival_airport || "");
      setArrivalDate(initialSearchState.arrival_date || "");
      setFilters(
        initialSearchState.filters || {
          priceRange: [100, 1000],
          airlines: [],
          stops: 0,
        }
      );
    }
  }, [initialSearchState]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.isLoggedIn) {
      alert("You need to be logged in to search.");
      return;
    }

    if (!selectedOriginAirport || !selectedDestAirport) {
      setError("Please select both airports.");
      return;
    }
    setError("");
    onSearch(selectedOriginAirport, selectedDestAirport, arrivalDate, filters);
  };

  const openFilterModal = () => setFilterModalOpen(true);
  const closeFilterModal = () => setFilterModalOpen(false);

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <div className="bg-gray-100 pb-2 px-6 rounded-xl">
      <div className="flex items-center space-x-4 w-full py-6">
        <div className="w-full text-left">
          <label
            htmlFor="origin_airport"
            className="text-sm text-gray-600 font-medium"
          >
            Origin Airport
          </label>
          <input
            id="origin_airport"
            type="text"
            list="airports"
            placeholder="Enter Origin Airport Code"
            value={selectedOriginAirport}
            onChange={(e) => setSelectedOriginAirport(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!user.isLoggedIn}
          />
          <datalist id="airports">
            {commonAirports.map((airport) => (
              <option key={airport} value={airport} />
            ))}
          </datalist>
        </div>

        <div className="w-full text-left">
          <label
            htmlFor="destination_airport"
            className="text-sm text-gray-600 font-medium"
          >
            Destination Airport
          </label>
          <input
            id="destination_airport"
            type="text"
            list="airports"
            placeholder="Enter Destination Airport Code"
            value={selectedDestAirport}
            onChange={(e) => setSelectedDestAirport(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!user.isLoggedIn}
          />
          <datalist id="airports">
            {commonAirports.map((airport) => (
              <option key={airport} value={airport} />
            ))}
          </datalist>
        </div>

        <div className="w-full text-left">
          <label
            htmlFor="arrival_date"
            className="text-sm text-gray-600 font-medium"
          >
            Arrival Date
          </label>
          <input
            id="arrival_date"
            type="date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="button"
          onClick={openFilterModal}
          className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-200 mt-5"
          disabled={!user.isLoggedIn}
        >
          Filter
        </button>
        <button
          type="submit"
          onClick={handleSearch}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 mt-5"
          disabled={!user.isLoggedIn}
        >
          Search
        </button>
      </div>

      {/* Error and Filter Modal */}
      {error && (
        <p className="text-red-500 text-lg ml-4 mt-8 w-full">{error}</p>
      )}

      <Transition
        show={filterModalOpen}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black bg-opacity-75 cursor-pointer"
            onClick={closeFilterModal}
          ></div>
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl z-50">
            <h2 className="text-2xl font-bold mb-6">Filter Options</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Price Range</h3>
                <div className="mt-2 flex items-center">
                  <span className="mr-4">${filters.priceRange[0]}</span>
                  <input
                    type="range"
                    min={100}
                    max={1000}
                    value={filters.priceRange[0]}
                    onChange={(e) =>
                      updateFilters({
                        priceRange: [
                          parseInt(e.target.value),
                          filters.priceRange[1],
                        ],
                      })
                    }
                    className="w-full"
                  />
                  <input
                    type="range"
                    min={100}
                    max={1000}
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      updateFilters({
                        priceRange: [
                          filters.priceRange[0],
                          parseInt(e.target.value),
                        ],
                      })
                    }
                    className="w-full"
                  />
                  <span className="ml-4">${filters.priceRange[1]}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Airlines</h3>
                <div className="flex space-x-4 mt-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.airlines.includes("UNITED")}
                      onChange={() =>
                        updateFilters({
                          airlines: filters.airlines.includes("UNITED")
                            ? filters.airlines.filter((a) => a !== "UNITED")
                            : [...filters.airlines, "UNITED"],
                        })
                      }
                      className="mr-2"
                    />
                    United
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.airlines.includes("DELTA")}
                      onChange={() =>
                        updateFilters({
                          airlines: filters.airlines.includes("DELTA")
                            ? filters.airlines.filter((a) => a !== "DELTA")
                            : [...filters.airlines, "DELTA"],
                        })
                      }
                      className="mr-2"
                    />
                    Delta
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.airlines.includes("AMERICAN")}
                      onChange={() =>
                        updateFilters({
                          airlines: filters.airlines.includes("AMERICAN")
                            ? filters.airlines.filter((a) => a !== "AMERICAN")
                            : [...filters.airlines, "AMERICAN"],
                        })
                      }
                      className="mr-2"
                    />
                    American
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.airlines.includes("FRONTIER")}
                      onChange={() =>
                        updateFilters({
                          airlines: filters.airlines.includes("FRONTIER")
                            ? filters.airlines.filter((a) => a !== "FRONTIER")
                            : [...filters.airlines, "FRONTIER"],
                        })
                      }
                      className="mr-2"
                    />
                    Frontier
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Number of Stops</h3>
                <select
                  value={filters.stops}
                  onChange={(e) =>
                    updateFilters({ stops: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                >
                  <option value={0}>0 Stops</option>
                  <option value={1}>1 Stop</option>
                  <option value={2}>2 Stops</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                type="button"
                onClick={closeFilterModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  closeFilterModal();
                  onSearch(
                    selectedOriginAirport,
                    selectedDestAirport,
                    arrivalDate,
                    filters
                  );
                }}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default SearchForm;
