var express=require("express");
var connection= require('./database/dbconnection');
var nodemailer = require('nodemailer');

module.exports.Forgotpass=function(req,res){
    const email=req.body.email;
connection.query('SELECT * FROM sksignup WHERE email = ?',[email], function (error, results, fields) {
if (error) {
    res.json({
        status:false,
        message:'Error1'
    })
  }else {
    if(results.length >0){
        res.json({
            status:true,
            message:`successful`
        })

var forgotpass = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'murli1999patidar@gmail.com',
    pass: 'ilrum.019283'
  }
});

var mailOptions = {
  from: 'murli1999patidar@gmail.com',
  to: email,
  subject: 'Forgot Password : Munim',
  text: `Your Munim Password is : ${results[0].password}`
};

forgotpass.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent! ');
  }
});
}
 else{
  res.json({
    status:false,
    message:'please enter register email id'
})

 }
}
 })
}