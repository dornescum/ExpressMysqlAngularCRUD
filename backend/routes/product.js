const express = require("express");
const db = require("../db/config.js");
// const util = require('util');
const {check, validationResult} = require('express-validator');
// const {validateCookie} = require("../middllware/cookieValidation");
const jwt = require("jsonwebtoken");


// function validateCookie(req, res, next){
//     // console.log('cookie');
//     console.log('cookie', req.cookies);
//
//     const {cookies} = req;
//     console.log('cookies', cookies);
//     next();
// }

let products = [];

const router = express.Router();

router.post("/:uid", [
    check('favorite').isBoolean(),
    check('name').isString(),
    check('quantity').isInt(),
    check('brand').isString(),
    check('category').isString(),
    check('text').isString(),
    check('uid').isInt(),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    const userId = req.body.uid;
    // console.log('rb : ', req.body);
    // console.log('uid : ', userId);
    // console.log('req : ', req);
    const obj = {
        favorite: req.body.favorite,
        price: req.body.price,
        name: req.body.name,
        quantity: req.body.quantity,
        brand: req.body.brand,
        category: req.body.category,
        text: req.body.text,
        uid: req.body.uid
    };
    // console.log('obj', obj)
    products.push(obj)
    // console.log('products :', products)
    return res.status(200).json({message: 'works '});
});

router.get("/",  (req, res) => {
    const token = req.headers['x-access-token'];
// TODO create middleware for token
    console.log('TOKEN :', token)
    // console.log('AUTH  :', req.headers)
    if (!token) return res.status(401).send("No token provided.");

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) return res.status(403).send("Invalid token.");
        res.status(200).send(products);
    });
})

module.exports = router;