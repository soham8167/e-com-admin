const r = require("express").Router();
const Category = require("../models/Category");
const upload = require("../middlewares/upload");
const auth = require("../middlewares/authmiddleware");

// CREATE CATEGORY
r.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const category = await Category.create({
      name: req.body.name,
      image: req.file
        ? "https://e-com-admin-3.onrender.com/uploads/" + req.file.filename
        : ""
    });

    res.json(category);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET ALL
r.get("/", async (req, res) => {
  const list = await Category.find().sort({ createdAt: -1 });
  res.json(list);
});

// DELETE
r.delete("/:id", auth, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ msg: "Category deleted" });
});

module.exports = r;
