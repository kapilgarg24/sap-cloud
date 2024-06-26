var keyValueCtrl= require('../controller/keyValue.ctrl.js');

var url = "/keyValue";

function assignRoutes (app,baseUrl) {
  
  /**
   * GET /api/v1/keyValue/{group}
   * @tags Mas Key Value
   * @description Get mas key value by group
   * @security BearerAuth
   * @param {string} group.path - filter by key
   */
  // app.get(baseUrl+url,keyValueCtrl.get);

    /**
   * GET /api/v1/keyValue/
   * @tags Mas Key Value
   * @description Get mas key value by group
   * @security BearerAuth
   * @param {string} group.query - filter by key
   */

    
    app.get(baseUrl+url,keyValueCtrl.get);

  // app.get(baseUrl+url+"/:group",keyValueCtrl.getById);
  // app.post(baseUrl+url,keyValueCtrl.post);
  //  app.put(baseUrl+url,keyValueCtrl.put);
  //  app.delete(baseUrl+url+"/:id",keyValueCtrl.del);
 }
 https://port4000-workspaces-ws-n8c7p.us10.trial.applicationstudio.cloud.sap/api/v1/keyValue

module.exports = {
    assignRoutes
};