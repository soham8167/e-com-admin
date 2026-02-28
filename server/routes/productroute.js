const router = require("express").Router();
const Product = require("../models/Productmodel");
const auth = require("../middlewares/authmiddleware");
const upload = require("../middlewares/upload");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");


// CREATE PRODUCT
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "Image required" });

    const uploadFromBuffer = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (err, result) => (result ? resolve(result) : reject(err))
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await uploadFromBuffer();

    const product = await Product.create({
      title: req.body.title,
      price: Number(req.body.price),
      description: req.body.description || "",
      category: req.body.category,
      image: result.secure_url,
      public_id: result.public_id,
      isBestSeller: req.body.isBestSeller === "true",
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});


// LIST PRODUCTS
router.get("/", async (req, res) => {
  try {
    const filter =
      req.query.category && req.query.category !== "all"
        ? { category: req.query.category }
        : {};

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});


// BEST SELLERS API
router.get("/best-sellers", async (req, res) => {
  try {
    const products = await Product.find({ isBestSeller: true })
      .sort({ createdAt: -1 })
      .limit(8);

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});





// GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});



// UPDATE PRODUCT
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    const data = {
      title: req.body.title,
      price: Number(req.body.price),
      description: req.body.description,
      category: req.body.category,

      isBestSeller: req.body.isBestSeller === "true",
    };

    if (req.file) {
      if (product.public_id) {
        await cloudinary.uploader.destroy(product.public_id);
      }

      const uploadFromBuffer = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (err, result) => (result ? resolve(result) : reject(err))
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const result = await uploadFromBuffer();
      data.image = result.secure_url;
      data.public_id = result.public_id;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      data,
      { returnDocument: "after" }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});


// DELETE PRODUCT
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    if (product.public_id) {
      await cloudinary.uploader.destroy(product.public_id);
    }

    await product.deleteOne();
    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;