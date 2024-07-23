import express from "express";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";
import professionRoutes from "./profession.js";
import professionalRoutes from "./professional.js";
import bookingRoutes from "./booking.js";
import utilsRoutes from "./utils.js";

const router = express.Router();

// Use Routes
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/admin", professionRoutes);
router.use("/professional", professionalRoutes);
router.use("/booking", bookingRoutes);
router.use("/utils", utilsRoutes);

export default router;
