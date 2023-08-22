// const jwt = require("jsonwebtoken");
// const md5 = require("md5");
const express = require("express");
const db = require("../db/config.js");
// const util = require('util');
const router = express.Router();

let questionsId = [];


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

// ruta individuala pt modul
router.get("/:id", (req, res) => {
    const id = req.params.id;
    // console.log('id : ', id);
    const numberOfQuestions = 2;
    // const sql = `SELECT * FROM module WHERE module_id = ${id}`;
    const sql = `SELECT * FROM module as m
                                   JOIN questions as q on m.module_id = q.module_id
                                   JOIN choices as c on c.question_id = q.question_id
                 where m.module_id = ${id}
                 ORDER BY RAND()
                 LIMIT ${numberOfQuestions}`;


    db.query(sql, (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });
});

// intrebare id
router.get("/:id/:qid", (req, res) => {
    const id = req.params.id;
    const qid = req.params.qid;
    // console.log('id : ', id);
    // console.log('qid : ', qid);
    // console.log('req body : ', req);

    const sql = `SELECT * FROM module as m
                                   JOIN questions as q on m.module_id = q.module_id
                                   JOIN choices as c on c.question_id = q.question_id
                 where q.question_id= ${qid} `;
    // q.question_id= ${qid} AND m.module_id = ${id}
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });
});

// primesc id intrebari
// router.post("/:id", (req, res)=>{
//     // console.log('req post id:', req);
//     // body: { question_id: [ 8, 12 ] }
//     questionsId = req.body.question_id;
//     console.log('qid', questionsId);
//     res.json({msg: 'works'});
// })

// primesc raspuns intrebare true || false

router.post("/:id", (req, res) => {
    const userId = req.body.userId;
    const response = req.body.response === true ? 1 : 0;
    const questionId = req.body.question_id;

    // Check if the user's quiz response already exists in the table
    const checkSql = "SELECT * FROM user_quiz WHERE userid = ? AND question_id = ?";
    db.query(checkSql, [userId, questionId], (checkErr, checkResult) => {
        if (checkErr) {
            console.error(checkErr.message);
            return res.status(500).json({
                message: "Something went wrong, please try again",
                statusCode: 500,
                data: checkErr,
            });
        }

        if (checkResult.length > 0) {
            // FIXME
            // If the user's quiz response exists, update the existing record
            // const updateSql = "UPDATE user_quiz SET score = ? WHERE userid = ? AND question_id = ?";
            const updateSql = "UPDATE user_quiz SET score = score +1 WHERE userid = ? AND question_id = ?";
            db.query(updateSql, [response, userId, questionId], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error(updateErr.message);
                    return res.status(500).json({
                        message: "Something went wrong, please try again",
                        statusCode: 500,
                        data: updateErr,
                    });
                }

                return res.status(200).json({
                    message: "Quiz response updated successfully",
                });
            });
        } else {
            // If the user's quiz response doesn't exist, insert a new record
            const insertSql = "INSERT INTO user_quiz (userid, question_id, score) VALUES (?, ?, ?)";
            db.query(insertSql, [userId, questionId, response], (insertErr, insertResult) => {
                if (insertErr) {
                    console.error(insertErr.message);
                    return res.status(500).json({
                        message: "Something went wrong, please try again",
                        statusCode: 500,
                        data: insertErr,
                    });
                }

                return res.status(200).json({
                    message: "Quiz response recorded successfully",
                });
            });
        }
    });
});


// router.post("/:id", (req, res)=>{
//
//     questionsId = req.body.question_id;
//     const response = req.body.response === true ? 1 : 0;
//     const userId = req.body.userId;
//     // console.log('qid', questionsId);
//     // console.log('response  ', response);
//     console.log('req.body ', req.body.userId);
//
//     const sql = `insert into user_quiz (userid, score) VALUES (?, ?)`;
//
//     db.query(
//         sql, [userId, response],
//         (err, result, response) => {
//             console.log('error', err);
//             console.log('response', response);
//
//             // if (err) {
//             //     return res.status(400).json({
//             //         message: "Something went wrong, please try again",
//             //         statusCode: 400,
//             //         data: err,
//             //     });
//             // } else {
//             //     return res.status(200).json({
//             //         message: response,
//             //     });
//             // }
//         })
//
// })
module.exports = router;
