'use strict'
const express = require("express");
const db = require("../db/config.js");
const path = require('path');
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const allowedMimes = ['image/jpeg', 'image/png'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only jpeg and png images are allowed.'));
        }
    }
});

let sql;

const router = express.Router();

router.post("/:uid",  upload.single('product'), (req, res)=>{
    if (req.file) {
        res.json({ msg: 'img works' });
    } else {
        res.status(400).json({ msg: 'Invalid file type. Only jpeg and png images are allowed.' });
    }
})

router.get("/:uid", (req, res) => {
    const sql = `SELECT * FROM users WHERE id = ?`;

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