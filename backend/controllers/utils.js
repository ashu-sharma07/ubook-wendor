// Import Async Error Handler Middleware
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// Import Utils
import { fileUploader } from "../utils/fileUpload.js";

// Upload Files -- Private

export const uploadFile = catchAsyncErrors(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorHandler("Please provide file", 400));
  }

  try {
    const fileName = await fileUploader(req.file);
    const fileUrl = `${process.env.AWS_CLOUDFRONT_BASE_URL}/${fileName}`;

    res.status(200).json({
      success: true,
      message: "File Uploaded successfully",
      fileName,
      fileUrl,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
