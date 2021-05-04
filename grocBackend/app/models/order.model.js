const mongoose = require("mongoose");

const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
    date: { type: Date, default: Date.now },
    customer: {
    	firstName: String,
    	lastName: String,
    	email: String
    },
    address: String,
    address2: String,
    city: String,
    area: String,
    paymentMethod: String,
    card: {
    	name: String,
    	number: String,
    	exp: String,
    	cvv: Number
    },
    order: { type : Array , "default" : [] }
  })
);

module.exports = Order;
