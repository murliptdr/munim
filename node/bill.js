var express = require("express");
var connection2 = require('./database/dbconnection2');

module.exports.bill = function (req, res) {
  var sno = req.body.sno;
  connection2.query('select * from sold_products WHERE sno = ?', [sno], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
};