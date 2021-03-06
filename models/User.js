const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  email: { type: String, required: true },

  created: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("users", userSchema);
