const express = require("express");
const app = express();
var connection2 = require('./database/dbconnection2');


module.exports.addstockdetails = function (req, res) {
  connection2.query('select * from stockdetails', function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
};