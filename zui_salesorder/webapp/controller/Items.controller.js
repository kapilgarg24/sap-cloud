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
	return baseController.extend("custmanage.controller.Items", {
		// life cycle methods
		ajaxUtil: ajaxUtil,
		formatter: formatter,

		onInit: function () {
			// for auto refresh when employee created successfully
			this.getOwnerComponent().getRouter().getRoute("items").attachPatternMatched(this.onObjectMatched, this);

			var oJsondata = {

				// "header": {
				// 	"address_id": 0,
				// 	"address_type": "P",
				// 	"add_line_1": "",
				// 	"add_line_2": ""
				// },
				"view": {
					showTrue: true,
					showFalse: false,
					showEditBtn: "Edit",
				},
				"orderDetail": [],
				"itemsInOrder":[],
				"orderNo": 0,

			};

			var jsonModel = new JSONModel();
			jsonModel.setData(oJsondata);
			this.getView().setModel(jsonModel, "orModel");
		},

		onObjectMatched: function (oEvent) {
			var sOrderNo = oEvent.getParameter("arguments").ordrNo;
			this.getView().getModel("orModel").setProperty("/orderNo", sOrderNo)
			this.readOrder();
			this.readItems();
		},


		readOrder: function () {
			var sId = this.getView().getModel("orModel").getProperty("/orderNo")
			this.ajaxUtil.get("/order/" + sId, function (oData) {
				console.log(oData.data[0])
				this.getView().getModel("orModel").setProperty("/orderDetail", oData.data[0]);
				this.getView().getModel("orModel").refresh();
			}.bind(this), function (xHrx) {

			}, {});
		},


		
		readItems: function () {
			var sId = this.getView().getModel("orModel").getProperty("/orderNo")
			this.ajaxUtil.get("/items/"+sId, function (oData) {
				var sData = oData.data;
				console.log(sData)
				this.getView().getModel("orModel").setProperty("/itemsInOrder", sData);
				this.getView().getModel("orModel").refresh();
			}.bind(this), function (xHrx) {

			}, {});
		},
				
		


		// ===================Order===============================
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

