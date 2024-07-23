import express from "express";
import {
  getCurrentUserProfile,
  updateUserProfile,
} from "../controllers/user.js";
import {
  searchProfessions,
  getProfessionsForHomePage,
} from "../controllers/profession.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

// Public Routes
router.get("/home", getProfessionsForHomePage);
router.get("/professions/search", searchProfessions);

// Private Routes
router
  .route("/profile")
  .get(isAuthenticatedUser, getCurrentUserProfile)
  .put(isAuthenticatedUser, updateUserProfile);

export default router;
