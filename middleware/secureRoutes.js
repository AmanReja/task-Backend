const jwt = require("jsonwebtoken");
const Admin = require("../models/adminSchema");
const dotenv = require("dotenv").config();

const secureRoutes = async (req, res, next) => {
  const token = req.cookies.jwt;

  console.log(8, dotenv);

  if (!token) {
    return res.status(401).json({ message: "Don't have any token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRAT);

    if (!decoded) {
      return res.status(403).json({ message: "unauthorized Invalid token" });
    }

    const admin = await Admin.findById(decoded.adminid).select("-adminpass");

    if (!admin) {
      return res.status(405).json({ message: " user not found" });
    }
    req.admin = admin;
    next();
  } catch (error) {
    console.log("error in sucure rout middleware", error.message);

    return res.status(500).json({ message: "internalServer error" });
  }
};

module.exports = { secureRoutes };
