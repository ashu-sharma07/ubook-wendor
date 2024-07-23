// Import the required modules
import jwt from "jsonwebtoken";
// Import DB Models
import User from "../models/user.js";
// Import Async Error Handler Middleware
import catchAsyncErrors from "./catchAsyncErrors.js";
// Import Utils
import ErrorHandler from "../utils/errorHandler.js";

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    let token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found", 404));
    }

    next();
  } else {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
