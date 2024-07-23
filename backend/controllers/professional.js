import Professional from "../models/professional.js";
import Booking from "../models/booking.js";
import User from "../models/user.js";
import Profession from "../models/profession.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { addDays, isBefore, isAfter, startOfDay, endOfDay } from "date-fns";
import { generateRandomRating } from "../helper/generateRandomRating.js";
import { generateDaySlots } from "../helper/slots.js";
import { isDate } from "../helper/utils.js";
import { sequelize } from "../config/database.js";
import { Op } from "sequelize";

export const JoinNewProfessional = catchAsyncErrors(async (req, res, next) => {
  const {
    fullName,
    phoneNumber,
    avatar,
    profession,
    services,
    workingHours,
    slotDuration,
    pricePerSlot,
  } = req.body;

  const professionExist = await Profession.findByPk(profession);

  if (!professionExist) {
    return next(new ErrorHandler("Please provide valid profession", 400));
  }

  if (services.length > 255) {
    return next(
      new ErrorHandler("Services lenght should be less then 255 chars", 400)
    );
  }

  const t = await sequelize.transaction();

  try {
    // Create a new user
    const user = await User.create(
      {
        fullName,
        phoneNumber,
        avatar,
        role: "professional",
      },
      { transaction: t }
    );

    // Create a new professional
    const professional = await Professional.create(
      {
        userId: user.id,
        professionId: profession,
        services,
        workingHoursStart: workingHours.start,
        workingHoursEnd: workingHours.end,
        slotDuration,
        pricePerSlot,
        rating: generateRandomRating(),
      },
      { transaction: t }
    );

    await t.commit();

    res.status(201).json({
      success: true,
      message: "Professional added successfully",
      data: professional,
    });
  } catch (error) {
    await t.rollback();
    return next(
      new ErrorHandler("Please provide valid professional details", 400)
    );
  }
});
export const getAllProfessionals = catchAsyncErrors(async (req, res, next) => {
  const { professionId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  // Validate professionId
  if (!professionId) {
    return next(new ErrorHandler("Profession ID is required", 400));
  }

  // Count total documents
  const total = await Professional.count({
    where: {
      professionId,
      isVerified: true,
    },
  });

  // Execute the query
  const professionals = await Professional.findAll({
    where: {
      professionId,
      isVerified: true,
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["fullName", "avatar", "avatarUrl"],
      },
      {
        model: Profession,
        as: "profession",
        attributes: ["name", "id"],
      },
    ],
    attributes: ["id", "services", "slotDuration", "pricePerSlot", "rating"],
    limit: limitNumber,
    offset: (pageNumber - 1) * limitNumber,
  });

  // Calculate total pages
  const totalPages = Math.ceil(total / limitNumber);

  res.status(200).json({
    success: true,
    data: {
      professionals,
      currentPage: pageNumber,
      totalPages,
      totalProfessionals: total,
    },
    message: "Professionals fetched successfully",
  });
});
export const getSingleProfessional = async (req, res, next) => {
  const { professionalId } = req.params;

  // Validate professionalId
  if (!professionalId) {
    return next(new ErrorHandler("Professional ID is required", 400));
  }

  // Find the professional
  const professional = await Professional.findOne({
    where: { id: professionalId },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["fullName", "avatar", "avatarUrl", "phoneNumber"],
      },
      {
        model: Profession,
        as: "profession",
        attributes: ["name", "id"],
      },
    ],
    attributes: ["id", "services", "slotDuration", "pricePerSlot", "rating"],
  });

  // If professional not found
  if (!professional) {
    return next(new ErrorHandler("Professional not found", 404));
  }

  res.status(200).json({
    success: true,
    data: professional,
    message: "Professional fetched successfully",
  });
};
export const verifyProfessional = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("Please provide professional id", 400));
  }

  // Find the professional
  const professional = await Professional.findByPk(id);

  if (!professional) {
    return next(new ErrorHandler("Professional not found", 404));
  }

  if (professional.isVerified) {
    return next(new ErrorHandler("Professional is already verified", 400));
  }

  // Update verification status
  professional.isVerified = true;
  await professional.save();

  res.status(200).json({
    success: true,
    message: "Professional verified successfully",
    data: professional,
  });
};

export const getAvailableSlots = catchAsyncErrors(async (req, res, next) => {
  const { professionalId, date } = req.params;

  const professional = await Professional.findByPk(professionalId);
  if (!professional) {
    return next(new ErrorHandler("Professional not found", 404));
  }

  if (!professional.isVerified) {
    return next(
      new ErrorHandler(
        "Professional must be verified before taking booking",
        400
      )
    );
  }

  if (!isDate(date)) {
    return next(new ErrorHandler("Please provide a valid date", 400));
  }

  const requestedDate = new Date(date);

  const today = startOfDay(new Date());
  const maxDate = endOfDay(addDays(today, 2));

  if (isBefore(requestedDate, today) || isAfter(requestedDate, maxDate)) {
    return next(
      new ErrorHandler(
        "Slots are only available for today, tomorrow, and the day after tomorrow",
        400
      )
    );
  }

  const start = professional.workingHoursStart;
  const end = professional.workingHoursEnd;

  const allSlots = generateDaySlots(
    start,
    end,
    professional.slotDuration,
    requestedDate
  );

  // Fetch booked slots
  const bookedSlots = await Booking.findAll({
    where: {
      professionalId,
      date: {
        [Op.gte]: startOfDay(requestedDate),
        [Op.lte]: endOfDay(requestedDate),
      },
      status: {
        [Op.in]: ["pending", "confirmed"],
      },
    },
    attributes: ["startTime"],
  });

  const bookedStartTimes = bookedSlots.map((slot) => slot.startTime);

  const availableSlots = allSlots.filter(
    (slot) => !bookedStartTimes.includes(slot)
  );

  res.status(200).json({
    success: true,
    message: "Fetched all available slots for professional",
    data: {
      availableSlots,
    },
  });
});

// Book a slot for a professional
export const bookSlot = catchAsyncErrors(async (req, res, next) => {
  const { professionalId, date, startTime, address } = req.body;

  if ((!professionalId, !date, !startTime, !address)) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  const professional = await Professional.findByPk(professionalId);

  if (!professional) {
    return next(new ErrorHandler("Professional not found", 404));
  }

  if (!isDate(date)) {
    return next(new ErrorHandler("Please provide a valid date", 400));
  }

  const requestedDate = new Date(date);
  const today = startOfDay(new Date());
  const maxDate = endOfDay(addDays(today, 2));

  if (isBefore(requestedDate, today) || isAfter(requestedDate, maxDate)) {
    return next(
      new ErrorHandler(
        "Slots are only available for today, tomorrow, and the day after tomorrow",
        400
      )
    );
  }

  // Check if the slot is available
  const existingBooking = await Booking.findOne({
    where: {
      professionalId,
      date: new Date(date),
      startTime,
      status: { [Op.in]: ["pending", "confirmed"] },
    },
  });

  if (existingBooking) {
    return next(new ErrorHandler("This slot is already booked", 400));
  }

  // Create the booking
  const booking = await Booking.create({
    userId: req.user.id,
    professionalId,
    date: new Date(date),
    startTime,
    addressStreet: address.street,
    addressCity: address.city,
    addressPinCode: address.pinCode,
    price: professional.pricePerSlot,
  });

  res.status(201).json({
    success: true,
    message: "Slot booked successfully",
    data: booking,
  });
});
