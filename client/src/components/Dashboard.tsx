import React, { useState, useEffect } from "react";

interface Metric {
  hour?: string; // Present in hourly data
  month?: string; // Present in monthly data
  source: string;
  destination: string;
  search_count: number;
}

const Dashboard = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]); // State with proper type
  const [filters, setFilters] = useState({
    timeFrame: "hourly",
    source: "SEA",
    destination: "IAD",
    date: "2024-01-15",
    startDate: "",
    endDate: "",
  });

  // Fetch metrics data
  const fetchMetrics = async () => {
    try {
      const { timeFrame, source, destination, date, startDate, endDate } =
        filters;

      let url = `http://localhost:8000/metric?timeFrame=${timeFrame}&source=${source}&destination=${destination}`;
      if (timeFrame === "hourly" && date) {
        url += `&date=${date}`;
      } else if (timeFrame === "monthly" && startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setMetrics(data.data); // Update state with the fetched data
      } else {
        console.error("Error fetching metrics:", data.error);
      }
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  // Fetch metrics on filters change
  useEffect(() => {
    fetchMetrics();
  }, [filters]);

  return (
    <div className="dashboard">
      <h1 className="text-2xl font-bold mb-4">Search Metrics Dashboard</h1>
      <div className="filters mb-4">
        <select
          className="border px-4 py-2 mr-2"
          value={filters.timeFrame}
          onChange={(e) =>
            setFilters({ ...filters, timeFrame: e.target.value })
          }
        >
          <option value="hourly">Hourly</option>
          <option value="monthly">Monthly</option>
        </select>
        <input
          type="text"
          placeholder="Source"
          className="border px-4 py-2 mr-2"
          value={filters.source}
          onChange={(e) => setFilters({ ...filters, source: e.target.value })}
        />
        <input
          type="text"
          placeholder="Destination"
          className="border px-4 py-2 mr-2"
          value={filters.destination}
          onChange={(e) =>
            setFilters({ ...filters, destination: e.target.value })
          }
        />
        {filters.timeFrame === "hourly" && (
          <input
            type="date"
            className="border px-4 py-2 mr-2"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />
        )}
        {filters.timeFrame === "monthly" && (
          <>
            <input
              type="month"
              className="border px-4 py-2 mr-2"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
            />
            <input
              type="month"
              className="border px-4 py-2"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
            />
          </>
        )}
      </div>

      <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">
              {filters.timeFrame === "hourly" ? "Hour" : "Month"}
            </th>
            <th className="border border-gray-300 px-4 py-2">Source</th>
            <th className="border border-gray-300 px-4 py-2">Destination</th>
            <th className="border border-gray-300 px-4 py-2">Search Count</th>
          </tr>
        </thead>
        <tbody>
          {metrics.length > 0 ? (
            metrics.map((metric, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {filters.timeFrame === "hourly" ? metric.hour : metric.month}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {metric.source}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {metric.destination}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {metric.search_count}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="border border-gray-300 px-4 py-2 text-center"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
