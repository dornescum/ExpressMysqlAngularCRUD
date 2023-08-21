const express = require("express");
const router = express.Router();

const authRoute = require("./auth");
const register = require('./register');
const modules = require('./modules');
// const usersRoute = require("./users");


router.use("/api/v1/auth", authRoute);
router.use("/api/v1/register", register);
router.use("/api/v1/modules", modules);
// router.use("/api/v1/users", usersRoute);

module.exports = router;
