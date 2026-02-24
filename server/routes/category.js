const r = require("express").Router();
const Category = require("../models/Category");
const upload = require("../middlewares/upload");
const auth = require("../middlewares/authmiddleware");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// CREATE CATEGORY 
r.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "Image required" });
    }

    // Upload image to Cloudinary from buffer
    const uploadFromBuffer = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "categories" },
          (error, result) => (result ? resolve(result) : reject(error))
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await uploadFromBuffer();

    const category = await Category.create({
      name: req.body.name,
      image: result.secure_url,
      public_id: result.public_id,
    });

    res.json(category);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET ALL CATEGORIES
r.get("/", async (req, res) => {
  try {
    const list = await Category.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// DELETE CATEGORY
r.delete("/:id", auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ msg: "Category not found" });

    // Delete image from Cloudinary
    if (category.public_id) {
      await cloudinary.uploader.destroy(category.public_id);
    }

    await category.deleteOne();
    res.json({ msg: "Category deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = r;
