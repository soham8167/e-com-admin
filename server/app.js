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










require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
  origin: [
    "https://e-com-admin-aahr.vercel.app",
    "https://e-com-admin-rho.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/admin", require("./routes/adminroute"));
app.use("/api/products", require("./routes/productroute"));
app.use("/uploads", express.static("uploads"));

module.exports = app;
