sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "custmanage/util/ajaxUtil",
    "sap/m/MessageToast",
	
], function (Controller,Fragment,ajaxUtil,MessageToast){
    "use strict";
	return Controller.extend("custmanage.controller.baseController", {
        ajaxUtil : ajaxUtil,
        
        getModel:function(sModel){
            return this.getView().getModel(sModel);
        },

        setModel:function(oData, sModel){
            return this.getView().setModel(oData, sModel);
        },
        getRouter:function(){
        return this.getOwnerComponent().getRouter();
        },

        showServiceError:function(xHrx){
            sap.m.MessageToast.show("Something went wrong with service.");
        },

        fnDialog:function(sDialogName){
			if(!this[sDialogName]){
				Fragment.load({name: "custmanage.fragments."+sDialogName, controller:this})
				.then(function(oContent){
					this[sDialogName] = oContent;
					this.getView().addDependent(this[sDialogName]);
					this[sDialogName].open();
				
				}.bind(this));
			} else {
				this[sDialogName].open();
			}
		},

		fnDialogClose:function(sDialogName){
			this[sDialogName].close();
		},

// =========================Validations================================
validationMandatory: function(param,id,text){
if(param==""){
    MessageToast.show(text+" is mandatory.")
    // id.setValueState("Error")
    // id.setValueStateText(text+" is mandatory")
    return;
}
// else{
//     id.setValueState("None")
//     id.setValueStateText("")
// }
},
validationGreaterLength: function(param,id,text,length){
if(param.length>length){
    MessageToast.show(text+" length can't be greator than "+length+" digit.")
    // id.setValueState("Error")
    // id.setValueStateText(text+" length can't be greator than "+length+" digit.")
    return;
}
// else{
//     id.setValueState("None")
//     id.setValueStateText("")
// }
},
validationForSpace: function(param,id,text){
if((param).trim() == ""){
    MessageToast.show(text+" must have a digit")
    // id.setValueState("Error")
    // id.setValueStateText(text+" must have a digit")
    return;
}
// else{
//     id.setValueState("None")
//     id.setValueStateText("")
// };
},

validationEqualLength: function(param,id,text,length){
if(param.length !== length){
    MessageToast.show(text+" length must be of "+length+" digit.")
    // id.setValueState("Error")
    // id.setValueStateText(text+" length must be of "+length+" digit.")
    return;
}
// else{
//     id.setValueState("None")
//     id.setValueStateText("")
// }
},

validationForNumber: function(param,id,text){
if(isNaN(param)== true){
    MessageToast.show(text+" contains numbers values only")
    // id.setValueState("Error")
    // id.setValueStateText(text+" contains numbers values only")
    return;
}
// else{
//     id.setValueState("None")
//     id.setValueStateText("")
// };
}





// =========================Validations================================




})

});
