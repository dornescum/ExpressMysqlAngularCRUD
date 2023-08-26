const jwt = require("jsonwebtoken");
const md5 = require("md5");
const express = require("express");
// const { validationResult } = require('express-validator');
const db = require("../db/config.js");
// const util = require('util');
// const dbQuery = util.promisify(db.query);
const router = express.Router();

const app = express();

app.use(express.json()); // Parse JSON request bodies

const {check, validationResult} = require('express-validator');

router.post("/", [
    check('email').isEmail().normalizeEmail(),
    check('password').isLength({ min: 6 })
], (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // If there are validation errors, return them as a response
        return res.status(422).json({ errors: errors.array() });
    }

    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = md5(password.toString());

    db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, hashedPassword], (err, result) => {
        // console.log('result login service', result)
        // console.log('err login service', err)
        if (err) {
            res.send({
                data: err, message: "Something went wrong, please try again", statusCode: 400,
            });
        }

        if (result.length === 0) {
            res.send({
                message: "Wrong credentials, please try again", statusCode: 400,
            });
        }

        if (result.length > 0) {
            // console.log('result from login : ', result)
            const {id, email} = result;
            const token = jwt.sign({data: result}, "secret");
            // console.log('token auth controller: ', token);

            res.cookie('jwtToken', token, { httpOnly: true, path: '/', domain: 'localhost', secure: false, maxAge: 600000 })
                .header("X-Access-Token", token);

            res.send({
                message: "Logged in successfully login route", data: result, token
            });
        }
    });
});

module.exports = router;
// for products
// try {
//     const decodedToken = jwt.verify(token, 'secret');
//     // Handle the decoded token
// } catch (error) {
//     console.error('Token verification error:', error.message);
//     // Handle the error
// }