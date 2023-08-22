const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const db = require("./db/config");

// Config .env file
dotenv.config({
  path: path.join(__dirname, `env/${process.env.NODE_ENV}.env`),
});

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check
// app.get("/", (req, res) => {
//     // console.log(db)
//     db.query(
//         `SELECT AnswerText
//          FROM Answers
//          WHERE QuestionID = 1 AND IsCorrect = TRUE;
//         `,
//         (err, results) => {
//             if (err) console.log(err);
//             else res.json(results);
//         }
//     );
//     // res.status(200).send("Health Check");
//     // res.status(200).json({message: result});
// });

// Router index
const indexRouter = require("./routes/index");
app.use("/", indexRouter);


const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || null;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} using ${ENV} env.`);
});