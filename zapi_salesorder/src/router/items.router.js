var itemsCtrl= require('../controller/items.ctrl.js');

var url = "/items"

function assignRoutes (app,baseUrl) {
  
  app.get(baseUrl+url,itemsCtrl.get);
  app.get(baseUrl+url+"/:id",itemsCtrl.getById);
   app.post(baseUrl+url,itemsCtrl.post);
   app.put(baseUrl+url,itemsCtrl.put);
   app.delete(baseUrl+url+"/:id",itemsCtrl.del);
 }


module.exports = {
    assignRoutes
};