import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";

import User from "../models/Users.js";
import users from "./user.seed.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

mongoose.connect(process.env.MONGO_URI);

const seedUsers = async () => {
  try {
    await User.deleteMany();

    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    await User.insertMany(hashedUsers);

    console.log("Users seeded successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
};

seedUsers();