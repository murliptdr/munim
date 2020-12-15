var connection = require('./database/dbconnection');


module.exports.signup=function(req,res){
  var users={
    "username":req.body.username,
    "fullname":req.body.fullname,
    "email":req.body.email,
    "password":req.body.pass,
    "phone":req.body.phone,
    "shop_name":req.body.shopname,
    "shop_category":req.body.shop_category,
    "address":req.body.address,
    "city":req.body.city,
    "postcode":req.body.postcode
    
}
    connection.query('INSERT INTO sksignup SET ?',users, function (error, results, fields) {
      if (error) {
        res.json({
            status:false,
            message:'Enter unique Username or Email or Phone or shop name'
        })
      }else{
          res.json({
            status:true,
            data:results,
            message:'user registered sucessfully'
        })

        var sql = `CREATE DATABASE ${req.body.username} `;
        connection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Database Created");
        });
        const mysql=require('mysql');
        const connectionnew= mysql.createConnection({
          host:'localhost',
          user:'root',
          password:'',
          database:`${req.body.username}`
      });
      var sql = 'CREATE TABLE products (shopname VARCHAR(45) NOT NULL,product_name VARCHAR(100) UNIQUE NOT NULL,price INT(7) NOT NULL,category VARCHAR(45) NOT NULL,sub_category VARCHAR(45) NOT NULL,brand VARCHAR(45) NOT NULL,quantity INT(10) NOT NULL,image BLOB )';
      connectionnew.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Products Table created");
      });

        var sql = 'CREATE TABLE sold_products (sno TEXT(15) NOT NULL,cname VARCHAR(55) NOT NULL,cnumber BIGINT(12) NOT NULL, product_name VARCHAR(45) NOT NULL,quantity INT(10) NOT NULL,price INT(7) NOT NULL,total_amount INT(10) NOT NULL,date TEXT(50) NOT NULL,time TIME  NOT NULL )';
        connectionnew.query(sql, function (err, result) {
            if (err) throw err;
            console.log("sold_products Table created");
        });
        var sql = 'CREATE TABLE stockdetails(product_name VARCHAR(100) NOT NULL UNIQUE,quantity INT(5)  NOT NULL, date TEXT(50) NOT NULL,time TIME  NOT NULL )';
        connectionnew.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Stockdetails Table created");
        });


        var sql = 'CREATE TABLE categories (category_id INT AUTO_INCREMENT PRIMARY KEY,category_name VARCHAR(45) NOT NULL UNIQUE)';
        connectionnew.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Categories Table created");
          });
          var sql = 'CREATE TABLE sub_categories (sub_category_id INT AUTO_INCREMENT PRIMARY KEY,sub_category_name VARCHAR(45) NOT NULL UNIQUE)';
          connectionnew.query(sql, function (err, result) {
              if (err) throw err;
              console.log("Sub_Categories Table created");
            });
            var sql = 'CREATE TABLE brands (brand_id INT AUTO_INCREMENT PRIMARY KEY,brand_name VARCHAR(45) NOT NULL UNIQUE)';
          connectionnew.query(sql, function (err, result) {
              if (err) throw err;
              console.log("Sub_Categories Table created");
            });
            
      }
    });
   
  }