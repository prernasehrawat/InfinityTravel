import React, { useState } from "react";
import SearchForm, { Filters } from "./SearchForm";
import SearchResults from "./SearchResults";
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
  stops: number;
}

interface MainContentProps {
  setIsLoggedIn: (value: boolean) => void;
}

function MainContent({ setIsLoggedIn }: MainContentProps) {
  const { user } = useUser();
  const [results, setResults] = useState<Flight[]>([]);

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
      } else {
        alert("No flights found or invalid input");
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
      alert("An error occurred while fetching flight data");
    }
  };

  return (
    <div className="main-content">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Infinity Travel</h1>
      <SearchForm onSearch={handleSearch} />
      {results.length > 0 ? (
        <SearchResults results={results} />
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
