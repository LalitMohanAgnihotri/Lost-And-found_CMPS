import Found from "../models/Found.js";

export const getAllFound = async (req, res) => {
  try {

    const { search } = req.query;

    let query = {};

    if (search && search.trim() !== "") {
      query = {
        $or: [
          { item: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } }
        ]
      };
    }

    const foundItems = await Found.find(query)
      .populate("foundBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(foundItems);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to fetch found items"
    });

  }
};


export const reportFound = async (req, res) => {

  try {

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const foundItem = new Found({
      item: req.body.item,
      description: req.body.description,
      location: req.body.location,
      foundBy: req.user._id,
      image: req.file ? req.file.path : ""
    });

    const saved = await foundItem.save();

    res.status(201).json(saved);

  } catch (error) {

    console.error("REPORT FOUND ERROR:", error);

    res.status(500).json({
      message: "Failed to report found item",
      error: error.message
    });

  }

};