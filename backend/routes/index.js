const express = require("express");
const router = express.Router();

const authRoute = require("./auth");
// const usersRoute = require("./users");


router.use("/api/v1/auth", authRoute);
// router.use("/api/v1/users", usersRoute);

module.exports = router;
