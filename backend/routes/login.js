const jwt = require("jsonwebtoken");
const md5 = require("md5");
const express = require("express");
// const { validationResult } = require('express-validator');
const db = require("../db/config.js");
// const util = require('util');
// const dbQuery = util.promisify(db.query);
const router = express.Router();
const secret = process.env.SECRET;

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
            const {id, email} = result[0];
            // // FIXME for linux
            // /*no httpOnly: true because there were problems in fronted */
            // res.cookie('jwtToken', token, {  path: '/', domain: 'localhost', secure: false, maxAge: 3600000 })
            //     .header("X-Access-Token", token);
            // // TODO schimbat cu newObjSecurity
            // res.send({
            //     message: "Logged in successfully login route", data: result, token
            // });
            // ====================

            try {
                const token = jwt.sign({ data: result }, secret);

                res.cookie('jwtToken', token, { path: '/', domain: 'localhost', secure: false, maxAge: 3600000 })
                    .header("X-Access-Token", token);
                res.send({
                    message: "Logged in successfully login route", data: result, token
                });
            } catch (error) {
                console.error('JWT signing error:', error.message);
                res.status(500).send({ message: 'Internal Server Error' });
            }

        }
    });
});

module.exports = router;
