const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
  type: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
categorySchema.index({ type: 1, userId: 1 }, { unique: true });
module.exports = mongoose.model("Category", categorySchema);
