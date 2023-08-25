const jwt = require("jsonwebtoken");
const md5 = require("md5");
const express = require("express");
// const { validationResult } = require('express-validator');
const db = require("../db/config.js");
const util = require('util');
const dbQuery = util.promisify(db.query);
const router = express.Router();

const app = express();

app.use(express.json()); // Parse JSON request bodies

const {check, validationResult} = require('express-validator');

router.post("/", [
    check('email').isEmail().normalizeEmail(),
    check('password').isLength({ min: 6 })
], (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = md5(password.toString());
    // console.log('email ', email);
    // console.log('pwd ', password);
    // console.log(nickname)
    console.log('r c:  ',req.headers);
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
            // console.log('id : ', id);
            // console.log('email : ', email);
            // const token = jwt.verify( result, "secret").toString();
            // console.log('token login : ', token);

            const token = jwt.sign({data: result}, "secret");
            console.log('token auth controller: ', token);

            // try {
            //     const decodedToken = jwt.verify(token, 'secret');
            //     // Handle the decoded token
            // } catch (error) {
            //     console.error('Token verification error:', error.message);
            //     // Handle the error
            // }

            // cookie('jwtToken', token, { httpOnly: true, maxAge: 90000 });
            res.cookie('jwtToken', token);
            // res.cookie('jwtToken', token);


            res.send({
                message: "Logged in successfully login route", data: result, token
            });
        }
    });
});

module.exports = router;