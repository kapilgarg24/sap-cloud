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

], function (baseController, JSONModel, ajaxUtil, MessageBox, MessageToast, Fragment, formatter, DateFormat) {

	"use strict";
	return baseController.extend("custmanage.controller.Login", {
		// life cycle methods
		ajaxUtil: ajaxUtil,
		formatter: formatter,

		onInit: function () {
			// for auto refresh when employee created successfully
			this.getOwnerComponent().getRouter().getRoute("login").attachPatternMatched(this.onObjectMatched, this);

			var oJsondata = {
				"header": {
					"user_name": "",
					"user_password": "",
				},
				"view": {
					showTrue: true,
					showFalse: false,
					showEditBtn: "Edit",
				},
				"state": {
					"stateSuc": "Success",
					"stateErr": "error"
				},
				"custDetail": "",
				"wrongAttempts":0
			};

			var jsonModel = new JSONModel();
			jsonModel.setData(oJsondata);
			this.getView().setModel(jsonModel, "loginModel");
		},

		onObjectMatched: function () {
			// this.readCustomer();
		},


		onButtnSubmit: function () {
			var custUserName = this.getView().getModel("loginModel").getProperty("/header/user_name")
			this.ajaxUtil.get("/login/check", function (oData) {
				if (oData.status == 404) {
					// MessageBox.error("Invalid username or password");
					MessageBox.error("Invalid Username");
				} else if (oData.status == 500) {
					MessageBox.error("Something went wrong. " + oData.error);
				} else {
					var oCustData = oData.data[0];
					console.log(oCustData.no_of_try)
					this.getView().getModel("loginModel").setProperty("/wrongAttempts", oCustData.no_of_try);
					this.getView().getModel("loginModel").refresh();
					
					if(oCustData.no_of_try<5){
						this.loginWithPassword();
					}
					else{
						MessageBox.show("You have exceeded maximum number of wrong attempts");
					}
					
					
				}
			}.bind(this), function (xHrx) {

			}, {user_name:custUserName});

		},



		loginWithPassword:function(){
			var oPayload = this.getView().getModel("loginModel").getProperty("/header")
				console.log(oPayload)
			this.ajaxUtil.get("/login", function (oData) {
				if (oData.status == 404) {
					MessageBox.error("Password is incorrect");
					var sWrongAttempts = this.getView().getModel("loginModel").getProperty("/wrongAttempts")
					var sNoOfTry = sWrongAttempts+1;
					this.updateAttempts(sNoOfTry);
				} else if (oData.status == 500) {
					MessageBox.error("Something went wrong." + oData.error);
				} else {
					var oCustData = oData.data[0];
					this.getView().getModel("loginModel").setProperty("/custDetail", oCustData);
					this.getView().getModel("loginModel").refresh();
					this.updateAttempts(0);
					var userName = this.getView().getModel("loginModel").getProperty("/header/user_name");
					var userPassword = this.getView().getModel("loginModel").getProperty("/header/user_password");
					this.getView().getModel("appModel").setProperty("/login/user_name",userName);
					this.getView().getModel("appModel").setProperty("/login/user_password",userPassword);
					if (oCustData.user_type == "C") {
						var sId = this.getView().getModel("loginModel").getProperty("/custDetail/id");
						this.getOwnerComponent().getRouter().navTo("customerDetails", {
							custId: sId,
						})
					} else {
						this.getOwnerComponent().getRouter().navTo("home")
					}
				}
			}.bind(this), function (xHrx) {

			},oPayload);

		},

		updateAttempts:function(attempts){
			var custUsername = this.getView().getModel("loginModel").getProperty("/header/user_name")
			var oPayload = {
				noOfTry: attempts,
				user_name: custUsername 
			}
			this.ajaxUtil.put("/login/attempts", function (oData) {
					
			}.bind(this), function (xHrx) {

			}, oPayload);

		},






		// onReset: function () {
		// 	this.getModel("loginModel").setProperty("/header/customer_id", 0);
		// 	this.getModel("loginModel").setProperty("/header/first_name", "");
		// },



		// -------------------Dialog Box Function--------------

		// addNewCustomerPress: function () {
		// 	return this.fnDialog("addNewCustomer");
		// },

		// addNewCustomerClose: function () {
		// 	this.fnDialogClose("addNewCustomer")
		// },



		// onEditBtnPress: function (oEvent) {
		// 	var sBinding = oEvent.getSource().getBinding("text")
		// 	var sValue = sBinding.oValue

		// 	if (sValue == "Edit") {
		// 		this.getModel("loginModel").setProperty("/view/showEditBtn", "Submit");
		// 		this.getModel("loginModel").setProperty("/view/showFalse", true);
		// 	} else {
		// 		return this.submitUpdatedData();
		// 	}
		// },
		// -------------------Dialog Box Function--------------


	});
});

