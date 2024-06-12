sap.ui.define([], function() {
	return {
        fnIsMarried:function(isMarriedIndex){
            if(isMarriedIndex == "M"){
                return "Married"
            }
            return "Unmarried"
        },

        fnGender:function(gender){
			if(gender =="M"){
				return "Male";
			}else{
				return "Female";
			}
        },

    fnDisplayDate:function(sValue){
            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd-MM-yyyy" });   
            var dateFormatted = dateFormat.format(new Date(sValue));

            return dateFormatted;
    },
    fnFormatDate:function(sValue){
        var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" });   
        var dateFormatted = dateFormat.format(new Date(sValue));

        return dateFormatted;
},

    fnDisplayStatusColor:function(statusColor){
    if(statusColor =="Available" || statusColor =="In Process"){
        return "Success";
    }else if(statusColor =="Pending" || statusColor =="In-Active"){
        return "Warning";
    }else if(statusColor =="Out of stock"){
        return "Error";
    }else {
        return "Information"
    }
    },

    

    fnCustStatusColor:function(statusColor){
        if(statusColor =="Active"){
            return "Success";
        }else {
            return "Error";
        }
    },

    fnStatusInActive:function(status){
        if(status == "Active"){
            return true;
        }else{
            return false;
        }
    },

    fnStatusActive:function(status){
        if(status == "Active"){
            return false;
        }else{
            return true;
        }
    },

    fnProdStatusText:function(statusText){
        switch (statusText) {
            case "New":
                return "In-Active";
            break;
            case "In-Active":
                return "Pending";
            break;
            case "Pending":
                return "Approve";
            break;
            case "Approve":
                return "In Process";
            break;
            case "In Process":
                return "Available";
            break;
            case "Available":
                return "Out of stock";
            break;
            case "Out of stock":
                return "In-Active";
            break;    
            default:
                return "Not available";
        }
    },

   

    fnProdStatusCode:function(statusText){
        switch (statusText) {
            case "New":
                return "IA";
            break;
            case "In-Active":
                return "P";
            break;
            case "Pending":
                return "AP";
            break;
            case "Approve":
                return "IP";
            break;
            case "In Process":
                return "A";
            break;
            case "Available":
                return "O";
            break;
            case "Out of stock":
                return "IA";
            break;    
            default:
                return "Not available";
        }        
    },

    fnOrderStatusColor:function(statusColor){
        if(statusColor =="Registered" || statusColor =="In-Process"){
            return "Information";
        }else {
            return "Success"
        }
        },

        fnOrderStatusText:function(statusText){
            switch (statusText) {
                case "Registered":
                    return "In-Process";
                break;
                case "In-Process":
                    return "Shipped";
                break;
                case "Shipped":
                    return "Delivered";
                break;
                case "Delivered":
                    return "Delivered";
                break;
                default:
                    return "Not available";
            }
        },
    
        fnOrderStatusCode:function(statusText){
            switch (statusText) {
                case "Registered":
                    return "I";
                break;
                case "In-Process":
                    return "S";
                break;
                case "Shipped":
                    return "D";
                break;
                // case "Delivered":
                //     return "D";
                // break;
                default:
                    return "Not available";
            }
        },

    getRandomNumber:function(min,max) {
        return Math.floor(Math.random() * (max - min));
    }

        // fnDisplaDate: function(){
        //     sap.ui.core.format.DateFormat.getDateInstance({pattern: "dd-MM-yyyy"}).format(new Date())
        // }

    };
});