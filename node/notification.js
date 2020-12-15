const express = require("express");
const app = express();
var connection2= require('./database/dbconnection2');

module.exports.notification=function(req,res){
  connection2.query('select * from products WHERE quantity <= 10', function (error, results, fields) {
  if (error) throw error;
  res.end(JSON.stringify(results));
});
};