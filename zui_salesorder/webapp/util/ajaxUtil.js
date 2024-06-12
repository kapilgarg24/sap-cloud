sap.ui.define([], function () {
    return {
        baseUrl : "/api/v1",

        get: function (url, success, error, oParam) {
            console.log(oParam);
            var sParam = "?";
            var sKeys = Object.keys(oParam);
            console.log(sKeys);
            sKeys.forEach((sKey, sIndex) => {
                console.log(sIndex);
                console.log(sKey);
                console.log(sParam);
                var sValue = oParam[sKey];
                console.log(sValue);
                if (sIndex === 0) {
                    if (sValue === '') {
                        sParam = sParam;
                    } else
                        sParam = sParam + (sKey + "=" + sValue);
                }

                else {
                    if (sParam === '?') {
                        sParam = sParam + (sKey + "=" + sValue);
                    } else
                        sParam = sParam + "&" + (sKey + "=" + sValue);
                }
            })
            // sParam = "?"+sParam;
            console.log(sParam);

            // http://localhost:8080/employee
            // /api/v1//employee?id=1


            var apiCall = {};
            apiCall.url = this.baseUrl+ url + sParam;
            apiCall.type = "GET";
            apiCall.success = success;
            apiCall.error = error;
            $.ajax(apiCall);
        },


        post: function (url, success, error, oPayload) {
            var apiCall = {};
            apiCall.url = this.baseUrl+url;
            apiCall.type = "POST";
            apiCall.success = success;
            apiCall.error = error;
            apiCall.data = JSON.stringify(oPayload);
            // apiCall.contentType =  false,
            apiCall.processData = false;
            apiCall.contentType = "application/json";
            apiCall.accept = "application/json";
            $.ajax(apiCall);
        },

        put: function (url, success, error, oPayload) {
            var apiCall = {};
            apiCall.url = this.baseUrl+url;
            apiCall.type = "PUT";
            apiCall.success = success;
            apiCall.error = error;
            apiCall.data = JSON.stringify(oPayload);
            // apiCall.contentType =  false,
            apiCall.processData = false;
            apiCall.contentType = "application/json";
            apiCall.accept = "application/json";
            $.ajax(apiCall);
        },

        delete: function (url, success, error, oPayload) {
            var apiCall = {};
            apiCall.url = this.baseUrl+url;
            apiCall.type = "DELETE";
            apiCall.success = success;
            apiCall.error = error;
            // apiCall.data = JSON.stringify(oPayload);
            // apiCall.contentType =  false,
            // apiCall.processData = false;
            // apiCall.contentType = "application/json";
            // apiCall.accept = "application/json";
            $.ajax(apiCall);
        }
    };
});