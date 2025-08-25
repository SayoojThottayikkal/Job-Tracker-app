import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJob, updateJob } from "../services/jobs";
import JobForm from "../components/JobForm";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  const fetch = async () => {
    try {
      const { data } = await getJob(id);
      setJob(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch();
  }, [id]);

  const onSave = async (payload) => {
    try {
      await updateJob(id, payload);
      navigate("/jobs");
    } catch (err) {
      console.error(err);
    }
  };

  if (!job) return <div>Loading…</div>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-3">Edit Job</h1>
      <div className="card">
        <JobForm existing={job} onSubmit={onSave} />
      </div>
    </div>
  );
}
