'use strict'
const express = require("express");
const db = require("../db/config.js");
// const util = require('util');
const {check, validationResult} = require('express-validator');
// const {validateCookie} = require("../middllware/cookieValidation");
const jwt = require("jsonwebtoken");

const {getBrandType, getCategoryNr} = require('../utils/utils');
let sql;


let products = [];

const router = express.Router();



// search value
router.get("/:uid",  (req, res) => {
    const token = req.headers['x-access-token'];
    console.log('TOKEN :', token)



    const uid = req.params.uid;
    const pid = req.params.pid;
    const Q = req.query.q;  // changed from req.params.q to req.query.name


    console.log('uid  :', uid)
    console.log('pid  :', pid)
    console.log('Q  :', Q)
    console.log('req   :', req.body)
    if (!token) return res.status(401).send("No token provided.");

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) return res.status(403).send("Invalid token.");
        // res.status(200).send(products);
        // sql = `SELECT * FROM products WHERE uid = ?`;
        sql = `SELECT * FROM products
               WHERE products.name = ?`;
        db.query(sql,[Q], (err, result) => {
            console.log('result get products for uid', result);
            // console.log('error get product ', err);
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


    // res.status(200).json('question ');

})

module.exports = router;