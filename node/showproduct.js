const express = require("express");
const app = express();
var connection2= require('./database/dbconnection2');


module.exports.showproduct=function(req,res){
  connection2.query('select * from products', function (error, results, fields) {
  if (error) throw error;
  res.end(JSON.stringify(results));
});
};

module.exports.notification=function(req,res){
  connection2.query('select * from products WHERE quantity <= 5', function (error, results, fields) {
  if (error) throw error;
  res.end(JSON.stringify(results));
});
};