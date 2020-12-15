var express=require("express");
var connection2= require('./database/dbconnection2');
 
module.exports.sellcheck=function(req,res){
  var users={
    "product_name":req.body.product_name,
    "quantity":req.body.quantity,
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
         if (error) {
            res.json({
                status:false,
                message:'Error'
            })
          }else{
              res.json({
                status:true,
                data:results,
            })
            }

      }else{res.json({
        status:false,
        message:` ${req.body.product_name} = only ${results[0].quantity} quantity available`
        })
        }
    }
     else{
      res.json({
        status:false,
        message:`Enter correct product ${req.body.product_name}`
    })

     }
    }
     })
}

     
