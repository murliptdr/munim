var express=require("express");
var connection2= require('./database/dbconnection2');
 
module.exports.sell=function(req,res){
  var users={
    "sno":req.body.sno,
    "cname":req.body.cname,
    "cnumber":req.body.cnumber,
    "product_name":req.body.product_name,
    "price":req.body.price,
    "quantity":req.body.quantity,
    "date":req.body.date,
    "time":req.body.time,
    "total_amount":req.body.total_amount,
}
connection2.query('SELECT * FROM products WHERE product_name = ?',[users.product_name], function (error, results, fields) {
  if (error) {
    res.json({
        status:false,
        message:'Error1'
    })
  }else {
    if(results.length >0){
      if(results[0].quantity>=req.body.quantity){
        var newquantity=results[0].quantity - users.quantity;
        connection2.query('UPDATE products SET quantity = ? WHERE product_name = ?',[newquantity,users.product_name], function (error, results, fields) {
          if (error) {
            res.json({
                status:false,
                message:'Error on update'
            })
          }else{
      
        connection2.query('INSERT INTO sold_products SET ?',users, function (error, results, fields) {
          if (error) {
            res.json({
                status:false,
                message:'Error'
            })
          }else{
              res.json({
                status:true,
                data:results,
                message:`sold sucessfully!${req.body.product_name} TOTAL AMOUNT =${req.body.total_amount}`,
            })
            }
        });
      }
    });
      }else{res.json({
        status:false,
        message:`${req.body.product_name} only ${results[0].quantity} quantity available`
    })
   }
    }
     else{
      res.json({
        status:false,
        message:`please enter correct product ${req.body.product_name}`
    })

     }
    }
     })
}
