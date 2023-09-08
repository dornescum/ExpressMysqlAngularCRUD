'use strict'
const express = require("express");
const db = require("../db/config.js");
const router = express.Router();

// let questionsId = [];


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

    const numberOfQuestions = 2;
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

    const sql = `SELECT * FROM module as m
                                   JOIN questions as q on m.module_id = q.module_id
                                   JOIN choices as c on c.question_id = q.question_id
                 where q.question_id= ${qid} `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });
});


router.post("/:id", (req, res) => {
    const userId = req.body.userId;
    const response = req.body.response === true ? 1 : 0;
    const questionId = req.body.question_id;

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

module.exports = router;
