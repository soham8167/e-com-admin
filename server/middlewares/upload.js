const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  const allowed = /jpeg|jpg|png|webp/;

  const extOk = allowed.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimeOk = allowed.test(file.mimetype);

  if (extOk && mimeOk) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG, WEBP allowed"));
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  },
  fileFilter
});

module.exports = upload;