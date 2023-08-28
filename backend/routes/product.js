'use strict'
const express = require("express");
const db = require("../db/config.js");
// const util = require('util');
const {check, validationResult} = require('express-validator');
// const {validateCookie} = require("../middllware/cookieValidation");
const jwt = require("jsonwebtoken");

const {getBrandType, getCategoryNr} = require('../utils/utils');
let sql;


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
    const {favorite, price, name, quantity, brand, category, text, uid, id} = req.body;
    // console.log('fav ', favorite);
    // console.log('brand ', brand);
    // console.log('category ', category);
    console.log('uid ', uid);
    console.log('id ', id);

    // FIXME make trigger for update codebar
    const brandNr = getBrandType(brand);
    const categoryNr = getCategoryNr(category);
    // console.log('category nr ', categoryNr);
    // Create codebar
    const codebar = `${favorite ? 1 : 0}${brandNr}${categoryNr}${new Date().toISOString()}${uid}`;

    // console.log('codebar ', codebar);
    const cleanedCodebar = codebar.replace(/[-:.ZT]/g, '');
    // console.log('cleanedCodebar', cleanedCodebar);

    sql = `INSERT INTO products(favorite, price, name, quantity, brand, category, text, uid, codebar) VALUES 
                            (?,?,?,?,?,?,?,?,?)`;
    db.query(sql, [favorite, price, name, quantity, brand, category, text, uid, cleanedCodebar], (err, result) => {
        // console.log('result add product ', result);
        // console.log('error add product ', err);
        if (err) {
            console.error(err.message);
            return res.status(500).json({
                message: "Something went wrong, please try again",
                statusCode: 500,
                data: err,
            });
        }
        // TODO pagination
        return res.status(200).json({
            message: "product response updated successfully",
        });
    });

    // return res.status(200).json({message: 'works '});
});

// product uid
router.get("/:uid",  (req, res) => {
    const token = req.headers['x-access-token'];
    // TODO create middleware for token
    console.log('TOKEN :', token)

    const uid = req.params.uid;
    const pid = req.params.pid;

    console.log('uid  :', uid)
    // console.log('pid  :', pid)
    if (!token) return res.status(401).send("No token provided.");

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) return res.status(403).send("Invalid token.");
        // res.status(200).send(products);
        sql = `SELECT * FROM products WHERE uid = ?`;
        db.query(sql,[uid], (err, result) => {
            console.log('result get product ', result);
            console.log('error get product ', err);
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: "Internal Server Error" });
            }
            else if(result.length < 1){
                res.status(204).json({ message: "No content" });
            }
            else {
                res.status(200).json(result);
            }
        });

    });
})



// product uid /pid
router.get("/:uid/:pid",  (req, res) => {
    const token = req.headers['x-access-token'];
    // TODO create middleware for token
    console.log('TOKEN :', token)

    const uid = req.params.uid;
    const pid = req.params.pid;

    console.log('uid  :', uid)
    console.log('pid  :', pid)
    if (!token) return res.status(401).send("No token provided.");

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) return res.status(403).send("Invalid token.");
        // res.status(200).send(products);
        sql = `SELECT * FROM products WHERE uid = ? AND id = ?`;
        db.query(sql,[uid, pid], (err, result) => {
            console.log('result get product ', result);
            console.log('error get product ', err);
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: "Internal Server Error" });
            }
           else if(result.length < 1){
                res.status(204).json({ message: "No content" });
            }
            else {
                res.status(200).json(result);
            }
        });

    });
})

module.exports = router;