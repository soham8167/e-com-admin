
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");

// const app = express();

// /*  CORS CONFIG  */

// const allowedOrigins = [
//   "https://e-com-admin-aahr.vercel.app",
  
//   "http://localhost:5173",
//   "http://localhost:5174",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow server-to-server or Postman requests (no origin)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       return callback(new Error("CORS not allowed for this origin"));
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );

// /* MIDDLEWARE  */

// app.use(express.json());
// app.use(cookieParser());

// /*  ROUTES  */

// app.use("/api/admin", require("./routes/adminroute"));
// app.use("/api/products", require("./routes/productroute"));
// app.use("/api/categories", require("./routes/category"));

// app.use("/uploads", express.static("uploads")); 





// app.use((err, req, res, next) => {
//   if (err.code === "LIMIT_FILE_SIZE") {
//     return res.status(400).json({
//       error: "Image must be less than 2MB",
//     });
//   }

//   if (err.message.includes("Only")) {
//     return res.status(400).json({
//       error: err.message,
//     });
//   }

//   console.error(err);
//   res.status(500).json({ error: err.message });
// });


// module.exports = app;










require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

/* =======================
   CORS CONFIG (FIXED)
======================= */

const allowedOrigins = [
  "https://e-com-admin-cjyj.vercel.app", // ✅ current frontend
  "https://e-com-admin-aahr.vercel.app", // optional old frontend
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, server-to-server)
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



/* =======================
   MIDDLEWARE
======================= */

app.use(express.json());
app.use(cookieParser());

/* =======================
   ROUTES
======================= */

app.use("/api/admin", require("./routes/adminroute"));
app.use("/api/products", require("./routes/productroute"));
app.use("/api/categories", require("./routes/category"));

app.use("/uploads", express.static("uploads"));

/* =======================
   ERROR HANDLER
======================= */

app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      error: "Image must be less than 2MB",
    });
  }

  if (err.message.includes("Only")) {
    return res.status(400).json({
      error: err.message,
    });
  }

  res.status(500).json({
    error: err.message || "Internal Server Error",
  });
});

module.exports = app;