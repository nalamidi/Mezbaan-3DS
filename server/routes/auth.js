const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Auth = require("../controllers/auth");

router.post("/users", Auth.signup);
router.post("/auth", Auth.signin);

module.exports = router;
