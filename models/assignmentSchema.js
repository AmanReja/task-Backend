const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema(
  {
    goal: {
      type: String,
      required: true
    },
    course: {
      type: String,
      required: true
    },
    topic: {
      type: String,
      required: true
    },
    userId: {
      type: String,

      required: true
    },
    assignedBy: {
      type: String
    },
    assignedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const assignment = mongoose.model("Assignment", dataSchema);
module.exports = assignment;
