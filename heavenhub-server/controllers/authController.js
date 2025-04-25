const User = require("../models/User");
const axios = require('axios');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { oauth2Client } = require("../utils/googleClient");
const { sendResponse, sendError } = require("../utils/responseHandler");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Signup
exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const exist = await User.findOne({ email });
    if (exist) return sendError(res, 400, "Email already in use");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });

    const token = generateToken(user._id);
    return sendResponse(res, 201, "User registered successfully", {
      user,
      token,
    });
  } catch (err) {
    return sendError(res, 500, "Something went wrong");
  }
};

// Signin
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return sendError(res, 404, "User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendError(res, 401, "Invalid credentials");

    const token = generateToken(user._id);
    return sendResponse(res, 200, "User signed in successfully", {
      user,
      token,
    });
  } catch (err) {
    return sendError(res, 500, "Server error");
  }
};

// Google Sign-in
exports.googleSignIn = async (req, res) => {
  const { code } = req.body;

  try {
    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    const { email, name, picture,id } = userRes.data;
    if (!email) return sendError(res, 400, "No email found");
    
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email, picture, googleId: id });
    }

    const token = generateToken(user._id);

    return sendResponse(res, 200, 'Google login successful', { user, token });
  } catch (err) {
    console.error(err);
    return sendError(res, 500, "Server error");
  }
};
