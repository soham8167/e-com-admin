const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    image: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

   
    category: {
      type: String,
      required: true,
      lowercase: true,
      index: true
    },
   
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
