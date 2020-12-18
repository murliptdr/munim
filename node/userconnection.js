var express = require("express");
const app = express();
const mysql = require('mysql');
var connection = require('./database/dbconnection');
const connectionshow = require("./database/dbconnection2");

app.post('/data', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM sksignup WHERE email = ? && password = ?', [email, password], function (error, results, fields) {
    if (error) throw error;
    const db = results[0].username;
  })
})
connectionshow = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: `${results[0].username}`
});
connectionshow.connect(function (err) {
  if (!err) {
    console.log("Database is connected");
  } else {
    console.log("Error while connecting with database");
  }
});
module.exports = connectionshow;
