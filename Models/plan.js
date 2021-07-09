const mongoose = require("mongoose");

const planScheme = mongoose.Schema({
  planName: String,
  planPrice: String,
  duration: Number,
  description: String,
  planId: String,
  active : Boolean,
});

module.exports = mongoose.model("plans", planScheme);
