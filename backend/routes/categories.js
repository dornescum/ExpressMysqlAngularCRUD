'use strict'
const express = require("express");
const db = require("../db/config.js");
const router = express.Router();

router.get("/",  (req, res) => {

    const sql = `SELECT * FROM categories `;
    db.query(sql, (err, result) => {
            // console.log('result categories ', result);
            // console.log('error get product ', err);
            if (err) {
                console.error(err?.message);
                res.status(500).json({error: "Internal Server Error"});
            } else if (result.length < 1) {
                res.status(204).json({message: "No content"});
            } else {
                res.status(200).json(result);
            }
        })
    // console.log('click')
    // res.status(200).json('works');
})


module.exports = router;