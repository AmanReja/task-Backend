const jwt = require("jsonwebtoken");
const Admin = require("../models/adminSchema");
const dotenv = require("dotenv").config();

const secureRoutes = async (req, res, next) => {
  let token = req.cookies.jwt; // First try getting from cookies

  // If the token is not found in cookies, check the Authorization header
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(403).json({ message: "Unauthorized: Invalid token" });
    }

    const admin = await Admin.findById(decoded.adminid).select("-adminpass");

    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.log("Error in secureRoutes middleware:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { secureRoutes };
