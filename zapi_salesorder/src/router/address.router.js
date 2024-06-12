var addressCtrl= require('../controller/address.ctrl.js');

var url = "/address"

function assignRoutes (app,baseUrl) {
 
  app.get(baseUrl+url,addressCtrl.get);
   app.post(baseUrl+url,addressCtrl.post);
   app.put(baseUrl+url,addressCtrl.put);
   app.delete(baseUrl+url+"/:id",addressCtrl.del);
 }


module.exports = {
    assignRoutes
};