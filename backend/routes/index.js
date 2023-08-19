const express = require("express");
const router = express.Router();

const authRoute = require("./auth");
const register = require('./register')
// const usersRoute = require("./users");


router.use("/api/v1/auth", authRoute);
router.use("/api/v1/register", register);
// router.use("/api/v1/users", usersRoute);

module.exports = router;
