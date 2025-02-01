const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
  password: { type: String, select: false },
  marketingAccept: { type: Boolean, required: true, default: false },
  role: { type: String, required: true, default: "user" },
  createdAt: { type: Date, default: Date.now },
  image: { type: String, required: true, default: "/bear.png" },
  githubProviderId: { type: String, required: false },
  googleProviderId: { type: String, required: false },
});

module.exports = mongoose.models?.User || mongoose.model("User", UserSchema);
