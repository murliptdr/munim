const express = require("express");
const app = express();
var connection2 = require('./database/dbconnection2');
var date = new Date().toJSON().slice(0, 10);

module.exports.soldpdetail = function (req, res) {
   connection2.query('select * from sold_products', function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
   });
};

module.exports.todays_sell = function (req, res) {
   connection2.query('select * from sold_products where date = ?', date, function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
   });
};