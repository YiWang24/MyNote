import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, select:false},
  marketingAccept: { type: Boolean, required: true, default: false },
  role: { type: String, required: true, default: "user" },
  createdAt: { type: Date, default: Date.now },
  image: { type: String, required: true, default: "/bear.png" },
  githubProviderId: { type: String, required: false },
  googleProviderId: { type: String, required: false },
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
