const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUsers,
} = require("../controllers/authController");

const {protect} = require('../middleware/authMiddleware.js')
const {admin} = require('../middleware/adminMiddleware.js')


router.post("/register", register);
router.post("/login", login);
router.get("/users", protect , admin , getUsers);
  
module.exports = router;