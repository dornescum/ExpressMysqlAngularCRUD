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
    const nickname = req.body.nickname;
    const age = req.body.age;
    const hashedPassword = md5(password.toString());
    console.log(nickname)
    console.log(req.body)
    db.query(
        `SELECT email FROM users WHERE email = ?`,
        [email],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Server error' });
            }

            if (result.length > 0) {
                return res.status(400).json({
                    message: "Email address is in use, please try a different one",
                    statusCode: 400,
                });
            } else {
                db.query(
                    `INSERT INTO users (email, password, nickname, age) VALUES (?, ?, ?, ?)`,
                    [email, hashedPassword, nickname, age],
                    (err, result) => {
                        if (err) {
                            return res.status(400).json({
                                message: "Something went wrong, please try again",
                                statusCode: 400,
                                data: err,
                            });
                        } else {
                            const token = jwt.sign({ data: result }, "secret");
                            return res.status(200).json({
                                data: result,
                                message: "You have successfully registered.",
                                token: token,
                                statusCode: 200,
                            });
                        }
                    }
                );
            }
        }
    );
});



router.get("/", (req, res) => {
    const sql = "SELECT * FROM users";

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });
});

// router.post("/",
//     [check('email').isEmail().normalizeEmail(),
//         check('password').isLength({min: 6})],
//     async (req, res, next) => {
//
//
//     try {
//         // ... Validation and hashing ...
//
//         const email = req.body.email;
//         const password = req.body.password;
//         const hashedPassword = md5(password.toString());
//         console.log('E: ', email)
//         console.log('P : ', password)
//         // Check if email exists
//         const checkEmailQuery = `SELECT email
//                                  FROM users
//                                  WHERE email = ?`;
//         // const checkEmailResult = await dbQuery(checkEmailQuery, [email]);
//         // console.log('query', checkEmailQuery)
//         // console.log('result', checkEmailResult)
//         // if (checkEmailResult.length > 0) {
//         //     return res.status(400).json({message: "Email address is in use, please try a different one"});
//         // }
//
//         // Insert user
//         // const insertUserQuery = `INSERT INTO users (email, password)
//         //                          VALUES (?, ?)`;
//         // await dbQuery(insertUserQuery, [email, hashedPassword]);
//
//         // Generate token and respond
//         // const token = jwt.sign({data: email}, "secret");
//         // return res.status(200).json({message: "You have successfully registered.", token});
//
//
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({error: 'Server error'});
//     }
// });

module.exports = router;