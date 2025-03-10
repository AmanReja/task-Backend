const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/auth_controller");
const { assign } = require("../controllers/assignment_controller");

router.post("/signup", signup);
router.post("/login", login);
router.post("/assign", assign);

module.exports = router;
