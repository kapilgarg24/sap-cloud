var express = require('express');
var xsenv = require('@sap/xsenv');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

xsenv.loadEnv();

global.services = xsenv.getServices({
    hdi_salesorder: { name: 'HDI_SALESORDER' }
  });

// console.log(global.services.hdi_salesorder);
//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))

//To parse json data(i.e recieve data in post method)
app.use(bodyParser.json());

// ===========================GLOBLE VARIABLE========================//
const port = 8081
const baseUrl = "/api/v1";
const appDir = "app";
//===========================GLOBLE VARIABLE========================//


//===========================ROUTES========================//
var customerRoute = require('./router/customer.router.js');
var addressRoute = require('./router/address.router.js');
var orderRoute = require('./router/order.router.js');
var items = require('./router/items.router.js');
var KeyValue = require('./router/keyValue.router.js');
var productRoute = require('./router/product.router.js');
var loginRoute = require('./router/login.router.js');
//===========================ROUTES========================//

//===========================DB========================//
var dbUtil = require('./util/db.js');
//===========================DB========================//




//===========================Router========================//
customerRoute.assignRoutes(app,baseUrl);
addressRoute.assignRoutes(app,baseUrl);
orderRoute.assignRoutes(app,baseUrl);
items.assignRoutes(app,baseUrl);
KeyValue.assignRoutes(app,baseUrl);
productRoute.assignRoutes(app,baseUrl);
loginRoute.assignRoutes(app,baseUrl);
//===========================Router========================//



app.get('*', function(req, res){
   res.send({status:"404","message":"No resource found."});
});

// app.listen(port,"localhost",function(){
// },function(){
//     console.info("===========Server started, listing on port no "+port+"=========== click http://localhost:"+port)
// });

// dbUtil.getConnection();

dbUtil.getConnection(async function(error,response){
    if(error == null){
        console.info("Connected to Database starting server....");
        app.listen(port,function(){
            console.info("===========Server started, listing on port no "+port+"=========== click http://localhost:"+port)
        });
    }else{
        console.error("Fail to connect database "+error.message);
    }
});