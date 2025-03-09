const bcryptjs = require("bcryptjs");
const Admin = require("../models/adminSchema");
const generateToken = require("../token");

const signup = async (req, res) => {
  const { adminemail, adminpass, adminimage, fullname, adminimageid } =
    req.body;
  try {
    const admin = await Admin.findOne({ adminemail });
    if (admin) {
      return res.status(400).json({ message: "admin already exeist" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedpass = await bcryptjs.hash(adminpass, salt);
    const newAdmin = new Admin({
      adminemail: adminemail,
      fullname: fullname,
      adminpass: hashedpass,

      adminimage: adminimage,
      adminimageid: adminimageid,
    });

    if (newAdmin) {
      generateToken(newAdmin._id, res);
      await newAdmin.save();
      res.status(201).json({
        id: newAdmin._id,
        adminemail: newAdmin.adminemail,

        adminimage: newAdmin.adminimage,
      });
    } else {
      res.status(400).json({ message: "invalid admin" });
    }
  } catch (error) {
    console.log("error in controller", error.message);

    res.status(500).json({ message: "internal server error" });
  }
};
const login = async (req, res) => {
  const { adminemail, adminpass, adminimage, fullname, adminimageid } =
    req.body;

  try {
    const admin = await Admin.findOne({ adminemail });

    if (!admin) {
      return res.status(500).json({ message: "invalid credentials" });
    }

    const ispassCorrect = await bcryptjs.compare(adminpass, admin.adminpass);
    if (!ispassCorrect) {
      return res.status(500).json({ message: "invalid credentials" });
    }
    generateToken(admin._id, res);

    res.status(200).json({
      _id: admin._id,
      fullname: admin.fullname,
      adminemail: admin.adminemail,
      adminimage: admin.adminimage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login };
