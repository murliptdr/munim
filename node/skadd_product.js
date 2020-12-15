var express=require("express");
var connection2= require('./database/dbconnection2');
 
module.exports.add_product=function(req,res){
  var users={
    "shopname":req.body.shopname,
    "product_name":req.body.product_name,
    "price":req.body.price,
    "category":req.body.category,
    "sub_category":req.body.sub_category,
    "brand":req.body.brand,
    "quantity":req.body.quantity,
    "image":req.body.image
}
connection2.query('INSERT INTO products SET ?',users, function (error, results, fields) {
  if (error) {
    res.json({
        status:false,
        message:'Product already added!'
    })
  }else{
      res.json({
        status:true,
        data:results,
        message:'product added sucessfully!'
    })
        var sql = `INSERT INTO categories(category_name) VALUES ('${req.body.category}')`;
        connection2.query(sql, function (err, result) {
          if (result){
          console.log("category insert successful");
          }else{
            console.log("already inserted");
          }
        });
        var sql = `INSERT INTO sub_categories(sub_category_name) VALUES ('${req.body.sub_category}')`;
        connection2.query(sql, function (err, result) {
          if (result){
          console.log("subcategory insert successful");
          }else{
            console.log("s_c already inserted");
          }
        });
        var sql = `INSERT INTO brands(brand_name) VALUES ('${req.body.brand}')`;
        connection2.query(sql, function (err, result) {
          if (result){
          console.log("brand insert successful");
          }else{
            console.log("brand already inserted");
          }
        });
      }
    });
    
}
