import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
});

export const fileUploadLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 1 minutes
  max: 4,
  message: {
    success: false,
    message: "Too many File Upload requests, please try again later.",
  },
});

export const otpLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 2,
  message: {
    success: false,
    message: "Too many OTP requests, please try again later.",
  },
});
