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

], function (baseController,JSONModel,ajaxUtil,MessageBox,MessageToast,Fragment,formatter,DateFormat){

	"use strict";
	return baseController.extend("custmanage.controller.Home", {
		// life cycle methods
		ajaxUtil: ajaxUtil,
		formatter:formatter,

		onInit: function () {
			// for auto refresh when employee created successfully
			this.getOwnerComponent().getRouter().getRoute("home").attachPatternMatched(this.onObjectMatched, this);

			var oJsondata = {
				"header":{
			"customer_id": 0,
            "first_name": "",
            "last_name": "",
            "middle_name": "",
            "gender": "F",
            "date_of_birth": null,
            "is_active_check": false,
            "marital_status_radio": 0,
            "country_code": "",
            "mobile_no": "",
            "alt_country_code": "",
            "alt_mobile": "",
            "email_add": "",
            "alt_email_add": ""
				},
			"view":{
				showTrue:true,
				showFalse:false,
				showEditBtn:"Edit",
				},
			"filters":{
				"first_name":'',
				"gender":'',
				"is_active":''
			},
			"state":{
				"stateSuc":"Success",
				"stateErr":"error"
			},
			"custDetail":[],
			};

			var jsonModel = new JSONModel();
			jsonModel.setData(oJsondata);
			this.getView().setModel(jsonModel);
		},

		onObjectMatched: function () {
			// console.log("data refreshed")
			setTimeout(function(){
				var sGender = this.getModel("appModel").getProperty("/gender/0/key")
				var sAvtive = this.getModel("appModel").getProperty("/isActive/0/key")
				this.getModel().setProperty("/filters/gender",sGender)
				this.getModel().setProperty("/filters/is_active",sAvtive)
			// console.log(sGender);
			this.readCustomer();
			}.bind(this), 2000)

		},

			
		readCustomer: function () {
			var oFilter = this.getView().getModel().getProperty("/filters");
			this.ajaxUtil.get("/customer", function (oData) {
				this.getView().getModel().setProperty("/custDetail", oData.data[0]);
				this.getView().getModel().refresh();
			}.bind(this), function (xHrx) {

			}, oFilter);
		},
		

		onButtnSubmit:function(){
			var oPayload = this.getView().getModel().getProperty("/header")
			// --------------------First Name--------------------------------//
			if(oPayload.first_name==""){
				MessageToast.show("First Name is mandatory.")
				return
			}
			if(oPayload.first_name.length>64){
				MessageToast.show("First Name length can't be greator than 64 digit.")
				return
			}
			if((oPayload.first_name).trim() == ""){
				MessageToast.show("First Name can not contain 'space'")
				return
			}
			// --------------------First Name--------------------------------//
			// --------------------Country Code--------------------------------//
			if(oPayload.country_code==""){
				MessageToast.show("Country Code is mandatory.")
				return
			}
			if(oPayload.country_code.length>8){
				MessageToast.show("Country Code length can't be greator than 8 digit.")
				return
			}
			if(isNaN(oPayload.country_code)== true ||(oPayload.country_code).trim() == ""){
				MessageToast.show("Country Code contains numbers only")
				return
			}
			// --------------------Country Code--------------------------------//
			// --------------------Mobile No--------------------------------//
			if(oPayload.mobile_no==""){
				MessageToast.show("Mobile number is mandatory.")
				return
			}

			if(oPayload.mobile_no.trim() == "" || isNaN(oPayload.mobile_no)== true){
				MessageToast.show("Mobile number contains numbers only")
				return
			}

			if((oPayload.mobile_no.trim()).length!==10){
				MessageToast.show("Mobile number length must be of 10 numbers only.")
				return
			}
			
			// --------------------Mobile No--------------------------------//
			// --------------------Email Id--------------------------------//
			if(oPayload.email_add==""){
				MessageToast.show("Email Id is mandatory.")
				return
			}
			if(oPayload.email_add.length>100){
				MessageToast.show("Email Id length can't be greator than 100 digit.")
				return
			}
			if((oPayload.email_add).trim() == ""){
				MessageToast.show("Email Id can not contain 'space'")
				return
			}
			// --------------------Email Id--------------------------------//

			oPayload.date_of_birth = this.formatter.fnFormatDate(oPayload.date_of_birth);
			oPayload.marital_status = oPayload.marital_status==0?"M":"U";
			oPayload.is_active = oPayload.is_active==true?"Y":"N";
			this.ajaxUtil.post("/customer",function(oData){
				console.log(oData)
				if(oData.status == 405){
					MessageBox.error("Customer already exist .");
				}else if (oData.status == 500){
					MessageBox.error("Something went wrong."+oData.error);
				}else{
					
					MessageBox.success("Employee created successfully .", {
						actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
						emphasizedAction: MessageBox.Action.OK,
						onClose: function (sAction) {
							if(MessageBox.Action.OK == sAction){
								this.addNewCustomerClose();
								this.readCustomer();
								this.onReset();
								
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



	submitUpdatedData:function(){
		var oPayload = this.getView().getModel().getProperty("/header")
		// --------------------First Name--------------------------------//
		if(oPayload.first_name==""){
			MessageToast.show("First Name is mandatory.")
			return
		}
		if(oPayload.first_name.length>64){
			MessageToast.show("First Name length can't be greator than 64 digit.")
			return
		}
		if((oPayload.first_name).trim() == ""){
			MessageToast.show("First Name can not contain 'space'")
			return
		}
		// --------------------First Name--------------------------------//
		// --------------------Country Code--------------------------------//
		if(oPayload.country_code==""){
			MessageToast.show("Country Code is mandatory.")
			return
		}
		if(oPayload.country_code.length>8){
			MessageToast.show("Country Code length can't be greator than 8 digit.")
			return
		}
		if(isNaN(oPayload.country_code)== true ||(oPayload.country_code).trim() == ""){
			MessageToast.show("Country Code contains numbers only")
			return
		}
		// --------------------Country Code--------------------------------//
		// --------------------Mobile No--------------------------------//
		if(oPayload.mobile_no==""){
			MessageToast.show("Mobile number is mandatory.")
			return
		}

		if(oPayload.mobile_no.trim() == "" || isNaN(oPayload.mobile_no)== true){
			MessageToast.show("Mobile number contains numbers only")
			return
		}

		if((oPayload.mobile_no.trim()).length!==10){
			MessageToast.show("Mobile number length must be of 10 numbers only.")
			return
		}
		
		// --------------------Mobile No--------------------------------//
		// --------------------Email Id--------------------------------//
		if(oPayload.email_add==""){
			MessageToast.show("Email Id is mandatory.")
			return
		}
		if(oPayload.email_add.length>100){
			MessageToast.show("Email Id length can't be greator than 100 digit.")
			return
		}
		if((oPayload.email_add).trim() == ""){
			MessageToast.show("Email Id can not contain 'space'")
			return
		}
		// --------------------Email Id--------------------------------//
		oPayload.date_of_birth = this.formatter.fnFormatDate(oPayload.date_of_birth);
		oPayload.marital_status = oPayload.marital_status_radio==0?"M":"U";
		oPayload.is_active = oPayload.is_active_check==true?"Y":"N";
		this.ajaxUtil.put("/customer",function(oData){
			console.log(oData)
			if(oData.status == 200){
				
				MessageBox.success("Customer updted successfully.", {
					actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
					emphasizedAction: MessageBox.Action.OK,
					onClose: function (sAction) {
							this.editCustomerClose();
							this.readCustomer();
							this.onReset();

						MessageToast.show("Action selected: " + sAction);
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

	onReset:function(){
		this.getModel().setProperty("/header/customer_id",0);
		this.getModel().setProperty("/header/first_name","");
		this.getModel().setProperty("/header/last_name","");
		this.getModel().setProperty("/header/middle_name","");
		this.getModel().setProperty("/header/gender","F");
		this.getModel().setProperty("/header/date_of_birth",null);
		this.getModel().setProperty("/header/is_active_check",false);
		this.getModel().setProperty("/header/marital_status_radio",0);
		this.getModel().setProperty("/header/country_code","");
		this.getModel().setProperty("/header/mobile_no","");
		this.getModel().setProperty("/header/alt_country_code","");
		this.getModel().setProperty("/header/alt_mobile","");
		this.getModel().setProperty("/header/email_add","");
		this.getModel().setProperty("/header/alt_email_add","");
		},
		

		
		// -------------------Dialog Box Function--------------

		addNewCustomerPress:function(){
			return this.fnDialog("addNewCustomer");
		},

		addNewCustomerClose:function(){
			this.fnDialogClose("addNewCustomer")
		},


		editCustomer:function(oEvent){
			this.getModel().setProperty("/view/showEditBtn","Edit");
			this.getModel().setProperty("/view/showFalse",false);
			var sContext = oEvent.getSource().getParent().getParent().getBindingContext();
			var sData = sContext.getProperty();
			var isActiveCheck = sData.is_active=="Y"?true:false;
			var marStatusRadio = sData.marital_status=="M"?0:1
				this.getView().getModel().setProperty("/header/customer_id", sData.customer_id);
				this.getView().getModel().setProperty("/header/first_name", sData.first_name);
				this.getView().getModel().setProperty("/header/last_name", sData.last_name);
				this.getView().getModel().setProperty("/header/middle_name", sData.middle_name);
				this.getView().getModel().setProperty("/header/date_of_birth", sData.date_of_birth);
				this.getView().getModel().setProperty("/header/gender", sData.gender);
				this.getView().getModel().setProperty("/header/is_active_check",isActiveCheck );
				this.getView().getModel().setProperty("/header/marital_status_radio", marStatusRadio );
				this.getView().getModel().setProperty("/header/country_code", sData.country_code);
				this.getView().getModel().setProperty("/header/mobile_no", sData.mobile_no);
				this.getView().getModel().setProperty("/header/alt_country_code", sData.alt_country_code);
				this.getView().getModel().setProperty("/header/alt_mobile", sData.alt_mobile);
				this.getView().getModel().setProperty("/header/email_add", sData.email_add);
				this.getView().getModel().setProperty("/header/alt_email_add", sData.alt_email_add);
			return this.fnDialog("EditCustomer")

		},

		editCustomerClose:function(){
			this.fnDialogClose("EditCustomer")
			this.onReset();
		},

		onEditBtnPress:function(oEvent){	
			var sBinding = oEvent.getSource().getBinding("text")
			var sValue = sBinding.oValue

			if(sValue=="Edit"){
				this.getModel().setProperty("/view/showEditBtn","Submit");
				this.getModel().setProperty("/view/showFalse",true);
			} else {
					return this.submitUpdatedData();
			}
		},
	// -------------------Dialog Box Function--------------

	moreCustDetails: function (oEvent) {
		var sContext = oEvent.getSource().getBindingContext();
		var sId = sContext.getProperty("customer_id");
		this.getOwnerComponent().getRouter().navTo("customerDetails", {
			custId: sId,
		})
	},
	
	// =======================filter bar==========================

	onCustSearch:function(){
		this.readCustomer()		
	},

	// =======================filter bar==========================
	
	productDetailsPress:function(){
		this.getOwnerComponent().getRouter().navTo("productsDetail")

	}


	});
});

