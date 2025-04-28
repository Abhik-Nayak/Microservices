const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token)

    if (!token) {
      return res.status(401).json({ status: "fail", message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)

    req.user = await User.findById(decoded.id).select("-password");
    console.log("user",req.user)

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ status: "fail", message: "Not authorized" });
  }
};
module.exports = protect;
