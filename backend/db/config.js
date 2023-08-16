const mysql = require("mysql2");
require('dotenv').config();


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  queueLimit: 0,
});

connection.connect((err) => {
  if (err) console.log('ERROR connection ', err);
  else console.log("MySQL is connected...");
});

module.exports = connection;