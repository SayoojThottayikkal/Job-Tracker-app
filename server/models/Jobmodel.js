import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    company: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["applied", "interview", "offer", "rejected", "archived"],
      default: "applied",
      lowercase: true,
    },
    date: { type: Date, default: Date.now },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
