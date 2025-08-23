import { Router } from "express";
import { auth } from "../middleware/authmiddleware.js";

import {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
} from "../controllers/jobcontroller.js";

const router = Router();

router.use(auth);

router.post("/", createJob);
router.get("/", getJobs);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;
