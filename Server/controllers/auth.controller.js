import User from "../models/Users.js";
import jwt from "jsonwebtoken";
import redis from "../config/redis.js";


import bcrypt from "bcryptjs";
import { sendMail } from "../config/mail.config.js";

// OTP generator
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// generate token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// REGISTER
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOtp();

    await redis.set(`otp:${email}`, otp, "EX", 300);

    await sendMail({
      to: email,
      subject: "Password Reset OTP",
      html: `<h3>Your OTP is: ${otp}</h3>`,
    });

    res.json({ message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const savedOtp = await redis.get(`otp:${email}`);

    if (!savedOtp || savedOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    res.json({ message: "OTP verified" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = password;
    await user.save();

    await redis.del(`otp:${email}`);

    res.json({ message: "Password reset successful" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};