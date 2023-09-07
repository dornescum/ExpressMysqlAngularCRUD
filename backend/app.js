const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const helmet = require("helmet");


// Initialize express app
const app = express();


app.disable("x-powered-by");

// Use Helmet!
app.use(helmet());

app.use((req, res, next) => {
    // res.setHeader('X-Content-Type-Options', 'nosniff');
    // res.setHeader('X-Frame-Options', 'deny');
    // res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Powered-By', 'PHP 4.2.0');
    // res.removeHeader("X-Powered-By");

    // Add more headers here
    next();
});

app.use(cookieParser());

// Middleware
app.use(cors({
    origin: "http://localhost:4200", credentials: true,
    // origin: "*", credentials: true
}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Router index
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || null;


app.listen(PORT, () => {
    console.log('port', PORT);
    console.log(`Server is running on port ${PORT} using  and env is "${ENV}"`);
});


