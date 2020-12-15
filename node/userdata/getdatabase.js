// const express = require("express");
// const app = express();
// var connection= require('./database/dbconnection');

const { parseTwoDigitYear } = require("moment");


// module.exports.getdatabase=function(req,res){
//   connection.query('select username from sksignup', function (error, results, fields) {
//   if (error) throw error;
// //   res.end(JSON.stringify(results));
// if(results.length > 0){
//     var i=0;
//     for(i=0;i<=results.length-1;i++)
//     {

//     }
// }
// });
// };

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'major'
  });
  
  connection.connect(function(err) 
  {
    if (err) throw err;
      connection.query("SELECT username FROM sksignup", function (err, result, fields) 
      {
        if (err) throw err;
        var test = result;
        var length = Object.keys(result).length;
        console.log(   length   );
  
        for (var i = 0; i < length; i++) 
        {
  
        console.log(result[i].column_name);
  
        };
  
      });
  
  });

