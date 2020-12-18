const express = require("express");
const app = express();
const mysql = require('mysql');

const connection3 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pappu'
});
connection3.connect(function (err) {
    if (!err) {
        console.log("landingDatabase is connected");
    } else {
        console.log("Error while connecting with landingdatabase");
    }
});

module.exports.landing = function (req, res) {
    connection3.query('select * from products', function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
};
