import express from "express";
import { authenticate, restrict } from "../auth/verifyToken";
import { createReview, getAllReviews } from "../Controllers/reviewController";

const router = express.Router({ mergeParams: true });

router.get("/", getAllReviews);
router.post("/", authenticate, restrict(["patient"]), createReview);

export default router;
