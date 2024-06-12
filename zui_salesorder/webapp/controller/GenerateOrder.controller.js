sap.ui.define([
	"custmanage/controller/baseController",
	// "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"custmanage/util/ajaxUtil",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"custmanage/util/formatter",
	"sap/ui/core/format/DateFormat",
	"sap/ui/core/routing/History"

], function (baseController, JSONModel, ajaxUtil, MessageBox, MessageToast, Fragment, formatter, DateFormat, History) {

	"use strict";
	return baseController.extend("custmanage.controller.GenerateOrder", {
		// life cycle methods
		ajaxUtil: ajaxUtil,
		formatter: formatter,

		onInit: function () {
			// for auto refresh when employee created successfully
			this.getOwnerComponent().getRouter().getRoute("generateOrder").attachPatternMatched(this.onObjectMatched, this);

			var oJsondata = {

				// "header": {
				// 	"address_id": 0,
				// 	"address_type": "P",
				// 	"add_line_1": "",
				// 	"add_line_2": ""
				// },
				"filters":{
					"product_desc":""
				},
				"view": {
					showTrue: true,
					showFalse: false,
					showEditBtn: "Edit",
				},
				"custAllDetail": [],
				"addDetails":[],
				"getProdDetails":[],
				"customerId": 0,

			};

			var jsonModel = new JSONModel();
			jsonModel.setData(oJsondata);
			this.getView().setModel(jsonModel, "crOrModel");
		},

		onObjectMatched: function (oEvent) {
			var sCustId = oEvent.getParameter("arguments").custId;
			this.getView().getModel("crOrModel").setProperty("/customerId", sCustId)
			this.readCustomer();
			this.onProdSearch();
		},

		readCustomer: function () {
			var sId = this.getView().getModel("crOrModel").getProperty("/customerId")
			this.ajaxUtil.get("/customer/" + sId + "/allDetails", function (oData) {
				console.log(oData.data)
				this.getView().getModel("crOrModel").setProperty("/custAllDetail", oData.data[0]);
				this.getView().getModel("crOrModel").setProperty("/addDetails", oData.data[0].address);
				this.getView().getModel("crOrModel").refresh();
			}.bind(this), function (xHrx) {

			}, {});
		},

		onProdSearch:function(){
			var oFilter = this.getView().getModel("crOrModel").getProperty("/filters");
			this.ajaxUtil.get("/products", function (oData) {
				// console.log(oData)
				this.getView().getModel("crOrModel").setProperty("/getProdDetails", oData.data[0]);
				this.getView().getModel("crOrModel").refresh();
			}.bind(this), function (xHrx) { },oFilter);
		},

		onQtyChange:function(oEvent){
			// var sQty = oEvent.getSource().getValue()
			// above line need in "livechange" event
			var sRowPath = oEvent.getSource().getParent().getBindingContextPath("crOrModel")
			var sSelRow = this.getModel("crOrModel").getContext(sRowPath).getObject();
			sSelRow.total_price = sSelRow.product_price * sSelRow.quantity;
			// return this.finalTotalChange()
			
		},

		// finalTotalChange:function(){
		// 	var aFinalOrder = this.getView().getModel("crOrModel").getProperty("/addItems")
		// 	var finalAmount=0;
		// 	for (var i = 0; i<aFinalOrder.length; i++){				
		// 		finalAmount += aFinalOrder[i].total_price;					
		// 	}			
		// 	this.getModel("crOrModel").setProperty("/addOrder/final_amount", finalAmount)
		// 	this.getModel("crOrModel").refresh()
		// },

		selectProdForOrder:function(){
			
		},



		// enterQty:function(){
		// 	this.getView().getModel("crOrModel").setProperty("/view/showFalse", true);
		// },





		// ===================Last nav back===============================
		onNavBack: function() {
			var sId = this.getView().getModel("orModel").getProperty("/orderDetail/customer_id");
			const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();
			console.log(sPreviousHash)
			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getOwnerComponent().getRouter().navTo("customerDetails", {
					custId: sId
				}, true);
			}
		},


	});
});

