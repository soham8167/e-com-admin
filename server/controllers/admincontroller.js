const Admin = require("../models/AdminModel");
const { comparePassword } = require("../utils/hash");
const { createToken } = require("../utils/token");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ msg: "Invalid credentials" });

  const ok = await comparePassword(password, admin.password);
  if (!ok) return res.status(400).json({ msg: "Invalid credentials" });

  const token = createToken({ id: admin._id, role: "admin" });

  res.cookie("adminToken", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true, 
  });

  res.json({ msg: "Login success" });
};

exports.me = (req, res) => {
  res.json({ admin: req.admin });
};

exports.logout = (req, res) => {
  res.clearCookie("adminToken", {
    sameSite: "none",
    secure: true
  });
  res.json({ msg: "Logged out" });
};

