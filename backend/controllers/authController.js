const jwt = require("jsonwebtoken");
const md5 = require("md5");
const express = require("express");
// const { validationResult } = require('express-validator');
const db = require("../db/config.js");
const util = require('util');
const dbQuery = util.promisify(db.query);

const app = express();

app.use(express.json()); // Parse JSON request bodies

const {check, validationResult} = require('express-validator');


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
    console.log('loginUser params', email);
    console.log('loginUser params', password);
    const hashedPassword = md5(password.toString());

    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, hashedPassword], (err, result) => {
            console.log('result auth service', result)
            console.log('err auth service', err)
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
                console.log('result from login : ', result)
                const {id, email} = result;
                console.log('id : ', id);
                console.log('email : ', email);
                const token = jwt.sign({data: result}, "secret");
                resolve({
                    message: "Logged in successfully", data: result, token,
                });
            }
        });
    });
};


// exports.registerUser = async (params) => {
//   // console.log('PARAMS 1:', params)
//   // console.log('click from auth service resgister user')
//   const { error } = registerValidation(params);
//   if (error) throw { message: error.details[0].message, statusCode: 400 };
//   console.log('error : ', error)
//   const { fullName, email, password, card_number, csv, card_name, role } = params;
//   // console.log('PARAMS 2:', password)
//   const hashedPassword = md5(password.toString());
//   // console.log('AUTHSERVICE B :', fullName, email, password, card_number, csv, card_name)
//   // console.log('PARAMS3:', params)
//   return new Promise((resolve, reject) => {
//     //TODO check if dql.all
//     db.all(
//       `SELECT email FROM users WHERE email = ?`,
//       [email],
//       (err, result) => {
//         if (result.length > 0) {
//           reject({
//             message: "Email address is in use, please try a different one",
//             statusCode: 400,
//           });
//         } else if (result.length === 0) {
//           // console.log('test')
//           // console.log('AUTHSERVICE else if:', fullName, email, password, hashedPassword, card_number, csv, card_name)
//
//           db.all(
//             `INSERT INTO users (fname, email, password, card_number, csv, card_name) VALUES (?,?,?,?,?,?)`,
//             [fullName, email, hashedPassword, card_number,csv, card_name],
//             (err, result) => {
//               console.log(err)
//               if (err) {
//                 reject({
//                   message: "Something went wrong, please try again",
//                   statusCode: 400,
//                   data: err,
//                 });
//               } else {
//                 console.log('authService else:', fullName, email, password, card_number, csv, card_name)
//                 console.log('result: register', result)
//                 const token = jwt.sign({ data: result }, "secret");
//                 resolve({
//                   data: result,
//                   message: "You have successfully registered.",
//                   token: token,
//                   statusCode: 200,
//                 });
//               }
//             }
//           );
//         }
//       }
//     );
//   });
// };


exports.login_user = async (req, res, next) => {
    const {email, password} = req.body;
    console.log('login_user auth controller : ', req.query)
    console.log('req login_user', email);
    console.log('req login_user', password);
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

// exports.register_user = async (req, res, next) => {
//   const { fullName, email, password, card_number, csv, card_name } = req.body;
//     // console.log('CSV register user ', fullName)
//   registerUser({ fullName, email, password, card_number, csv , card_name})
//     .then((result) => {
//         console.log('r1',  result)
//       const { statusCode = 200, message, data, token } = result;
//         // console.log('result register', result)
//       res.status(statusCode).send({ message, data, token });
//     })
//     .catch((err) => {
//       const { statusCode = 400, message, data } = err;
//         // console.log('status code',statusCode)
//         // console.log('message', message)
//         // console.log('data', data)
//         // console.log('err : ', err)
//       res.status(statusCode).send({ message, data }) && next(err);
//     });
// };

// exports.register_user = [
//     // Add your validation rules here
//     check('email').isEmail().normalizeEmail(),
//     check('password').isLength({ min: 6 }),
//
//     async (req, res, next) => {
//         // Handle validation errors
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         //
//         console.log('req', req.body)
//             const email = req.body.email;
//             const password = req.body.password;
//
//         const hashedPassword = md5(password.toString());
//         // try {
//         //     // Access the email variable from the request body
//         //     const email = req.body.email;
//         //     const password = req.body.password;
//         //
//         //     // Perform further processing using email and password
//         //     console.log('email:', email);
//         //     console.log('password:', password);
//         //
//         //     // ... Other logic ...
//         //
//         //     res.status(200).json({ message: 'Registration successful' });
//         // } catch (error) {
//         //     console.error('Error:', error);
//         //     res.status(500).json({ error: 'Server error' });
//         // }
//
//         return new Promise((resolve, reject) => {
//             console.log('email', email)
//
//             db.query(
//                 `SELECT email FROM users WHERE email = ?`,
//                 [email],
//                 (err, result) => {
//                     console.log('RESULT', result)
//                     if (result.length > 0) {
//                         reject({
//                             message: "Email address is in use, please try a different one",
//                             statusCode: 400,
//                         });
//                     } else if (result.length === 0) {
//                         // console.log('test')
//
//                         db.query(
//                             `INSERT INTO users ( email, password) VALUES (?,?)`,
//                             [ email, hashedPassword],
//                             (err, result) => {
//                                 console.log(err)
//                                 if (err) {
//                                     reject({
//                                         message: "Something went wrong, please try again",
//                                         statusCode: 400,
//                                         data: err,
//                                     });
//                                 } else {
//                                     console.log('authService else:',  email, password)
//                                     console.log('result: register', result)
//                                     const token = jwt.sign({ data: result }, "secret");
//                                     resolve({
//                                         data: result,
//                                         message: "You have successfully registered.",
//                                         token: token,
//                                         statusCode: 200,
//                                     });
//                                 }
//                             }
//                         );
//                     }
//                 }
//             );
//         });
//     }
// ];


