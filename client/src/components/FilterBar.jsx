import React from "react";

export default function FilterBar({ query, setQuery, status, setStatus }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Search company
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="company Name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:border-blue-500 focus:ring focus:ring-blue-200"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="saved">Saved</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="flex items-end">
        <button className="w-full rounded-lg bg-blue-600 py-2 text-white font-medium hover:bg-blue-700 transition">
          Apply
        </button>
      </div>
    </div>
  );
}
