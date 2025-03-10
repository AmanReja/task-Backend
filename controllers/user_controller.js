const express = require("express");
const router = express.Router();
const userSchema = require("../models/userSchema");
const Assignment = require("../models/assignmentSchema");

router.post("/loginUser", async (req, res) => {
  const { useremail, userpass, fullname } = req.body;
  try {
    const data = await userSchema.find({
      useremail: useremail,
      userpass: userpass
    });
    res.status(200).send(data);
  } catch (error) {
    console.log("error in login router", error);

    res.status(500).json({ message: error.message });
  }
});

router.post("/signupUser", async (req, res) => {
  const { useremail, userpass, fullname } = req.body;

  const user = await userSchema.findOne({ useremail });

  if (user) {
    res.status(400).json("user already exist");
  }

  try {
    const data = new userSchema({
      useremail,
      userpass,
      fullname
    });

    const saveData = await data.save();
    res.status(200).json(saveData);
  } catch (error) {
    console.log("error in signup router", error);

    res.status(500).json({ message: error.message });
  }
});

router.get("/getAlluser", async (req, res) => {
  try {
    const data = await userSchema.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/assignments/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await Assignment.find({ userId: userId });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
