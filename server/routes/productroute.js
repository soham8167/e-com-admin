const r = require("express").Router();
const Product = require("../models/Productmodel");
const auth = require("../middlewares/authmiddleware");
const upload = require("../middlewares/upload");



r.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const product = await Product.create({
      title: req.body.title,
      price: Number(req.body.price),
      description: req.body.description || "",
      category: req.body.category || "general",   
              
      image: req.file
        ? "https://e-com-admin-3.onrender.com/uploads/" + req.file.filename
        : ""
    });

    res.json(product);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});





r.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category && category !== "all") {
      filter.category = category;
    }

    const list = await Product.find(filter)
      .sort({ createdAt: -1 });

    res.json(list);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});



r.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      price: Number(req.body.price),
      description: req.body.description,
      category: req.body.category,
      
    };

    if (req.file) {
      data.image = "https://e-com-admin-3.onrender.com/uploads/" + req.file.filename;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});



r.delete("/:id", auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "deleted" });
});


module.exports = r;

