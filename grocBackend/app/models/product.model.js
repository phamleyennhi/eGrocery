const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: String,
    stock: Number,
    price: Number,
    shortDesc: String,
    description: String,
    subcategory: String,
    featured: Number,
    category: String,
    url: String
  })
);

module.exports = Product;
