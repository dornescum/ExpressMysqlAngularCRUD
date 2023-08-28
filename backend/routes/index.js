const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const productLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 100 requests per windowMs
});

const authRoute = require("./auth");
const register = require('./register');
const login = require('./login');
const modules = require('./modules');
const ionic = require('./ionic-app');
const product= require('./product');
// const usersRoute = require("./users");


router.use("/api/v1/auth", authRoute);
router.use("/api/v1/register", register);
router.use("/api/v1/login-user", login);
router.use("/api/v1/modules", modules);
router.use("/api/v1/ionic-app", ionic);
router.use("/api/v2/product", productLimiter, product)
// router.use("/api/v1/users", usersRoute);

module.exports = router;
