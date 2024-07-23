// Import DB Models
import User from "../models/user.js";

// Import Async Error Handler Middleware
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

// Import Utils
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwtToken.js";
import { sendSms } from "../utils/sender.js";

// Public Controllers

// Start user login -- Public
export const startlogin = catchAsyncErrors(async (req, res, next) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return next(new ErrorHandler("Please provide a valid phone number", 400));
  }

  let user = await User.findOne({ where: { phoneNumber } });

  let statusCode = 200;
  if (!user) {
    user = await User.create({ phoneNumber });
    statusCode = 201;
  }

  // Sent OTP for Signup / Login
  const code = user.generateAndCacheVerificationCode();

  try {
    await sendSms(
      phoneNumber,
      `Your Login OTP is ${code}.\nregards\nTeam uBook`
    );
  } catch (err) {
    user.clearVerificationCode();
    return next(new ErrorHandler("Message could not be sent", 500));
  }

  res.status(statusCode).json({
    success: true,
    message: "Login OTP sent successfully",
    data: user,
  });
});

// Verify user login -- Public
export const verifyLogin = catchAsyncErrors(async (req, res, next) => {
  const { code, userId } = req.body;

  if (!code) {
    return next(new ErrorHandler("Please enter OTP", 400));
  }
  if (!userId) {
    return next(new ErrorHandler("Please provide userId", 400));
  }

  const user = await User.findByPk(userId);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (!user.validateVerificationCode(code)) {
    return next(new ErrorHandler("Invalid or Expired OTP", 401));
  }

  sendToken(user, 200, "User logged in successfully", res);
});

// Resend login Verification Code -- Private
export const resendLoginVerificationCode = catchAsyncErrors(
  async (req, res, next) => {
    const { userId } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const code = user.generateAndCacheVerificationCode();

    try {
      await sendSms(
        user.phoneNumber,
        `Your Login OTP is ${code}.\nregards\nTeam uBook`
      );
    } catch (err) {
      user.clearVerificationCode();
      return next(new ErrorHandler("Message could not be sent", 500));
    }

    res.status(200).json({
      success: true,
      message: `Verification Code sent successfully to ${user.phoneNumber}`,
    });
  }
);
