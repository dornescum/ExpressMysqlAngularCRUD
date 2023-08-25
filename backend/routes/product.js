const express = require("express");
const db = require("../db/config.js");
// const util = require('util');
const {check, validationResult} = require('express-validator');

const router = express.Router();

router.post("/:uid",[
    check('email').isEmail().normalizeEmail(),
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
        return res.status(422).json({ errors: errors.array() });
    }
    const userId = req.body.uid;
    console.log('rb : ', req.body);
    console.log('uid : ', userId);
    return res.status(200).json({message: 'works '});

});

module.exports = router;