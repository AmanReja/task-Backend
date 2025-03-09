const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    adminemail: { type: String, required: true },
    adminpass: { type: String, required: true },
    adminimage: { type: String },
    fullname: { type: String, required: true },
    adminimageid: { type: String },
  },
  { timestamps: true }
);

const admin = mongoose.model("Admin", dataSchema);
module.exports = admin;
