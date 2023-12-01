const express = require("express");
const { getUser } = require("../controllers/user");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");

router.get("/", requireLogin, getUser);

module.exports = router;
