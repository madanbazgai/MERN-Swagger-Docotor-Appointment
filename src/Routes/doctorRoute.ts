import express from "express";
import {
  deleteDoctor,
  getAllDoctors,
  updateDoctor,
  getDoctor,
} from "../Controllers/doctorController";
import { authenticate, restrict } from "../auth/verifyToken";

import reviewRouter from "./reviewRoute";

const router = express.Router();

//nested routes
router.use("/:doctorId/reviews",reviewRouter);

router.put(
  "/updateDoctor/:id",
  authenticate,
  restrict(["doctor"]),
  updateDoctor
);
router.delete(
  "/deleteDoctor/:id",
  authenticate,
  restrict(["doctor"]),
  deleteDoctor
);
router.get("/getAllDoctors", getAllDoctors);
router.get("/getDoctor/:id", getDoctor);

export default router;
