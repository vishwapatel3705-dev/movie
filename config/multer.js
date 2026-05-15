const multer = require("multer");
const path = require("path");

const allowedVideoExtensions = new Set([
  ".mp4",
  ".webm",
  ".ogg",
  ".mov",
  ".m4v",
  ".avi",
  ".mkv",
]);

const allowedImageExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
]);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();
  const isVideo =
    file.mimetype.startsWith("video/") ||
    allowedVideoExtensions.has(extension);
  const isImage =
    file.mimetype.startsWith("image/") ||
    allowedImageExtensions.has(extension);

  if (isVideo || isImage) {
    return cb(null, true);
  }

  cb(new Error("Please upload a supported image or video file."));
};

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 500 * 1024 * 1024,
  },
});
