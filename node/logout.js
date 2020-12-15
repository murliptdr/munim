const express = require("express");
const app = express();

module.exports.logout=function(req,res){
    localStorage.removeItem('db');
};