'use strict'
const express = require("express");
const db = require("../db/config.js");
const router = express.Router();

const app = express();

app.use(express.json());


// const db = require("../db/config");
router.get("/", (req, res) => {
    const sql = "SELECT * FROM `ionic-app`";
// TODO update ionic app after deploy server
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });
});

module.exports = router;