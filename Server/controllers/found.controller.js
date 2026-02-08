import Found from "../models/Found.js";

export const getAllFound = async (req, res) => {
  try {
    const foundItems = await Found.find()
      .populate("foundBy", "name email");

    res.status(200).json(foundItems);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch found items" });
  }
};
