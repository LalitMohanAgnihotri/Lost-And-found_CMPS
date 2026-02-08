import mongoose from "mongoose";

const foundSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    required: true
  },
  dateFound: {
    type: Date,
    default: Date.now
  },
  foundBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  isResolved: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: ""
  }
}, { timestamps: true });

export default mongoose.model("Found", foundSchema);