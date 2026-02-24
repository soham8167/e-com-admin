
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");

const app = express();

/* 
   CREATE UPLOADS FOLDER 
*/

const uploadPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("Uploads folder created");
}

/* 
   CORS CONFIG
*/

const allowedOrigins = [
  "https://e-com-admin-cjyj.vercel.app",
  "https://e-com-admin-aahr.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin);
      return callback(new Error("CORS not allowed for this origin"));
    },
    credentials: true,
  })
);

/* 
   MIDDLEWARE
 */

app.use(express.json());
app.use(cookieParser());

/* 
   STATIC FOLDER
 */

app.use("/uploads", express.static(uploadPath));

/* 
   ROUTES
 */

app.use("/api/admin", require("./routes/adminroute"));
app.use("/api/products", require("./routes/productroute"));
app.use("/api/categories", require("./routes/category"));

/* 
   ERROR HANDLER
 */

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      error: "Image must be less than 2MB",
    });
  }

  if (err.message && err.message.includes("Only")) {
    return res.status(400).json({
      error: err.message,
    });
  }

  res.status(500).json({
    error: err.message || "Internal Server Error",
  });
});

module.exports = app;