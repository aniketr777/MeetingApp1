const jwt = require("jsonwebtoken");
const User = require("../Models/userModel"); // Adjust the path to your User model

const authMiddleware = async (req, res, next) => {
  try {
    // Ensure cookies exist
    if (!req.cookies || !req.cookies.token) {
      return res
        .status(401)
        .json({ error: "No token provided, authorization denied" });
    }

    // Get token from cookies
    const token = req.cookies.token;

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Find the user from the token's payload
    const user = await User.findById(decoded.id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach user to the request object
    req.user = user;
    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error("Auth middleware error:", error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token expired, please log in again" });
    }
    res.status(401).json({ error: "Invalid token, authorization denied" });
  }
};

module.exports = authMiddleware;
