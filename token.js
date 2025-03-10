const dotenv = require("dotenv").config();

const jwt = require("jsonwebtoken");

const generateToken = (adminid, res) => {
  const token = jwt.sign({ adminid }, process.env.JWT_SECRAT, {
    expiresIn: "7d"
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "None",
    secure: true
  });

  return token;
};

module.exports = generateToken;
