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
	return baseController.extend("custmanage.controller.CustomerDetails", {
		// life cycle methods
		ajaxUtil: ajaxUtil,
		formatter: formatter,

		onInit: function () {
			// for auto refresh when employee created successfully
			this.getOwnerComponent().getRouter().getRoute("customerDetails").attachPatternMatched(this.onObjectMatched, this);

			var oJsondata = {

				"header": {
					"address_id": 0,
					"address_type": "P",
					"add_line_1": "",
					"add_line_2": "",
					"add_line_3": "",
					"street": "",
					"city": "",
					"state": "",
					"postal_code": "",
					"country": "",
				},

				addOrder:{
				"address_type":"",
				// "order_date":new Date(),
				"final_amount":0
				},
				
			

				addItems:[{
				"product_id":"",
				"category":"",
				"prod_desc":"",
				"unit_price":0,
				"quantity":0,
				"total_price":0}],

				"view": {
					showTrue: true,
					showFalse: false,
					showEditBtn: "Edit",
				},
				"custAllDetail": [],
				"addDetails": [],
				"orderDetail": [],
				"customerId": 0,
				"products":[],
				"orderNumber":0

			};

			var jsonModel = new JSONModel();
			jsonModel.setData(oJsondata);
			this.getView().setModel(jsonModel);
		},

		onObjectMatched: function (oEvent) {
			var sCustId = oEvent.getParameter("arguments").custId;
			this.getView().getModel().setProperty("/customerId", sCustId)
			var userId=this.getView().getModel("appModel").getProperty("/login/custId");
			// if (user_name==""){
				if(userId==sCustId){
					this.readCustomer();
					this.readProduct();
			}else{
					this.getOwnerComponent().getRouter().navTo("login")
			}
		},


		readCustomer: function () {
			var sId = this.getView().getModel().getProperty("/customerId")
			this.ajaxUtil.get("/customer/" + sId + "/allDetails", function (oData) {
				console.log(oData)
				this.getView().getModel().setProperty("/custAllDetail", oData.data[0]);
				this.getView().getModel().setProperty("/addDetails", oData.data[0].address);
				this.getView().getModel().setProperty("/orderDetail", oData.data[0].ORDERS);
				this.getView().getModel().refresh();
			}.bind(this), function (xHrx) {

			}, {});
		},


		inActiveCustomerPress: function (oEvent) {
			var sId = this.getView().getModel().getProperty("/customerId")
			console.log(sId);

			MessageBox.warning("Are you sure? you want to inactive Customer:" + sId, {
				actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
				emphasizedAction: MessageBox.Action.OK,
				onClose: function (sAction) {
					if (MessageBox.Action.OK == sAction) {

						this.ajaxUtil.put("/customer/" + sId + "/active", function (oData) {
							console.log("Inactive")
							console.log(oData)
							MessageToast.show("Customer: " + sId + " inactivated successfully.");
							this.readCustomer();
						}.bind(this), function (xHrx) {

						}, {});
					}
				}.bind(this)
			});

		},

		activeCustomerPress: function (oEvent) {
			var sId = this.getView().getModel().getProperty("/customerId")
			console.log(sId);

			MessageBox.warning("Active Customer:" + sId, {
				actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
				emphasizedAction: MessageBox.Action.OK,
				onClose: function (sAction) {
					if (MessageBox.Action.OK == sAction) {

						this.ajaxUtil.put("/customer/" + sId + "/inactive", function (oData) {
							console.log(oData)
							MessageToast.show("Customer: " + sId + " activated successfully.");
							this.readCustomer();
						}.bind(this), function (xHrx) {

						}, {});
					}
				}.bind(this)
			});

		},

		deleteCustomerPress: function (oEvent, url) {
			var sId = this.getView().getModel().getProperty("/customerId")
			// var oPayload = { id: sId };
			MessageBox.warning("Permanent delete Employee:" + sId, {
				actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
				emphasizedAction: MessageBox.Action.OK,
				onClose: function (sAction) {
					if (MessageBox.Action.OK == sAction) {

						this.ajaxUtil.delete("/customer/" + sId, function (oData) {
							console.log(oData)
							MessageToast.show("Customer: " + sId + "permanently deleted successfully.");
							this.onNavBack();
						}.bind(this), function (xHrx) {

						}, {});
					}
				}.bind(this)
			});

		},

		moreOrderDetails: function (oEvent) {
			var sContext = oEvent.getSource().getBindingContext();
			var sId = sContext.getProperty("ORDER_NO");
			this.getOwnerComponent().getRouter().navTo("items", {
				ordrNo: sId,
			})
		},

		// ===================================address======================================

		addNewAddressSubmit: function () {
			var oPayload = this.getView().getModel().getProperty("/header")
			
			// --------------------Address Id--------------------------------//
			if(oPayload.address_id==""){
				MessageToast.show("Address Id is mandatory.")
				return
			}
			if((oPayload.address_id.trim()).length>4){
				MessageToast.show("Address Id length can't be greator than 4 number.")
				return
			}
			if((oPayload.address_id).trim() == "" || isNaN(oPayload.address_id)== true){
				MessageToast.show("Address Id contains number only")
				return
			}
			// --------------------Address Id--------------------------------//
			// --------------------Address Line 1--------------------------------//
			if(oPayload.add_line_1==""){
				MessageToast.show("Address Line 1 is mandatory.")
				return
			}
			if(oPayload.add_line_1.length>128){
				MessageToast.show("Address Line 1 length can't be greator than 128 digit.")
				return
			}
			if((oPayload.add_line_1).trim() == ""){
				MessageToast.show("Address Line 1 can not contain 'space' ")
				return
			}
			// --------------------Address Line 1--------------------------------//
			// --------------------City--------------------------------//
			if(oPayload.city==""){
				MessageToast.show("City is mandatory.")
				return
			}
			if(oPayload.city.length>32){
				MessageToast.show("City length can't be greator than 32 digit.")
				return
			}
			if((oPayload.city).trim() == ""){
				MessageToast.show("City can not contain 'space' ")
				return
			}
			
			// --------------------City--------------------------------//
			// --------------------State--------------------------------//
			if(oPayload.state==""){
				MessageToast.show("State is mandatory.")
				return
			}
			if(oPayload.state.length>32){
				MessageToast.show("State length can't be greator than 32 digit.")
				return
			}
			if((oPayload.state).trim() == ""){
				MessageToast.show("State can not contain 'space' ")
				return
			}
			
			// --------------------State--------------------------------//
			// --------------------Country--------------------------------//
			if(oPayload.country==""){
				MessageToast.show("Country is mandatory.")
				return
			}
			if(oPayload.country.length>32){
				MessageToast.show("Country length can't be greator than 32 digit.")
				return
			}
			if((oPayload.country).trim() == ""){
				MessageToast.show("Country can not contain 'space' ")
				return
			}
			
			// --------------------Country--------------------------------//

			// --------------------Postal Code--------------------------------//
			if(oPayload.postal_code==""){
				MessageToast.show("Postal Code is mandatory.")
				return
			}
			if(oPayload.postal_code.length>32){
				MessageToast.show("Postal Code length can't be greator than 32 digit.")
				return
			}
			if((oPayload.postal_code).trim() == ""){
				MessageToast.show("Postal Code can not contain 'space' ")
				return
			}
			
			// --------------------Postal Code--------------------------------//
			
			var sId = this.getView().getModel().getProperty("/customerId")
			oPayload.customer_id = sId;
			this.ajaxUtil.post("/address", function (oData) {
				console.log(oData)
				if (oData.status == 405) {
					MessageBox.error("Adddress Id already exist.");
				} else if (oData.status == 500) {
					MessageBox.error("Something went wrong." + oData.error);
				} else {

					MessageBox.success("Address added successfully .", {
						actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
						emphasizedAction: MessageBox.Action.OK,
						onClose: function (sAction) {
							if (MessageBox.Action.OK == sAction) {
								this.addNewAddressClose();
								this.readCustomer();

							} else {
								// this.onReset();
								alert("something went wrong")
							}
							MessageToast.show("Action selected: " + sAction);
						}.bind(this)
					});

				}
			}.bind(this), function (xHrx) {

			}, oPayload);

		},


		updateAddressPress: function (oEvent) {
			this.getModel().setProperty("/view/showEditBtn", "Edit");
			this.getModel().setProperty("/view/showFalse", false);
			var sContext = oEvent.getSource().getParent().getBindingContext();
			var sData = sContext.getProperty();
			// console.log(sData);
			var oModel = this.getView().getModel()
			oModel.setProperty("/header/address_id", sData.ADDRESS_ID);
			oModel.setProperty("/header/address_type", sData.ADDRESS_TYPE);
			oModel.setProperty("/header/add_line_1", sData.ADD_LINE_1);
			oModel.setProperty("/header/add_line_2", sData.ADD_LINE_2);
			oModel.setProperty("/header/add_line_3", sData.ADD_LINE_3);
			oModel.setProperty("/header/street", sData.STREET);
			oModel.setProperty("/header/city", sData.CITY);
			oModel.setProperty("/header/state", sData.STATE);
			oModel.setProperty("/header/postal_code", sData.POSTAL_CODE);
			oModel.setProperty("/header/country", sData.COUNTRY);
			return this.fnDialog("editAddress")
		},



		submitUpdatedData: function () {
			var oPayload = this.getView().getModel().getProperty("/header")
			// --------------------Address Id--------------------------------//
			if(oPayload.address_id==""){
				MessageToast.show("Address Id is mandatory.")
				return
			}
			// if((oPayload.address_id.trim()).length>4){
			// 	MessageToast.show("Address Id length can't be greator than 4 number.")
			// 	return
			// }
			// if((oPayload.address_id).trim() == "" || isNaN(oPayload.address_id)== true){
			// 	MessageToast.show("Address Id contains number only")
			// 	return
			// }
			// --------------------Address Id--------------------------------//
			// --------------------Address Line 1--------------------------------//
			if(oPayload.add_line_1==""){
				MessageToast.show("Address Line 1 is mandatory.")
				return
			}
			if(oPayload.add_line_1.length>128){
				MessageToast.show("Address Line 1 length can't be greator than 128 digit.")
				return
			}
			if((oPayload.add_line_1).trim() == ""){
				MessageToast.show("Address Line 1 can not contain 'space' ")
				return
			}
			// --------------------Address Line 1--------------------------------//
			// --------------------City--------------------------------//
			if(oPayload.city==""){
				MessageToast.show("City is mandatory.")
				return
			}
			if(oPayload.city.length>32){
				MessageToast.show("City length can't be greator than 32 digit.")
				return
			}
			if((oPayload.city).trim() == ""){
				MessageToast.show("City can not contain 'space' ")
				return
			}
			
			// --------------------City--------------------------------//
			// --------------------State--------------------------------//
			if(oPayload.state==""){
				MessageToast.show("State is mandatory.")
				return
			}
			if(oPayload.state.length>32){
				MessageToast.show("State length can't be greator than 32 digit.")
				return
			}
			if((oPayload.state).trim() == ""){
				MessageToast.show("State can not contain 'space' ")
				return
			}
			
			// --------------------State--------------------------------//
			// --------------------Country--------------------------------//
			if(oPayload.country==""){
				MessageToast.show("Country is mandatory.")
				return
			}
			if(oPayload.country.length>32){
				MessageToast.show("Country length can't be greator than 32 digit.")
				return
			}
			if((oPayload.country).trim() == ""){
				MessageToast.show("Country can not contain 'space' ")
				return
			}
			
			// --------------------Country--------------------------------//
			// --------------------Postal Code--------------------------------//
			if(oPayload.postal_code==""){
				MessageToast.show("Postal Code is mandatory.")
				return
			}
			if(oPayload.postal_code.length>32){
				MessageToast.show("Postal Code length can't be greator than 32 digit.")
				return
			}
			if((oPayload.postal_code).trim() == ""){
				MessageToast.show("Postal Code can not contain 'space' ")
				return
			}
			// --------------------Postal Code--------------------------------//

			var sId = this.getView().getModel().getProperty("/customerId")			
			oPayload.customer_id = sId;

			this.ajaxUtil.put("/address", function (oData) {
				// console.log(oData)
				if (oData.status == 200) {
					MessageBox.success("Address updated successfully.", {
						actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
						emphasizedAction: MessageBox.Action.OK,
						onClose: function (sAction) {
							this.updateAddressCloseBtn();
							this.readCustomer();
							MessageToast.show("Action selected: " + sAction);
						}.bind(this)
					});
				} else if (oData.status == 500) {
					MessageBox.error("Something went wrong." + oData.error);
				} else {
					MessageBox.error("Address not found.");
				}
			}.bind(this), function (xHrx) {
			}, oPayload);
		},

		onReset: function () {
			var oModel = this.getView().getModel()
			oModel.setProperty("/header/address_id", 0)
			oModel.setProperty("/header/address_type", "P")
			oModel.setProperty("/header/add_line_1", "")
			oModel.setProperty("/header/add_line_2", "")
			oModel.setProperty("/header/add_line_3", "")
			oModel.setProperty("/header/street", "")
			oModel.setProperty("/header/city", "")
			oModel.setProperty("/header/state", "")
			oModel.setProperty("/header/postal_code", "")
			oModel.setProperty("/header/country", "")
		},


		editAddressBtn: function (oEvent) {
			var sBinding = oEvent.getSource().getBinding("text")
			var sValue = sBinding.oValue

			if (sValue == "Edit") {
				this.getModel().setProperty("/view/showEditBtn", "Submit");
				this.getModel().setProperty("/view/showFalse", true);
			} else {
				return this.submitUpdatedData();
			}
		},

		
		addNewAddressPress: function () {
			return this.fnDialog("addAddress");
		},
		
		addNewAddressClose: function () {
			this.fnDialogClose("addAddress")
			this.onReset();
		},

		updateAddressCloseBtn: function () {
			this.fnDialogClose("editAddress")
			this.onReset();
		},
		// ===================address================================
		
		// ===================Order===============================

		readProduct: function () {
			this.ajaxUtil.get("/products", function (oData) {
				var sData = oData.data;
				console.log(sData)
				this.getView().getModel().setProperty("/products", sData);
				this.getView().getModel().refresh();
			}.bind(this), function (xHrx) {

			}, {"product_status": "A"});
		},
				
		createOrderPress: function () {
			return this.fnDialog("createOrder");
		},

		createOrderClose: function () {
			this.fnDialogClose("createOrder");
			this.orderReset();
		},

		addNewItemPress:function () {
			this.getModel().getProperty("/addItems").push({
				"product_id":"",
				"category":"",
				"prod_desc":"",
				"unit_price":0,
				"quantity":0,
				"total_price":0})
				// data in push is that data we required in item table
			this.getModel().refresh()
		},
		
		deleteItemBtn:function(oEvent){
			var sSelProd = oEvent.getSource().getBindingContext().getObject();
			var oModel = this.getModel();
			var aProduct = oModel.getProperty("/addItems");
			var sIndex = aProduct.indexOf(sSelProd);
			aProduct.splice(sIndex,1);
			return this.finalTotalChange()
		},

		onProductChange:function(oEvent){
			var sSelProd = oEvent.getParameter("selectedItem").getBindingContext().getObject()
			var sRowPath = oEvent.getSource().getParent().getBindingContextPath();
			var sSelRow = this.getModel().getContext(sRowPath).getObject();
			sSelRow.unit_price = sSelProd.PRODUCT_PRICE;
			sSelRow.category = sSelProd.PROD_CATEGORY_TEXT;
			sSelRow.prod_desc = sSelProd.PRODUCT_DESC;
			// if customer add product and enter qty then total price will reflect automatically but  if customer chnage product then total price will not update hence below line need to put here too.
			sSelRow.total_price = sSelRow.unit_price * sSelRow.quantity;
			return this.finalTotalChange()
		},

		onQtyChange:function(oEvent){
			// var sQty = oEvent.getSource().getValue()
			// above line need in "livechange" event
			var sRowPath = oEvent.getSource().getParent().getBindingContextPath()
			var sSelRow = this.getModel().getContext(sRowPath).getObject();
			sSelRow.total_price = sSelRow.unit_price * sSelRow.quantity;
			return this.finalTotalChange()
			
		},

		finalTotalChange:function(){
			var aFinalOrder = this.getView().getModel().getProperty("/addItems")
			var finalAmount=0;
			for (var i = 0; i<aFinalOrder.length; i++){				
				finalAmount += aFinalOrder[i].total_price;					
			}			
			this.getModel().setProperty("/addOrder/final_amount", finalAmount)
			this.getModel().refresh()
		},

		onOrderButtnSubmit(){
			var rOrderNo = this.formatter.getRandomNumber(1,100);
			this.getView().getModel().setProperty("/orderNumber",rOrderNo)
			var sId = this.getModel().getProperty("/customerId")
			var oPayload = this.getView().getModel().getProperty("/addOrder")
			var fName = this.getView().getModel().getProperty("/custAllDetail/FIRST_NAME")
			var lName = this.getView().getModel().getProperty("/custAllDetail/LAST_NAME")
			oPayload.customer_id = sId;
			oPayload.order_date = this.formatter.fnFormatDate(new Date());
			oPayload.deliver_date = this.formatter.fnFormatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
			oPayload.customer_name = fName+" " + lName
			oPayload.order_no = rOrderNo;
			oPayload.order_status = "R"
			if (oPayload.final_amount == 0){
				return MessageBox.show("Add minimum one item")
			}
			this.ajaxUtil.post("/order", function (oData) {
				console.log(oData)
				if (oData.status == 405) {
					MessageBox.error("Order no already exist.");
				} else if (oData.status == 500) {
					MessageBox.error("Something went wrong." + oData.error);
				} else {

					MessageBox.success("Order created successfully .", {
						actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
						emphasizedAction: MessageBox.Action.OK,
						onClose: function (sAction) {
							if (MessageBox.Action.OK == sAction) {
								this.getItemsOfOrder();								
								}else {
								// this.onReset();
								alert("something went wrong")
							}
							MessageToast.show("Action selected: " + sAction);
						}.bind(this)
					});

				}
			}.bind(this), function (xHrx) {

			}, oPayload);

		},

		getItemsOfOrder:function(){
			var aAddItems = this.getView().getModel().getProperty("/addItems")
					for (var i=0; i<aAddItems.length; i++){
					var oPayload = aAddItems[i];
					console.log(aAddItems)
					oPayload.order_no = this.getView().getModel().getProperty("/orderNumber");
					this.ajaxUtil.post("/items", function (oItemData) {
			if (oItemData.status == 500) {
					MessageBox.error("Something went wrong." + oItemData.error);
				} else {
					this.createOrderClose();
					this.readCustomer();
				}
			}.bind(this), function (xHrx) {

			}, oPayload);
		};
	},


	orderReset:function(){
		var oModel = this.getView().getModel()
			oModel.setProperty("/addItems",[{
			"product_id":"",
			"category":"",
			"prod_desc":"",
			"unit_price":0,
			"quantity":0,
			"total_price":0}]);
			oModel.setProperty("/addOrder/address_type", "");
			oModel.setProperty("/addOrder/final_amount", 0);
	},

	orderStatusUpdate:function(oEvent){
		var sContext = oEvent.getSource().getParent().getBindingContext();
		var sOrderStatus = sContext.getProperty("ORDER_STATUS_TEXT");
		var sId = sContext.getProperty("ORDER_NO");
		var sStatus = this.formatter.fnToUpdateStatusCode(sOrderStatus);
		var oPayload = {
			"order_no": sId,
			"order_status": sStatus
		};
		if (sOrderStatus !== "Delivered"){
		this.ajaxUtil.put("/order/status",function(oData){
			console.log(oData)
			if(oData.status == 200){
				
				MessageBox.success("Status updted successfully.", {
					actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
					emphasizedAction: MessageBox.Action.OK,
					onClose: function (sAction) {
							// this.readProduct();
							this.readCustomer();
					}.bind(this)
				});
			}else{
				MessageBox.error("Something went wrong."+oData.error);
			}
		}.bind(this),function(xHrx){

		},oPayload);
	} else {
		MessageBox.show("Order already delivered")
	};
	},

		// ===================Order===============================
		onNavBack() {
			const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();
			console.log(sPreviousHash)
			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getOwnerComponent().getRouter().navTo("home", {}, true);
			}
		},

		makeOrderPress:function(oEvent){
			var sId = this.getModel().getProperty("/customerId")
			this.getOwnerComponent().getRouter().navTo("generateOrder", {
				custId: sId,
			})
		}


	});
});

