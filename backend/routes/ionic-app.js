const jwt = require("jsonwebtoken");
// const md5 = require("md5");
const express = require("express");
// const { validationResult } = require('express-validator');
const db = require("../db/config.js");
const util = require('util');
const dbQuery = util.promisify(db.query);
const router = express.Router();

const app = express();

app.use(express.json()); // Parse JSON request bodies

const {check, validationResult} = require('express-validator');

// const db = require("../db/config");
router.get("/", (req, res) => {
    const sql = "SELECT * FROM `ionic-app`";

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });

    // const phones = [{
    //     id: 1,
    //     title: 'phone-1',
    //     tag: 'phones',
    //     favorite: true,
    //     price: 399,
    //     rating:3,
    //     flashSale: false,
    //     img: '../../assets/img/1.jpg',
    //     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptate voluptates accusantium, recusandae delectus odit laborum nostrum esse! Rerum minus expedita recusandae possimus voluptatibus eius excepturi error veritatis voluptatem cumque?',
    // }, {
    //     id: 2,
    //     title: 'phone-2',
    //     tag: 'phones',
    //     favorite: true,
    //     price: 299,
    //     rating:5,
    //     flashSale: true,
    //     img: '../../assets/img/2.jpg',
    //     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptate voluptates accusantium, recusandae delectus odit laborum nostrum esse! Rerum minus expedita recusandae possimus voluptatibus eius excepturi error veritatis voluptatem cumque?',
    // }, {
    //     id: 3,
    //     title: 'phone-3',
    //     tag: 'phones',
    //     favorite: true,
    //     price: 499,
    //     rating:4,
    //     flashSale: false,
    //     img: '../../assets/img/3.jpg',
    //     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptate voluptates accusantium, recusandae delectus odit laborum nostrum esse! Rerum minus expedita recusandae possimus voluptatibus eius excepturi error veritatis voluptatem cumque?',
    // }, {
    //     id: 4,
    //     title: 'phone-4',
    //     tag: 'phones',
    //     favorite: false,
    //     price: 599,
    //     rating:1,
    //     flashSale: true,
    //     img: '../../assets/img/4.jpg',
    //     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptate voluptates accusantium, recusandae delectus odit laborum nostrum esse! Rerum minus expedita recusandae possimus voluptatibus eius excepturi error veritatis voluptatem cumque?',
    // }, {
    //     id: 5,
    //     title: 'phone-5',
    //     tag: 'phones',
    //     favorite: false,
    //     price: 599,
    //     rating:2,
    //     flashSale: true,
    //     img: '../../assets/img/5.jpg',
    //     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptate voluptates accusantium, recusandae delectus odit laborum nostrum esse! Rerum minus expedita recusandae possimus voluptatibus eius excepturi error veritatis voluptatem cumque?',
    // }, {
    //     id: 6,
    //     title: 'tv-1',
    //     tag: 'tvs',
    //     favorite: false,
    //     price: 599,
    //     rating:5,
    //     flashSale: false,
    //     img: '../../assets/img/tv-1.jpg',
    //     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptate voluptates accusantium, recusandae delectus odit laborum nostrum esse! Rerum minus expedita recusandae possimus voluptatibus eius excepturi error veritatis voluptatem cumque?',
    // }, {
    //     id: 7,
    //     title: 'tv-2',
    //     tag: 'tvs',
    //     favorite: true,
    //     price: 899,
    //     rating:2,
    //     flashSale: true,
    //     img: '../../assets/img/tv-2.jpg',
    //     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptate voluptates accusantium, recusandae delectus odit laborum nostrum esse! Rerum minus expedita recusandae possimus voluptatibus eius excepturi error veritatis voluptatem cumque?',
    // },
    //     {
    //         id: 8,
    //         title: 'laptop-1',
    //         tag: 'laptops',
    //         favorite: true,
    //         price: 599,
    //         rating:5,
    //         flashSale: true,
    //         img: '../../assets/img/tv-1.jpg',
    //         desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptate voluptates accusantium, recusandae delectus odit laborum nostrum esse! Rerum minus expedita recusandae possimus voluptatibus eius excepturi error veritatis voluptatem cumque?',
    //     }, {
    //         id: 9,
    //         title: 'laptop-2',
    //         tag: 'laptops',
    //         favorite: false,
    //         price: 899,
    //         rating:5,
    //         flashSale: false,
    //         img: '../../assets/img/tv-2.jpg',
    //         desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptate voluptates accusantium, recusandae delectus odit laborum nostrum esse! Rerum minus expedita recusandae possimus voluptatibus eius excepturi error veritatis voluptatem cumque?',
    //     },
    // ];
    //
    // res.json(phones);
});

module.exports = router;