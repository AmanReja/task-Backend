const dotenv = require("dotenv").config();

const jwt = require("jsonwebtoken");

const generateToken = (adminid, res) => {
  const token = jwt.sign({ adminid }, process.env.JWT_SECRAT, {
    expiresIn: "7d"
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // ✅ Secure in production
    sameSite: "strict" // ✅ Prevents CSRF attacks
  });

  return token;
};

module.exports = generateToken;
