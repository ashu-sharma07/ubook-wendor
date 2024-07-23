import express from "express";
import { uploadFile } from "../controllers/utils.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { imageUpload } from "../middlewares/fileUpload.js";
import { fileUploadLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

// Private Routes
router
  .route("/upload/image")
  .post(isAuthenticatedUser, fileUploadLimiter, imageUpload, uploadFile);

export default router;
