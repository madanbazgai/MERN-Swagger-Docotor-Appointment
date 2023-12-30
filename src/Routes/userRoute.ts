import express from "express";
import {
  deleteUser,
  getAllUsers,
  updateUser,
  getUser,
} from "../Controllers/userController";
import { authenticate, restrict } from "../auth/verifyToken";

const router = express.Router();

router.get("/getUser/:id", authenticate, restrict(["patient"]), getUser);
router.get("/getAllUsers", authenticate, restrict(["admin"]), getAllUsers);
router.put("/updateUser/:id", authenticate, restrict(["patient"]), updateUser);
router.delete(
  "/deleteUser/:id",
  authenticate,
  restrict(["patient"]),
  deleteUser
);

export default router;
