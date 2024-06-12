sap.ui.define([
	// "custmanage/controller/baseController",
	"custmanage/util/ajaxUtil",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller"
], function (ajaxUtil,JSONModel,Controller) {
	"use strict";
	return Controller.extend("custmanage.controller.App", {
		ajaxUtil:ajaxUtil,

		onInit: function(){
			var sGlobalData = {
				"gender":[],
				"marital":[],	
				"isActive":[],
				"prodStatus":[],
				"prodCat":[],
				"addressType":[],
				"login":{
					"user_name": "",
					"user_password": ""
				}
			}

			var jsonModel = new JSONModel();
			jsonModel.setData(sGlobalData);
			this.getView().setModel(jsonModel, "appModel");

			// this.setModel(new JSONModel(sGlobalData),"appModel");
			this.readGender();
			this.readMaritalStatus();
			this.readActiveStatus();
			this.readProdCat();
			this.readProdStatus();
			this.readAddressType();

		},

		readGender:function(){
			this.ajaxUtil.get("/keyValue", function (oData){
				// console.log("gender")
				// console.log(oData.data)
				this.getView().getModel("appModel").setProperty("/gender", oData.data);
			}.bind(this),function(){},{group:"gender"})
		},

		readMaritalStatus:function(){
			this.ajaxUtil.get("/keyValue", function (oData){
				this.getView().getModel("appModel").setProperty("/marital", oData.data);
			}.bind(this),function(){},{group:"marital_status"})
		},

		readActiveStatus:function(){
			this.ajaxUtil.get("/keyValue", function (oData){
				this.getView().getModel("appModel").setProperty("/isActive", oData.data);
			}.bind(this),function(){},{group:"is_active"})
		},

		readProdCat:function(){
			this.ajaxUtil.get("/keyValue", function (oData){
				this.getView().getModel("appModel").setProperty("/prodCat", oData.data);
			}.bind(this),function(){},{group:"category"})
		},

		readProdStatus:function(){
			this.ajaxUtil.get("/keyValue", function (oData){
				var sData = oData.data;
				// console.log(sData)
				this.getView().getModel("appModel").setProperty("/prodStatus", sData);
			}.bind(this),function(){},{group:"product_status"})
		},

		readAddressType:function(){
			this.ajaxUtil.get("/keyValue", function (oData){
				var sData = oData.data;
				// console.log(sData)
				this.getView().getModel("appModel").setProperty("/addressType", sData);
			}.bind(this),function(){},{group:"address_type"})
		}
          
	});
});