const mongoose = require("mongoose");

const membershipScheme = mongoose.Schema({
  planId: String,
  totalAmount: Number,
  startDate: Number,
  endDate: Number,
  amountPaid: Number,
  userId: String,
  membershipId : String
});

module.exports = mongoose.model("membership", membershipScheme);
