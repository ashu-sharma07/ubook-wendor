import express from "express";
import {
  getUserBookings,
  getSingleBooking,
  cancelBooking,
} from "../controllers/booking.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.get("/my-bookings", isAuthenticatedUser, getUserBookings);
router.get("/my-booking/:bookingId", isAuthenticatedUser, getSingleBooking);
router.patch(
  "/my-booking/cancel/:bookingId",
  isAuthenticatedUser,
  cancelBooking
);

export default router;
