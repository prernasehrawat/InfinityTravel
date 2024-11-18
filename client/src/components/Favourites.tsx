import React, { useState, useEffect } from "react";
import { useUser } from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
  FaDollarSign,
  FaFilter,
  FaStopCircle,
  FaSearch,
} from "react-icons/fa";

interface Favourite {
  id: string;
  search_params: string;
  timestamp: string;
}

const Favourites: React.FC = () => {
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.user_id) {
      navigate("/");
      return;
    }

    const fetchFavourites = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/favourites", {
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user.user_id,
          },
        });

        if (response.ok) {
          const data: Favourite[] = await response.json();
          setFavourites(data);
        } else {
          setError("Failed to fetch favourites");
        }
      } catch (err) {
        setError("An error occurred while fetching favourites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [user?.user_id, navigate, user]);

  const handleNavigateToSearch = (searchParams: string) => {
    const urlParams = new URLSearchParams({ searchParams });
    navigate(`/?${urlParams.toString()}`);
  };

  return (
    <div className="main-content">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
          Infinity Travel <FaPlaneDeparture className="inline ml-2" />
        </h1>
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Your Favourite Searches
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <span className="text-blue-500 animate-spin">Loading...</span>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : (
          <>
            {favourites.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No favourites found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="p-4 border-b text-left text-blue-800 font-bold w-72">
                        Query Details
                      </th>
                      <th className="p-4 border-b text-left text-blue-800 font-bold w-72">
                        Created At
                      </th>
                      <th className="p-4 border-b text-left text-blue-800 font-bold">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {favourites.map((favourite) => {
                      const searchParams = JSON.parse(favourite.search_params);

                      return (
                        <tr
                          key={favourite.id}
                          className="hover:bg-blue-50 text-left"
                        >
                          <td className="p-4 border-b">
                            {/* Flight Information */}
                            <div className="text-blue-700 font-medium mb-1">
                              <FaPlaneDeparture className="inline mr-2" />
                              {searchParams.origin_airport}
                              <FaPlaneArrival className="inline mx-2" />
                              {searchParams.arrival_airport}
                            </div>

                            {/* Arrival Date */}
                            {searchParams.arrival_date && (
                              <div className="text-gray-500 text-sm mb-2">
                                <FaCalendarAlt className="inline mr-2" />
                                {new Date(
                                  searchParams.arrival_date
                                ).toLocaleDateString()}
                              </div>
                            )}

                            {/* Filters */}
                            <div className="text-sm text-gray-700">
                              <div className="mb-1">
                                <FaDollarSign className="inline mr-2 text-green-600" />
                                Price Range: $
                                {searchParams.filters.priceRange[0]} - $
                                {searchParams.filters.priceRange[1]}
                              </div>
                              {searchParams.filters.airlines?.length > 0 && (
                                <div className="mb-1">
                                  <FaFilter className="inline mr-2 text-indigo-600" />
                                  Airline:{" "}
                                  {searchParams.filters.airlines.join(", ")}
                                </div>
                              )}
                              <div className="mb-1">
                                <FaStopCircle className="inline mr-2 text-red-500" />
                                Stops:{" "}
                                {searchParams.filters.stops === 0
                                  ? "Non-stop"
                                  : `${searchParams.filters.stops} Stop(s)`}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 border-b text-gray-600">
                            <div className="text-gray-700">
                              {new Date(favourite.timestamp).toLocaleString()}
                            </div>
                          </td>
                          <td className="p-4 border-b">
                            <button
                              onClick={() =>
                                handleNavigateToSearch(favourite.search_params)
                              }
                              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium inline-flex items-center"
                            >
                              <FaSearch className="mr-2" />
                              Revisit Search
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Favourites;
