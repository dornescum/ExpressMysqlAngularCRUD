'use stric'
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const express = require("express");
const db = require("../db/config.js");
const util = require('util');
const dbQuery = util.promisify(db.query);

const secret = process.env.SECRET;

const app = express();

app.use(express.json());

const {check} = require('express-validator');
//
// SCHIMBAT CATRE LOGIN -USER
//
exports.register_user = [
    check('email').isEmail().normalizeEmail(),
    check('password').isLength({min: 6}),

    async (req, res, next) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const hashedPassword = md5(password.toString());

            const checkEmailQuery = `SELECT email
                                     FROM users
                                     WHERE email = ?`;
            const checkEmailResult = await dbQuery(checkEmailQuery, [email]);

            if (checkEmailResult.length > 0) {
                return res.status(400).json({message: "Email address is in use, please try a different one"});
            }

            // Insert user
            const insertUserQuery = `INSERT INTO users (email, password)
                                     VALUES (?, ?)`;
            await dbQuery(insertUserQuery, [email, hashedPassword]);

            // const token = jwt.sign({data: email}, "secret");
            const token = jwt.sign({data: email}, secret);
            return res.status(200).json({message: "You have successfully registered.", token});


        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({error: 'Server error'});
        }
    }];

loginUser = async (params) => {

    const {email, password} = params;

    const hashedPassword = md5(password.toString());

    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, hashedPassword], (err, result) => {

            if (err) {
                reject({
                    data: err, message: "Something went wrong, please try again", statusCode: 400,
                });
            }

            if (result.length === 0) {
                reject({
                    message: "Wrong credentials, please try again", statusCode: 400,
                });
            }

            if (result.length > 0) {
                const {id, email} = result;

                const token = jwt.sign({data: result}, secret);
                console.log('token auth controller: ', token);
                // cookie('jwtToken', token, { httpOnly: true, maxAge: 90000 });
                // result.cookie('jwtToken', token, { httpOnly: true, maxAge: 90000 });


                resolve({
                    message: "Logged in successfully auth controller", data: result, token
                });
            }
        });
    });
};

exports.login_user = async (req, res, next) => {
    const {email, password} = req.body;
    loginUser({email, password})
        .then((result) => {
            const {statusCode = 200, message, data, token} = result;
            res.status(statusCode).send({message, data, token});
        })
        .catch((err) => {
            const {statusCode = 400, message, data} = err;
            res.status(statusCode).send({message, data}) && next(err);
        });
};



