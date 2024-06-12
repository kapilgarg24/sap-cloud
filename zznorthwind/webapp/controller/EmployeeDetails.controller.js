sap.ui.define([
    "sap/ui/core/mvc/Controller",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("znorthwind.controller.EmployeeDetails", {
            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("employeeDetails").attachPatternMatched(this.onObjectMatched, this);

                // var oJsondata = {
                // "filters":{
                //     "title":'',
                //     "titleOfCourtesy":'',
                //     "hireDateFrom":null,
                //     "hireDateTo":null,
                //     "city":'Seattle',
                //     "reportTo":0
                // }
                // };
    
                // var jsonModel = new JSONModel();
                // jsonModel.setData(oJsondata);
                // this.getView().setModel(jsonModel,"empModel");
            },

            onObjectMatched: function (oEvent) {
                var sEmpId = oEvent.getParameter("arguments").empId;
                this.loadData(sEmpId)
            },
            
            loadData1:function(){
                var oNorthwindModel = this.getView().getModel();
                oNorthwindModel.read("/Employees",{
                    success:function(oData){

                    },
                    error:function(hrex){

                    }
                });
            },

            loadData:function(sEmpId){
                var oNorthwindModel = this.getView().getModel();
                oNorthwindModel.read(`/Employees(EmployeeID=${sEmpId})`,{
                    urlParameters:{"$expand":"Orders,Territories"},
                    success:function(oData){
                        console.log(oData)
                    },
                    error:function(hrex){

                    }
                });
            }
            
        });
    });
