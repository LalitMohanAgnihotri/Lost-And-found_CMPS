import mongoose from "mongoose";
import Found from "../models/Found.js";
import users from "./user.seed.js";

const sampleFound = [
  {
    item: "Wallet",
    description: "Brown leather wallet with student ID inside",
    location: "Cafeteria",
    dateFound: new Date("2025-09-01T12:30:00Z"),
    foundBy: "69870c9096f3a87ba44f5961",
    isResolved: true,
    image: "/images/walletB.jpg"
  },
  {
    item: "Headphones",
    description: "White wireless headphones",
    location: "Lecture Hall 101",
    dateFound: new Date("2025-09-07T09:15:00Z"),
    foundBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d67258c"),
    isResolved: false,
    image: "/images/headp.jpg"
  },
  {
    item: "Water Bottle",
    description: "Stainless steel water bottle with stickers",
    location: "Gym",
    dateFound: new Date("2025-09-04T11:00:00Z"),
    foundBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d67258e"),
    isResolved: true,
    image: "/images/bottel.jpg"
  },
  {
    item: "Sunglasses",
    description: "Black Ray-Ban sunglasses",
    location: "Campus Quad",
    dateFound: new Date("2025-09-06T13:30:00Z"),
    foundBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d67258f"),
    isResolved: false,
    image: "/images/sung.webp"
  },
  {
    item: "ID Card",
    description: "Student ID card for John Doe",
    location: "Dorm Hallway",
    dateFound: new Date("2025-09-08T08:00:00Z"),
    foundBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d672592"),
    isResolved: true,
    image: "/images/idc.jpg"
  },
  {
    item: "Ring",
    description: "Silver ring with a small blue stone",
    location: "Restroom near the gym",
    dateFound: new Date("2025-08-29T19:00:00Z"),
    foundBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d672593"),
    isResolved: false,
    image: "/images/ring.webp"
  },
  {
    item: "Gloves",
    description: "Pair of black knitted gloves",
    location: "Bus Stop",
    dateFound: new Date("2025-09-03T07:30:00Z"),
    foundBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d672594"),
    isResolved: false,
    image: "/images/gloves.jpg"
  },
  {
    item: "Camera",
    description: "Canon DSLR camera with a standard lens",
    location: "Photography Studio",
    dateFound: new Date("2025-09-06T10:00:00Z"),
    foundBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d672595"),
    isResolved: false,
    image: "/images/cammra.jpg"
  },
  {
    item: "Diary",
    description: "A small red diary with a lock",
    location: "Park bench",
    dateFound: new Date("2025-09-08T14:00:00Z"),
    foundBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d672596"),
    isResolved: false,
    image: "/images/dairy.jpg"
  },
  {
    item: "Backpack",
    description: "Blue backpack with a laptop inside",
    location: "Library Reading Room",
    dateFound: new Date("2025-09-09T16:45:00Z"),
    foundBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d672597"),
    isResolved: false,
    image: "/images/bagB.jpg"
  },
  {
    item: "Phone",
    description: "Black iPhone 13 in a clear case",
    location: "Computer Lab",
    dateFound: new Date("2025-09-10T10:00:00Z"),
    foundBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d672598"),
    isResolved: false,
    image: "/images/phoneB.jpg"
  },
  {
    item: "Umbrella",
    description: "Red umbrella with a floral pattern",
    location: "Main Entrance",
    dateFound: new Date("2025-09-10T11:15:00Z"),
    foundBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d672599"),
    isResolved: true,
    image: "/images/UmbB.jpg"
  }
];

export default sampleFound;