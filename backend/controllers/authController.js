const jwt = require("jsonwebtoken");
const md5 = require("md5");
const express = require("express");
// const { validationResult } = require('express-validator');
const db = require("../db/config.js");
const util = require('util');
const dbQuery = util.promisify(db.query);
// const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json()); // Parse JSON request bodies
// app.use(cookieParser());

const {check, validationResult} = require('express-validator');
// const {cookie} = require("express/lib/response");
//
// SCHIMBAT CATRE LOGIN -USER
//
exports.register_user = [// ... Validation rules ...
    check('email').isEmail().normalizeEmail(),
    check('password').isLength({min: 6}),

    async (req, res, next) => {
        try {
            // ... Validation and hashing ...

            const email = req.body.email;
            const password = req.body.password;
            const hashedPassword = md5(password.toString());
            // Check if email exists
            const checkEmailQuery = `SELECT email
                                     FROM users
                                     WHERE email = ?`;
            const checkEmailResult = await dbQuery(checkEmailQuery, [email]);
            console.log('query', checkEmailQuery)
            console.log('result', checkEmailResult)
            if (checkEmailResult.length > 0) {
                return res.status(400).json({message: "Email address is in use, please try a different one"});
            }

            // Insert user
            const insertUserQuery = `INSERT INTO users (email, password)
                                     VALUES (?, ?)`;
            await dbQuery(insertUserQuery, [email, hashedPassword]);

            // Generate token and respond
            const token = jwt.sign({data: email}, "secret");
            return res.status(200).json({message: "You have successfully registered.", token});


        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({error: 'Server error'});
        }
    }];

loginUser = async (params) => {
    // console.log('auth controller : ', params)
    // const { error } = loginValidation(params);
    // if (error) throw { message: error.details[0].message, statusCode: 400 };

    const {email, password} = params;
    // console.log('loginUser params', email);
    // console.log('loginUser params', password);
    const hashedPassword = md5(password.toString());

    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, hashedPassword], (err, result) => {
            // console.log('result auth service', result)
            // console.log('err auth service', err)
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
                // console.log('result from login : ', result)
                const {id, email} = result;
                // console.log('id : ', id);
                // console.log('email : ', email);
                const token = jwt.sign({data: result}, "secret");
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
    // console.log('login_user auth controller query : ', req.query)
    // console.log('req login_user', email);
    // console.log('req login_user', password);
    console.log('req body login_user', req.headers);
    loginUser({email, password})
        .then((result) => {
            console.log('login_user ', result);
            const {statusCode = 200, message, data, token} = result;
            res.status(statusCode).send({message, data, token});
        })
        .catch((err) => {
            const {statusCode = 400, message, data} = err;
            res.status(statusCode).send({message, data}) && next(err);
        });
    // res.status(200).send({ message: 'received' });
};



