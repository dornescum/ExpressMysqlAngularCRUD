'use strict'
const express = require("express");
const db = require("../db/config.js");
const {check, validationResult} = require('express-validator');
const jwt = require("jsonwebtoken");

const {getBrandType, getCategoryNr} = require('../utils/utils');
let sql;

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
    const {favorite, price, name, quantity, brand, category, text, uid, id} = req.body;


    // FIXME make trigger for update codebar
    const brandNr = getBrandType(brand);
    const categoryNr = getCategoryNr(category);
    const favoriteStr = String(favorite) === "true" ? "true" : "false";

    const date = new Date().toISOString(); // "2023-09-03T12:50:12.159Z"
    const [year, month, day] = date.split('T')[0].split('-');
    const codebar = `${favorite ? 1 : 0}${brandNr}${categoryNr}${year}${day}${month}${uid}`;

    sql = `INSERT INTO products(favorite, price, name, quantity, brand, category, text, uid, codebar) VALUES 
                            (?,?,?,?,?,?,?,?,?)`;
    db.query(sql, [favoriteStr, price, name, quantity, brandNr, categoryNr, text, uid, codebar], (err, result) => {
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
});

// product uid
router.get("/:uid",  (req, res) => {
    const token = req.headers['x-access-token'];
    // TODO create middleware for token

    const uid = req.params.uid;
    const pid = req.params.pid;

    if (!token) return res.status(401).send("No token provided.");

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) return res.status(403).send("Invalid token.");

        sql = `SELECT * FROM products as p
                                 inner join brands b on p.brand = b.brand_id
                                 inner join categories c on p.category = c.category_id
               WHERE uid = ?`;
        db.query(sql,[uid], (err, result) => {
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

    const uid = req.params.uid;
    const pid = req.params.pid;

    if (!token) return res.status(401).send("No token provided.");

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) return res.status(403).send("Invalid token.");
        sql = `SELECT * FROM products as p
                                 inner join brands b on p.brand = b.brand_id
                                 inner join categories c on p.category = c.category_id
         WHERE uid = ? AND id = ?`;
        db.query(sql,[uid, pid], (err, result) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: "Internal Server Error" });
            }
           else if(result.length < 1){
                res.status(204).json({ message: "No content" });
            }
            else {
                res.status(200).json(result[0]);
            }
        });

    });
});


router.put("/:uid", [
    check('favorite').isBoolean(),
    check('name').isString(),
    check('quantity').isInt(),
    check('brand').isString(),
    check('category').isString(),
    check('text').isString(),
    check('uid').isInt(),
], (req, res) => {
    const errors = validationResult(req);

    const {favorite, price, name, quantity, brand, category, text, uid, pid} = req.body;

    const brandNr = getBrandType(brand);
    const categoryNr = getCategoryNr(category);

    const sql = `UPDATE products SET favorite = ?, price = ?, name = ?, quantity = ?, brand = ?, category = ?, text = ?, uid = ?
                WHERE id = ?`;
    db.query(sql, [favorite, price, name, quantity, brand, category, text, uid, pid], (err, result) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({
                message: "Something went wrong, please try again",
                statusCode: 500,
                data: err,
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found",
                statusCode: 404,
            });
        }
        return res.status(200).json({
            message: "Product updated successfully",
            statusCode: 200,
        });
    });
})



router.delete("/:uid/:pid", (req, res)=>{
    const pid = req.params.pid;
    const uid = req.params.uid;

    sql = `DELETE FROM products  WHERE uid = ? AND id = ?`;

    db.query(sql, [uid, pid], (err, result) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({
                message: "Something went wrong, please try again",
                statusCode: 500,
                data: err,
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found",
                statusCode: 404,
            });
        }
        return res.status(200).json({
            message: "Product deleted successfully",
            statusCode: 200,
        });
    });
})

module.exports = router;

//
// procedura stocata pt uid
// DELIMITER //
// CREATE PROCEDURE GetProductsByUID(IN user_id INT)
// BEGIN
// SELECT * FROM products WHERE uid = user_id;
// END;
// //
// DELIMITER ;

