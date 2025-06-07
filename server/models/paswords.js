const mongoose = require("mongoose");

const PasswordSchema = new mongoose.Schema({
  account: {
    type: String,
    required: [true, "Enter the Account Name!"],
  },
  password: {
    type: String,
    required: [true, "Can't be empty"],
  },
});

module.exports = mongoose.model("Password", PasswordSchema);
