import mongoose from "mongoose";
import Lost from "../models/Lost.js";
import users from "./user.seed.js";

const sampleLost = [
  {
    item: "Keys",
    description: "A set of keys on a blue lanyard",
    location: "Parking Lot A",
    dateLost: new Date("2025-09-02T10:00:00Z"),
    reportedBy: "69870c9096f3a87ba44f5961",
    contactEmail: "user1@example.com",
    isResolved: false,
    image: "/images/key.jpg"
  },
  {
    item: "Laptop",
    description: "Dell XPS 13, silver, in a black sleeve",
    location: "Cafeteria",
    dateLost: new Date("2025-09-05T15:00:00Z"),
    reportedBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d67258d"),
    contactEmail: "user2@example.com",
    isResolved: false,
    image: "/images/laptop.jpg"
  },
  {
    item: "Backpack",
    description: "Black backpack with a University logo",
    location: "Lecture Hall 202",
    dateLost: new Date("2025-09-08T09:30:00Z"),
    reportedBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d672590"),
    contactEmail: "user3@example.com",
    isResolved: true,
    image: "/images/bagB.jpg"
  },
  {
    item: "Textbook",
    description: "Calculus textbook, fifth edition, with a blue cover",
    location: "Library",
    dateLost: new Date("2025-09-09T18:00:00Z"),
    reportedBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d672591"),
    contactEmail: "user4@example.com",
    isResolved: false,
    image: "/images/textb.jpg"
  },
  {
    item: "Phone",
    description: "Silver iPhone 12 Pro, cracked screen",
    location: "Gym",
    dateLost: new Date("2025-09-04T13:00:00Z"),
    reportedBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d672592"),
    contactEmail: "user5@example.com",
    isResolved: true,
    image: "/images/phoneB.jpg"
  },
  {
    item: "Umbrella",
    description: "Black umbrella, automatic open/close",
    location: "Bus Stop",
    dateLost: new Date("2025-09-03T17:30:00Z"),
    reportedBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d672593"),
    contactEmail: "user6@example.com",
    isResolved: false,
    image: "/images/UmbB.jpg"
  },
  {
    item: "Jacket",
    description: "Green Patagonia fleece jacket, size medium",
    location: "Student Union",
    dateLost: new Date("2025-09-07T11:00:00Z"),
    reportedBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d672594"),
    contactEmail: "user7@example.com",
    isResolved: false,
    image: "/images/jaket.jpg"
  },
  {
    item: "Watch",
    description: "Silver Apple Watch with a white band",
    location: "Locker Room",
    dateLost: new Date("2025-09-09T08:00:00Z"),
    reportedBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d672595"),
    contactEmail: "user8@example.com",
    isResolved: false,
    image: "/images/watch.webp"
  },
  {
    item: "Wallet",
    description: "Black wallet, with a Batman logo",
    location: "Cafeteria",
    dateLost: new Date("2025-09-01T14:30:00Z"),
    reportedBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d672596"),
    contactEmail: "user9@example.com",
    isResolved: false,
    image: "/images/walletB.jpg"
  },
  {
    item: "AirPods",
    description: "White Apple AirPods in their charging case",
    location: "Gym",
    dateLost: new Date("2025-09-10T15:20:00Z"),
    reportedBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d67259a"),
    contactEmail: "user10@example.com",
    isResolved: false,
    image: "/images/airp.webp"
  },
  {
    item: "Notebook",
    description: "Spiral-bound notebook, college-ruled paper",
    location: "Cafeteria",
    dateLost: new Date("2025-09-10T12:00:00Z"),
    reportedBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d67259b"),
    contactEmail: "user11@example.com",
    isResolved: false,
    image: "/images/noteb.jpg"
  },
  {
    item: "Pencil Case",
    description: "Clear plastic pencil case with a red zipper",
    location: "Art Studio",
    dateLost: new Date("2025-09-09T10:00:00Z"),
    reportedBy: new mongoose.Types.ObjectId("65d648f86f8a427f8d67259c"),
    contactEmail: "user12@example.com",
    isResolved: true,
    image: "/images/pancil.jpg"
  }
];

export default sampleLost;