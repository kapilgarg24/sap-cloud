const { SO_SCHEMA } = require('../util/constant');
var {excuteQuery} = require('../util/db');

var allValue = `SELECT KEY AS "key",VALUE AS "value" FROM ${SO_SCHEMA}.MAS_KEY_VALUE`;
var valueByGroup = `SELECT * FROM ${SO_SCHEMA}.MAS_KEY_VALUE WHERE GROUP = ?`;

async function getAll(){
    var sReponse = await excuteQuery(allValue,[]);
    return sReponse;
}

async function getKeyValueByGroup(groupId){
    var sReponse = await excuteQuery(valueByGroup,[groupId]);
    return sReponse;
}

// async function createCustomer(oPayload){
//     var sReponse = await excuteQuery('INSERT INTO CUSTOMERS VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
//     [oPayload.customer_id,oPayload.first_name,oPayload.last_name,oPayload.middle_name,oPayload.gender,
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
// }

// async function deleteCustomer(customerId){
//     var sReponse = await excuteQuery('DELETE FROM CUSTOMERS WHERE CUSTOMER_ID = ?',[customerId]);
//     return sReponse;
// }

module.exports = {
    getAll,
    getKeyValueByGroup
    // createCustomer,
    // updateCustomer,
    // deleteCustomer
}