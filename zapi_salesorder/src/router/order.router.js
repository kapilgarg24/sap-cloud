var orderCtrl= require('../controller/order.ctrl.js');

var url = "/order";

function assignRoutes (app,baseUrl) {
  
  app.get(baseUrl+url,orderCtrl.get);
  // app.get(baseUrl+"/customers/:custId"+url, orderCtrl.getByCustId)
  app.get(baseUrl+url+"/:order_no", orderCtrl.getById)
   app.post(baseUrl+url,orderCtrl.post);
   app.put(baseUrl+url,orderCtrl.put);   
   app.put(baseUrl+url+"/status",orderCtrl.orderStatusCtrl);
   app.delete(baseUrl+url+"/:id",orderCtrl.del);
 }

module.exports = {
    assignRoutes
};