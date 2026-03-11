import mongoose from "mongoose";
import dotenv from "dotenv";

import Lost from "../models/Lost.js";
import Found from "../models/Found.js";

import sampleLost from "./lost.seed.js";
import sampleFound from "./found.seed.js";

dotenv.config({ path: "../.env" });

const seedAll = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Clear old data
    await Lost.deleteMany();
    await Found.deleteMany();

    // Insert new data
    await Lost.insertMany(sampleLost);
    await Found.insertMany(sampleFound);

    console.log("Lost & Found data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedAll();
