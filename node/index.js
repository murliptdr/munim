const express = require("express");
var bodyParser = require('body-parser');

const app = express();

app.use(express.static("public"));

var logincheck = require('./sklogincheck');
var signupcheck = require('./sksignupcheck');
var add_productcheck = require('./skadd_product')
var addstock = require('./addstock');
var addstockdetails = require('./addstockdetails');
var notification = require('./notification')

var sell = require('./sell');
var bill = require('./bill');
var sellcheck = require('./sellcheck');
var showproduct = require("./showproduct");
var soldpdetail = require("./soldpdetail");
var todays_sell = require("./soldpdetail");
var landing = require("./landing");

var logout = require("./logout");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type, Accept");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
   next();
})

app.get('/', function (req, res) {
   res.send("welcome to backend server!");
})
app.get("/add_product", (req, res) => {
   res.send("welcome to add_product page!");
})

app.get('/soldpdetail', soldpdetail.soldpdetail)
app.get('/todays_sell', soldpdetail.todays_sell)
app.get('/showproduct', showproduct.showproduct)
app.get('/notification', notification.notification)
app.get('/bill', bill.bill);
app.get('/addstockdetails', addstockdetails.addstockdetails);
app.get('/landing', landing.landing)


/* route to handle login and registration */
app.post('/signup', signupcheck.signup);
app.post('/login', logincheck.login);
app.post('/add_product', add_productcheck.add_product);
app.post('/addstock', addstock.addstock);
app.post('/updateprice', addstock.updateprice);
app.post('/sell', sell.sell);
app.post('/bill', bill.bill);

app.post('/sellcheck', sellcheck.sellcheck);
app.post('/logout', logout.logout);

console.log(logincheck);
app.listen(8013);