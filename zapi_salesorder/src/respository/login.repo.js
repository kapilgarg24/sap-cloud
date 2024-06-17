var {excuteQuery,getRandomInt} = require('../util/db');
const { SO_SCHEMA } = require('../util/constant');


var getCustomerByUsername = `SELECT no_of_try FROM ${SO_SCHEMA}."LOGIN" WHERE USER_NAME = ?`
var getCustomerByLogin = `SELECT * FROM ${SO_SCHEMA}."LOGIN" WHERE USER_NAME = ? AND USER_PASSWORD=?`

async function getCustomer(oPayload){
    var sReponse = await excuteQuery(getCustomerByUsername,[oPayload.user_name]);
    return sReponse;
}

async function loginFromPassword(oPayload){
    var sReponse = await excuteQuery(getCustomerByLogin,[oPayload.user_name,oPayload.user_password]);
    return sReponse;
}

// async function getCustomerById(customerId){
//     var sReponse = await excuteQuery(getCustById,[customerId]);
//     return sReponse;
// }

// async function createCustomer(oPayload){
//     var sReponse = await excuteQuery('INSERT INTO CUSTOMERS VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
//     [getRandomInt(1,100),oPayload.first_name,oPayload.last_name,oPayload.middle_name,oPayload.gender,
//     oPayload.date_of_birth,oPayload.is_active,oPayload.marital_status,oPayload.country_code,
//     oPayload.mobile_no,oPayload.alt_country_code,oPayload.alt_mobile,oPayload.email_add,
//     oPayload.alt_email_add,oPayload.created_by,oPayload.created_at,oPayload.updated_by,oPayload.updated_at]);
//     return sReponse;
// };

// async function updateCustomer(oPayload){
//     var sReponse = await excuteQuery(
//         'UPDATE CUSTOMERS SET FIRST_NAME = ?,LAST_NAME = ?,MIDDLE_NAME=?,GENDER = ?,DATE_OF_BIRTH=?,IS_ACTIVE=?,MARITAL_STATUS = ?,COUNTRY_CODE = ?,MOBILE_NO = ?,ALT_COUNTRY_CODE = ?,ALT_MOBILE = ?,EMAIL_ADD = ?,ALT_EMAIL_ADD = ?, UPDATED_BY=?,UPDATED_AT=? WHERE CUSTOMER_ID = ?',
//         [oPayload.first_name,oPayload.last_name,oPayload.middle_name,oPayload.gender,
//             oPayload.date_of_birth,oPayload.is_active,oPayload.marital_status,oPayload.country_code,
//             oPayload.mobile_no,oPayload.alt_country_code,oPayload.alt_mobile,oPayload.email_add,
//             oPayload.alt_email_add,oPayload.updated_by,oPayload.updated_at,oPayload.customer_id]);
//     return sReponse;
// };

// async function activetoInactiveCustomer(customerId){
//     var sReponse = await excuteQuery(activeToInactive,[customerId]);
//     return sReponse;
// };

async function updateNoOfTry(oPayload){
    var sReponse = await excuteQuery(`UPDATE ${SO_SCHEMA}."LOGIN" SET NO_OF_TRY = ? WHERE USER_NAME = ?`,[oPayload.noOfTry,oPayload.user_name]);
    return sReponse;
};

async function deleteCustomer(customerId){
    var sReponse = await excuteQuery(`DELETE FROM ${SO_SCHEMA}."LOGIN" WHERE ID=?`,[customerId]);
    return sReponse;
}

module.exports = {
    getCustomer,
    loginFromPassword,
    // createCustomer,
    // updateCustomer,
    // activetoInactiveCustomer,
    updateNoOfTry,
    deleteCustomer
}