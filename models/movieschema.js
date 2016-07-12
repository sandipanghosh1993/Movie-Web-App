var mongoose = require("mongoose");
var MovieDetailsSchema = mongoose.Schema({
  title: String,
  year: String,
  rated: String,
  released: String,
  runtime: String
});

module.exports = mongoose.model("moviedetails", MovieDetailsSchema);
