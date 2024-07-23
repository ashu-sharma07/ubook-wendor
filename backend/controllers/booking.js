import Booking from "../models/booking.js";
import Professional from "../models/professional.js";
import Profession from "../models/profession.js";
import User from "../models/user.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getUserBookings = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;

  // Fetch all bookings for the user
  const bookings = await Booking.findAll({
    where: { userId },
    include: [
      {
        model: Professional,
        as: "professional",
        attributes: ["id"],
        include: [
          {
            model: Profession,
            as: "profession",
            attributes: ["name"],
          },
          {
            model: User,
            as: "user",
            attributes: ["fullName", "avatar", "avatarUrl"],
          },
        ],
      },
    ],
    attributes: ["id", "date", "startTime", "status"],
    order: [["createdAt", "DESC"]],
  });

  res.status(200).json({
    success: true,
    message: "Fetched all user bookings",
    data: bookings,
  });
});

// Get Single booking Details
export const getSingleBooking = catchAsyncErrors(async (req, res, next) => {
  const { bookingId } = req.params;

  if (!bookingId) {
    return next(new ErrorHandler("Please provide a booking id", 400));
  }

  // Fetch the booking with associations
  const booking = await Booking.findOne({
    where: { id: bookingId },
    include: [
      {
        model: Professional,
        as: "professional",
        attributes: ["rating"],
        include: [
          {
            model: Profession,
            as: "profession",
            attributes: ["name", "id"],
          },
          {
            model: User,
            as: "user",
            attributes: ["fullName", "avatar", "avatarUrl", "phoneNumber"],
          },
        ],
      },
    ],
    attributes: [
      "date",
      "startTime",
      "addressStreet",
      "addressCity",
      "addressPinCode",
      "status",
      "price",
    ],
  });

  if (!booking) {
    return next(new ErrorHandler("Booking not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Fetched booking details",
    data: booking,
  });
});
// Cancel booking
export const cancelBooking = catchAsyncErrors(async (req, res, next) => {
  const { bookingId } = req.params;

  const booking = await Booking.findByPk(bookingId);

  if (!booking) {
    return next(new ErrorHandler("Booking not found", 404));
  }

  booking.status = "cancelled";

  await booking.save();

  res.status(200).json({
    success: true,
    message: "Booking cancelled successfully",
    data: booking,
  });
});
