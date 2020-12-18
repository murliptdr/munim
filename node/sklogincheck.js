const express = require("express");
const app = express();
const path = require("path");

var connection = require('./database/dbconnection');
module.exports.login = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM sksignup WHERE email = ?', [email], function (error, results, fields) {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query'
      })
    } else {
      if (results.length > 0) {
        if (password == results[0].password) {
          localStorage.setItem('db', results[0].username)
          res.json({
            status: true,
            message: 'successfully authenticated',
            username: results[0].username,
            fullname: results[0].fullname,
            email: results[0].email,
            phone: results[0].phone,
            shopname: results[0].shop_name,
            shopcategory: results[0].shop_category,
            address: results[0].address,
            city: results[0].city,
            postcode: results[0].postcode,
          })
          console.log("successful");
          // res.end(JSON.stringify(results));
        } else {
          res.json({
            status: false,
            message: "Email and password does not match"
          });
        }

      }
      else {
        res.json({
          status: false,
          message: "Email does not exits"
        });
      }
    }
  });
}



