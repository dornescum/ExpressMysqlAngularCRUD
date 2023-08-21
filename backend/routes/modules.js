const jwt = require("jsonwebtoken");
const md5 = require("md5");
const express = require("express");
const db = require("../db/config.js");
const util = require('util');
const router = express.Router();

const app = express();

app.use(express.json()); // Parse JSON request bodies


router.get("/", (req, res) => {
    const sql = "SELECT * FROM module";

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });
});

// FIXME rute individuala
router.get("/:id", (req, res) => {
    const id = req.body.id;
    const sql = `SELECT * FROM module WHERE module_id = ${id}`;

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
