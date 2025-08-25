import api from "./api";

export const getJobs = () => api.get("/jobs");
export const getJob = (id) => api.get(`/jobs/${id}`);
export const createJob = (payload) => api.post("/jobs", payload);
export const updateJob = (id, payload) => api.put(`/jobs/${id}`, payload);
export const deleteJob = (id) => api.delete(`/jobs/${id}`);
