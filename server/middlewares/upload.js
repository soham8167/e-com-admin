// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// module.exports = multer({ storage });





const multer = require("multer");
const path = require("path");


/* ================= STORAGE ================= */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const unique =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, unique + path.extname(file.originalname));
  }
});

/* ================= FILE FILTER ================= */

function fileFilter(req, file, cb) {
  const allowed = /jpeg|jpg|png|webp/;

  const extOk = allowed.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimeOk = allowed.test(file.mimetype);

  if (extOk && mimeOk) {
    return cb(null, true);
  }

  cb(new Error("Only JPG, JPEG, PNG, WEBP images allowed"));
}

/* ================= UPLOAD CONFIG ================= */

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // ✅ 2MB
  },
  fileFilter
});

module.exports = upload;
