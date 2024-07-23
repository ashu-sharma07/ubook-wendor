import User from "../models/user.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import validator from "validator";

export const updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const { fullName, phoneNumber, avatar } = req.body;
  const updateData = {};

  if (fullName) {
    updateData.fullName = fullName;
  }
  if (phoneNumber) {
    if (!validator.isMobilePhone(phoneNumber)) {
      return next(new ErrorHandler("Please provide a valid phone number", 400));
    }
    updateData.phoneNumber = phoneNumber;
  }
  if (avatar) {
    updateData.avatar = avatar;
  }

  // If no fields to update
  if (Object.keys(updateData).length === 0) {
    return next(new ErrorHandler("No fields to update", 400));
  }

  const updatedUser = await User.update(updateData, {
    where: { id: req.user.id },
    returning: true,
    plain: true,
  });

  if (!updatedUser[1]) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: updatedUser[1],
  });
});

export const getCurrentUserProfile = catchAsyncErrors(
  async (req, res, next) => {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      data: user,
    });
  }
);
