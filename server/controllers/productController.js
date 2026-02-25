const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const Category = require("../models/Category");

// CREATE CATEGORY
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    // Upload image to Cloudinary from buffer
    const uploadFromBuffer = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "categories" },
          (error, result) => (result ? resolve(result) : reject(error)),
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await uploadFromBuffer();

    const category = await Category.create({
      name,
      image: result.secure_url,
      public_id: result.public_id,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL CATEGORIES
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE CATEGORY
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    // Delete image from Cloudinary
    if (category.public_id) {
      await cloudinary.uploader.destroy(category.public_id);
    }

    await category.deleteOne();
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};
