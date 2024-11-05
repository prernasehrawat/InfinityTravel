import React, { useState, useEffect } from "react";
import { useUser } from "../components/UserContext";

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

  useEffect(() => {
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
  }, [user.user_id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
          Infinity Travel
        </h1>
        <h2 className="text-2xl font-semibold text-center mb-4">Favourites</h2>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <span className="text-blue-500 animate-spin">Loading...</span>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border text-left">Query</th>
                  <th className="p-2 border text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {favourites.map((favourite) => (
                  <tr key={favourite.id}>
                    <td className="p-2 border font-medium">
                      {favourite.search_params}
                    </td>
                    <td className="p-2 border text-gray-500">
                      {new Date(favourite.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
