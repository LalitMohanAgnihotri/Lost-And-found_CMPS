import dotenv from "dotenv";
dotenv.config();

const requiredEnv = [
  "PORT",
  "CLIENT_URLS",
  "EMAIL_PASS",
  "EMAIL_USER",
  "CLOUDINARY_API_SECRET",
  "CLOUDINARY_API_KEY",
  "CLOUD_NAME",
  "JWT_SECRET",
  "USER_ID",
  "REDIS_URL",
  "MONGO_URI",
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(
      `Missing required env: ${key}`
    );
  }
});

export const env = {
  PORT: process.env.PORT,
  CLIENT_URLS:
    process.env.CLIENT_URLS,
  JWT_SECRET:
    process.env.JWT_SECRET,
  MONGO_URI:
    process.env.MONGO_URI,
  USER_ID:
    process.env.USER_ID,
};