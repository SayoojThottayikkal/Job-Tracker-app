import React, { useEffect, useMemo, useState } from "react";
import { getJobs, createJob } from "../services/jobs";
import JobCard from "../components/JobCard";
import FilterBar from "../components/FilterBar";
import JobForm from "../components/JobForm";
import { useAuth } from "../context/AuthContext";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const { logout } = useAuth();

  const fetch = async () => {
    setLoading(true);
    try {
      const { data } = await getJobs();
      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const matchCompany = j.company
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchStatus = status === "all" ? true : j.status === status;
      return matchCompany && matchStatus;
    });
  }, [jobs, query, status]);

  const onCreate = async (payload) => {
    try {
      const { data } = await createJob(payload);
      setJobs((p) => [data, ...p]);
      setShowCreate(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">My Applications</h1>
        <div className="flex items-center gap-2">
          <button
            className="btn btn-primary"
            onClick={() => setShowCreate((s) => !s)}
          >
            {showCreate ? "Close" : "+ Add Job"}
          </button>
        </div>
      </div>

      <FilterBar
        query={query}
        setQuery={setQuery}
        status={status}
        setStatus={setStatus}
      />

      {showCreate && (
        <div className="card">
          <JobForm onSubmit={onCreate} />
        </div>
      )}

      {loading ? (
        <div className="text-gray-500">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="text-gray-500">No jobs found</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((job) => (
            <JobCard key={job._id} job={job} onChange={fetch} />
          ))}
        </div>
      )}
    </div>
  );
}
