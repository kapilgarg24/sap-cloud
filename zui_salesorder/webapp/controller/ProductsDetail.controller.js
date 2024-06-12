sap.ui.define([
	"custmanage/controller/baseController",
	// "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"custmanage/util/ajaxUtil",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"custmanage/util/formatter",
	"sap/ui/core/routing/History"

], function (baseController,JSONModel,ajaxUtil,MessageBox,MessageToast,Fragment,formatter,History){

	"use strict";
	return baseController.extend("custmanage.controller.ProductsDetail", {
		// life cycle methods
		ajaxUtil: ajaxUtil,
		formatter:formatter,

		onInit: function () {
			// for auto refresh when employee created successfully
			this.getOwnerComponent().getRouter().getRoute("productsDetail").attachPatternMatched(this.onObjectMatched, this);


			var oJsondata = {
				"header":{
			"product_id": 0,
            "product_desc": "",
            "product_category": "cat_c",
            "product_price": 0,
            "product_status": "N"
            },
			"view":{
				showTrue:true,
				showFalse:false,
				showEditBtn:"Edit",
				},
			"filters":{
				"product_price":0,
				"product_status":'',
				"product_category":''
			},
			"getProdDetails":[],
			// "prod_status":[{"key": "N" , "value":"New"}],
			};

			var jsonModel = new JSONModel();
			jsonModel.setData(oJsondata);
			this.getView().setModel(jsonModel, "prModel");
		},

		onObjectMatched: function () {
			console.log("data refreshed")
			this.readProduct();
		},

			
		readProduct: function () {
			this.ajaxUtil.get("/products", function (oData) {
				var sData = oData.data[0];
				console.log(sData)
				this.getView().getModel("prModel").setProperty("/getProdDetails", sData);
				this.getView().getModel("prModel").refresh();
			}.bind(this), function (xHrx) {

			}, {});
		},
		

		prodSubmitBtn:function(){
			var oPayload = this.getView().getModel("prModel").getProperty("/header")
			// oPayload.product_category = oPayload.prod_category_index==0?"cat_g":"cat_c";
			// oPayload.is_active = oPayload.is_active==true?"Y":"N";
			this.ajaxUtil.post("/products",function(oData){
				console.log(oData)
				if(oData.status == 405){
					MessageBox.error("Customer already exist .");
				}else if (oData.status == 500){
					MessageBox.error("Something went wrong."+oData.error);
				}else{
					
					MessageBox.success("Product created successfully .", {
						actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
						emphasizedAction: MessageBox.Action.OK,
						onClose: function (sAction) {
							if(MessageBox.Action.OK == sAction){
								this.addNewProductClose();
								this.readProduct();	
								// this.onProdSearch();				
								
							}else{
								this.onReset();
						}
							MessageToast.show("Action selected: " + sAction);
						}.bind(this)
					});
					
				}
			}.bind(this),function(xHrx){

			},oPayload);

		},


	updateProduct:function(oEvent){
		this.getModel("prModel").setProperty("/view/showEditBtn","Edit");
		this.getModel("prModel").setProperty("/view/showFalse",false);

			var sContext = oEvent.getSource().getParent().getBindingContext("prModel");
			var sData = sContext.getProperty();
			console.log(sData);
			var oModel = this.getView().getModel("prModel")
				oModel.setProperty("/header/product_id", sData.product_id);
				oModel.setProperty("/header/product_desc", sData.product_desc);
				oModel.setProperty("/header/product_category", sData.product_category);
				oModel.setProperty("/header/product_price", sData.product_price);
				oModel.setProperty("/header/product_status", sData.product_status);
			return this.fnDialog("EditProduct")

		},



	submitUpdatedData:function(){
		var oPayload = this.getView().getModel("prModel").getProperty("/header")
		this.ajaxUtil.put("/products",function(oData){
			console.log(oData)
			if(oData.status == 200){
				
				MessageBox.success("Product updated successfully.", {
					actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
					emphasizedAction: MessageBox.Action.OK,
					onClose: function (sAction) {
							this.prodEditBtnClose();
							// this.readProduct();
							this.onProdSearch();	

						MessageToast.show("Action selected: " + sAction);
					}.bind(this)
				});
			}else if (oData.status == 500){
				MessageBox.error("Something went wrong."+oData.error);
			}else{				
				MessageBox.error("Product not found.");				
			}
		}.bind(this),function(xHrx){

		},oPayload);


		},

	onReset:function(){
		this.getView().getModel("prModel").setProperty("/header/product_id",0)
		this.getView().getModel("prModel").setProperty("/header/product_desc","")
		this.getView().getModel("prModel").setProperty("/header/product_category","cat_c")
		this.getView().getModel("prModel").setProperty("/header/product_price",0)
		this.getView().getModel("prModel").setProperty("/header/product_status","N")
	},

		

		
		// -------------------Dialog Box Function--------------

		addNewProductPress:function(){
			this.fnDialog("addNewProduct");
			
		},

		addNewProductClose:function(){
			this.fnDialogClose("addNewProduct")
			this.onReset();	
			
		},


		prodEditBtnClose:function(){
			this.fnDialogClose("EditProduct")
			this.onReset();
		},

		prodEditBtn:function(oEvent){	
			var sBinding = oEvent.getSource().getBinding("text")
			var sValue = sBinding.oValue

			if(sValue=="Edit"){
				this.getModel("prModel").setProperty("/view/showEditBtn","Submit");
				this.getModel("prModel").setProperty("/view/showFalse",true);
			} else {
					return this.submitUpdatedData();
			}
		},
	// -------------------Dialog Box Function--------------
	
	deleteProduct:function(oEvent){
		var sContext = oEvent.getSource().getParent().getBindingContext("prModel");
		var sId = sContext.getProperty("product_id");
		var oPayload = { "product_id": sId };
		MessageBox.warning("Are you sure? you want to delete Product:" + sId, {
			actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
			emphasizedAction: MessageBox.Action.OK,
			onClose: function (sAction) {
				if (MessageBox.Action.OK == sAction) {
					
					this.ajaxUtil.put("/products/tempDelete", function (oData) {
						MessageToast.show("Product: " + sId + " is deleted.");
						// this.readProduct();
						this.onProdSearch();
					}.bind(this), function (xHrx) {
						
					},oPayload);
				}
			}.bind(this)
		});
		
	},

	// =======================filter bar==========================

	onProdSearch:function(){
		var oFilter = this.getView().getModel("prModel").getProperty("/filters");
		this.ajaxUtil.get("/products", function (oData) {
			// console.log(oData)
			this.getView().getModel("prModel").setProperty("/getProdDetails", oData.data[0]);
			this.getView().getModel("prModel").refresh();
		}.bind(this), function (xHrx) { },oFilter);
	},

	// =======================filter bar==========================

	prodStatusUpdate:function(oEvent){
		var sContext = oEvent.getSource().getParent().getBindingContext("prModel");
		var sProdStatus = sContext.getProperty("prod_status_text");
		var sId = sContext.getProperty("product_id");
		var sStatus = this.formatter.fnProdStatusCode(sProdStatus);
		var oPayload = {
			"product_id": sId,
			"product_status": sStatus
		};

		this.ajaxUtil.put("/products/status",function(oData){
			// console.log(oData)
			if(oData.status == 200){
				
				MessageBox.success("Status updted successfully.", {
					actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
					emphasizedAction: MessageBox.Action.OK,
					onClose: function (sAction) {
							// this.readProduct();
							this.onProdSearch();
					}.bind(this)
				});
			}else if (oData.status == 500){
				MessageBox.error("Something went wrong."+oData.error);
			}else{				
				MessageBox.error("Customer not found.");				
			}
		}.bind(this),function(xHrx){

		},oPayload);
	},

	onNavBack() {
		const oHistory = History.getInstance();
		const sPreviousHash = oHistory.getPreviousHash();
		console.log(sPreviousHash)
		if (sPreviousHash !== undefined) {
			history.go(-1);
		} else {
			this.getOwnerComponent().getRouter().navTo("home", {}, true);
			// sap.ui.core.UIComponent.getRouterFor(this).navTo("home")
		}
	},

	});
});

