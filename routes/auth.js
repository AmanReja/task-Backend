const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  checkauth,
  logout
} = require("../controllers/auth_controller");
const { assign } = require("../controllers/assignment_controller");
const { secureRoutes } = require("../middleware/secureRoutes");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/assign", secureRoutes, assign);
router.get("/checkauth", secureRoutes, checkauth);

module.exports = router;
