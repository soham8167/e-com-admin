const { verifyToken } = require("../utils/token");

module.exports = (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  try {
    req.admin = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};
