const Assignment = require("../models/assignmentSchema");

const assign = async (req, res) => {
  const { goal, course, topic, userId, assignedBy } = req.body;

  try {
    const data = new Assignment({
      goal: goal,
      course: course,
      topic: topic,
      userId: userId,
      assignedBy: assignedBy
    });

    const savedata = await data.save();
    res.status(200).json(savedata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { assign };
