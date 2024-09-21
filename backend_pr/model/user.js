const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  lastCheckTime: { type: Date, required: false },
});

const User = model("User", userSchema);

module.exports = User;
