// const r = require("express").Router();
// const Product = require("../models/Productmodel");
// const auth = require("../middlewares/authmiddleware");
// const upload = require("../middlewares/upload");



// r.post("/", auth, upload.single("image"), async (req, res) => {
//   try {
//     console.log("BODY:", req.body);
//     console.log("FILE:", req.file);

//     const product = await Product.create({
//       title: req.body.title,
//       price: Number(req.body.price),
//       description: req.body.description || "",
//       category: req.body.category || "general",   
              
//       image: req.file
//         ? "https://e-com-admin-3.onrender.com/uploads/" + req.file.filename
//         : ""
//     });

//     res.json(product);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: err.message });
//   }
// });





// r.get("/", async (req, res) => {
//   try {
//     const { category } = req.query;

//     let filter = {};

//     if (category && category !== "all") {
//       filter.category = category;
//     }

//     const list = await Product.find(filter)
//       .sort({ createdAt: -1 });

//     res.json(list);

//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });



// r.put("/:id", auth, upload.single("image"), async (req, res) => {
//   try {
//     const data = {
//       title: req.body.title,
//       price: Number(req.body.price),
//       description: req.body.description,
//       category: req.body.category,
      
//     };

//     if (req.file) {
//       data.image = "https://e-com-admin-3.onrender.com/uploads/" + req.file.filename;
//     }

//     const updated = await Product.findByIdAndUpdate(
//       req.params.id,
//       data,
//       { new: true }
//     );

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });



// r.delete("/:id", auth, async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ msg: "deleted" });
// });


// module.exports = r;










const r = require("express").Router();
const Product = require("../models/Productmodel");
const auth = require("../middlewares/authmiddleware");
const upload = require("../middlewares/upload");

/* ================= CREATE PRODUCT ================= */

r.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, price, description, category } = req.body;

    if (!title || !price) {
      return res.status(400).json({
        msg: "Title and price are required"
      });
    }

    const imageUrl = req.file
      ? `${process.env.BASE_URL}/uploads/${req.file.filename}`
      : "";

    const product = await Product.create({
      title: title.trim(),
      price: Number(price),
      description: description || "",
      category: category || "general",
      image: imageUrl
    });

    res.status(201).json(product);

  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    res.status(500).json({ msg: "Create failed" });
  }
});


/* ================= LIST PRODUCTS ================= */

r.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    const filter =
      category && category !== "all"
        ? { category }
        : {};

    const list = await Product
      .find(filter)
      .sort({ createdAt: -1 });

    res.json(list);

  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err);
    res.status(500).json({ msg: "Fetch failed" });
  }
});


/* ================= UPDATE PRODUCT ================= */

r.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, price, description, category } = req.body;

    const data = {
      title,
      price: Number(price),
      description,
      category
    };

    if (req.file) {
      data.image = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json(updated);

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ msg: "Update failed" });
  }
});


/* ================= DELETE PRODUCT ================= */

r.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!deleted) {
      return res.status(404).json({
        msg: "Product not found"
      });
    }

    res.json({ msg: "deleted" });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ msg: "Delete failed" });
  }
});

module.exports = r;
