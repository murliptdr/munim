var connection2=require("./database/dbconnection2");
module.exports.addstock=function(req,res){
    var users={
        "product_name":req.body.product_name,
        "quantity":req.body.quantity,
        "date":req.body.date,
        "time":req.body.time,
    }
    
    connection2.query('SELECT * FROM products WHERE product_name = ?',[users.product_name], function (error, results, fields) {
        if (error) {
          res.json({
              status:false,
              message:'Error1'
          })
        }else {
          if(results.length >0){
            var quantity = parseInt(results[0].quantity) + parseInt(users.quantity);
            connection2.query('UPDATE products SET quantity = ? WHERE product_name = ?',[quantity,users.product_name], function (error, results, fields) {
                if (error) {
                  res.json({
                      status:false,
                      message:'Error'
                  })
                }else{
                  //   res.json({
                  //     status:true,
                  //     data:results,
                  //     message:`Stock added sucessfully!${req.body.product_name} quantity=${req.body.quantity}`,
                  // })
                  connection2.query('INSERT INTO stockdetails SET ?',users, function (error, results, fields) {
                    if (error) {
                      res.json({
                          status:false,
                      })
                    }else{
                        res.json({
                          status:true,
                          data:results,
                      })
              }
              });
                  }
                  
              });
              
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

 module.exports.updateprice=function(req,res){
        var users={
            "product_name":req.body.product_name,
            "price":req.body.price
        }
        connection2.query('SELECT * FROM products WHERE product_name = ?',[users.product_name], function (error, results, fields) {
            if (error) {
              res.json({
                  status:false,
                  message:'Error1'
              })
            }else {
              if(results.length >0){
                connection2.query('UPDATE products SET price = ? WHERE product_name = ?',[users.price,users.product_name], function (error, results, fields) {
                    if (error) {
                      res.json({
                          status:false,
                          message:'Error'
                      })
                    }else{
                        res.json({
                          status:true,
                          data:results,
                          message:`Price update sucessfully!${req.body.product_name} price=${req.body.price}`,
                      })
                      }
                  });
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