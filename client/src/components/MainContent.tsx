import React, { useState } from "react";
import SearchForm from "./SearchForm";
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

    const handleSearch = async (arrival_airport: string, arrival_date: string) => {
        try {
            const response = await fetch(
                `http://localhost:8000/search?arrival_airport=${arrival_airport}&arrival_date=${arrival_date}`,
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
            {results.length > 0 && <SearchResults results={results} />}
        </div>
    );
}

export default MainContent;
