import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import User from "../models/User.js";
import users from "./user.seed.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});


console.log("MONGO_URI =", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI);

const seedUsers = async () => {
  await User.deleteMany();
  const created = await User.insertMany(users);
  console.log("USER ID:", created[0]._id.toString());
  mongoose.connection.close();
};

seedUsers();
