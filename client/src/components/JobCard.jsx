import React, { useState } from "react";
import { deleteJob, updateJob } from "../services/jobs";
import { Link } from "react-router-dom";

export default function JobCard({ job, onChange }) {
  const [editing, setEditing] = useState(false);
  const [notes, setNotes] = useState(job.notes || "");
  const [status, setStatus] = useState(job.status || "saved");

  const handleDelete = async () => {
    if (!confirm("Delete this job?")) return;
    await deleteJob(job._id);
    onChange?.();
  };

  const saveQuick = async () => {
    await updateJob(job._id, { notes, status });
    setEditing(false);
    onChange?.();
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
      {editing ? (
        <>
          <div className="mb-3 font-semibold text-gray-800">
            {job.company} — {job.role}
          </div>

          <select
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:border-blue-500 focus:ring focus:ring-blue-200 mb-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="saved">Saved</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>

          <textarea
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 mb-2"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
              onClick={saveQuick}
            >
              Save
            </button>
            <button
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 transition"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div>
              <div className="font-semibold text-gray-800">{job.company}</div>
              <div className="text-sm text-gray-600">{job.role}</div>
            </div>
            <div
              className={`text-xs font-medium rounded px-2 py-1 ${
                job.status === "applied"
                  ? "bg-blue-100 text-blue-700"
                  : job.status === "interview"
                  ? "bg-yellow-100 text-yellow-700"
                  : job.status === "offer"
                  ? "bg-green-100 text-green-700"
                  : job.status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {job.status}
            </div>
          </div>

          <div className="text-xs text-gray-500 my-2">
            {new Date(job.date).toLocaleDateString()}
          </div>

          {job.notes && (
            <div className="mb-3 text-sm text-gray-700 whitespace-pre-wrap">
              {job.notes}
            </div>
          )}

          <div className="flex gap-2">
            <button
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100 transition"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>

            <button
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-red-50 text-red-600 transition"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
