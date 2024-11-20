import React, { useState, useEffect } from "react";
import SearchForm, { Filters } from "./SearchForm";
import SearchResults from "./SearchResults";
import { useUser } from "./UserContext";
import { FaStar, FaBookmark } from "react-icons/fa";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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

interface MainContentProps {
  setIsLoggedIn: (value: boolean) => void;
}

function MainContent({ setIsLoggedIn }: MainContentProps) {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState<Flight[]>([]);
  const [searchState, setSearchState] = useState<{
    origin_airport: string;
    arrival_airport: string;
    arrival_date: string;
    filters: Filters;
  }>({
    origin_airport: "",
    arrival_airport: "",
    arrival_date: "",
    filters: {
      priceRange: [0, 0],
      airlines: [],
      stops: 0,
    },
  });

  useEffect(() => {
    // Parse searchParams from the URL and update searchState
    const params = new URLSearchParams(location.search);
    const searchParams = params.get("searchParams");

    if (searchParams) {
      try {
        const parsedParams = JSON.parse(decodeURIComponent(searchParams));
        setSearchState({
          origin_airport: parsedParams.origin_airport || "",
          arrival_airport: parsedParams.arrival_airport || "",
          arrival_date: parsedParams.arrival_date || "",
          filters: {
            priceRange: parsedParams.filters.priceRange || [0, 0],
            airlines: parsedParams.filters.airlines || [],
            stops: parsedParams.filters.stops || 0,
          },
        });

        // Trigger the search with the parsed parameters
        handleSearch(
          parsedParams.origin_airport,
          parsedParams.arrival_airport,
          parsedParams.arrival_date,
          parsedParams.filters
        );
      } catch (error) {
        console.error("Error parsing search parameters:", error);
        navigate("/"); // Redirect to a clean page if parsing fails
      }
    }
  }, [location.search, navigate]);

  const handleSearch = async (
    origin_airport: string,
    arrival_airport: string,
    arrival_date: string,
    filters: Filters
  ) => {
    if (!origin_airport || !arrival_airport) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8000/search?origin_airport=${origin_airport}&arrival_airport=${arrival_airport}&arrival_date=${arrival_date}&price_range=${
          filters?.priceRange[0]
        },${filters?.priceRange[1]}&airlines=${filters?.airlines.join(
          ","
        )}&stops=${filters?.stops}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResults(data);
        setSearchState({
          origin_airport,
          arrival_airport,
          arrival_date,
          filters,
        });
      } else {
        alert("No flights found or invalid input");
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
      alert("An error occurred while fetching flight data");
    }
  };

  const handleFavouriteSearch = async () => {
    try {
      await axios.post(
        "http://localhost:8000/favourite-search",
        { searchParams: searchState },
        {
          headers: {
            "x-user-id": user.user_id,
          },
        }
      );
      alert("Search saved as a favourite!");
    } catch (error) {
      console.error("Error saving favourite search:", error);
      alert("Failed to save search as a favourite.");
    }
  };

  return (
    <div className="main-content">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Infinity Travel</h1>
      <SearchForm onSearch={handleSearch} initialSearchState={searchState} />
      {results.length > 0 ? (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <p>
              <strong>{results.length}</strong> flights found
            </p>
            <div className="flex">
              <button
                onClick={handleFavouriteSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2"
              >
                <FaStar className="text-yellow-500" />
                <span>Favourite this search</span>
              </button>
              <Link
                to="/favourite-searches"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center space-x-2 ml-2"
              >
                <FaBookmark className="text-emerald-400" />
                <span>Go to favourites</span>
              </Link>
              {user.role === "admin" && (
                <Link
                  to="/dashboard"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center space-x-2 ml-2"
                >
                  <span>Go to Dashboard</span>
                </Link>
              )}
            </div>
          </div>
          <SearchResults results={results} />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 border rounded-lg shadow-sm bg-white mt-5 text-lg">
            <p>
              Use the above search and filter parameters to find your next
              flight! 🛫
            </p>
            <p className="text-gray-500 text-center text-base mt-4">
              Try searching for:{" "}
              <span className="font-bold">JFK, LAX on 10/11/2024</span> or just{" "}
              <span className="font-bold">HND to SFO</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainContent;
