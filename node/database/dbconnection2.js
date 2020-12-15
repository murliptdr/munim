const mysql=require('mysql');
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');

const connection2 = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:`${localStorage.getItem('db')}`
});

connection2.connect(function(err){
    if(!err) {
        console.log(`${localStorage.getItem('db')}Database is connected`);
    } else {
        console.log("Error while connecting with database2");
    }
    });    
module.exports=connection2;

// setInterval(function(connection2){},1000)

 //logs hi every second


// var express=require("express");
// const app = express();
// const mysql=require('mysql');
// var connection = require('./dbconnection');


 
// const connection2 = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database: module.exports.connection2=function(req,res){
//         var email=req.body.email;
//       var password=req.body.password;
//       connection.query('SELECT * FROM sksignup WHERE email = ? && password = ?',[email,password], function (error, results, fields) {
//         if (error) throw error;
//        db = "mubassir";
//     })
//     }
// });
// connection2.connect(function(err){
//     if(!err) {
//         console.log("Database is connected");
//     } else {
//         console.log("Error while connecting with database");
//     }
//     }); 
//     module.exports=connection2;

