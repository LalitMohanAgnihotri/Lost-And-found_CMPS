import Lost from "../models/Lost.js";

export const getAllLost = async (req, res) => {
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

    const lostItems = await Lost.find(query)
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(lostItems);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to fetch lost items"
    });

  }
};


export const reportLost = async (req, res) => {

  try {

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const lostItem = new Lost({
      item: req.body.item,
      description: req.body.description,
      location: req.body.location,
      contactEmail: req.body.contactEmail,
      reportedBy: req.user.id,
      image: req.file ? req.file.path : ""
    });

    const saved = await lostItem.save();

    res.status(201).json(saved);

  } catch (error) {

    console.error("REPORT LOST ERROR:", error);

    res.status(500).json({
      message: "Failed to report lost item",
      error: error.message
    });

  }

};