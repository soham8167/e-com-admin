// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");

// const app = express();

// app.use(express.json());
// app.use(cookieParser());

// app.use(cors({
//   origin: ["https://e-com-admin-rho.vercel.app"],
//   credentials: true 
// }));

// app.use("/api/admin", require("./routes/adminroute"));
// app.use("/api/products", require("./routes/productroute"));
// app.use("/uploads", express.static("uploads"));



// module.exports = app;







console.log("CORS BUILD VERSION 2");



require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

/* ---------- CORS CONFIG (FINAL) ---------- */

const allowedOrigins = [
  "https://e-com-admin-aahr.vercel.app",
  "https://e-com-admin-rho.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow server-to-server or Postman requests (no origin)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS not allowed for this origin"));
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

/* ---------- MIDDLEWARE ---------- */

app.use(express.json());
app.use(cookieParser());

/* ---------- ROUTES ---------- */

app.use("/api/admin", require("./routes/adminroute"));
app.use("/api/products", require("./routes/productroute"));
app.use("/api/categories", require("./routes/category"));

app.use("/uploads", express.static("uploads"));

/* ---------- EXPORT ---------- */

module.exports = app;
