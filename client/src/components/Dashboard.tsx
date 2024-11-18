import React from "react";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="text-2xl font-bold mb-4">Search Metrics Dashboard</h1>
      <div className="filters mb-4">
        <input
          type="text"
          placeholder="Search by user"
          className="border px-4 py-2 mr-2"
        />
        <select className="border px-4 py-2">
          <option value="">Filter by Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          {/* Add other months */}
        </select>
      </div>
      <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Source</th>
            <th className="border border-gray-300 px-4 py-2">Destination</th>
            <th className="border border-gray-300 px-4 py-2">Search Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">-</td>
            <td className="border border-gray-300 px-4 py-2">-</td>
            <td className="border border-gray-300 px-4 py-2">-</td>
            <td className="border border-gray-300 px-4 py-2">-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
