import mongoose from "mongoose";
const lostSchema = new mongoose.Schema({
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
  dateLost: {
    type: Date,
    default: Date.now
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  isResolved: {
    type: Boolean,
    default: false
  },
  image: {
    type: String, // seed: local image | later: Cloudinary URL
    default: ""
  }
}, { timestamps: true });

export default mongoose.model("Lost", lostSchema);