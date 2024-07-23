import express from "express";
import {
  getAllProfessions,
  addProfession,
  updateProfession,
  deleteProfession,
} from "../controllers/profession.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

// Private Routes (Admin only)

router.get(
  "/professions",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllProfessions
);

router
  .route("/profession")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addProfession);

router
  .route("/profession/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProfession)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProfession);

export default router;
