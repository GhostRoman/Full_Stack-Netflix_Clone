import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Проверка обязательных полей
function validateFields(fields) {
  for (const [key, value] of Object.entries(fields)) {
    if (!value) {
      return { success: false, message: `${key} is required` };
    }
  }
  return { success: true };
}

// Регистрация пользователя
export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;

    const validation = validateFields({ email, password, username });
    if (!validation.success) return res.status(400).json(validation);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    if (await User.findOne({ email })) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    if (await User.findOne({ username })) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const PROFILE_PICS = [
      "/avatar1.png",
      "/avatar2.png",
      "/default-avatar.png",
    ];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      image,
    });
    await newUser.save();

    generateTokenAndSetCookie(newUser._id, res);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Confirm your email",
      html: `
        <h1>Welcome!</h1>
        <p>Please confirm your registration:</p>
        <a href="https://full-stack-netflix-clone.onrender.com/login">Confirm Email</a>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Confirmation email sent",
      user: { ...newUser._doc, password: undefined },
    });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Забыл пароль
export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    const validation = validateFields({ email });
    if (!validation.success) return res.status(400).json(validation);

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 3600000; // 1 час
    await user.save();

    const resetLink = `https://full-stack-netflix-clone.onrender.com/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `<p>Click the link to reset your password:</p> <a href="${resetLink}">Reset Password</a>`,
    });

    res.status(200).json({ success: true, message: "Reset link sent" });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Сброс пароля
export async function resetPassword(req, res) {
  try {
    const { password } = req.body;
    const { token } = req.params;

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({ resetToken: token });
    if (!user || Date.now() > user.resetTokenExpire) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    user.password = await bcryptjs.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Логин
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const validation = validateFields({ email, password });
    if (!validation.success) return res.status(400).json(validation);

    const user = await User.findOne({ email });
    if (!user || !(await bcryptjs.compare(password, user.password))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      success: true,
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Логаут
export function logout(req, res) {
  try {
    res.clearCookie("jwt-netflix", { httpOnly: true, secure: true });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Проверка аутентификации
export async function authCheck(req, res) {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.error("Error in authCheck:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
