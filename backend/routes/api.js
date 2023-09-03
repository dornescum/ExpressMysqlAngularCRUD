
const express = require("express");
const db = require("../db/config.js");
const router = express.Router();



router.get("/", (req, res) => {
    // const sql = "SELECT * FROM products";
    const sql = `SELECT * FROM products as p
                                 inner join brands b on p.brand = b.brand_id
                                 inner join categories c on p.category = c.category_id`;

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
