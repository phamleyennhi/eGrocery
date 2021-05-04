const mongoose = require("mongoose");

const Feedback = mongoose.model(
  "Feedback",
  new mongoose.Schema({
    name: String,
    email: String,
    message: String
  })
);

module.exports = Feedback;
