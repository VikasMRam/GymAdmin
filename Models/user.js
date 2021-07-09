const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  phone: String,
  email: String,
  gender : String,
  age: Number,
  weight: Number,
  height: Number,
  additionalDetails: String,
  membershipDetails : Array,
  userId : String,
  dob: Number,
});

module.exports = mongoose.model("users", userScheme);
