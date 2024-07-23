import express from "express";
import {
  startlogin,
  verifyLogin,
  resendLoginVerificationCode,
} from "../controllers/auth.js";
import { otpLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

// Public Routes
router.route("/login/start").post(startlogin);
router.route("/login/verify").post(verifyLogin);
router.route("/resend/otp").post(otpLimiter, resendLoginVerificationCode);

export default router;
