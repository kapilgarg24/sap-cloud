var productCtrl= require('../controller/product.ctrl.js');

var url = "/products"

function assignRoutes (app,baseUrl) {
  
  app.get(baseUrl+url,productCtrl.get);
  app.get(baseUrl+url+"/:id",productCtrl.getById);
   app.post(baseUrl+url,productCtrl.post);
   app.put(baseUrl+url,productCtrl.put);
   app.put(baseUrl+url+"/tempDelete",productCtrl.softDelete);
   app.put(baseUrl+url+"/status",productCtrl.prodStatusCtrl);
   app.put(baseUrl+url+"/restore",productCtrl.restoreData);
   app.delete(baseUrl+url+"/:id",productCtrl.del);
 }


module.exports = {
    assignRoutes
};