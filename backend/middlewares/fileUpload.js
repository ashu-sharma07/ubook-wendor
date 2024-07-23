import multer from "multer";

// Define storage settings
const storage = multer.memoryStorage();

// Custom file filter function for images
const imageFileFilter = (req, file, cb) => {
  // Check if the file is an image
  if (
    file.mimetype.startsWith("image/") &&
    ["image/png", "image/jpeg", "image/jpg"].includes(file.mimetype)
  ) {
    cb(null, true); // Allow upload
  } else {
    cb(new Error("Only PNG, JPG, or JPEG images are allowed"));
  }
};

// Initialize Multer for image uploads
export const imageUpload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit for image files
  },
}).single("file");
