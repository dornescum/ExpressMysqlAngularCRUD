'use strict'
const express = require("express");
const db = require("../db/config.js");
// const util = require('util');
const {check, validationResult} = require('express-validator');
// const {validateCookie} = require("../middllware/cookieValidation");
const jwt = require("jsonwebtoken");

// const {getBrandType, getCategoryNr} = require('../utils/utils');
let sql;



const router = express.Router();



// search value
router.get("/:uid",  (req, res) => {
    const token = req.headers['x-access-token'];
    const uid = req.params.uid;
    const Q = req.query.q;

    if (!token) return res.status(401).send("No token provided.");

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) return res.status(403).send("Invalid token.");

        sql = `SELECT * FROM products
               WHERE  products.name LIKE  ? AND uid = ?`;
        db.query(sql,[Q + '%', uid], (err, result) => {

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