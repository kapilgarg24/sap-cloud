sap.ui.define([
	"sap/ui/core/UIComponent"
], function (UIComponent) {
	"use strict";
	return UIComponent.extend("custmanage.Component", {

		metadata : {
			manifest: "json",
		},

	
		init : function () {
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
		},
		destroy : function () {
			return UIComponent.prototype.destroy.apply(this, arguments);
		},
	});
});