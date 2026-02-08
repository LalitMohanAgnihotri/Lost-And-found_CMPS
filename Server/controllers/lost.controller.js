import Lost from "../models/Lost.js";

export const getAllLost = async (req, res) => {
  try {
    const lostItems = await Lost.find()
      .populate("reportedBy", "name email"); // optional but useful

    res.status(200).json(lostItems);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lost items" });
  }
};
