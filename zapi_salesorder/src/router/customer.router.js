var customerCtrl= require('../controller/customer.ctrl.js');
var orderCtrl= require('../controller/order.ctrl.js');

var url = "/customer"

function assignRoutes (app,baseUrl) {
  
  app.get(baseUrl+url,customerCtrl.get);
  app.get(baseUrl+url+"/:id",customerCtrl.getById);
  app.get(baseUrl+url+"/:id/allDetails",customerCtrl.getAllDetailsByCustID);
  app.post(baseUrl+url,customerCtrl.post);
  app.put(baseUrl+url,customerCtrl.put);
  app.put(baseUrl+url+"/:id/active",customerCtrl.updateActToInact);
  app.put(baseUrl+url+"/:id/inactive",customerCtrl.updateInactToAct);
  app.delete(baseUrl+url+"/:id",customerCtrl.del);
 }


module.exports = {
    assignRoutes
};