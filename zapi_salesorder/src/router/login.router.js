var loginCtrl= require('../controller/login.ctrl');

var url = "/login"

function assignRoutes (app,baseUrl) {
  
  // app.get(baseUrl+url+"/check",loginCtrl.get);
  app.get(baseUrl+url,loginCtrl.getUser);
  // app.get(baseUrl+url+"/:id",customerCtrl.getById);
  // app.get(baseUrl+url+"/:id/allDetails",customerCtrl.getAllDetailsByCustID);
  // app.post(baseUrl+url,customerCtrl.post);
  // app.put(baseUrl+url,customerCtrl.put);
  // app.put(baseUrl+url+"/:id/active",customerCtrl.updateActToInact);
  app.put(baseUrl+url+"/attempts",loginCtrl.putNoOfTry);
  app.delete(baseUrl+url+"/:id",loginCtrl.del);
 }


module.exports = {
    assignRoutes
};