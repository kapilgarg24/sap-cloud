sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,Filter,FilterOperator) {
        "use strict";

        return Controller.extend("znorthwind.controller.Worklist", {
            onInit: function () {
                var oJsondata = {
                "filters":{
                    "title":'',
                    "titleOfCourtesy":'',
                    "hireDateFrom":null,
                    "hireDateTo":null,
                    "city":'Seattle',
                    "reportTo":0
                }
                };
    
                var jsonModel = new JSONModel();
                jsonModel.setData(oJsondata);
                this.getView().setModel(jsonModel,"crModel");
            },

            formatPhoto : function(photo){
 
                var oReutrn =  "data:image/png;base64," + photo.substring(104)
     
                return oReutrn;
     
            },

            onEmpSearch: function(){
                var oEmpTbl = this.getView().byId("tblEmpId");
                var oItems = oEmpTbl.getBinding("items");
                var oFilter = [];
                var sCity = this.getView().getModel("crModel").getProperty("/filters/city");
                var sTitle = this.getView().getModel("crModel").getProperty("/filters/title");
                var sTitleOfCourtesy = this.getView().getModel("crModel").getProperty("/filters/titleOfCourtesy");
                var sReportTo = this.getView().getModel("crModel").getProperty("/filters/reportTo");
                var sHireDateFrom = this.getView().getModel("crModel").getProperty("/filters/hireDateFrom");
                var sHireDateTo = this.getView().getModel("crModel").getProperty("/filters/hireDateTo");
                if(sHireDateFrom && sHireDateTo){
                    oFilter.push(new Filter({path:"HireDate",operator:FilterOperator.BT,value1:sHireDateFrom,value2:sHireDateTo}));
                }
                
                if(sCity){
                    oFilter.push(new Filter({path:"City",operator:FilterOperator.EQ,value1:sCity}));
                }
                if(sTitle){
                    oFilter.push(new Filter({path:"Title",operator:FilterOperator.EQ,value1:sTitle}));
                }
                if(sTitleOfCourtesy){
                    oFilter.push(new Filter({path:"TitleOfCourtesy",operator:FilterOperator.EQ,value1:sTitleOfCourtesy}));
                }
                if(sReportTo){
                    oFilter.push(new Filter({path:"ReportsTo",operator:FilterOperator.EQ,value1:sReportTo}));
                }
                oItems.filter(oFilter);
            },

            moreEmpDetails: function(oEvent){
                var sContext = oEvent.getSource().getBindingContext();
                var sId = sContext.getProperty("EmployeeID");
                this.getOwnerComponent().getRouter().navTo("employeeDetails",{
                    empId: sId,
                })
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

            loadData:function(){
                var oNorthwindModel = this.getView().getModel();
                oNorthwindModel.read("/Employees(EmployeeID=1)",{
                    urlParameters:{"$expand":"Orders,Territories"},
                    success:function(oData){

                    },
                    error:function(hrex){

                    }
                });
            }
            
        });
    });
