import express from "express";
import {
  getAllProfessionals,
  JoinNewProfessional,
  verifyProfessional,
  getAvailableSlots,
  bookSlot,
  getSingleProfessional,
} from "../controllers/professional.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

// Public Routes
router.route("/all/:professionId").get(getAllProfessionals);
router.route("/:professionalId").get(getSingleProfessional);
router.route("/new/join").post(JoinNewProfessional);

// Private Routes
router.get("/:professionalId/available-slots/:date", getAvailableSlots);
router.post("/book", isAuthenticatedUser, bookSlot);

// Private Routes (Admin only)
router
  .route("/verify/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), verifyProfessional);

export default router;
