var {excuteQuery,getRandomInt} = require('../util/db');
const { SO_SCHEMA } = require('../util/constant');


// var getCustomerByUsername = `SELECT no_of_try FROM ${SO_SCHEMA}."LOGIN" WHERE USER_NAME = ?`
var getCustomerByLogin = `SELECT * FROM ${SO_SCHEMA}."LOGIN" WHERE USER_NAME = ? AND USER_PASSWORD=?`

// async function getCustomer(oPayload){
//     var sReponse = await excuteQuery(getCustomerByUsername,[oPayload.user_name]);
//     return sReponse;
// }

async function loginUser(oPayload){
    var sReponse = await excuteQuery(getCustomerByLogin,[oPayload.user_name,oPayload.user_password]);
    return sReponse;
};

async function updateNoOfTry(oPayload){
    var sReponse = await excuteQuery(`UPDATE ${SO_SCHEMA}."LOGIN" SET NO_OF_TRY = ? WHERE USER_NAME = ?`,[oPayload.noOfTry,oPayload.user_name]);
    return sReponse;
};

async function deleteCustomer(customerId){
    var sReponse = await excuteQuery(`DELETE FROM ${SO_SCHEMA}."LOGIN" WHERE ID=?`,[customerId]);
    return sReponse;
}

module.exports = {
    // getCustomer,
    loginUser,
    // createCustomer,
    // updateCustomer,
    // activetoInactiveCustomer,
    updateNoOfTry,
    deleteCustomer
}