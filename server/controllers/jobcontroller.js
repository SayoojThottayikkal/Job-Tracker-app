import Job from "../models/Jobmodel.js";

export const createJob = async (req, res) => {
  try {
    const { company, role, status, date, notes } = req.body;

    if (!company || !role) {
      return res.status(400).json({ msg: "Company and role are required" });
    }

    const job = new Job({
      user: req.user.id,
      company,
      role,
      status: status ? status.toLowerCase() : undefined,
      date: date ? new Date(date) : undefined,
      notes: notes || "",
    });

    await job.save();
    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getJobs = async (req, res) => {
  try {
    const { status, q } = req.query;
    const filter = { user: req.user.id };

    if (status) filter.status = status.toLowerCase();
    if (q) filter.company = { $regex: q, $options: "i" };

    const jobs = await Job.find(filter).sort({ date: -1, createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = {};
    const allowed = ["company", "role", "status", "date", "notes"];

    allowed.forEach((k) => {
      if (req.body[k] !== undefined) {
        payload[k] = k === "status" ? req.body[k].toLowerCase() : req.body[k];
      }
    });

    const job = await Job.findOneAndUpdate(
      { _id: id, user: req.user.id },
      payload,
      { new: true }
    );

    if (!job) return res.status(404).json({ msg: "Job not found" });

    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findOneAndDelete({ _id: id, user: req.user.id });

    if (!job) return res.status(404).json({ msg: "Job not found" });

    res.json({ msg: "Job removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
