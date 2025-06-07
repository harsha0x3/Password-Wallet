const mongoose = require("mongoose");

const connectDB = (uri) => {
  console.log("Connecting to DB....");
  return mongoose.connect(uri);
};

module.exports = connectDB;
